import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectionToken } from '#api/common/constant/injection-token';
import { DrawerObject } from '#api/module/drawer/controller/dto/object/drawer.object';
import type { Drawer } from '#api/module/drawer/domain/drawer.model';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type DrawerRepositoryInterface } from '#api/module/drawer/repository/drawer.repository';
import { LostItemObject } from '#api/module/lost-item/controller/dto/object/lost-item.object';
import { LostItem } from '#api/module/lost-item/domain/lost-item.model';
import { UserObject } from '#api/module/user/controller/dto/object/user.object';
import { OwnerDataLoader } from '#api/module/user/dataloader/owner.dataloader';
import { ReporterDataLoader } from '#api/module/user/dataloader/reporter.dataloader';
import type { User } from '#api/module/user/domain/user.model';

@Resolver(() => LostItemObject)
export class LostItemResolver {
  constructor(
    private readonly reporterDataLoader: ReporterDataLoader,
    private readonly ownerDataLoader: OwnerDataLoader,
    @Inject(InjectionToken.DRAWER_REPOSITORY)
    private readonly drawerRepository: DrawerRepositoryInterface,
  ) {}

  @ResolveField(() => UserObject)
  async reporter(@Parent() lostItem: LostItem): Promise<User> {
    const reporter = await this.reporterDataLoader.load(lostItem.reporterId);

    return reporter;
  }

  @ResolveField(() => UserObject, { nullable: true })
  async owner(@Parent() lostItem: LostItem): Promise<User | null> {
    if (!lostItem.ownerId) {
      return null;
    }

    const owner = await this.ownerDataLoader.load(lostItem.ownerId);

    return owner;
  }

  @ResolveField(() => DrawerObject, { nullable: true })
  async drawer(@Parent() lostItem: LostItem): Promise<Drawer | null> {
    if (!lostItem.drawerId) {
      return null;
    }

    const drawer = await this.drawerRepository.find(lostItem.drawerId);
    if (!drawer) {
      throw new Error(`Cannot find Drawer with lostItem.id ${lostItem.id}.`);
    }

    return drawer;
  }
}
