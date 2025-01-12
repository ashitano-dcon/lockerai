import { Inject, Logger, UseGuards, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectionToken } from '#api/common/constant/injection-token';
import { AuthGuard } from '#api/common/guard/auth.guard';
import type { User } from '#api/module/user/domain/user.model';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type UserUseCaseInterface } from '#api/module/user/use-case/user.use-case';
import { UserCreateInput } from './dto/input/user-create.input';
import { UserWhereAuthIdInput } from './dto/input/user-where-auth-id.input';
import { UserObject } from './dto/object/user.object';

@Resolver()
@UseGuards(AuthGuard)
export class UserMutation {
  private readonly logger = new Logger(UserMutation.name);

  constructor(
    @Inject(InjectionToken.USER_USE_CASE)
    private readonly userUseCase: UserUseCaseInterface,
  ) {}

  @Mutation(() => UserObject)
  async createUser(
    @Args('user', { type: () => UserCreateInput }, ValidationPipe)
    user: UserCreateInput,
  ): Promise<User> {
    this.logger.log(`${this.createUser.name} called`);

    const createdUser = await this.userUseCase.createUser(user);

    return createdUser;
  }

  @Mutation(() => UserObject)
  async updateUserDisclosure(
    @Args('where', { type: () => UserWhereAuthIdInput }, ValidationPipe)
    where: UserWhereAuthIdInput,
    @Args('isDiscloseAsOwner', { type: () => Boolean }, ValidationPipe)
    isDiscloseAsOwner: boolean,
  ): Promise<User> {
    this.logger.log(`${this.updateUserDisclosure.name} called`);

    const updatedUser = await this.userUseCase.updateUserDisclosure(where.authId, isDiscloseAsOwner);

    return updatedUser;
  }

  @Mutation(() => UserObject)
  async relateFingerprintWithUser(
    @Args('where', { type: () => UserWhereAuthIdInput }, ValidationPipe)
    where: UserWhereAuthIdInput,
    @Args('hashedFingerprintId', { type: () => String }, ValidationPipe)
    hashedFingerprintId: string,
  ): Promise<User> {
    this.logger.log(`${this.relateFingerprintWithUser.name} called`);

    const updatedUser = await this.userUseCase.relateFingerprintWithUser(where.authId, hashedFingerprintId);

    return updatedUser;
  }
}
