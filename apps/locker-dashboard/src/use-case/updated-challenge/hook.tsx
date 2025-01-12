import { useSubscription } from '@urql/next';
import {
  UpdatedChallengeDocument,
  type UpdatedChallengeSubscription,
  type UpdatedChallengeSubscriptionVariables,
} from '#locker-dashboard/infra/graphql/generated/graphql';

type UseUpdatedChallengeUseCase = (lockerId: string) => string | null;

export const useUseUpdatedChallengeUseCase: UseUpdatedChallengeUseCase = (lockerId) => {
  const [{ data, error }] = useSubscription<UpdatedChallengeSubscription, UpdatedChallengeSubscription, UpdatedChallengeSubscriptionVariables>({
    query: UpdatedChallengeDocument,
    variables: {
      where: {
        id: lockerId,
      },
    },
  });
  if (error) {
    throw error || new Error('Failed to report lost item.');
  }

  return data?.updatedChallenge?.hashedFingerprintId ? data.updatedChallenge.hashedFingerprintId : null;
};
