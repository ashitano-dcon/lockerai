import { Inject, Logger, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectionToken } from '#api/common/constant/injection-token';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type LockerPublishUseCaseInterface } from '#api/module/locker/use-case/locker-publish.use-case';
import { LockerWhereUniqueInput } from './dto/input/locker-where-unique.input';

@Resolver()
export class LockerMutation {
  private readonly logger = new Logger(LockerMutation.name);

  constructor(
    @Inject(InjectionToken.LOCKER_PUBLISH_USE_CASE)
    private readonly lockerPublishUseCase: LockerPublishUseCaseInterface,
  ) {}

  @Mutation(() => Boolean)
  async clearLockerChallenge(
    @Args('where', { type: () => LockerWhereUniqueInput }, ValidationPipe)
    where: LockerWhereUniqueInput,
  ): Promise<boolean> {
    this.logger.log(`${this.clearLockerChallenge.name} called`);

    await this.lockerPublishUseCase.publishUpdatedChallenge(where.id, () => ({
      updatedChallenge: {
        hashedFingerprintId: null,
      },
    }));

    return true;
  }
}
