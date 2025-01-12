import { Inject, Logger, ValidationPipe } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { InjectionToken } from '#api/common/constant/injection-token';
import type { User } from '#api/module/user/domain/user.model';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type UserUseCaseInterface } from '#api/module/user/use-case/user.use-case';
import { UserWhereAuthIdInput } from './dto/input/user-where-auth-id.input';
import { UserObject } from './dto/object/user.object';

@Resolver()
export class UserQuery {
  private readonly logger = new Logger(UserQuery.name);

  constructor(
    @Inject(InjectionToken.USER_USE_CASE)
    private readonly userUseCase: UserUseCaseInterface,
  ) {}

  @Query(() => UserObject, { nullable: true })
  async findUser(
    @Args('where', { type: () => UserWhereAuthIdInput }, ValidationPipe)
    where: UserWhereAuthIdInput,
  ): Promise<User | null> {
    this.logger.log(`${this.findUser.name} called`);

    const foundUser = await this.userUseCase.findUser(where.authId);

    return foundUser;
  }
}
