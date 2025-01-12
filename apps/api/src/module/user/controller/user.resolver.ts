import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { LostItemObject } from '#api/module/lost-item/controller/dto/object/lost-item.object';
import type { LostItem } from '#api/module/lost-item/domain/lost-item.model';
import { OwnerLostItemsDataLoader } from '#api/module/user/dataloader/owner-lost-items.dataloader';
import { ReporterLostItemsDataLoader } from '#api/module/user/dataloader/reporter-lost-items.dataloader';
import { User } from '#api/module/user/domain/user.model';
import { UserObject } from './dto/object/user.object';

@Resolver(() => UserObject)
export class UserResolver {
  constructor(
    private readonly reporterLostItemsDataLoader: ReporterLostItemsDataLoader,
    private readonly ownerLostItemsDataLoader: OwnerLostItemsDataLoader,
  ) {}

  @ResolveField(() => [LostItemObject])
  async reportedLostItems(@Parent() reporter: User): Promise<LostItem[]> {
    const reportedLostItems = await this.reporterLostItemsDataLoader.load(reporter.id);

    return reportedLostItems;
  }

  @ResolveField(() => [LostItemObject])
  async ownedLostItems(@Parent() owner: User): Promise<LostItem[]> {
    const ownedLostItems = await this.ownerLostItemsDataLoader.load(owner.id);

    return ownedLostItems;
  }
}
