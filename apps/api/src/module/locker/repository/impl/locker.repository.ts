import { Inject, Injectable } from '@nestjs/common';
import { inArray } from 'drizzle-orm';
import { InjectionToken } from '#api/common/constant/injection-token';
import { type DrizzleClient, lockers } from '#api/infra/drizzle';
import { Locker } from '#api/module/locker/domain/locker.model';
import type { LockerRepositoryInterface } from '#api/module/locker/repository/locker.repository';

type LockerDto = typeof lockers.$inferSelect;

@Injectable()
export class LockerRepository implements LockerRepositoryInterface {
  constructor(
    @Inject(InjectionToken.DRIZZLE_CLIENT)
    private readonly drizzleClient: DrizzleClient,
  ) {}

  private mapToLocker(locker: LockerDto): Locker {
    return new Locker({
      ...locker,
      createdAt: new Date(locker.createdAt),
    });
  }

  async findMany(lockerIds: Parameters<LockerRepositoryInterface['findMany']>[0]): Promise<Locker[]> {
    const foundLockers = await this.drizzleClient.select().from(lockers).where(inArray(lockers.id, lockerIds));

    return foundLockers.map(this.mapToLocker);
  }
}
