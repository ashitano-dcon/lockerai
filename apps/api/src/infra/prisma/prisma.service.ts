import { Inject, Injectable, Logger, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { match } from 'ts-pattern';
import { EnvService } from '#api/common/service/env/env.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  readonly prisma = Prisma;

  private readonly logger = new Logger(PrismaService.name);

  constructor(@Inject(EnvService) envService: EnvService) {
    const log = match<(typeof envService)['NodeEnv'], Prisma.LogLevel[]>(envService.NodeEnv)
      .with('development', () => ['query', 'info', 'warn', 'error'])
      .with('production', () => ['query', 'info', 'warn', 'error'])
      .with('test', () => ['info', 'warn', 'error'])
      .otherwise(() => ['query', 'info', 'warn', 'error']);

    super({ log });

    this.logger.debug(`${PrismaService.name} constructed`);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
