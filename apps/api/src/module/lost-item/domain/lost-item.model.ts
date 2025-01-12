export class LostItem {
  readonly id: string;

  readonly title: string;

  readonly description: string;

  readonly imageUrls: string[];

  readonly drawerId: number | null;

  readonly reporterId: string;

  readonly ownerId: string | null;

  readonly reportedAt: Date;

  readonly ownedAt: Date | null;

  readonly deliveredAt: Date | null;

  readonly retrievedAt: Date | null;

  constructor({
    id,
    title,
    description,
    imageUrls,
    drawerId,
    reporterId,
    ownerId,
    reportedAt,
    ownedAt,
    deliveredAt,
    retrievedAt,
  }: Omit<LostItem, 'hasDelivered' | 'hasRetrieved'>) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrls = imageUrls;
    this.drawerId = drawerId;
    this.reporterId = reporterId;
    this.ownerId = ownerId;
    this.reportedAt = reportedAt;
    this.ownedAt = ownedAt;
    this.deliveredAt = deliveredAt;
    this.retrievedAt = retrievedAt;
  }

  get hasDelivered(): boolean {
    return this.deliveredAt !== null;
  }

  get hasRetrieved(): boolean {
    return this.retrievedAt !== null;
  }
}
