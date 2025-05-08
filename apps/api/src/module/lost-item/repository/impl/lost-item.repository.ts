import { Inject, Injectable } from '@nestjs/common';
import { cosineDistance, desc, eq, inArray, isNull, sql } from 'drizzle-orm';
import { InjectionToken } from '#api/common/constant/injection-token';
import { type DrizzleClient, lostItems } from '#api/infra/drizzle';
import { LostItem } from '#api/module/lost-item/domain/lost-item.model';
import type { LostItemRepositoryInterface } from '#api/module/lost-item/repository/lost-item.repository';

type LostItemDto = typeof lostItems.$inferSelect;

@Injectable()
export class LostItemRepository implements LostItemRepositoryInterface {
  constructor(
    @Inject(InjectionToken.DRIZZLE_CLIENT)
    private readonly drizzleClient: DrizzleClient,
  ) {}

  private mapToLostItem(lostItem: LostItemDto): LostItem {
    return new LostItem({
      ...lostItem,
      imageUrls: lostItem.imageUrls ?? [],
      reportedAt: new Date(lostItem.reportedAt),
      deliveredAt: lostItem.deliveredAt ? new Date(lostItem.deliveredAt) : null,
      retrievedAt: lostItem.retrievedAt ? new Date(lostItem.retrievedAt) : null,
      ownedAt: lostItem.ownedAt ? new Date(lostItem.ownedAt) : null,
    });
  }

  async find(lostItemId: Parameters<LostItemRepositoryInterface['find']>[0]): Promise<LostItem | null> {
    const [lostItem] = await this.drizzleClient.select().from(lostItems).where(eq(lostItems.id, lostItemId));
    if (!lostItem) {
      return null;
    }

    return this.mapToLostItem(lostItem);
  }

  async findByDrawerId(drawerId: Parameters<LostItemRepositoryInterface['findByDrawerId']>[0]): Promise<LostItem | null> {
    const [lostItem] = await this.drizzleClient.select().from(lostItems).where(eq(lostItems.drawerId, drawerId));
    if (!lostItem) {
      return null;
    }

    return this.mapToLostItem(lostItem);
  }

  async findByReporterId(id: Parameters<LostItemRepositoryInterface['findByReporterId']>[0]): Promise<LostItem | null> {
    const [lostItem] = await this.drizzleClient
      .select()
      .from(lostItems)
      .where(eq(lostItems.reporterId, id))
      .orderBy(desc(lostItems.reportedAt))
      .limit(1);

    if (!lostItem) {
      return null;
    }

    return this.mapToLostItem(lostItem);
  }

  async findByOwnerId(id: Parameters<LostItemRepositoryInterface['findByOwnerId']>[0]): Promise<LostItem | null> {
    const [lostItem] = await this.drizzleClient.select().from(lostItems).where(eq(lostItems.ownerId, id)).orderBy(desc(lostItems.ownedAt)).limit(1);

    if (!lostItem) {
      return null;
    }

    return this.mapToLostItem(lostItem);
  }

  async findMany(lostItemIds: Parameters<LostItemRepositoryInterface['findMany']>[0]): Promise<LostItem[]> {
    const foundLostItems = await this.drizzleClient.select().from(lostItems).where(inArray(lostItems.id, lostItemIds));

    return foundLostItems.map(this.mapToLostItem);
  }

  async findManyByReporterIds(reporterIds: Parameters<LostItemRepositoryInterface['findManyByReporterIds']>[0]): Promise<LostItem[]> {
    const foundLostItems = await this.drizzleClient
      .select()
      .from(lostItems)
      .where(inArray(lostItems.reporterId, reporterIds))
      .orderBy(desc(lostItems.reportedAt));

    return foundLostItems.map(this.mapToLostItem);
  }

  async findManyByOwnerIds(ownerIds: Parameters<LostItemRepositoryInterface['findManyByOwnerIds']>[0]): Promise<LostItem[]> {
    const foundLostItems = await this.drizzleClient
      .select()
      .from(lostItems)
      .where(inArray(lostItems.ownerId, ownerIds))
      .orderBy(desc(lostItems.ownedAt));

    return foundLostItems.map(this.mapToLostItem);
  }

  async findSimilar(embeddedDescription: Parameters<LostItemRepositoryInterface['findSimilar']>[0]): Promise<[LostItem, number][]> {
    const similaritySql = sql<number>`1 - (${cosineDistance(lostItems.embeddedDescription, embeddedDescription)})`;

    const similarLostItems = await this.drizzleClient
      .select({
        id: lostItems.id,
        title: lostItems.title,
        description: lostItems.description,
        imageUrls: lostItems.imageUrls,
        drawerId: lostItems.drawerId,
        reporterId: lostItems.reporterId,
        ownerId: lostItems.ownerId,
        reportedAt: lostItems.reportedAt,
        deliveredAt: lostItems.deliveredAt,
        retrievedAt: lostItems.retrievedAt,
        ownedAt: lostItems.ownedAt,
        embeddedDescription: lostItems.embeddedDescription,
        similarity: similaritySql,
      })
      .from(lostItems)
      .where(isNull(lostItems.ownerId))
      .orderBy(similaritySql)
      .limit(10);

    return similarLostItems.map(({ similarity, ...lostItem }) => [this.mapToLostItem(lostItem), similarity]);
  }

  async create(
    lostItem: Parameters<LostItemRepositoryInterface['create']>[0],
    embeddedDescription: Parameters<LostItemRepositoryInterface['create']>[1],
  ): Promise<LostItem> {
    const [createdLostItem] = await this.drizzleClient
      .insert(lostItems)
      .values({
        id: lostItem.id,
        title: lostItem.title,
        description: lostItem.description,
        embeddedDescription,
        imageUrls: lostItem.imageUrls,
        drawerId: lostItem.drawerId,
        reporterId: lostItem.reporterId,
        reportedAt: new Date().toISOString(),
      })
      .returning();

    if (!createdLostItem) {
      throw new Error('Failed to create lostItem.');
    }

    return this.mapToLostItem(createdLostItem);
  }

  async update(
    lostItemId: Parameters<LostItemRepositoryInterface['update']>[0],
    lostItem: Parameters<LostItemRepositoryInterface['update']>[1],
  ): Promise<LostItem> {
    const updateData: {
      ownerId?: string;
      ownedAt?: string;
      deliveredAt?: string;
      retrievedAt?: string;
    } = {};

    if (lostItem.ownerId) {
      updateData.ownerId = lostItem.ownerId;
    }

    if (lostItem.ownedAt) {
      updateData.ownedAt = lostItem.ownedAt.toISOString();
    }

    if (lostItem.deliveredAt) {
      updateData.deliveredAt = lostItem.deliveredAt.toISOString();
    }

    if (lostItem.retrievedAt) {
      updateData.retrievedAt = lostItem.retrievedAt.toISOString();
    }

    const [updatedLostItem] = await this.drizzleClient.update(lostItems).set(updateData).where(eq(lostItems.id, lostItemId)).returning();

    if (!updatedLostItem) {
      throw new Error('Failed to update lostItem.');
    }

    return this.mapToLostItem(updatedLostItem);
  }
}
