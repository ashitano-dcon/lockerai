import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { Locker } from '#api/module/locker/domain/locker.model';

@ObjectType(Locker.name)
export class LockerObject implements Locker {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  id!: string;

  @Field(() => String, { nullable: false })
  @MaxLength(32)
  name!: string;

  @Field(() => Number, { nullable: false })
  lat!: number;

  @Field(() => Number, { nullable: false })
  lng!: number;

  @Field(() => String, { nullable: false })
  location!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;
}
