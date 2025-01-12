import { Module, forwardRef } from '@nestjs/common';
import { InjectionToken } from '#api/common/constant/injection-token';
import { DrawerModule } from '#api/module/drawer/drawer.module';
import { LockerMutation } from './controller/locker-mutation.resolver';
import { LockerSubscription } from './controller/locker-subscription.resolver';
import { LockerController } from './controller/locker.controller';
import { LockerResolver } from './controller/locker.resolver';
import { LockerDrawersDataLoader } from './dataloader/locker-drawers.dataloader';
import { LockerDataLoader } from './dataloader/locker.dataloader';
import { LockerRepository } from './repository/impl/locker.repository';
import { LockerPublishUseCase } from './use-case/impl/locker-publish.use-case';

@Module({
  imports: [forwardRef(() => DrawerModule)],
  controllers: [LockerController],
  providers: [
    LockerDataLoader,
    LockerDrawersDataLoader,
    { provide: InjectionToken.LOCKER_REPOSITORY, useClass: LockerRepository },
    { provide: InjectionToken.LOCKER_PUBLISH_USE_CASE, useClass: LockerPublishUseCase },
    LockerMutation,
    LockerSubscription,
    LockerResolver,
  ],
  exports: [LockerDataLoader, LockerDrawersDataLoader, { provide: InjectionToken.LOCKER_REPOSITORY, useClass: LockerRepository }],
})
export class LockerModule {}
