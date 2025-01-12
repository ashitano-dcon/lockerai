import type { User } from '#website/common/model/user';
import { FindUserDocument, type FindUserQuery, type FindUserQueryVariables } from '#website/infra/graphql/generated/graphql';
import { urqlClient } from '#website/infra/urql';

type FindUserUseCase = (authId: string) => Promise<User | null>;

export const findUserUseCase: FindUserUseCase = async (authId) => {
  const { data, error } = await urqlClient.query<FindUserQuery, FindUserQueryVariables>(
    FindUserDocument,
    {
      where: { authId },
    },
    {
      requestPolicy: 'cache-and-network',
    },
  );
  if (!data || error) {
    throw error || new Error('Failed to find user.');
  }

  if (!data.findUser) {
    return null;
  }

  return {
    id: data.findUser.id,
    authId: data.findUser.authId,
    name: data.findUser.name,
    email: data.findUser.email,
    lostAndFoundState: data.findUser.lostAndFoundState,
    avatarUrl: data.findUser.avatarUrl,
    isDiscloseAsOwner: data.findUser.isDiscloseAsOwner,
    createdAt: data.findUser.createdAt,
  };
};
