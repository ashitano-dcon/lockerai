'use server';

import type { LostItem } from '#website/common/model/lost-item';
import type { UserPublicMeta } from '#website/common/model/user';
import {
  FindSimilarLostItemDocument,
  type FindSimilarLostItemQuery,
  type FindSimilarLostItemQueryVariables,
} from '#website/infra/graphql/generated/graphql';
import { urqlClient } from '#website/infra/urql';

type FindSimilarLostItemUseCaseOutput = {
  lostItem: LostItem;
  reporter: UserPublicMeta;
};

type FindSimilarLostItemUseCase = (description: string, lostAt: Date) => Promise<FindSimilarLostItemUseCaseOutput | null>;

export const findSimilarLostItemUseCase: FindSimilarLostItemUseCase = async (description, lostAt) => {
  const { data, error } = await urqlClient.query<FindSimilarLostItemQuery, FindSimilarLostItemQueryVariables>(
    FindSimilarLostItemDocument,
    {
      userDescription: description,
      lostAt,
    },
    {
      requestPolicy: 'network-only',
    },
  );
  if (!data || error) {
    throw error || new Error('Failed to find similar lost item.');
  }

  if (!data.findSimilarLostItem) {
    return null;
  }

  const lostItem: LostItem = {
    id: data.findSimilarLostItem.id,
    title: data.findSimilarLostItem.title,
    description: data.findSimilarLostItem.description,
    imageUrls: data.findSimilarLostItem.imageUrls,
    reportedAt: data.findSimilarLostItem.reportedAt,
    deliveredAt: data.findSimilarLostItem.deliveredAt ? data.findSimilarLostItem.deliveredAt : null,
    ownedAt: data.findSimilarLostItem.ownedAt ? data.findSimilarLostItem.ownedAt : null,
    retrievedAt: data.findSimilarLostItem.retrievedAt ? data.findSimilarLostItem.retrievedAt : null,
  };

  const reporter: UserPublicMeta = {
    id: data.findSimilarLostItem.reporter.id,
    name: data.findSimilarLostItem.reporter.name,
    avatarUrl: data.findSimilarLostItem.reporter.avatarUrl,
    isDiscloseAsOwner: data.findSimilarLostItem.reporter.isDiscloseAsOwner,
  };

  return {
    lostItem,
    reporter,
  };
};
