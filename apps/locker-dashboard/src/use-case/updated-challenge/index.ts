import type { Locker } from '#locker-dashboard/common/model/locker';
import {
  UpdatedChallengeDocument,
  type UpdatedChallengeSubscription,
  type UpdatedChallengeSubscriptionVariables,
} from '#locker-dashboard/infra/graphql/generated/graphql';
import { urqlClient } from '#locker-dashboard/infra/urql';

type UpdatedChallengeUseCase = (lockerId: Locker['id']) => Promise<string | null>;

export const updatedChallenge: UpdatedChallengeUseCase = async (lockerId) => {
  const { data, error } = await urqlClient.subscription<UpdatedChallengeSubscription, UpdatedChallengeSubscriptionVariables>(
    UpdatedChallengeDocument,
    {
      where: {
        id: lockerId,
      },
    },
    {
      requestPolicy: 'network-only',
    },
  );
  if (!data || error) {
    throw error || new Error('Failed to subscribe locker challenge update.');
  }

  if (!data.updatedChallenge) {
    return null;
  }

  return data.updatedChallenge.hashedFingerprintId ? data.updatedChallenge.hashedFingerprintId : null;
};
