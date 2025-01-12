import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DrawerObject } from '#api/module/drawer/controller/dto/object/drawer.object';
import type { Drawer } from '#api/module/drawer/domain/drawer.model';
import { LockerDrawersDataLoader } from '#api/module/locker/dataloader/locker-drawers.dataloader';
import { Locker } from '#api/module/locker/domain/locker.model';
import { LockerObject } from './dto/object/locker.object';

@Resolver(() => LockerObject)
export class LockerResolver {
  constructor(private readonly lockerDrawersDataLoader: LockerDrawersDataLoader) {}

  @ResolveField(() => [DrawerObject])
  async drawers(@Parent() locker: Locker): Promise<Drawer[]> {
    const drawers = await this.lockerDrawersDataLoader.load(locker.id);

    return drawers;
  }
}
