import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsUUID, IsUrl } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';
import { type I18nText } from '#api/common/type/locale';
import { LostItem } from '#api/module/lost-item/domain/lost-item.model';

@ObjectType(LostItem.name)
export class LostItemObject implements Omit<LostItem, 'drawerId' | 'reporterId' | 'ownerId' | 'hasDelivered' | 'hasRetrieved'> {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => GraphQLJSON, { description: '多言語対応されたタイトル（"en": "Title in English", "ja": "タイトル（日本語）"のような形式）' })
  titleI18n!: I18nText;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => GraphQLJSON, { description: '多言語対応された説明文（"en": "Description in English", "ja": "説明文（日本語）"のような形式）' })
  descriptionI18n!: I18nText;

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

  // これらのフィールドは内部的に使用され、GraphQL経由では公開されないが、
  // リゾルバーでreporterとownerを解決するのに必要
  reporterId!: string;

  ownerId!: string | null;
}
