import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '#api/infra/prisma/prisma.service';
import { User } from '#api/module/user/domain/user.model';
import type { UserRepositoryInterface } from '#api/module/user/repository/user.repository';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(@Inject(PrismaService) private readonly prismaService: PrismaService) {}

  async find(userId: Parameters<UserRepositoryInterface['find']>[0]): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });
    if (!user) {
      return null;
    }

    return new User(user);
  }

  async findByAuthId(authId: Parameters<UserRepositoryInterface['findByAuthId']>[0]): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { authId } });
    if (!user) {
      return null;
    }

    return new User(user);
  }

  async findByHashedFingerprintId(hashedFingerprintId: Parameters<UserRepositoryInterface['findByHashedFingerprintId']>[0]): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { hashedFingerprintId } });
    if (!user) {
      return null;
    }

    return new User(user);
  }

  async findByReportedLostItemId(reportedLostItemId: Parameters<UserRepositoryInterface['findByReportedLostItemId']>[0]): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({ where: { reportedLostItems: { some: { id: reportedLostItemId } } } });
    if (!user) {
      return null;
    }

    return new User(user);
  }

  async findByOwnedLostItemId(ownedLostItemId: Parameters<UserRepositoryInterface['findByOwnedLostItemId']>[0]): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({ where: { ownedLostItems: { some: { id: ownedLostItemId } } } });
    if (!user) {
      return null;
    }

    return new User(user);
  }

  async findMany(userIds: Parameters<UserRepositoryInterface['findMany']>[0]): Promise<User[]> {
    const users = await this.prismaService.user.findMany({ where: { id: { in: userIds } } });

    return users.map((user) => new User(user));
  }

  async create(user: Parameters<UserRepositoryInterface['create']>[0]): Promise<User> {
    const createdUser = await this.prismaService.user.create({ data: user });

    return new User(createdUser);
  }

  async update(userId: Parameters<UserRepositoryInterface['update']>[0], user: Parameters<UserRepositoryInterface['update']>[1]): Promise<User> {
    const updatedUser = await this.prismaService.user.update({ where: { id: userId }, data: user });

    return new User(updatedUser);
  }

  async updateByAuthId(
    authId: Parameters<UserRepositoryInterface['updateByAuthId']>[0],
    user: Parameters<UserRepositoryInterface['updateByAuthId']>[1],
  ): Promise<User> {
    const updatedUser = await this.prismaService.user.update({ where: { authId }, data: user });

    return new User(updatedUser);
  }

  async updateByHashedFingerprintId(
    hashedFingerprintId: Parameters<UserRepositoryInterface['updateByHashedFingerprintId']>[0],
    user: Parameters<UserRepositoryInterface['updateByHashedFingerprintId']>[1],
  ): Promise<User> {
    const updatedUser = await this.prismaService.user.update({ where: { hashedFingerprintId }, data: user });

    return new User(updatedUser);
  }

  async connectOwnedLostItemsByAuthId(
    authId: Parameters<UserRepositoryInterface['connectOwnedLostItemsByAuthId']>[0],
    lostItemId: Parameters<UserRepositoryInterface['connectOwnedLostItemsByAuthId']>[1],
  ): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: { authId },
      data: { ownedLostItems: { connect: { id: lostItemId } } },
    });

    return new User(updatedUser);
  }
}
