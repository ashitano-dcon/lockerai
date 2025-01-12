import type { User } from '#api/module/user/domain/user.model';

export interface UserUseCaseInterface {
  findUser(authId: User['authId']): Promise<User | null>;
  findUserById(id: User['id']): Promise<User | null>;
  findUserByHashedFingerprintId(hashedFingerprintId: NonNullable<User['hashedFingerprintId']>): Promise<User | null>;
  createUser(user: Omit<User, 'id' | 'hashedFingerprintId' | 'lostAndFoundState' | 'isDiscloseAsOwner' | 'createdAt' | 'isOnTheWay'>): Promise<User>;
  updateUserDisclosure(authId: User['authId'], isDiscloseAsOwner: User['isDiscloseAsOwner']): Promise<User>;
  relateFingerprintWithUser(authId: User['authId'], hashedFingerprintId: NonNullable<User['hashedFingerprintId']>): Promise<User>;
}
