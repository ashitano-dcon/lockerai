export class Drawer {
  readonly id: number;

  readonly lockerId: string;

  readonly createdAt: Date;

  constructor({ id, lockerId, createdAt }: Drawer) {
    this.id = id;
    this.lockerId = lockerId;
    this.createdAt = createdAt;
  }
}
