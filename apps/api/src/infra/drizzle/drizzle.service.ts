import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { InjectionToken } from '#api/common/constant/injection-token';
import { EnvService } from '#api/common/service/env/env.service';
import * as schema from './schema';

export type DrizzleClient = PostgresJsDatabase<typeof schema>;

export const drizzleProviders = [
  {
    provide: InjectionToken.DRIZZLE_CLIENT,
    inject: [EnvService],
    useFactory: async (envService: EnvService) => {
      const connectionString = envService.DatabaseUrl;

      const client = postgres(connectionString, { prepare: false });

      return drizzle({ client, schema }) as DrizzleClient;
    },
  },
];
