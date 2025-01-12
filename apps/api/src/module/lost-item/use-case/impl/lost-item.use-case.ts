import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InjectionToken } from '#api/common/constant/injection-token';
import { IdentificationNnService } from '#api/infra/identification-nn/identification-nn.service';
import { LangchainService } from '#api/infra/langchain/langchain.service';
import { SupabaseService } from '#api/infra/supabase/supabase.service';
import type { LostItem } from '#api/module/lost-item/domain/lost-item.model';
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
    const imageUrls = await this.supabaseService.uploadFiles(
      imageFiles.map((file, index) => [`${lostItemId}/${index}-${file.filename.replace(/\.jpg$/, '.jpeg')}`, file]),
    );

    const lostItemDescription = await this.langchainService.imageCaptioning(imageUrls);
    if ('error' in lostItemDescription) {
      throw new Error(lostItemDescription.error);
    }

    const embeddedDescription = await this.langchainService.embedding(lostItemDescription.description);

    const createdLostItem = await this.lostItemRepository.create(
      {
        ...lostItem,
        id: lostItemId,
        title: lostItemDescription.title,
        description: lostItemDescription.description,
        imageUrls,
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
  ): Promise<LostItem | null> {
    const translatedUserDescription = await this.langchainService.translateFromAnyToEnglish(userDescription);
    if ('error' in translatedUserDescription) {
      throw new Error(translatedUserDescription.error);
    }

    const embeddedDescription = await this.langchainService.embedding(translatedUserDescription.translatedText);
    const similarLostItems = await this.lostItemRepository.findSimilar(embeddedDescription);
    if (similarLostItems.length === 0) {
      return null;
    }

    const similarLostItemId = await this.identificationNnService.identify(
      similarLostItems.map(([lostItem, similarity]) => ({
        key: lostItem.id,
        similarity,
        dateDifference: Math.abs(lostAt.getTime() - lostItem.reportedAt.getTime()),
      })),
    );

    const similarLostItem = similarLostItemId ? similarLostItems.find(([lostItem]) => lostItem.id === similarLostItemId)?.[0] ?? null : null;

    return similarLostItem;
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
