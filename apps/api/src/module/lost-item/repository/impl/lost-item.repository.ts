import { Inject, Injectable } from '@nestjs/common';
import { toI18nText } from '#api/common/type/locale';
import { PrismaService } from '#api/infra/prisma/prisma.service';
import { LostItem } from '#api/module/lost-item/domain/lost-item.model';
import type { LostItemRepositoryInterface } from '#api/module/lost-item/repository/lost-item.repository';

@Injectable()
export class LostItemRepository implements LostItemRepositoryInterface {
  constructor(@Inject(PrismaService) private readonly prismaService: PrismaService) {}

  async find(lostItemId: Parameters<LostItemRepositoryInterface['find']>[0]): Promise<LostItem | null> {
    const lostItem = await this.prismaService.lostItem.findUnique({
      where: { id: lostItemId },
    });
    if (!lostItem) {
      return null;
    }

    return new LostItem({
      ...lostItem,
      titleI18n: toI18nText(lostItem.titleI18n),
      descriptionI18n: toI18nText(lostItem.descriptionI18n),
    });
  }

  async findByDrawerId(drawerId: Parameters<LostItemRepositoryInterface['findByDrawerId']>[0]): Promise<LostItem | null> {
    const lostItem = await this.prismaService.lostItem.findUnique({
      where: { drawerId },
    });
    if (!lostItem) {
      return null;
    }

    return new LostItem({
      ...lostItem,
      titleI18n: toI18nText(lostItem.titleI18n),
      descriptionI18n: toI18nText(lostItem.descriptionI18n),
    });
  }

  async findByReporterId(id: Parameters<LostItemRepositoryInterface['findByReporterId']>[0]): Promise<LostItem | null> {
    const lostItem = await this.prismaService.lostItem.findFirst({
      where: {
        reporter: {
          id,
        },
      },
      orderBy: {
        reportedAt: 'desc',
      },
    });
    if (!lostItem) {
      return null;
    }

    return new LostItem({
      ...lostItem,
      titleI18n: toI18nText(lostItem.titleI18n),
      descriptionI18n: toI18nText(lostItem.descriptionI18n),
    });
  }

  async findByOwnerId(id: Parameters<LostItemRepositoryInterface['findByOwnerId']>[0]): Promise<LostItem | null> {
    const lostItem = await this.prismaService.lostItem.findFirst({
      where: {
        owner: {
          id,
        },
      },
      orderBy: {
        ownedAt: 'desc',
      },
    });
    if (!lostItem) {
      return null;
    }

    return new LostItem({
      ...lostItem,
      titleI18n: toI18nText(lostItem.titleI18n),
      descriptionI18n: toI18nText(lostItem.descriptionI18n),
    });
  }

  async findMany(lostItemIds: Parameters<LostItemRepositoryInterface['findMany']>[0]): Promise<LostItem[]> {
    const lostItems = await this.prismaService.lostItem.findMany({
      where: { id: { in: lostItemIds } },
    });

    return lostItems.map(
      (lostItem) =>
        new LostItem({
          ...lostItem,
          titleI18n: toI18nText(lostItem.titleI18n),
          descriptionI18n: toI18nText(lostItem.descriptionI18n),
        }),
    );
  }

  async findManyByReporterIds(reporterIds: Parameters<LostItemRepositoryInterface['findManyByReporterIds']>[0]): Promise<LostItem[]> {
    const lostItems = await this.prismaService.lostItem.findMany({
      where: { reporterId: { in: reporterIds } },
      orderBy: { reportedAt: 'desc' },
    });

    return lostItems.map(
      (lostItem) =>
        new LostItem({
          ...lostItem,
          titleI18n: toI18nText(lostItem.titleI18n),
          descriptionI18n: toI18nText(lostItem.descriptionI18n),
        }),
    );
  }

  async findManyByOwnerIds(ownerIds: Parameters<LostItemRepositoryInterface['findManyByOwnerIds']>[0]): Promise<LostItem[]> {
    const lostItems = await this.prismaService.lostItem.findMany({
      where: { ownerId: { in: ownerIds } },
      orderBy: { ownedAt: 'desc' },
    });

    return lostItems.map(
      (lostItem) =>
        new LostItem({
          ...lostItem,
          titleI18n: toI18nText(lostItem.titleI18n),
          descriptionI18n: toI18nText(lostItem.descriptionI18n),
        }),
    );
  }

  async findSimilar(embeddedDescription: Parameters<LostItemRepositoryInterface['findSimilar']>[0]): Promise<[LostItem, number][]> {
    const similarLostItems = await this.prismaService.$queryRaw<(LostItem & { similarity: number })[]>`
      SELECT id, title, title_i18n AS "titleI18n", description, description_i18n AS "descriptionI18n", image_urls AS "imageUrls", drawer_id AS "drawerId", reporter_id AS "reporterId", owner_id AS "ownerId", reported_at AS "reportedAt", delivered_at AS "deliveredAt", retrieved_at AS "retrievedAt", 1 - (embedded_description <=> ${embeddedDescription}::vector) AS similarity
      FROM public.lost_items
      WHERE owner_id IS NULL
      ORDER BY similarity
      LIMIT 10
    `;

    return similarLostItems.map(({ similarity, ...lostItem }) => [
      new LostItem({
        ...lostItem,
        titleI18n: toI18nText(lostItem.titleI18n),
        descriptionI18n: toI18nText(lostItem.descriptionI18n),
      }),
      similarity,
    ]);
  }

  async create(
    lostItem: Parameters<LostItemRepositoryInterface['create']>[0],
    embeddedDescription: Parameters<LostItemRepositoryInterface['create']>[1],
  ): Promise<LostItem> {
    const titleI18nJson = JSON.stringify(lostItem.titleI18n || { en: lostItem.title, ja: lostItem.title });
    const descriptionI18nJson = JSON.stringify(lostItem.descriptionI18n || { en: lostItem.description, ja: lostItem.description });

    const [createdLostItem] = await this.prismaService.$queryRaw<LostItem[]>`
      INSERT INTO public.lost_items (id, title, title_i18n, description, description_i18n, embedded_description, image_urls, drawer_id, reporter_id, reported_at)
      VALUES (${lostItem.id}::uuid, ${lostItem.title}, ${titleI18nJson}::jsonb, ${lostItem.description}, ${descriptionI18nJson}::jsonb, ${embeddedDescription}::vector, ${lostItem.imageUrls}, ${lostItem.drawerId}, ${lostItem.reporterId}::uuid, NOW())
      RETURNING id, title, title_i18n AS "titleI18n", description, description_i18n AS "descriptionI18n", image_urls AS "imageUrls", drawer_id AS "drawerId", reporter_id AS "reporterId", owner_id AS "ownerId", reported_at AS "reportedAt", delivered_at AS "deliveredAt", retrieved_at AS "retrievedAt"
    `;
    if (!createdLostItem) {
      throw new Error('Failed to create lostItem.');
    }

    return new LostItem({
      ...createdLostItem,
      titleI18n: toI18nText(createdLostItem.titleI18n),
      descriptionI18n: toI18nText(createdLostItem.descriptionI18n),
    });
  }

  async update(
    lostItemId: Parameters<LostItemRepositoryInterface['update']>[0],
    lostItem: Parameters<LostItemRepositoryInterface['update']>[1],
  ): Promise<LostItem> {
    const updatedLostItem = await this.prismaService.lostItem.update({
      where: { id: lostItemId },
      data: lostItem,
    });

    return new LostItem({
      ...updatedLostItem,
      titleI18n: toI18nText(updatedLostItem.titleI18n),
      descriptionI18n: toI18nText(updatedLostItem.descriptionI18n),
    });
  }
}
