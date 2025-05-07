import { Module, forwardRef } from '@nestjs/common';
import { InjectionToken } from '#api/common/constant/injection-token';
import { drizzleProviders } from '#api/infra/drizzle';
import { LockerModule } from '#api/module/locker/locker.module';
import { LostItemModule } from '#api/module/lost-item/lost-item.module';
import { UserModule } from '#api/module/user/user.module';
import { DrawerController } from './controller/drawer.controller';
import { DrawerResolver } from './controller/drawer.resolver';
import { DrawerRepository } from './repository/impl/drawer.repository';
import { DrawerUseCase } from './use-case/impl/drawer.use-case';

@Module({
  imports: [forwardRef(() => LockerModule), forwardRef(() => LostItemModule), forwardRef(() => UserModule)],
  controllers: [DrawerController],
  providers: [
    ...drizzleProviders,
    { provide: InjectionToken.DRAWER_REPOSITORY, useClass: DrawerRepository },
    { provide: InjectionToken.DRAWER_USE_CASE, useClass: DrawerUseCase },
    DrawerResolver,
  ],
  exports: [{ provide: InjectionToken.DRAWER_REPOSITORY, useClass: DrawerRepository }],
})
export class DrawerModule {}
