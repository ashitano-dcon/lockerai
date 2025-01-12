import type { PubSubTrigger } from '#api/common/constant/pubsub';
import type { Challenge } from '#api/module/locker/domain/challenge.model';
import type { LockerStatus } from '#api/module/locker/domain/locker-status.model';
import type { Locker } from '#api/module/locker/domain/locker.model';

export interface LockerPublishUseCaseInterface {
  publishUpdatedLockerStatus(lockerId: Locker['id'], publish: () => Record<PubSubTrigger.UPDATED_LOCKER_STATUS, LockerStatus>): Promise<void>;
  publishUpdatedChallenge(lockerId: Locker['id'], publish: () => Record<PubSubTrigger.UPDATED_CHALLENGE, Challenge>): Promise<void>;
}
