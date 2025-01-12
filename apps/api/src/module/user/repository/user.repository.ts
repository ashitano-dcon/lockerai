import type { LostItem } from '#api/module/lost-item/domain/lost-item.model';
import type { User } from '#api/module/user/domain/user.model';

export interface UserRepositoryInterface {
  find(userId: User['id']): Promise<User | null>;
  findByAuthId(authId: User['authId']): Promise<User | null>;
  findByHashedFingerprintId(hashedFingerprintId: NonNullable<User['hashedFingerprintId']>): Promise<User | null>;
  findByReportedLostItemId(reportedLostItemId: LostItem['id']): Promise<User | null>;
  findByOwnedLostItemId(ownedLostItemId: LostItem['id']): Promise<User | null>;
  findMany(userIds: User['id'][]): Promise<User[]>;
  create(user: Omit<User, 'id' | 'hashedFingerprintId' | 'lostAndFoundState' | 'isDiscloseAsOwner' | 'createdAt' | 'isOnTheWay'>): Promise<User>;
  update(userId: User['id'], user: Partial<Omit<User, 'id' | 'authId' | 'createdAt' | 'isOnTheWay'>>): Promise<User>;
  updateByAuthId(authId: User['authId'], user: Partial<Omit<User, 'id' | 'authId' | 'createdAt' | 'isOnTheWay'>>): Promise<User>;
  updateByHashedFingerprintId(
    hashedFingerprintId: NonNullable<User['hashedFingerprintId']>,
    user: Partial<Omit<User, 'id' | 'authId' | 'createdAt' | 'isOnTheWay'>>,
  ): Promise<User>;
  connectOwnedLostItemsByAuthId(authId: User['authId'], lostItemId: LostItem['id']): Promise<User>;
}
