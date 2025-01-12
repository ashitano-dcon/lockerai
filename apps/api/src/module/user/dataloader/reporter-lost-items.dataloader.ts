import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectionToken } from '#api/common/constant/injection-token';
import { BaseDataLoader } from '#api/common/service/cache/base.dataloader';
import type { LostItem } from '#api/module/lost-item/domain/lost-item.model';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type LostItemRepositoryInterface } from '#api/module/lost-item/repository/lost-item.repository';
import type { User } from '#api/module/user/domain/user.model';

@Injectable({ scope: Scope.REQUEST })
export class ReporterLostItemsDataLoader extends BaseDataLoader<LostItem['reporterId'], LostItem[]> {
  constructor(
    @Inject(InjectionToken.LOST_ITEM_REPOSITORY)
    private readonly lostItemRepository: LostItemRepositoryInterface,
  ) {
    super();
  }

  protected async batchLoad(reporterIds: User['id'][]): Promise<(LostItem[] | Error)[]> {
    const lostItems = await this.lostItemRepository.findManyByReporterIds(reporterIds);
    if (lostItems.length === 0) {
      return reporterIds.map(() => []);
    }

    const mappedLostItemsList = reporterIds.map((reporterId) => {
      const mappedLostItems = lostItems.filter((lostItem) => lostItem.reporterId === reporterId);
      if (mappedLostItems.length === 0) {
        return new Error(`Cannot find LostItem with reporterId ${reporterId}.`);
      }

      return mappedLostItems;
    });

    return mappedLostItemsList;
  }
}
