import { Module } from '@nestjs/common';
import { InjectionToken } from '#api/common/constant/injection-token';
import { EnvModule } from '#api/common/service/env/env.module';
import { drizzleProviders } from './drizzle.service';

@Module({
  imports: [EnvModule],
  providers: [...drizzleProviders],
  exports: [InjectionToken.DRIZZLE_CLIENT],
})
export class DrizzleModule {}
