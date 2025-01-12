import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import type { LostItem } from '#api/module/lost-item/domain/lost-item.model';

@InputType()
export class LostItemCreateInput
  implements
    Omit<
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
    >
{
  @Field(() => String, { nullable: false })
  @IsUUID()
  reporterId!: string;
}
