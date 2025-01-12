import { useSubscription } from '@urql/next';
import type { LockerStatus } from '#locker-dashboard/common/model/locker';
import {
  UpdatedLockerStatusDocument,
  type UpdatedLockerStatusSubscription,
  type UpdatedLockerStatusSubscriptionVariables,
} from '#locker-dashboard/infra/graphql/generated/graphql';

type UseUpdatedLockerStatusUseCase = (lockerId: string) => LockerStatus | undefined;

export const useUseUpdatedLockerStatusUseCase: UseUpdatedLockerStatusUseCase = (lockerId) => {
  const [{ data, error }] = useSubscription<
    UpdatedLockerStatusSubscription,
    UpdatedLockerStatusSubscription,
    UpdatedLockerStatusSubscriptionVariables
  >({
    query: UpdatedLockerStatusDocument,
    variables: {
      where: {
        id: lockerId,
      },
    },
  });
  if (error) {
    throw error || new Error('Failed to report lost item.');
  }

  return (
    data && {
      type: data.updatedLockerStatus.type,
      name: data.updatedLockerStatus.name,
      description: data.updatedLockerStatus.description,
    }
  );
};
