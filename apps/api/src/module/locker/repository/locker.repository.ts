import type { Locker } from '#api/module/locker/domain/locker.model';

export interface LockerRepositoryInterface {
  findMany(lockerIds: Locker['id'][]): Promise<Locker[]>;
}
