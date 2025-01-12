import type { Locker } from '#api/module/locker/domain/locker.model';

// eslint-disable-next-line no-shadow
export enum PubSubTrigger {
  UPDATED_LOCKER_STATUS = 'updatedLockerStatus',
  UPDATED_CHALLENGE = 'updatedChallenge',
}

export const createUpdatedLockerStatusTrigger = (lockerId: Locker['id']): string => `${PubSubTrigger.UPDATED_LOCKER_STATUS}_${lockerId}`;

export const createUpdatedChallengeTrigger = (lockerId: Locker['id']): string => `${PubSubTrigger.UPDATED_CHALLENGE}_${lockerId}`;
