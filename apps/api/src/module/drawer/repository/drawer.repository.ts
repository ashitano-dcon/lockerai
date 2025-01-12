import type { Drawer } from '#api/module/drawer/domain/drawer.model';
import type { LostItem } from '#api/module/lost-item/domain/lost-item.model';

export interface DrawerRepositoryInterface {
  find(drawerId: Drawer['id']): Promise<Drawer | null>;
  findEmpty(): Promise<Drawer | null>;
  findByOwnerId(ownerId: LostItem['ownerId']): Promise<Drawer | null>;
  findByLostItemId(lostItemId: LostItem['id']): Promise<Drawer | null>;
  findMany(drawerIds: Drawer['id'][]): Promise<Drawer[]>;
  findManyByLockerIds(lockerIds: Drawer['lockerId'][]): Promise<Drawer[]>;
  connectLostItem(drawerId: Drawer['id'], lostItemId: LostItem['id']): Promise<Drawer>;
  disconnectLostItem(drawerId: Drawer['id']): Promise<Drawer>;
}
