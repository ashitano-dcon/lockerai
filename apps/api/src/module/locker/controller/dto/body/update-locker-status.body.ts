import type { StatusTypeEnum } from '#api/module/locker/controller/dto/enum/status-type.enum';
import type { LockerStatus } from '#api/module/locker/domain/locker-status.model';

export class UpdateLockerStatusBody implements LockerStatus {
  type!: StatusTypeEnum;

  name!: string;

  description!: string;
}
