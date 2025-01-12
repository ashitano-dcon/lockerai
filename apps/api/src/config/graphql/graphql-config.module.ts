import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginUsageReporting } from '@apollo/server/plugin/usageReporting';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { createComplexityLimitRule } from 'graphql-validation-complexity';
import { match } from 'ts-pattern';
import { EnvService } from '#api/common/service/env/env.service';

const baseConfig: ApolloDriverConfig = {
  autoSchemaFile: join(process.cwd(), './schema.gql'),
  cache: 'bounded',
  context: undefined,
  introspection: true,
  path: '/graphql',
  playground: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  sortSchema: true,
  subscriptions: {
    'graphql-ws': true,
  },
  validationRules: [createComplexityLimitRule(5000)],
};

const createDevelopmentConfig = (): ApolloDriverConfig => baseConfig;

const createProductionConfig = (envService: EnvService): ApolloDriverConfig => ({
  ...baseConfig,
  apollo: envService.ApolloStudioConfig,
  plugins: baseConfig.plugins && [
    ...baseConfig.plugins,
    ApolloServerPluginUsageReporting({
      sendVariableValues: {
        all: true,
      },
      sendUnexecutableOperationDocuments: true,
    }),
  ],
});

const createTestConfig = (): ApolloDriverConfig => baseConfig;

const gqlFactory = (envService: EnvService): ApolloDriverConfig =>
  match(envService.NodeEnv)
    .with('development', () => createDevelopmentConfig())
    .with('production', () => createProductionConfig(envService))
    .with('test', () => createTestConfig())
    .otherwise(() => createDevelopmentConfig());

export const GraphQLConfigModule = GraphQLModule.forRootAsync<ApolloDriverConfig>({
  driver: ApolloDriver,
  useFactory: gqlFactory,
  inject: [EnvService],
});
