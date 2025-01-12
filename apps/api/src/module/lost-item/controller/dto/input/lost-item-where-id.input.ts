import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import type { LostItem } from '#api/module/lost-item/domain/lost-item.model';

@InputType()
export class LostItemWhereIdInput implements Record<'id', LostItem['id']> {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  id!: string;
}
