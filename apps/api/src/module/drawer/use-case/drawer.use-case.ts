import type { Drawer } from '#api/module/drawer/domain/drawer.model';
import type { User } from '#api/module/user/domain/user.model';

export interface DrawerUseCaseInterface {
  putInLostItem(reporterId: NonNullable<User['id']>): Promise<Drawer>;
  takeOutLostItem(ownerId: NonNullable<User['id']>): Promise<Drawer>;
}

//
