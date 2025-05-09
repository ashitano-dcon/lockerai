import type { LostItem } from '#website/common/model/lost-item';
import type { User } from '#website/common/model/user';
import { i18nTextSchema } from '#website/i18n/locales';
import { ReportLostItemDocument, type ReportLostItemMutation, type ReportLostItemMutationVariables } from '#website/infra/graphql/generated/graphql';
import { urqlClient } from '#website/infra/urql';

type ReportLostItemUseCase = (imageFiles: File[], reporterId: User['id']) => Promise<LostItem>;

export const reportLostItemUseCase: ReportLostItemUseCase = async (imageFiles, reporterId) => {
  const { data, error } = await urqlClient.mutation<ReportLostItemMutation, ReportLostItemMutationVariables>(ReportLostItemDocument, {
    imageFiles,
    lostItem: {
      reporterId,
    },
  });
  if (!data || error) {
    throw error || new Error('Failed to report lost item.');
  }

  return {
    id: data.reportLostItem.id,
    title: data.reportLostItem.title,
    titleI18n: i18nTextSchema.parse(data.reportLostItem.titleI18n),
    description: data.reportLostItem.description,
    descriptionI18n: i18nTextSchema.parse(data.reportLostItem.descriptionI18n),
    imageUrls: data.reportLostItem.imageUrls,
    reportedAt: data.reportLostItem.reportedAt,
    ownedAt: data.reportLostItem.ownedAt ?? null,
    deliveredAt: data.reportLostItem.deliveredAt ?? null,
    retrievedAt: data.reportLostItem.retrievedAt ?? null,
  };
};
