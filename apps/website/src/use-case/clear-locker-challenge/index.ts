import type { Locker } from '#website/common/model/locker';
import {
  ClearLockerChallengeDocument,
  type ClearLockerChallengeMutation,
  type ClearLockerChallengeMutationVariables,
} from '#website/infra/graphql/generated/graphql';
import { urqlClient } from '#website/infra/urql';

type ClearLockerChallengeUseCase = (lockerId: Locker['id']) => Promise<void>;

export const clearLockerChallengeUseCase: ClearLockerChallengeUseCase = async (lockerId) => {
  const { data, error } = await urqlClient.mutation<ClearLockerChallengeMutation, ClearLockerChallengeMutationVariables>(
    ClearLockerChallengeDocument,
    {
      where: {
        id: lockerId,
      },
    },
  );
  if (!data || error) {
    throw error || new Error('Failed to relate fingerprint with user.');
  }
};
