import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '#api/infra/prisma/prisma.service';
import { Drawer } from '#api/module/drawer/domain/drawer.model';
import type { DrawerRepositoryInterface } from '#api/module/drawer/repository/drawer.repository';

@Injectable()
export class DrawerRepository implements DrawerRepositoryInterface {
  constructor(@Inject(PrismaService) private readonly prismaService: PrismaService) {}

  async find(drawerId: Parameters<DrawerRepositoryInterface['find']>[0]): Promise<Drawer | null> {
    const drawer = await this.prismaService.drawer.findUnique({ where: { id: drawerId } });
    if (!drawer) {
      return null;
    }

    return new Drawer(drawer);
  }

  async findEmpty(): Promise<Drawer | null> {
    const drawer = await this.prismaService.drawer.findFirst({ where: { lostItem: null } });
    if (!drawer) {
      return null;
    }

    return new Drawer(drawer);
  }

  async findByOwnerId(ownerId: Parameters<DrawerRepositoryInterface['findByOwnerId']>[0]): Promise<Drawer | null> {
    const drawer = await this.prismaService.drawer.findFirst({ where: { lostItem: { ownerId } } });
    if (!drawer) {
      return null;
    }

    return new Drawer(drawer);
  }

  async findByLostItemId(lostItemId: Parameters<DrawerRepositoryInterface['findByLostItemId']>[0]): Promise<Drawer | null> {
    const drawer = await this.prismaService.drawer.findFirst({ where: { lostItem: { id: lostItemId } } });
    if (!drawer) {
      return null;
    }

    return new Drawer(drawer);
  }

  async findMany(drawerIds: Parameters<DrawerRepositoryInterface['findMany']>[0]): Promise<Drawer[]> {
    const drawers = await this.prismaService.drawer.findMany({ where: { id: { in: drawerIds } } });

    return drawers.map((drawer) => new Drawer(drawer));
  }

  async findManyByLockerIds(lockerIds: Parameters<DrawerRepositoryInterface['findManyByLockerIds']>[0]): Promise<Drawer[]> {
    const drawers = await this.prismaService.drawer.findMany({ where: { lockerId: { in: lockerIds } } });

    return drawers.map((drawer) => new Drawer(drawer));
  }

  async connectLostItem(
    drawerId: Parameters<DrawerRepositoryInterface['connectLostItem']>[0],
    lostItemId: Parameters<DrawerRepositoryInterface['connectLostItem']>[1],
  ): Promise<Drawer> {
    const updatedDrawer = await this.prismaService.drawer.update({
      where: { id: drawerId },
      data: { lostItem: { connect: { id: lostItemId } } },
    });

    return new Drawer(updatedDrawer);
  }

  async disconnectLostItem(drawerId: Parameters<DrawerRepositoryInterface['disconnectLostItem']>[0]): Promise<Drawer> {
    const updatedDrawer = await this.prismaService.drawer.update({
      where: { id: drawerId },
      data: { lostItem: { disconnect: true } },
    });

    return new Drawer(updatedDrawer);
  }
}
