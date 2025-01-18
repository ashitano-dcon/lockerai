import { registerEnumType } from '@nestjs/graphql';

// eslint-disable-next-line no-shadow
export enum UserRoleEnum {
  USER = 'USER',
  OCCUPIER = 'OCCUPIER',
}

registerEnumType(UserRoleEnum, { name: 'UserRole' });
