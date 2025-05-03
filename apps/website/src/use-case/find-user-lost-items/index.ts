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
    drawer?: {
      id: number;
      locker: {
        lat: number;
        lng: number;
        location: string;
      };
    } | null;
  } | null;
  reportedLostItems: LostItem[];
  ownedLostItems: LostItem[];
};

type FindUserLostItemsUseCase = (authId: string) => Promise<FindUserLostItemsUseCaseOutput | null>;

export const findUserLostItemsUseCase: FindUserLostItemsUseCase = async (authId) => {
  const { data, error } = await urqlClient.query<FindUserLostItemsQuery, FindUserLostItemsQueryVariables>(
    FindUserLostItemsDocument,
    {
      where: { authId },
    },
    {
      requestPolicy: 'cache-and-network',
    },
  );
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
        reportedAt: data.findUser!.reportedLostItems[0]!.reportedAt,
        ownedAt: data.findUser!.reportedLostItems[0]!.ownedAt ? data.findUser!.reportedLostItems[0]!.ownedAt : null,
        deliveredAt: data.findUser!.reportedLostItems[0]!.deliveredAt ? data.findUser!.reportedLostItems[0]!.deliveredAt : null,
        retrievedAt: data.findUser!.reportedLostItems[0]!.retrievedAt ? data.findUser!.reportedLostItems[0]!.retrievedAt : null,
      },
      reporter: {
        id: data.findUser!.reportedLostItems[0]!.reporter.id,
        name: data.findUser!.reportedLostItems[0]!.reporter.name,
        avatarUrl: data.findUser!.reportedLostItems[0]!.reporter.avatarUrl,
        isDiscloseAsOwner: data.findUser!.reportedLostItems[0]!.reporter.isDiscloseAsOwner,
      },
      owner: data.findUser!.reportedLostItems[0]!.owner
        ? {
            id: data.findUser!.reportedLostItems[0]!.owner.id,
            name: data.findUser!.reportedLostItems[0]!.owner.name,
            avatarUrl: data.findUser!.reportedLostItems[0]!.owner.avatarUrl,
            isDiscloseAsOwner: data.findUser!.reportedLostItems[0]!.owner.isDiscloseAsOwner,
          }
        : null,
    }))
    .with(UserLostAndFoundState.Retrieving, () => ({
      lostItem: {
        id: data.findUser!.ownedLostItems[0]!.id,
        title: data.findUser!.ownedLostItems[0]!.title,
        description: data.findUser!.ownedLostItems[0]!.description,
        imageUrls: data.findUser!.ownedLostItems[0]!.imageUrls,
        reportedAt: data.findUser!.ownedLostItems[0]!.reportedAt,
        ownedAt: data.findUser!.ownedLostItems[0]!.ownedAt ? data.findUser!.ownedLostItems[0]!.ownedAt : null,
        deliveredAt: data.findUser!.ownedLostItems[0]!.deliveredAt ? data.findUser!.ownedLostItems[0]!.deliveredAt : null,
        retrievedAt: data.findUser!.ownedLostItems[0]!.retrievedAt ? data.findUser!.ownedLostItems[0]!.retrievedAt : null,
      },
      reporter: {
        id: data.findUser!.ownedLostItems[0]!.reporter.id,
        name: data.findUser!.ownedLostItems[0]!.reporter.name,
        avatarUrl: data.findUser!.ownedLostItems[0]!.reporter.avatarUrl,
        isDiscloseAsOwner: data.findUser!.ownedLostItems[0]!.reporter.isDiscloseAsOwner,
      },
      owner: data.findUser!.ownedLostItems[0]!.owner
        ? {
            id: data.findUser!.ownedLostItems[0]!.owner.id,
            name: data.findUser!.ownedLostItems[0]!.owner.name,
            avatarUrl: data.findUser!.ownedLostItems[0]!.owner.avatarUrl,
            isDiscloseAsOwner: data.findUser!.ownedLostItems[0]!.owner.isDiscloseAsOwner,
          }
        : null,
      drawer: data.findUser!.ownedLostItems[0]!.drawer
        ? {
            id: data.findUser!.ownedLostItems[0]!.drawer.id,
            locker: {
              lat: data.findUser!.ownedLostItems[0]!.drawer.locker.lat,
              lng: data.findUser!.ownedLostItems[0]!.drawer.locker.lng,
              location: data.findUser!.ownedLostItems[0]!.drawer.locker.location,
            },
          }
        : null,
    }))
    .exhaustive();

  const reportedLostItems: LostItem[] = data.findUser.reportedLostItems.map((reportedLostItem) => ({
    id: reportedLostItem.id,
    title: reportedLostItem.title,
    description: reportedLostItem.description,
    imageUrls: reportedLostItem.imageUrls,
    reportedAt: reportedLostItem.reportedAt,
    ownedAt: reportedLostItem.ownedAt ? reportedLostItem.ownedAt : null,
    deliveredAt: reportedLostItem.deliveredAt ? reportedLostItem.deliveredAt : null,
    retrievedAt: reportedLostItem.retrievedAt ? reportedLostItem.retrievedAt : null,
  }));

  const ownedLostItems: LostItem[] = data.findUser.ownedLostItems.map((ownedLostItem) => ({
    id: ownedLostItem.id,
    title: ownedLostItem.title,
    description: ownedLostItem.description,
    imageUrls: ownedLostItem.imageUrls,
    reportedAt: ownedLostItem.reportedAt,
    ownedAt: ownedLostItem.ownedAt ? ownedLostItem.ownedAt : null,
    deliveredAt: ownedLostItem.deliveredAt ? ownedLostItem.deliveredAt : null,
    retrievedAt: ownedLostItem.retrievedAt ? ownedLostItem.retrievedAt : null,
  }));

  return {
    currentTargetLostItem,
    reportedLostItems,
    ownedLostItems,
  };
};
