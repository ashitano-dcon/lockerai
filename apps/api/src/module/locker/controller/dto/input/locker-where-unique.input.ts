import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import type { Locker } from '#api/module/locker/domain/locker.model';

@InputType()
export class LockerWhereUniqueInput implements Record<'id', Locker['id']> {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  id!: string;
}
