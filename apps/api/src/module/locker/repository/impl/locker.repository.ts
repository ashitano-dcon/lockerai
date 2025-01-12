import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '#api/infra/prisma/prisma.service';
import { Locker } from '#api/module/locker/domain/locker.model';
import type { LockerRepositoryInterface } from '#api/module/locker/repository/locker.repository';

@Injectable()
export class LockerRepository implements LockerRepositoryInterface {
  constructor(@Inject(PrismaService) private readonly prismaService: PrismaService) {}

  async findMany(lockerIds: Parameters<LockerRepositoryInterface['findMany']>[0]): Promise<Locker[]> {
    const lockers = await this.prismaService.locker.findMany({ where: { id: { in: lockerIds } } });

    return lockers.map((locker) => new Locker(locker));
  }
}
