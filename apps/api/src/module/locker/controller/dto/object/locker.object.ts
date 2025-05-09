import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';
import { type I18nText } from '#api/common/type/locale';
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

  @Field(() => GraphQLISODateTime, { nullable: false })
  createdAt!: Date;

  @Field(() => GraphQLJSON, { description: '多言語対応された名前（"en": "English Name", "ja": "日本語名"のような形式）' })
  nameI18n!: I18nText;

  @Field(() => GraphQLJSON, { description: '多言語対応された場所情報（"en": "Location in English", "ja": "場所（日本語）"のような形式）' })
  locationI18n!: I18nText;
}
