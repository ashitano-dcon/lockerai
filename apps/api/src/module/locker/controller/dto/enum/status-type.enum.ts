import { registerEnumType } from '@nestjs/graphql';

// eslint-disable-next-line no-shadow
export enum StatusTypeEnum {
  INFO = 'INFO',
  ERROR = 'ERROR',
  WARN = 'WARN',
  SUCCESS = 'SUCCESS',
}

registerEnumType(StatusTypeEnum, { name: 'StatusType' });
