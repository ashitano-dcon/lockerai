import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsUUID, IsUrl, MaxLength } from 'class-validator';
import { UserLostAndFoundStateEnum } from '#api/module/user/controller/dto/enum/user-lost-and-found-state.enum';
import { UserRoleEnum } from '#api/module/user/controller/dto/enum/user-role.enum';
import { User } from '#api/module/user/domain/user.model';

@ObjectType(User.name)
export class UserObject implements Omit<User, 'hashedFingerprintId' | 'isOnTheWay'> {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  id!: string;

  @Field(() => ID, { nullable: false })
  @IsUUID()
  authId!: string;

  @Field(() => String, { nullable: false })
  @MaxLength(64)
  name!: string;

  @Field(() => String, { nullable: false })
  @IsEmail()
  @MaxLength(320)
  email!: string;

  @Field(() => UserRoleEnum, { nullable: false })
  role!: UserRoleEnum;

  @Field(() => UserLostAndFoundStateEnum, { nullable: false })
  lostAndFoundState!: UserLostAndFoundStateEnum;

  @Field(() => String, { nullable: false })
  @IsUrl()
  avatarUrl!: string;

  @Field(() => Boolean, { nullable: false })
  isDiscloseAsOwner!: boolean;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;
}
