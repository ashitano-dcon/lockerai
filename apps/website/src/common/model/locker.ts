import type { I18nText } from '#website/i18n/locales';

export type Locker = {
  id: string;
  name: string;
  nameI18n: I18nText;
  location: string;
  locationI18n: I18nText;
  createdAt: Date;
};

export const mockLocker = (locker: Partial<Locker> = {}): Locker => ({
  id: 'e069eeb2-a239-44c7-9870-acc1af492264',
  name: 'primary',
  nameI18n: {
    en: 'primary',
    ja: 'プライマリ',
  },
  location: '123 Main St, Anytown, USA',
  locationI18n: {
    en: 'The front locker of the building, 123 Main St, Anytown, USA',
    ja: '建物の前のロッカー、123 メインストリート、アニマルタウン、アメリカ',
  },
  createdAt: new Date(0),
  ...locker,
});
