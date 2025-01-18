export class Locker {
  readonly id: string;

  readonly name: string;

  readonly lat: number;

  readonly lng: number;

  readonly location: string;

  readonly createdAt: Date;

  constructor({ id, name, lat, lng, location, createdAt }: Locker) {
    this.id = id;
    this.name = name;
    this.lat = lat;
    this.lng = lng;
    this.location = location;
    this.createdAt = createdAt;
  }
}
