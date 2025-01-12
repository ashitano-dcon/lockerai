import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectionToken } from '#api/common/constant/injection-token';
import { BaseDataLoader } from '#api/common/service/cache/base.dataloader';
import type { LostItem } from '#api/module/lost-item/domain/lost-item.model';
import type { User } from '#api/module/user/domain/user.model';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type UserRepositoryInterface } from '#api/module/user/repository/user.repository';

@Injectable({ scope: Scope.REQUEST })
export class ReporterDataLoader extends BaseDataLoader<User['id'], User> {
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {
    super();
  }

  protected async batchLoad(reporterIds: LostItem['reporterId'][]): Promise<(User | Error)[]> {
    const reporters = await this.userRepository.findMany(reporterIds);

    const mappedReporters = reporterIds.map((reporterId) => {
      const reporter = reporters.find((r) => r.id === reporterId);

      return reporter || new Error(`Cannot find User with id ${reporterId}.`);
    });

    return mappedReporters;
  }
}
