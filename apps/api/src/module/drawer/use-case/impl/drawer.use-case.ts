import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectionToken } from '#api/common/constant/injection-token';
import type { Drawer } from '#api/module/drawer/domain/drawer.model';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type DrawerRepositoryInterface } from '#api/module/drawer/repository/drawer.repository';
import type { DrawerUseCaseInterface } from '#api/module/drawer/use-case/drawer.use-case';
import { type LostItemRepositoryInterface } from '#api/module/lost-item/repository/lost-item.repository';
import { type UserRepositoryInterface } from '#api/module/user/repository/user.repository';

@Injectable()
export class DrawerUseCase implements DrawerUseCaseInterface {
  constructor(
    @Inject(InjectionToken.DRAWER_REPOSITORY)
    private readonly drawerRepository: DrawerRepositoryInterface,
    @Inject(InjectionToken.LOST_ITEM_REPOSITORY)
    private readonly lostItemRepository: LostItemRepositoryInterface,
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async putInLostItem(reporterId: Parameters<DrawerUseCaseInterface['putInLostItem']>[0]): Promise<Drawer> {
    const foundLostItem = await this.lostItemRepository.findByReporterId(reporterId);
    if (!foundLostItem) {
      throw new HttpException('Current delivering lost item not found. The Id may be invalid.', HttpStatus.BAD_REQUEST);
    }
    if (foundLostItem.hasDelivered) {
      throw new HttpException('The lost item has already been delivered.', HttpStatus.BAD_REQUEST);
    }

    const foundDrawer = await this.drawerRepository.findEmpty();
    if (!foundDrawer) {
      throw new HttpException('No empty drawer found. All drawers are occupied.', HttpStatus.NOT_FOUND);
    }

    const updatedDrawer = await this.drawerRepository.connectLostItem(foundDrawer.id, foundLostItem.id);

    await Promise.all([
      this.lostItemRepository.update(foundLostItem.id, { deliveredAt: new Date() }),
      this.userRepository.update(reporterId, { lostAndFoundState: 'NONE' }),
    ]);

    return updatedDrawer;
  }

  async takeOutLostItem(ownerId: Parameters<DrawerUseCaseInterface['takeOutLostItem']>[0]): Promise<Drawer> {
    const foundLostItem = await this.lostItemRepository.findByOwnerId(ownerId);
    if (!foundLostItem) {
      throw new HttpException('Current retrieving lost item not found. The Id may be invalid.', HttpStatus.BAD_REQUEST);
    }
    if (foundLostItem.hasRetrieved) {
      throw new HttpException('The lost item has already been retrieved.', HttpStatus.BAD_REQUEST);
    }

    const foundDrawer = await this.drawerRepository.findByLostItemId(foundLostItem.id);
    if (!foundDrawer) {
      throw new HttpException('The drawer of the lost item not found. The lost item may be not delivered yet.', HttpStatus.NOT_FOUND);
    }

    const updatedDrawer = await this.drawerRepository.disconnectLostItem(foundDrawer.id);

    await Promise.all([
      this.lostItemRepository.update(foundLostItem.id, { retrievedAt: new Date() }),
      this.userRepository.update(ownerId, { lostAndFoundState: 'NONE' }),
    ]);

    return updatedDrawer;
  }
}
