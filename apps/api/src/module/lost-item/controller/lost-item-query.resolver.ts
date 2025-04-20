import { Inject, Logger } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { InjectionToken } from '#api/common/constant/injection-token';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type LostItemUseCaseInterface } from '#api/module/lost-item/use-case/lost-item.use-case';
import { LostItemWithRatesObject } from './dto/object/lost-item-with-rates.object';

@Resolver()
export class LostItemQuery {
  private readonly logger = new Logger(LostItemQuery.name);

  constructor(
    @Inject(InjectionToken.LOST_ITEM_USE_CASE)
    private readonly lostItemUseCase: LostItemUseCaseInterface,
  ) {}

  @Query(() => LostItemWithRatesObject, { nullable: true })
  async findSimilarLostItem(
    @Args('userDescription', { type: () => String })
    userDescription: string,
    @Args('lostAt', { type: () => Date })
    lostAt: Date,
  ): Promise<LostItemWithRatesObject | null> {
    this.logger.log(`${this.findSimilarLostItem.name} called`);

    const result = await this.lostItemUseCase.findSimilarLostItem(userDescription, lostAt);

    if (!result) {
      return null;
    }

    const { lostItem, approveRate, rejectRate } = result;

    // LostItemのフィールドをログに出力して確認
    this.logger.debug(`LostItem: id=${lostItem.id}, reporterId=${lostItem.reporterId}, ownerId=${lostItem.ownerId}`);

    // LostItemWithRatesObjectはLostItemObjectを継承しているので、
    // LostItemのプロパティをコピーしてからレートを設定
    const response = new LostItemWithRatesObject();
    response.id = lostItem.id;
    response.title = lostItem.title;
    response.description = lostItem.description;
    response.imageUrls = lostItem.imageUrls;
    response.reportedAt = lostItem.reportedAt;
    response.ownedAt = lostItem.ownedAt;
    response.deliveredAt = lostItem.deliveredAt;
    response.retrievedAt = lostItem.retrievedAt;
    response.approveRate = approveRate;
    response.rejectRate = rejectRate;

    // 重要: リゾルバーがreporterとownerを解決するために必要なID
    response.reporterId = lostItem.reporterId;
    response.ownerId = lostItem.ownerId;

    return response;
  }
}
