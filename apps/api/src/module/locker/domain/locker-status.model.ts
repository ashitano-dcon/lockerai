type StatusType = 'INFO' | 'ERROR' | 'WARN' | 'SUCCESS';

export class LockerStatus {
  readonly type: StatusType;

  readonly name: string;

  readonly description: string;

  constructor({ type, name, description }: LockerStatus) {
    this.type = type;
    this.name = name;
    this.description = description;
  }
}
