import type { UserPublicMeta } from './user';

export type LostItem = {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  reportedAt: Date;
  ownedAt: Date | null;
  deliveredAt: Date | null;
  retrievedAt: Date | null;
};

export type CurrentTargetLostItem = {
  lostItem: LostItem;
  reporter: UserPublicMeta;
  owner: UserPublicMeta | null;
};

export const mockLostItem = (lostItem: Partial<LostItem> = {}): LostItem => ({
  id: 'e069eeb2-a239-44c7-9870-acc1af492264',
  title: 'Anker 521 Power Bank with Stickers',
  description:
    'This item is an Anker 521 Power Bank (PowerCore Fusion, 45W). It is a portable charger with a battery capacity of 5000mAh and an output of 3.6Vdc / 18W. The power bank is silver in color and has a rectangular shape with rounded edges. It features a circle button on the front and multiple ports on the edge, including a USB-C port and two USB-A ports. The front and back are adorned with various stickers, including an anime-style character and text stickers. The bottom contains product information such as the model number (A1626), input and output specifications, and safety certifications. It is noted that the power bank should not be disassembled or modified and is made in China. The item is held in a hand, showcasing its compact size.',
  imageUrls: ['https://example.com/image.png'],
  reportedAt: new Date(0),
  ownedAt: null,
  deliveredAt: null,
  retrievedAt: null,
  ...lostItem,
});
