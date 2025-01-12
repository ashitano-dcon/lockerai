import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectionToken } from '#api/common/constant/injection-token';
import { BaseDataLoader } from '#api/common/service/cache/base.dataloader';
import type { LostItem } from '#api/module/lost-item/domain/lost-item.model';
import type { User } from '#api/module/user/domain/user.model';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type UserRepositoryInterface } from '#api/module/user/repository/user.repository';

@Injectable({ scope: Scope.REQUEST })
export class OwnerDataLoader extends BaseDataLoader<User['id'], User> {
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {
    super();
  }

  protected async batchLoad(ownerIds: NonNullable<LostItem['ownerId']>[]): Promise<(User | Error)[]> {
    const owners = await this.userRepository.findMany(ownerIds);

    const mappedOwners = ownerIds.map((ownerId) => {
      const owner = owners.find((r) => r.id === ownerId);

      return owner || new Error(`Cannot find User with id ${ownerId}.`);
    });

    return mappedOwners;
  }
}
