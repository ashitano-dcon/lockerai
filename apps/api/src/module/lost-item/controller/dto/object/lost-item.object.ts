import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsUUID, IsUrl } from 'class-validator';
import { LostItem } from '#api/module/lost-item/domain/lost-item.model';

@ObjectType(LostItem.name)
export class LostItemObject implements Omit<LostItem, 'drawerId' | 'reporterId' | 'ownerId' | 'hasDelivered' | 'hasRetrieved'> {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => [String], { nullable: false })
  @IsUrl({}, { each: true })
  imageUrls!: string[];

  @Field(() => Date, { nullable: false })
  reportedAt!: Date;

  @Field(() => Date, { nullable: true })
  ownedAt!: Date | null;

  @Field(() => Date, { nullable: true })
  deliveredAt!: Date | null;

  @Field(() => Date, { nullable: true })
  retrievedAt!: Date | null;
}
