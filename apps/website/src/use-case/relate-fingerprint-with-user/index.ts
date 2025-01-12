import type { User } from '#website/common/model/user';
import {
  RelateFingerprintWithUserDocument,
  type RelateFingerprintWithUserMutation,
  type RelateFingerprintWithUserMutationVariables,
} from '#website/infra/graphql/generated/graphql';
import { urqlClient } from '#website/infra/urql';

type RelateFingerprintWithUserUseCase = (authId: User['authId'], hashedFingerprintId: string) => Promise<User>;

export const relateFingerprintWithUserUseCase: RelateFingerprintWithUserUseCase = async (authId, hashedFingerprintId) => {
  const { data, error } = await urqlClient.mutation<RelateFingerprintWithUserMutation, RelateFingerprintWithUserMutationVariables>(
    RelateFingerprintWithUserDocument,
    {
      where: {
        authId,
      },
      hashedFingerprintId,
    },
  );
  if (!data || error) {
    throw error || new Error('Failed to relate fingerprint with user.');
  }

  return {
    id: data.relateFingerprintWithUser.id,
    authId: data.relateFingerprintWithUser.authId,
    name: data.relateFingerprintWithUser.name,
    email: data.relateFingerprintWithUser.email,
    lostAndFoundState: data.relateFingerprintWithUser.lostAndFoundState,
    avatarUrl: data.relateFingerprintWithUser.avatarUrl,
    isDiscloseAsOwner: data.relateFingerprintWithUser.isDiscloseAsOwner,
    createdAt: data.relateFingerprintWithUser.createdAt,
  };
};
