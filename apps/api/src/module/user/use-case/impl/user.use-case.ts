import { Inject, Injectable } from '@nestjs/common';
import { InjectionToken } from '#api/common/constant/injection-token';
import type { User } from '#api/module/user/domain/user.model';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type UserRepositoryInterface } from '#api/module/user/repository/user.repository';
import type { UserUseCaseInterface } from '#api/module/user/use-case/user.use-case';

@Injectable()
export class UserUseCase implements UserUseCaseInterface {
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async findUser(authId: Parameters<UserUseCaseInterface['findUser']>[0]): Promise<User | null> {
    const foundUser = await this.userRepository.findByAuthId(authId);

    return foundUser;
  }

  async findUserById(id: Parameters<UserUseCaseInterface['findUserById']>[0]): Promise<User | null> {
    const foundUser = await this.userRepository.find(id);

    return foundUser;
  }

  async findUserByHashedFingerprintId(
    hashedFingerprintId: Parameters<UserUseCaseInterface['findUserByHashedFingerprintId']>[0],
  ): Promise<User | null> {
    const foundUser = await this.userRepository.findByHashedFingerprintId(hashedFingerprintId);

    return foundUser;
  }

  async createUser(user: Parameters<UserUseCaseInterface['createUser']>[0]): Promise<User> {
    const createdUser = await this.userRepository.create(user);

    return createdUser;
  }

  async updateUserDisclosure(
    authId: Parameters<UserUseCaseInterface['updateUserDisclosure']>[0],
    isDiscloseAsOwner: Parameters<UserUseCaseInterface['updateUserDisclosure']>[1],
  ): Promise<User> {
    const updatedUser = await this.userRepository.updateByAuthId(authId, { isDiscloseAsOwner });

    return updatedUser;
  }

  async relateFingerprintWithUser(
    authId: Parameters<UserUseCaseInterface['relateFingerprintWithUser']>[0],
    hashedFingerprintId: Parameters<UserUseCaseInterface['relateFingerprintWithUser']>[1],
  ): Promise<User> {
    const updatedUser = await this.userRepository.updateByAuthId(authId, { hashedFingerprintId });

    return updatedUser;
  }
}
