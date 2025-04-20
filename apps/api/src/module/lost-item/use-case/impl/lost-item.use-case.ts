import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InjectionToken } from '#api/common/constant/injection-token';
import { IdentificationNnService } from '#api/infra/identification-nn/identification-nn.service';
import { LangchainService } from '#api/infra/langchain/langchain.service';
import { SupabaseService } from '#api/infra/supabase/supabase.service';
import { LostItemWithRates } from '#api/module/lost-item/domain/lost-item-with-rates.model';
import { type LostItem } from '#api/module/lost-item/domain/lost-item.model';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type LostItemRepositoryInterface } from '#api/module/lost-item/repository/lost-item.repository';
import type { LostItemUseCaseInterface } from '#api/module/lost-item/use-case/lost-item.use-case';
import { type UserRepositoryInterface } from '#api/module/user/repository/user.repository';

@Injectable()
export class LostItemUseCase implements LostItemUseCaseInterface {
  constructor(
    @Inject(InjectionToken.LOST_ITEM_REPOSITORY)
    private readonly lostItemRepository: LostItemRepositoryInterface,
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
    private readonly supabaseService: SupabaseService,
    private readonly langchainService: LangchainService,
    private readonly identificationNnService: IdentificationNnService,
  ) {}

  async reportLostItem(
    lostItem: Parameters<LostItemUseCaseInterface['reportLostItem']>[0],
    imageFiles: Parameters<LostItemUseCaseInterface['reportLostItem']>[1],
  ): Promise<LostItem> {
    const reporter = await this.userRepository.find(lostItem.reporterId);
    if (!reporter) {
      throw new Error('User not found. The lostItem.reporterId may be invalid.');
    }
    if (reporter.isOnTheWay) {
      throw new Error(`The user is already in ${reporter.lostAndFoundState} state.`);
    }

    const lostItemId = uuid();
    // 1. パスを先に決定 (アップロードとパス生成を同時に行う)
    const uploadPromises = imageFiles.map(async (file, index) => {
      const path = `${lostItemId}/${index}-${file.filename.replace(/\.jpg$/, '.jpeg')}`;
      await this.supabaseService.uploadFiles([[path, file]]);
      return path; // 成功したらパスを返す
    });
    const filePaths = await Promise.all(uploadPromises);

    // 2. アップロードしたファイルをダウンロードして Base64 データ URL に変換
    const imageDataUrls = await Promise.all(
      filePaths.map(async (path) => {
        const fileData = await this.supabaseService.downloadFile(path);
        if (!fileData) {
          throw new Error(`Failed to download uploaded file: ${path}`);
        }
        const base64 = fileData.data.toString('base64');
        return `data:${fileData.mimetype};base64,${base64}`;
      }),
    );

    // 4. Base64 データ URL を Langchain に渡す
    const lostItemDescription = await this.langchainService.imageCaptioning(imageDataUrls);
    if ('error' in lostItemDescription) {
      throw new Error(lostItemDescription.error);
    }

    // 5. DB 保存用に公開 URL を取得
    const imageUrlsForDb = filePaths.map((path) => this.supabaseService.getPublicUrl(path));

    const embeddedDescription = await this.langchainService.embedding(lostItemDescription.description);

    const createdLostItem = await this.lostItemRepository.create(
      {
        ...lostItem,
        id: lostItemId,
        title: lostItemDescription.title,
        description: lostItemDescription.description,
        imageUrls: imageUrlsForDb, // DB には公開 URL を保存
        drawerId: null,
        ownerId: null,
        ownedAt: null,
        deliveredAt: null,
        retrievedAt: null,
      },
      embeddedDescription,
    );

    await this.userRepository.update(lostItem.reporterId, { lostAndFoundState: 'DELIVERING' });

    return createdLostItem;
  }

  async findSimilarLostItem(
    userDescription: Parameters<LostItemUseCaseInterface['findSimilarLostItem']>[0],
    lostAt: Parameters<LostItemUseCaseInterface['findSimilarLostItem']>[1],
  ): Promise<LostItemWithRates | null> {
    const translatedUserDescription = await this.langchainService.translateFromAnyToEnglish(userDescription);
    if ('error' in translatedUserDescription) {
      throw new Error(translatedUserDescription.error);
    }

    const embeddedDescription = await this.langchainService.embedding(translatedUserDescription.translatedText);
    const similarLostItems = await this.lostItemRepository.findSimilar(embeddedDescription);
    if (similarLostItems.length === 0) {
      return null;
    }

    const itemsWithRates = await this.identificationNnService.identify(
      similarLostItems.map(([lostItem, similarity]) => ({
        key: lostItem.id,
        similarity,
        dateDifference: Math.abs(lostAt.getTime() - lostItem.reportedAt.getTime()),
      })),
    );

    if (!itemsWithRates || itemsWithRates.length === 0) {
      return null;
    }

    // 最も高い確率を持つアイテムを見つける
    const bestMatch = itemsWithRates.reduce<{ key: string; approveRate: number; rejectRate: number }>(
      (prev, current) => (current.approveRate > prev.approveRate ? current : prev),
      itemsWithRates[0]!,
    );

    // マッチした確率が0.5以下ならnullを返す
    if (bestMatch.approveRate <= 0) {
      return null;
    }

    // そのIDに対応するLostItemを探す
    const matchedLostItem = similarLostItems.find(([lostItem]) => lostItem.id === bestMatch.key)?.[0] ?? null;

    if (!matchedLostItem) {
      return null;
    }

    return new LostItemWithRates(matchedLostItem, bestMatch.approveRate, bestMatch.rejectRate);
  }

  async ownLostItem(
    lostItemId: Parameters<LostItemUseCaseInterface['ownLostItem']>[0],
    authId: Parameters<LostItemUseCaseInterface['ownLostItem']>[1],
  ): Promise<LostItem> {
    const [lostItem, owner, reporter] = await Promise.all([
      this.lostItemRepository.find(lostItemId),
      this.userRepository.findByAuthId(authId),
      this.userRepository.findByReportedLostItemId(lostItemId),
    ]);
    if (!lostItem) {
      throw new Error('Lost item not found. The lostItemId may be invalid.');
    }
    if (lostItem.hasRetrieved) {
      throw new Error('The lost item has already been retrieved.');
    }
    if (!owner) {
      throw new Error('User not found. The authId may be invalid.');
    }
    if (owner.isOnTheWay) {
      throw new Error(`The user is already in ${owner.lostAndFoundState} state.`);
    }
    if (!reporter) {
      throw new Error('The lost item reporter not found. The lostItemId may be invalid.');
    }
    if (owner.id === reporter.id) {
      throw new Error('The lost item reporter and the owner are the same person.');
    }

    const updatedLostItem = await this.lostItemRepository.update(lostItemId, {
      ownerId: owner.id,
      ownedAt: new Date(),
    });

    await this.userRepository.updateByAuthId(authId, { lostAndFoundState: 'RETRIEVING' });

    return updatedLostItem;
  }
}
