import {
  VerifyUserExistenceDocument,
  type VerifyUserExistenceQuery,
  type VerifyUserExistenceQueryVariables,
} from '#website/infra/graphql/generated/graphql';
import { urqlClient } from '#website/infra/urql';

type VerifyUserExistenceUseCaseOutput = {
  isExist: boolean;
};

type VerifyUserExistenceUseCase = (authId: string) => Promise<VerifyUserExistenceUseCaseOutput>;

export const verifyUserExistenceUseCase: VerifyUserExistenceUseCase = async (authId) => {
  const { data, error } = await urqlClient.query<VerifyUserExistenceQuery, VerifyUserExistenceQueryVariables>(
    VerifyUserExistenceDocument,
    {
      where: { authId },
    },
    {
      requestPolicy: 'network-only',
    },
  );
  if (error) {
    throw error;
  }

  return {
    isExist: !!data?.findUser?.id,
  };
};
