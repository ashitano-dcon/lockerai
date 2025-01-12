import type { LostItem } from '#api/module/lost-item/domain/lost-item.model';
import type { User } from '#api/module/user/domain/user.model';

export interface LostItemRepositoryInterface {
  find(lostItemId: LostItem['id']): Promise<LostItem | null>;
  findByDrawerId(drawerId: NonNullable<LostItem['drawerId']>): Promise<LostItem | null>;
  findByReporterId(id: NonNullable<User['id']>): Promise<LostItem | null>;
  findByOwnerId(id: NonNullable<User['id']>): Promise<LostItem | null>;
  findMany(lostItemIds: LostItem['id'][]): Promise<LostItem[]>;
  findManyByReporterIds(reporterIds: LostItem['reporterId'][]): Promise<LostItem[]>;
  findManyByOwnerIds(ownerIds: NonNullable<LostItem['ownerId']>[]): Promise<LostItem[]>;
  findSimilar(embeddedDescription: number[]): Promise<[LostItem, number][]>;
  create(lostItem: Omit<LostItem, 'reportedAt' | 'hasDelivered' | 'hasRetrieved'>, embeddedDescription: number[]): Promise<LostItem>;
  update(
    lostItemId: LostItem['id'],
    lostItem: Partial<
      Omit<LostItem, 'id' | 'title' | 'description' | 'imageUrls' | 'drawerId' | 'reporterId' | 'reportedAt' | 'hasDelivered' | 'hasRetrieved'>
    >,
  ): Promise<LostItem>;
}
