import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectionToken } from '#api/common/constant/injection-token';
import { BaseDataLoader } from '#api/common/service/cache/base.dataloader';
import type { Locker } from '#api/module/locker/domain/locker.model';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type LockerRepositoryInterface } from '#api/module/locker/repository/locker.repository';

@Injectable({ scope: Scope.REQUEST })
export class LockerDataLoader extends BaseDataLoader<Locker['id'], Locker> {
  constructor(
    @Inject(InjectionToken.LOCKER_REPOSITORY)
    private readonly lockerRepository: LockerRepositoryInterface,
  ) {
    super();
  }

  protected async batchLoad(lockerIds: Locker['id'][]): Promise<(Locker | Error)[]> {
    const lockers = await this.lockerRepository.findMany(lockerIds);

    const mappedLockers = lockerIds.map((lockerId) => {
      const locker = lockers.find((l) => l.id === lockerId);

      return locker || new Error(`Cannot find Locker with id ${lockerId}.`);
    });

    return mappedLockers;
  }
}
