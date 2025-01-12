import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env['NEXT_PUBLIC_GRAPHQL_ENDPOINT'] || 'http://localhost:4000/graphql',
  documents: ['src/infra/graphql/document/**/*.gql'],
  generates: {
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
