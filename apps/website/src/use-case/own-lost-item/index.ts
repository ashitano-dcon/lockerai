'use server';

import type { LostItem } from '#website/common/model/lost-item';
import type { User } from '#website/common/model/user';
import { i18nTextSchema } from '#website/i18n/locales';
import { OwnLostItemDocument, type OwnLostItemMutation, type OwnLostItemMutationVariables } from '#website/infra/graphql/generated/graphql';
import { urqlClient } from '#website/infra/urql';

type OwnLostItemUseCase = (lostItemId: LostItem['id'], authId: User['id']) => Promise<LostItem>;

export const ownLostItemUseCase: OwnLostItemUseCase = async (lostItemId, authId) => {
  const { data, error } = await urqlClient.mutation<OwnLostItemMutation, OwnLostItemMutationVariables>(OwnLostItemDocument, {
    lostItem: {
      id: lostItemId,
    },
    user: {
      authId,
    },
  });
  if (!data || error) {
    throw error || new Error('Failed to own lost item.');
  }

  return {
    id: data.ownLostItem.id,
    title: data.ownLostItem.title,
    titleI18n: i18nTextSchema.parse(data.ownLostItem.titleI18n),
    description: data.ownLostItem.description,
    descriptionI18n: i18nTextSchema.parse(data.ownLostItem.descriptionI18n),
    imageUrls: data.ownLostItem.imageUrls,
    reportedAt: data.ownLostItem.reportedAt,
    ownedAt: data.ownLostItem.ownedAt ?? null,
    deliveredAt: data.ownLostItem.deliveredAt ?? null,
    retrievedAt: data.ownLostItem.retrievedAt ?? null,
  };
};
