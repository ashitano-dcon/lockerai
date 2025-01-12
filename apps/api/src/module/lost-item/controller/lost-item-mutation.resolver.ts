import { Inject, Logger, UseGuards, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type FileUpload } from 'graphql-upload/Upload.js';
import { InjectionToken } from '#api/common/constant/injection-token';
import { AuthGuard } from '#api/common/guard/auth.guard';
import type { LostItem } from '#api/module/lost-item/domain/lost-item.model';
import { type LostItemUseCaseInterface } from '#api/module/lost-item/use-case/lost-item.use-case';
import { UserWhereAuthIdInput } from '#api/module/user/controller/dto/input/user-where-auth-id.input';
import { LostItemCreateInput } from './dto/input/lost-item-create.input';
import { LostItemWhereIdInput } from './dto/input/lost-item-where-id.input';
import { LostItemObject } from './dto/object/lost-item.object';

@Resolver()
@UseGuards(AuthGuard)
export class LostItemMutation {
  private readonly logger = new Logger(LostItemMutation.name);

  constructor(
    @Inject(InjectionToken.LOST_ITEM_USE_CASE)
    private readonly lostItemUseCase: LostItemUseCaseInterface,
  ) {}

  @Mutation(() => LostItemObject)
  async reportLostItem(
    @Args('lostItem', { type: () => LostItemCreateInput }, ValidationPipe)
    lostItem: LostItemCreateInput,
    @Args('imageFiles', { type: () => [GraphQLUpload] })
    imageFilePromises: Promise<FileUpload>[],
  ): Promise<LostItem> {
    this.logger.log(`${this.reportLostItem.name} called`);

    const createdLostItem = await this.lostItemUseCase.reportLostItem(lostItem, await Promise.all(imageFilePromises));

    return createdLostItem;
  }

  @Mutation(() => LostItemObject)
  async ownLostItem(
    @Args('lostItem', { type: () => LostItemWhereIdInput })
    lostItem: LostItemWhereIdInput,
    @Args('user', { type: () => UserWhereAuthIdInput })
    user: UserWhereAuthIdInput,
  ): Promise<LostItem> {
    this.logger.log(`${this.ownLostItem.name} called`);

    const ownedLostItem = await this.lostItemUseCase.ownLostItem(lostItem.id, user.authId);

    return ownedLostItem;
  }
}
