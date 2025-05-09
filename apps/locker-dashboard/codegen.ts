import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './graphql.schema.json',
  documents: ['src/infra/graphql/document/**/*.gql'],
  generates: {
    './src/infra/graphql/generated/graphql.ts': {
      config: {
        scalars: {
          DateTime: 'Date',
          Upload: 'File',
          JSON: 'unknown',
        },
        strictScalars: true,
        withHooks: false,
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
    },
  },
};

export default config;
