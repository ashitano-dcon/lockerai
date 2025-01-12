'use server';

import type { User } from '#website/common/model/user';
import {
  UpdateUserDisclosureDocument,
  type UpdateUserDisclosureMutation,
  type UpdateUserDisclosureMutationVariables,
} from '#website/infra/graphql/generated/graphql';
import { urqlClient } from '#website/infra/urql';

type UpdateUserDisclosureUseCase = (authId: User['authId'], isDiscloseAsOwner: boolean) => Promise<User>;

export const updateUserDisclosureUseCase: UpdateUserDisclosureUseCase = async (authId, isDiscloseAsOwner) => {
  const { data, error } = await urqlClient.mutation<UpdateUserDisclosureMutation, UpdateUserDisclosureMutationVariables>(
    UpdateUserDisclosureDocument,
    {
      where: {
        authId,
      },
      isDiscloseAsOwner,
    },
  );
  if (!data || error) {
    throw error || new Error('Failed to update user disclosure.');
  }

  return {
    id: data.updateUserDisclosure.id,
    authId: data.updateUserDisclosure.authId,
    name: data.updateUserDisclosure.name,
    email: data.updateUserDisclosure.email,
    lostAndFoundState: data.updateUserDisclosure.lostAndFoundState,
    avatarUrl: data.updateUserDisclosure.avatarUrl,
    isDiscloseAsOwner: data.updateUserDisclosure.isDiscloseAsOwner,
    createdAt: data.updateUserDisclosure.createdAt,
  };
};
