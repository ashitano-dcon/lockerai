import { Module, forwardRef } from '@nestjs/common';
import { InjectionToken } from '#api/common/constant/injection-token';
import { drizzleProviders } from '#api/infra/drizzle';
import { DrawerModule } from '#api/module/drawer/drawer.module';
import { UserModule } from '#api/module/user/user.module';
import { LostItemMutation } from './controller/lost-item-mutation.resolver';
import { LostItemQuery } from './controller/lost-item-query.resolver';
import { LostItemWithRatesResolver } from './controller/lost-item-with-rates.resolver';
import { LostItemResolver } from './controller/lost-item.resolver';
import { LostItemRepository } from './repository/impl/lost-item.repository';
import { LostItemUseCase } from './use-case/impl/lost-item.use-case';

@Module({
  imports: [forwardRef(() => DrawerModule), forwardRef(() => UserModule)],
  providers: [
    ...drizzleProviders,
    { provide: InjectionToken.LOST_ITEM_REPOSITORY, useClass: LostItemRepository },
    { provide: InjectionToken.LOST_ITEM_USE_CASE, useClass: LostItemUseCase },
    LostItemResolver,
    LostItemWithRatesResolver,
    LostItemQuery,
    LostItemMutation,
  ],
  exports: [{ provide: InjectionToken.LOST_ITEM_REPOSITORY, useClass: LostItemRepository }],
})
export class LostItemModule {}
