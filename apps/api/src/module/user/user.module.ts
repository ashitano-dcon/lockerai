import { Module, forwardRef } from '@nestjs/common';
import { InjectionToken } from '#api/common/constant/injection-token';
import { drizzleProviders } from '#api/infra/drizzle';
import { LostItemModule } from '#api/module/lost-item/lost-item.module';
import { UserMutation } from './controller/user-mutation.resolver';
import { UserQuery } from './controller/user-query.resolver';
import { UserController } from './controller/user.controller';
import { UserResolver } from './controller/user.resolver';
import { OwnerLostItemsDataLoader } from './dataloader/owner-lost-items.dataloader';
import { OwnerDataLoader } from './dataloader/owner.dataloader';
import { ReporterLostItemsDataLoader } from './dataloader/reporter-lost-items.dataloader';
import { ReporterDataLoader } from './dataloader/reporter.dataloader';
import { UserRepository } from './repository/impl/user.repository';
import { UserUseCase } from './use-case/impl/user.use-case';

@Module({
  imports: [forwardRef(() => LostItemModule)],
  controllers: [UserController],
  providers: [
    ...drizzleProviders,
    ReporterDataLoader,
    OwnerDataLoader,
    ReporterLostItemsDataLoader,
    OwnerLostItemsDataLoader,
    { provide: InjectionToken.USER_REPOSITORY, useClass: UserRepository },
    { provide: InjectionToken.USER_USE_CASE, useClass: UserUseCase },
    UserResolver,
    UserQuery,
    UserMutation,
  ],
  exports: [
    ReporterDataLoader,
    OwnerDataLoader,
    ReporterLostItemsDataLoader,
    OwnerLostItemsDataLoader,
    { provide: InjectionToken.USER_REPOSITORY, useClass: UserRepository },
  ],
})
export class UserModule {}
