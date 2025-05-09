import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';
import { type Locale } from '#api/common/type/locale';
import { type LostItem } from '#api/module/lost-item/domain/lost-item.model';

type PartialI18nRecord = Record<Locale, string | null> | undefined;

@InputType()
export class LostItemCreateInput implements Pick<Partial<LostItem>, 'reporterId' | 'titleI18n' | 'descriptionI18n'> {
  @Field(() => String, { nullable: false })
  @IsUUID()
  reporterId!: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
    description: '多言語対応されたタイトル（"en": "Title in English", "ja": "タイトル（日本語）"のような形式）',
  })
  @IsOptional()
  titleI18n?: PartialI18nRecord;

  @Field(() => GraphQLJSON, {
    nullable: true,
    description: '多言語対応された説明文（"en": "Description in English", "ja": "説明文（日本語）"のような形式）',
  })
  @IsOptional()
  descriptionI18n?: PartialI18nRecord;
}
