import { Inject, Logger } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { InjectionToken } from '#api/common/constant/injection-token';
import type { LostItem } from '#api/module/lost-item/domain/lost-item.model';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type LostItemUseCaseInterface } from '#api/module/lost-item/use-case/lost-item.use-case';
import { LostItemObject } from './dto/object/lost-item.object';

@Resolver()
export class LostItemQuery {
  private readonly logger = new Logger(LostItemQuery.name);

  constructor(
    @Inject(InjectionToken.LOST_ITEM_USE_CASE)
    private readonly lostItemUseCase: LostItemUseCaseInterface,
  ) {}

  @Query(() => LostItemObject, { nullable: true })
  async findSimilarLostItem(
    @Args('userDescription', { type: () => String })
    userDescription: string,
    @Args('lostAt', { type: () => Date })
    lostAt: Date,
  ): Promise<LostItem | null> {
    this.logger.log(`${this.findSimilarLostItem.name} called`);

    const createdLostItem = await this.lostItemUseCase.findSimilarLostItem(userDescription, lostAt);

    return createdLostItem;
  }
}
