import { Transform, plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsUrl, validateSync } from 'class-validator';

export class EnvValidator {
  APOLLO_GRAPH_REF!: string;

  APOLLO_KEY!: string;

  DATABASE_SSL_CERT!: string;

  @IsUrl({ protocols: ['postgres', 'postgresql'], require_tld: process.env['NODE_ENV'] === 'production' })
  DATABASE_URL!: string;

  HUGGINGFACEHUB_API_TOKEN!: string;

  @IsUrl({ protocols: ['http', 'https'], require_tld: process.env['NODE_ENV'] === 'production' })
  IDENTIFICATION_NN_ENDPOINT!: string;

  @IsEnum(['development', 'production', 'test'])
  NODE_ENV!: 'development' | 'production' | 'test';

  OPENAI_API_KEY!: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  PORT = 4000;

  SUPABASE_SERVICE_ROLE_KEY!: string;

  @IsUrl({ protocols: ['http', 'https'], require_tld: process.env['NODE_ENV'] === 'production' })
  SUPABASE_URL!: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(EnvValidator, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
