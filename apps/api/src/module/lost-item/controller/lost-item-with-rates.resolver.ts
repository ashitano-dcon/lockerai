import { Inject, Logger } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectionToken } from '#api/common/constant/injection-token';
import { DrawerObject } from '#api/module/drawer/controller/dto/object/drawer.object';
import type { Drawer } from '#api/module/drawer/domain/drawer.model';
import { type DrawerRepositoryInterface } from '#api/module/drawer/repository/drawer.repository';
import { LostItemWithRatesObject } from '#api/module/lost-item/controller/dto/object/lost-item-with-rates.object';
import { LostItem } from '#api/module/lost-item/domain/lost-item.model';
import { UserObject } from '#api/module/user/controller/dto/object/user.object';
import { OwnerDataLoader } from '#api/module/user/dataloader/owner.dataloader';
import { ReporterDataLoader } from '#api/module/user/dataloader/reporter.dataloader';
import type { User } from '#api/module/user/domain/user.model';

// LostItemWithRatesObjectのリゾルバー
@Resolver(() => LostItemWithRatesObject)
export class LostItemWithRatesResolver {
  private readonly logger = new Logger(LostItemWithRatesResolver.name); // Loggerを追加

  constructor(
    private readonly reporterDataLoader: ReporterDataLoader,
    private readonly ownerDataLoader: OwnerDataLoader,
    @Inject(InjectionToken.DRAWER_REPOSITORY)
    private readonly drawerRepository: DrawerRepositoryInterface,
  ) {}

  @ResolveField(() => UserObject, { nullable: true })
  async reporter(@Parent() lostItem: LostItem): Promise<User | null> {
    try {
      if (!lostItem.reporterId) {
        this.logger.debug(`Reporter ID is undefined for lostItem.id ${lostItem.id}`);
        return null;
      }

      const reporter = await this.reporterDataLoader.load(lostItem.reporterId);
      return reporter;
    } catch (error) {
      this.logger.error(`Error loading reporter for lostItem.id ${lostItem.id}:`, error);
      return null;
    }
  }

  @ResolveField(() => UserObject, { nullable: true })
  async owner(@Parent() lostItem: LostItem): Promise<User | null> {
    if (!lostItem.ownerId) {
      return null;
    }

    try {
      const owner = await this.ownerDataLoader.load(lostItem.ownerId);
      return owner;
    } catch (error) {
      this.logger.error(`Error loading owner for lostItem.id ${lostItem.id}:`, error);
      return null;
    }
  }

  @ResolveField(() => DrawerObject, { nullable: true })
  async drawer(@Parent() lostItem: LostItem): Promise<Drawer | null> {
    if (!lostItem.drawerId) {
      return null;
    }

    try {
      const drawer = await this.drawerRepository.find(lostItem.drawerId);
      return drawer;
    } catch (error) {
      this.logger.error(`Error loading drawer for lostItem.id ${lostItem.id}:`, error);
      return null;
    }
  }
}
