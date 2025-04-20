import { type LostItem } from './lost-item.model';

export class LostItemWithRates {
  readonly lostItem: LostItem;

  readonly approveRate: number;

  readonly rejectRate: number;

  constructor(lostItem: LostItem, approveRate: number, rejectRate: number) {
    this.lostItem = lostItem;
    this.approveRate = approveRate;
    this.rejectRate = rejectRate;
  }
}
