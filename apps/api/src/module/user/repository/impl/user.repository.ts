import { Inject, Injectable } from '@nestjs/common';
import { eq, inArray } from 'drizzle-orm';
import { InjectionToken } from '#api/common/constant/injection-token';
import { type DrizzleClient, lostItems, users } from '#api/infra/drizzle';
import { User } from '#api/module/user/domain/user.model';
import type { UserRepositoryInterface } from '#api/module/user/repository/user.repository';

type UserDto = typeof users.$inferSelect;

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @Inject(InjectionToken.DRIZZLE_CLIENT)
    private readonly drizzleClient: DrizzleClient,
  ) {}

  private mapToUser(user: UserDto): User {
    return new User({
      id: user.id,
      authId: user.authId,
      hashedFingerprintId: user.hashedFingerprintId,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: new Date(user.createdAt),
      isDiscloseAsOwner: user.isDiscloseAsOwner,
      lostAndFoundState: user.lostAndFoundState,
      avatarUrl: user.avatarUrl,
    });
  }

  async find(userId: Parameters<UserRepositoryInterface['find']>[0]): Promise<User | null> {
    const [user] = await this.drizzleClient.select().from(users).where(eq(users.id, userId));
    if (!user) {
      return null;
    }

    return this.mapToUser(user);
  }

  async findByAuthId(authId: Parameters<UserRepositoryInterface['findByAuthId']>[0]): Promise<User | null> {
    const [user] = await this.drizzleClient.select().from(users).where(eq(users.authId, authId));
    if (!user) {
      return null;
    }

    return this.mapToUser(user);
  }

  async findByHashedFingerprintId(hashedFingerprintId: Parameters<UserRepositoryInterface['findByHashedFingerprintId']>[0]): Promise<User | null> {
    const [user] = await this.drizzleClient.select().from(users).where(eq(users.hashedFingerprintId, hashedFingerprintId));
    if (!user) {
      return null;
    }

    return this.mapToUser(user);
  }

  async findByReportedLostItemId(reportedLostItemId: Parameters<UserRepositoryInterface['findByReportedLostItemId']>[0]): Promise<User | null> {
    const [user] = await this.drizzleClient
      .select({
        id: users.id,
        authId: users.authId,
        hashedFingerprintId: users.hashedFingerprintId,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        isDiscloseAsOwner: users.isDiscloseAsOwner,
        lostAndFoundState: users.lostAndFoundState,
        avatarUrl: users.avatarUrl,
      })
      .from(users)
      .innerJoin(lostItems, eq(users.id, lostItems.ownerId))
      .where(eq(lostItems.id, reportedLostItemId));

    if (!user) {
      return null;
    }

    return this.mapToUser(user);
  }

  async findByOwnedLostItemId(ownedLostItemId: Parameters<UserRepositoryInterface['findByOwnedLostItemId']>[0]): Promise<User | null> {
    const [user] = await this.drizzleClient
      .select({
        id: users.id,
        authId: users.authId,
        hashedFingerprintId: users.hashedFingerprintId,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        isDiscloseAsOwner: users.isDiscloseAsOwner,
        lostAndFoundState: users.lostAndFoundState,
        avatarUrl: users.avatarUrl,
      })
      .from(users)
      .innerJoin(lostItems, eq(users.id, lostItems.ownerId))
      .where(eq(lostItems.id, ownedLostItemId));

    if (!user) {
      return null;
    }

    return this.mapToUser(user);
  }

  async findMany(userIds: Parameters<UserRepositoryInterface['findMany']>[0]): Promise<User[]> {
    const foundUsers = await this.drizzleClient.select().from(users).where(inArray(users.id, userIds));

    return foundUsers.map(this.mapToUser);
  }

  async create(user: Parameters<UserRepositoryInterface['create']>[0]): Promise<User> {
    const [createdUser] = await this.drizzleClient.insert(users).values(user).returning();

    if (!createdUser) {
      throw new Error('User not found');
    }

    return this.mapToUser(createdUser);
  }

  async update(userId: Parameters<UserRepositoryInterface['update']>[0], user: Parameters<UserRepositoryInterface['update']>[1]): Promise<User> {
    const [updatedUser] = await this.drizzleClient.update(users).set(user).where(eq(users.id, userId)).returning();

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return this.mapToUser(updatedUser);
  }

  async updateByAuthId(
    authId: Parameters<UserRepositoryInterface['updateByAuthId']>[0],
    user: Parameters<UserRepositoryInterface['updateByAuthId']>[1],
  ): Promise<User> {
    const [updatedUser] = await this.drizzleClient.update(users).set(user).where(eq(users.authId, authId)).returning();

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return this.mapToUser(updatedUser);
  }

  async updateByHashedFingerprintId(
    hashedFingerprintId: Parameters<UserRepositoryInterface['updateByHashedFingerprintId']>[0],
    user: Parameters<UserRepositoryInterface['updateByHashedFingerprintId']>[1],
  ): Promise<User> {
    const [updatedUser] = await this.drizzleClient.update(users).set(user).where(eq(users.hashedFingerprintId, hashedFingerprintId)).returning();

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return this.mapToUser(updatedUser);
  }

  async connectOwnedLostItemsByAuthId(
    authId: Parameters<UserRepositoryInterface['connectOwnedLostItemsByAuthId']>[0],
    lostItemId: Parameters<UserRepositoryInterface['connectOwnedLostItemsByAuthId']>[1],
  ): Promise<User> {
    const [targetUser] = await this.drizzleClient.select().from(users).where(eq(users.authId, authId));

    if (!targetUser) {
      throw new Error('User not found');
    }

    await this.drizzleClient.update(lostItems).set({ ownerId: targetUser.id }).where(eq(lostItems.id, lostItemId));

    return this.mapToUser(targetUser);
  }
}
