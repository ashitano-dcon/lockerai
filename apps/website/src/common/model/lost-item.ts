import type { I18nText } from '#website/i18n/locales';
import type { UserPublicMeta } from './user';

export type LostItem = {
  id: string;
  title: string;
  description: string;
  titleI18n: I18nText;
  descriptionI18n: I18nText;
  imageUrls: string[];
  reportedAt: Date;
  ownedAt: Date | null;
  deliveredAt: Date | null;
  retrievedAt: Date | null;
  drawer?: {
    id: number;
    locker: {
      lat: number;
      lng: number;
      location: string;
      locationI18n: I18nText;
    };
  } | null;
};

export type CurrentTargetLostItem = {
  lostItem: LostItem;
  reporter: UserPublicMeta;
  owner: UserPublicMeta | null;
  drawer?: {
    id: number;
    locker: {
      lat: number;
      lng: number;
      location: string;
      locationI18n: I18nText;
    };
  } | null;
};

export const mockLostItem = (lostItem: Partial<LostItem> = {}): LostItem => ({
  id: 'e069eeb2-a239-44c7-9870-acc1af492264',
  title: 'Anker 521 Power Bank with Stickers',
  titleI18n: {
    en: 'Anker 521 Power Bank with Stickers',
    ja: 'アンカー 521 パワーバンク ステッカー付き',
  },
  description:
    'This item is an Anker 521 Power Bank (PowerCore Fusion, 45W). It is a portable charger with a battery capacity of 5000mAh and an output of 3.6Vdc / 18W. The power bank is silver in color and has a rectangular shape with rounded edges. It features a circle button on the front and multiple ports on the edge, including a USB-C port and two USB-A ports. The front and back are adorned with various stickers, including an anime-style character and text stickers. The bottom contains product information such as the model number (A1626), input and output specifications, and safety certifications. It is noted that the power bank should not be disassembled or modified and is made in China. The item is held in a hand, showcasing its compact size.',
  descriptionI18n: {
    en: 'This item is an Anker 521 Power Bank (PowerCore Fusion, 45W). It is a portable charger with a battery capacity of 5000mAh and an output of 3.6Vdc / 18W. The power bank is silver in color and has a rectangular shape with rounded edges. It features a circle button on the front and multiple ports on the edge, including a USB-C port and two USB-A ports. The front and back are adorned with various stickers, including an anime-style character and text stickers. The bottom contains product information such as the model number (A1626), input and output specifications, and safety certifications. It is noted that the power bank should not be disassembled or modified and is made in China. The item is held in a hand, showcasing its compact size.',
    ja: 'Anker 521 Power Bank (PowerCore Fusion, 45W)です。バッテリー容量5000mAh、出力3.6Vdc/18Wのポータブル充電器です。パワーバンクの色はシルバーで、角が丸みを帯びた長方形の形をしている。前面には丸いボタンがあり、端にはUSB-CポートとUSB-Aポート2つを含む複数のポートがあります。前面と背面には、アニメ風のキャラクターやテキストシールなど、さまざまなステッカーが貼られている。底面には、型番（A1626）、入出力仕様、安全認証などの製品情報が記載されている。パワーバンクは分解や改造をしないこと、中国製であることが記載されている。手に持ってみると、コンパクトなサイズである。',
  },
  imageUrls: ['https://example.com/image.png'],
  reportedAt: new Date(0),
  ownedAt: null,
  deliveredAt: null,
  retrievedAt: null,
  ...lostItem,
});
