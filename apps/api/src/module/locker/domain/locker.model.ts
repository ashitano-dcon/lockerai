import { type I18nText } from '#api/common/type/locale';

export class Locker {
  readonly id: string;

  readonly name: string;

  readonly nameI18n: I18nText;

  readonly lat: number;

  readonly lng: number;

  readonly location: string;

  readonly locationI18n: I18nText;

  readonly createdAt: Date;

  constructor({ id, name, nameI18n, lat, lng, location, locationI18n, createdAt }: Locker) {
    this.id = id;
    this.name = name;
    this.nameI18n = nameI18n;
    this.lat = lat;
    this.lng = lng;
    this.location = location;
    this.locationI18n = locationI18n;
    this.createdAt = createdAt;
  }
}
