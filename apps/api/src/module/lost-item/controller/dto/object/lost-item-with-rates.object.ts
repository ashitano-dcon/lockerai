import { Field, ObjectType } from '@nestjs/graphql';
import { LostItemObject } from './lost-item.object';

@ObjectType('LostItemWithRates')
export class LostItemWithRatesObject extends LostItemObject {
  @Field(() => Number, { nullable: false })
  approveRate!: number;

  @Field(() => Number, { nullable: false })
  rejectRate!: number;
}
