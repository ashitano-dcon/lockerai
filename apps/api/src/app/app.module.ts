import { type MiddlewareConsumer, Module } from '@nestjs/common';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { CacheModule } from '#api/common/service/cache/cache.module';
import { EnvModule } from '#api/common/service/env/env.module';
import { PubSubModule } from '#api/common/service/pubsub/pubsub.module';
import { GraphQLConfigModule } from '#api/config/graphql/graphql-config.module';
import { IdentificationNnModule } from '#api/infra/identification-nn/identification-nn.module';
import { LangchainModule } from '#api/infra/langchain/langchain.module';
import { PrismaModule } from '#api/infra/prisma/prisma.module';
import { SupabaseModule } from '#api/infra/supabase/supabase.module';
import { Modules } from '#api/module';

@Module({
  imports: [
    EnvModule,
    GraphQLConfigModule,
    PrismaModule,
    LangchainModule,
    SupabaseModule,
    IdentificationNnModule,
    CacheModule,
    PubSubModule,
    ...Modules,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }
}
