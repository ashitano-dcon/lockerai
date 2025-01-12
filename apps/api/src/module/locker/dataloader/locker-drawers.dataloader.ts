import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectionToken } from '#api/common/constant/injection-token';
import { BaseDataLoader } from '#api/common/service/cache/base.dataloader';
import type { Drawer } from '#api/module/drawer/domain/drawer.model';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type DrawerRepositoryInterface } from '#api/module/drawer/repository/drawer.repository';
import type { Locker } from '#api/module/locker/domain/locker.model';

@Injectable({ scope: Scope.REQUEST })
export class LockerDrawersDataLoader extends BaseDataLoader<Drawer['lockerId'], Drawer[]> {
  constructor(
    @Inject(InjectionToken.DRAWER_REPOSITORY)
    private readonly drawerRepository: DrawerRepositoryInterface,
  ) {
    super();
  }

  protected async batchLoad(lockerIds: Locker['id'][]): Promise<(Drawer[] | Error)[]> {
    const drawers = await this.drawerRepository.findManyByLockerIds(lockerIds);

    const mappedDrawersList = lockerIds.map((lockerId) => {
      const mappedDrawers = drawers.filter((drawer) => drawer.lockerId === lockerId);
      if (mappedDrawers.length === 0) {
        return new Error(`Cannot find Drawer with lockerId ${lockerId}.`);
      }

      return mappedDrawers;
    });

    return mappedDrawersList;
  }
}
