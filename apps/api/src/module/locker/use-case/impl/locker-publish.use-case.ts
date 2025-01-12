import { Injectable } from '@nestjs/common';
import { createUpdatedChallengeTrigger, createUpdatedLockerStatusTrigger } from '#api/common/constant/pubsub';
import { PubSubService } from '#api/common/service/pubsub/pubsub.service';
import type { LockerPublishUseCaseInterface } from '#api/module/locker/use-case/locker-publish.use-case';

@Injectable()
export class LockerPublishUseCase implements LockerPublishUseCaseInterface {
  constructor(private readonly pubSubService: PubSubService) {}

  async publishUpdatedLockerStatus(
    lockerId: Parameters<LockerPublishUseCaseInterface['publishUpdatedLockerStatus']>[0],
    publish: Parameters<LockerPublishUseCaseInterface['publishUpdatedLockerStatus']>[1],
  ): Promise<void> {
    await this.pubSubService.publish(createUpdatedLockerStatusTrigger(lockerId), publish());
  }

  async publishUpdatedChallenge(
    lockerId: Parameters<LockerPublishUseCaseInterface['publishUpdatedChallenge']>[0],
    publish: Parameters<LockerPublishUseCaseInterface['publishUpdatedChallenge']>[1],
  ): Promise<void> {
    await this.pubSubService.publish(createUpdatedChallengeTrigger(lockerId), publish());
  }
}
