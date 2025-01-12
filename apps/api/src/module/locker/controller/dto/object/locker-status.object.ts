import { Field, ObjectType } from '@nestjs/graphql';
import { StatusTypeEnum } from '#api/module/locker/controller/dto/enum/status-type.enum';
import { LockerStatus } from '#api/module/locker/domain/locker-status.model';

@ObjectType(LockerStatus.name)
export class LockerStatusObject implements LockerStatus {
  @Field(() => StatusTypeEnum, { nullable: false })
  type!: StatusTypeEnum;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;
}
