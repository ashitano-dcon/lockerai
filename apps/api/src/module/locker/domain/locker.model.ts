export class Locker {
  readonly id: string;

  readonly name: string;

  readonly createdAt: Date;

  constructor({ id, name, createdAt }: Locker) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
  }
}
