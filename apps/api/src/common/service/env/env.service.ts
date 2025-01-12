import type { ApolloConfigInput } from '@apollo/server';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  private readonly logger = new Logger(EnvService.name);

  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
    this.logger.debug(`${EnvService.name} constructed`);
    this.logger.log(`NODE_ENV: ${this.NodeEnv}`);
  }

  get ApolloStudioConfig(): ApolloConfigInput {
    const apolloConfigInput: ApolloConfigInput = {
      key: this.configService.getOrThrow('APOLLO_KEY'),
      graphRef: this.configService.getOrThrow('APOLLO_GRAPH_REF'),
    };

    return apolloConfigInput;
  }

  get DatabaseSslCert(): string {
    const databaseSslCert = this.configService.getOrThrow<string>('DATABASE_SSL_CERT');

    return databaseSslCert;
  }

  get DatabaseUrl(): string {
    const databaseUrl = this.configService.getOrThrow<string>('DATABASE_URL');

    return databaseUrl;
  }

  get HuggingfacehubApiToken(): string {
    const huggingfacehubApiToken = this.configService.getOrThrow<string>('HUGGINGFACEHUB_API_TOKEN');

    return huggingfacehubApiToken;
  }

  get IdentificationNnEndpoint(): string {
    const identificationNnEndpoint = this.configService.getOrThrow<string>('IDENTIFICATION_NN_ENDPOINT');

    return identificationNnEndpoint;
  }

  get NodeEnv(): 'development' | 'production' | 'test' {
    const nodeEnv = this.configService.get<'development' | 'production' | 'test'>('NODE_ENV', 'development');

    return nodeEnv;
  }

  get OpenaiApiKey(): string {
    const openaiApiKey = this.configService.getOrThrow<string>('OPENAI_API_KEY');

    return openaiApiKey;
  }

  get Port(): number {
    const port = this.configService.get<number>('PORT', 4000);

    return port;
  }

  get SupabaseServiceRoleKey(): string {
    const supabaseServiceRoleKey = this.configService.getOrThrow<string>('SUPABASE_SERVICE_ROLE_KEY');

    return supabaseServiceRoleKey;
  }

  get SupabaseUrl(): string {
    const supabaseUrl = this.configService.getOrThrow<string>('SUPABASE_URL');

    return supabaseUrl;
  }
}
