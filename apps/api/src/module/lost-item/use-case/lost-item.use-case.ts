import type { FileUpload } from 'graphql-upload/Upload.js';
import type { LostItem } from '#api/module/lost-item/domain/lost-item.model';
import type { User } from '#api/module/user/domain/user.model';

export interface LostItemUseCaseInterface {
  reportLostItem(
    lostItem: Omit<
      LostItem,
      | 'id'
      | 'title'
      | 'description'
      | 'imageUrls'
      | 'drawerId'
      | 'ownerId'
      | 'reportedAt'
      | 'ownedAt'
      | 'deliveredAt'
      | 'retrievedAt'
      | 'hasDelivered'
      | 'hasRetrieved'
    >,
    imageFiles: FileUpload[],
  ): Promise<LostItem>;
  findSimilarLostItem(userDescription: LostItem['description'], lostAt: Date): Promise<LostItem | null>;
  ownLostItemOwner(lostItemId: LostItem['id'], authId: User['authId']): Promise<LostItem>;
}
