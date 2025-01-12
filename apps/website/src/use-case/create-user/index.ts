import type { User } from '#website/common/model/user';
import { CreateUserDocument, type CreateUserMutation, type CreateUserMutationVariables } from '#website/infra/graphql/generated/graphql';
import { urqlClient } from '#website/infra/urql';

type CreateUserUseCaseInput = Omit<User, 'id' | 'lostAndFoundState' | 'isDiscloseAsOwner' | 'createdAt'>;

type CreateUserUseCase = (user: CreateUserUseCaseInput) => Promise<User>;

export const createUserUseCase: CreateUserUseCase = async ({ authId, name, email, avatarUrl }) => {
  const { data, error } = await urqlClient.mutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, {
    user: {
      authId,
      name,
      email,
      avatarUrl,
    },
  });
  if (!data || error) {
    throw error || new Error('Failed to create user.');
  }

  return {
    id: data.createUser.id,
    authId: data.createUser.authId,
    name: data.createUser.name,
    email: data.createUser.email,
    lostAndFoundState: data.createUser.lostAndFoundState,
    avatarUrl: data.createUser.avatarUrl,
    isDiscloseAsOwner: data.createUser.isDiscloseAsOwner,
    createdAt: data.createUser.createdAt,
  };
};
