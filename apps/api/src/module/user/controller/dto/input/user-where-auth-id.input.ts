import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import type { User } from '#api/module/user/domain/user.model';

@InputType()
export class UserWhereAuthIdInput implements Record<'authId', User['authId']> {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  authId!: string;
}
