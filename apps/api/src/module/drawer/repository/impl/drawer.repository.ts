import { Inject, Injectable } from '@nestjs/common';
import { eq, inArray, isNull } from 'drizzle-orm';
import { InjectionToken } from '#api/common/constant/injection-token';
import { type DrizzleClient, drawers, lostItems } from '#api/infra/drizzle';
import { Drawer } from '#api/module/drawer/domain/drawer.model';
import type { DrawerRepositoryInterface } from '#api/module/drawer/repository/drawer.repository';

type DrawerDto = typeof drawers.$inferSelect;
@Injectable()
export class DrawerRepository implements DrawerRepositoryInterface {
  constructor(
    @Inject(InjectionToken.DRIZZLE_CLIENT)
    private readonly drizzleClient: DrizzleClient,
  ) {}

  private mapToDrawer(drawer: DrawerDto): Drawer {
    return new Drawer({
      id: drawer.id,
      lockerId: drawer.lockerId,
      createdAt: new Date(drawer.createdAt),
    });
  }

  async find(drawerId: Parameters<DrawerRepositoryInterface['find']>[0]): Promise<Drawer | null> {
    const [drawer] = await this.drizzleClient.select().from(drawers).where(eq(drawers.id, drawerId));

    if (!drawer) {
      return null;
    }

    return this.mapToDrawer(drawer);
  }

  async findEmpty(): Promise<Drawer | null> {
    const [drawer] = await this.drizzleClient
      .select({
        id: drawers.id,
        lockerId: drawers.lockerId,
        createdAt: drawers.createdAt,
      })
      .from(drawers)
      .leftJoin(lostItems, eq(drawers.id, lostItems.drawerId))
      .where(isNull(lostItems.id));

    if (!drawer) {
      return null;
    }

    return this.mapToDrawer(drawer);
  }

  async findByOwnerId(ownerId: Parameters<DrawerRepositoryInterface['findByOwnerId']>[0]): Promise<Drawer | null> {
    if (!ownerId) {
      return null;
    }

    const [drawer] = await this.drizzleClient
      .select({
        id: drawers.id,
        lockerId: drawers.lockerId,
        createdAt: drawers.createdAt,
      })
      .from(drawers)
      .innerJoin(lostItems, eq(drawers.id, lostItems.drawerId))
      .where(eq(lostItems.id, ownerId));

    if (!drawer) {
      return null;
    }

    return this.mapToDrawer(drawer);
  }

  async findByLostItemId(lostItemId: Parameters<DrawerRepositoryInterface['findByLostItemId']>[0]): Promise<Drawer | null> {
    const [drawer] = await this.drizzleClient
      .select({
        id: drawers.id,
        lockerId: drawers.lockerId,
        createdAt: drawers.createdAt,
      })
      .from(drawers)
      .innerJoin(lostItems, eq(drawers.id, lostItems.drawerId))
      .where(eq(lostItems.id, lostItemId));

    if (!drawer) {
      return null;
    }

    return this.mapToDrawer(drawer);
  }

  async findMany(drawerIds: Parameters<DrawerRepositoryInterface['findMany']>[0]): Promise<Drawer[]> {
    const foundDrawers = await this.drizzleClient.select().from(drawers).where(inArray(drawers.id, drawerIds));

    return foundDrawers.map(this.mapToDrawer);
  }

  async findManyByLockerIds(lockerIds: Parameters<DrawerRepositoryInterface['findManyByLockerIds']>[0]): Promise<Drawer[]> {
    const foundDrawers = await this.drizzleClient.select().from(drawers).where(inArray(drawers.lockerId, lockerIds));

    return foundDrawers.map(this.mapToDrawer);
  }

  async connectLostItem(
    drawerId: Parameters<DrawerRepositoryInterface['connectLostItem']>[0],
    lostItemId: Parameters<DrawerRepositoryInterface['connectLostItem']>[1],
  ): Promise<Drawer> {
    await this.drizzleClient.update(lostItems).set({ drawerId }).where(eq(lostItems.id, lostItemId));

    const [updatedDrawer] = await this.drizzleClient.select().from(drawers).where(eq(drawers.id, drawerId));

    if (!updatedDrawer) {
      throw new Error('Drawer not found');
    }

    return this.mapToDrawer(updatedDrawer);
  }

  async disconnectLostItem(drawerId: Parameters<DrawerRepositoryInterface['disconnectLostItem']>[0]): Promise<Drawer> {
    await this.drizzleClient.update(lostItems).set({ drawerId: null }).where(eq(lostItems.drawerId, drawerId));

    const [updatedDrawer] = await this.drizzleClient.select().from(drawers).where(eq(drawers.id, drawerId));

    if (!updatedDrawer) {
      throw new Error('Drawer not found');
    }

    return this.mapToDrawer(updatedDrawer);
  }
}
