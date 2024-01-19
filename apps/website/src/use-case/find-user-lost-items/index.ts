import { match } from 'ts-pattern';
import type { LostItem } from '#website/common/model/lost-item';
import type { UserPublicMeta } from '#website/common/model/user';
import {
  FindUserLostItemsDocument,
  type FindUserLostItemsQuery,
  type FindUserLostItemsQueryVariables,
  UserLostAndFoundState,
} from '#website/infra/graphql/generated/graphql';
import { urqlClient } from '#website/infra/urql';

type FindUserLostItemsUseCaseOutput = {
  currentTargetLostItem: {
    lostItem: LostItem;
    reporter: UserPublicMeta;
    owner: UserPublicMeta | null;
  } | null;
  reportedLostItems: LostItem[];
  ownedLostItems: LostItem[];
};

type FindUserLostItemsUseCase = (authId: string) => Promise<FindUserLostItemsUseCaseOutput | null>;

export const findUserLostItemsUseCase: FindUserLostItemsUseCase = async (authId) => {
  const { data, error } = await urqlClient.query<FindUserLostItemsQuery, FindUserLostItemsQueryVariables>(FindUserLostItemsDocument, {
    where: { authId },
  });
  if (!data || error) {
    throw error || new Error('Failed to find user');
  }

  if (!data.findUser) {
    return null;
  }

  const currentTargetLostItem = match(data.findUser.lostAndFoundState)
    .with(UserLostAndFoundState.None, () => null)
    .with(UserLostAndFoundState.Delivering, () => ({
      lostItem: {
        id: data.findUser!.reportedLostItems[0]!.id,
        title: data.findUser!.reportedLostItems[0]!.title,
        description: data.findUser!.reportedLostItems[0]!.description,
        imageUrls: data.findUser!.reportedLostItems[0]!.imageUrls,
        reportedAt: new Date(data.findUser!.reportedLostItems[0]!.reportedAt),
        ownedAt: data.findUser!.reportedLostItems[0]!.ownedAt ? new Date(data.findUser!.reportedLostItems[0]!.ownedAt) : null,
        deliveredAt: data.findUser!.reportedLostItems[0]!.deliveredAt ? new Date(data.findUser!.reportedLostItems[0]!.deliveredAt) : null,
        retrievedAt: data.findUser!.reportedLostItems[0]!.retrievedAt ? new Date(data.findUser!.reportedLostItems[0]!.retrievedAt) : null,
      },
      reporter: {
        id: data.findUser!.reportedLostItems[0]!.reporter.id,
        name: data.findUser!.reportedLostItems[0]!.reporter.name,
        avatarUrl: data.findUser!.reportedLostItems[0]!.reporter.avatarUrl,
      },
      owner: data.findUser!.reportedLostItems[0]!.owner
        ? {
            id: data.findUser!.reportedLostItems[0]!.owner.id,
            name: data.findUser!.reportedLostItems[0]!.owner.name,
            avatarUrl: data.findUser!.reportedLostItems[0]!.owner.avatarUrl,
          }
        : null,
    }))
    .with(UserLostAndFoundState.Retrieving, () => ({
      lostItem: {
        id: data.findUser!.ownedLostItems[0]!.id,
        title: data.findUser!.ownedLostItems[0]!.title,
        description: data.findUser!.ownedLostItems[0]!.description,
        imageUrls: data.findUser!.ownedLostItems[0]!.imageUrls,
        reportedAt: new Date(data.findUser!.ownedLostItems[0]!.reportedAt),
        ownedAt: data.findUser!.ownedLostItems[0]!.ownedAt ? new Date(data.findUser!.ownedLostItems[0]!.ownedAt) : null,
        deliveredAt: data.findUser!.ownedLostItems[0]!.deliveredAt ? new Date(data.findUser!.ownedLostItems[0]!.deliveredAt) : null,
        retrievedAt: data.findUser!.ownedLostItems[0]!.retrievedAt ? new Date(data.findUser!.ownedLostItems[0]!.retrievedAt) : null,
      },
      reporter: {
        id: data.findUser!.ownedLostItems[0]!.reporter.id,
        name: data.findUser!.ownedLostItems[0]!.reporter.name,
        avatarUrl: data.findUser!.ownedLostItems[0]!.reporter.avatarUrl,
      },
      owner: data.findUser!.ownedLostItems[0]!.owner
        ? {
            id: data.findUser!.ownedLostItems[0]!.owner.id,
            name: data.findUser!.ownedLostItems[0]!.owner.name,
            avatarUrl: data.findUser!.ownedLostItems[0]!.owner.avatarUrl,
          }
        : null,
    }))
    .exhaustive();

  const reportedLostItems: LostItem[] = data.findUser.reportedLostItems.map((reportedLostItem) => ({
    id: reportedLostItem.id,
    title: reportedLostItem.title,
    description: reportedLostItem.description,
    imageUrls: reportedLostItem.imageUrls,
    reportedAt: new Date(reportedLostItem.reportedAt),
    ownedAt: reportedLostItem.ownedAt ? new Date(reportedLostItem.ownedAt) : null,
    deliveredAt: reportedLostItem.deliveredAt ? new Date(reportedLostItem.deliveredAt) : null,
    retrievedAt: reportedLostItem.retrievedAt ? new Date(reportedLostItem.retrievedAt) : null,
  }));

  const ownedLostItems: LostItem[] = data.findUser.ownedLostItems.map((ownedLostItem) => ({
    id: ownedLostItem.id,
    title: ownedLostItem.title,
    description: ownedLostItem.description,
    imageUrls: ownedLostItem.imageUrls,
    reportedAt: new Date(ownedLostItem.reportedAt),
    ownedAt: ownedLostItem.ownedAt ? new Date(ownedLostItem.ownedAt) : null,
    deliveredAt: ownedLostItem.deliveredAt ? new Date(ownedLostItem.deliveredAt) : null,
    retrievedAt: ownedLostItem.retrievedAt ? new Date(ownedLostItem.retrievedAt) : null,
  }));

  return {
    currentTargetLostItem,
    reportedLostItems,
    ownedLostItems,
  };
};
