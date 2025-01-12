export type Locker = {
  id: string;
  name: string;
  createdAt: Date;
};

type StatusType = 'INFO' | 'ERROR' | 'WARN' | 'SUCCESS';

export type LockerStatus = {
  type: StatusType;
  name: string;
  description: string;
};

export const mockLocker = (locker: Partial<Locker> = {}): Locker => ({
  id: 'e069eeb2-a239-44c7-9870-acc1af492264',
  name: 'primary',
  createdAt: new Date(0),
  ...locker,
});
