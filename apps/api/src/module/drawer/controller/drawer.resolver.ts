import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectionToken } from '#api/common/constant/injection-token';
import { Drawer } from '#api/module/drawer/domain/drawer.model';
import { LockerObject } from '#api/module/locker/controller/dto/object/locker.object';
import { LockerDataLoader } from '#api/module/locker/dataloader/locker.dataloader';
import type { Locker } from '#api/module/locker/domain/locker.model';
import { LostItemObject } from '#api/module/lost-item/controller/dto/object/lost-item.object';
import type { LostItem } from '#api/module/lost-item/domain/lost-item.model';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type LostItemRepositoryInterface } from '#api/module/lost-item/repository/lost-item.repository';
import { DrawerObject } from './dto/object/drawer.object';

@Resolver(() => DrawerObject)
export class DrawerResolver {
  constructor(
    private readonly lockerDataLoader: LockerDataLoader,
    @Inject(InjectionToken.LOST_ITEM_REPOSITORY)
    private readonly lostItemRepository: LostItemRepositoryInterface,
  ) {}

  @ResolveField(() => LockerObject)
  async locker(@Parent() drawer: Drawer): Promise<Locker> {
    const locker = await this.lockerDataLoader.load(drawer.lockerId);

    return locker;
  }

  @ResolveField(() => LostItemObject, { nullable: true })
  async lostItem(@Parent() drawer: Drawer): Promise<LostItem | null> {
    const lostItem = await this.lostItemRepository.findByDrawerId(drawer.id);

    return lostItem;
  }
}
