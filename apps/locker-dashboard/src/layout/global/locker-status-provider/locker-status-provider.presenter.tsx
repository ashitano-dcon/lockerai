'use client';

import { toast } from '#core/component/sonner';
import { ErrorIcon } from '#core/icon/error-icon';
import { type ReactNode, useEffect } from 'react';
import { match } from 'ts-pattern';
import type { Locker } from '#locker-dashboard/common/model/locker';
import { useUseUpdatedLockerStatusUseCase } from '#locker-dashboard/use-case/updated-locker-status/hook';

type LockerStatusProviderProps = {
  lockerId: Locker['id'];
};

export const LockerStatusProvider = ({ lockerId }: LockerStatusProviderProps): ReactNode => {
  const lockerStatus = useUseUpdatedLockerStatusUseCase(lockerId);

  useEffect(() => {
    if (!lockerStatus) {
      return;
    }

    match(lockerStatus.type)
      .with('INFO', () => {
        toast.info(lockerStatus.name, {
          description: lockerStatus.description,
          icon: <ErrorIcon />,
        });
      })
      .with('ERROR', () => {
        toast.error(lockerStatus.name, {
          description: lockerStatus.description,
          icon: <ErrorIcon />,
        });
      })
      .with('WARN', () => {
        toast.warning(lockerStatus.name, {
          description: lockerStatus.description,
          icon: <ErrorIcon />,
        });
      })
      .with('SUCCESS', () => {
        toast.success(lockerStatus.name, {
          description: lockerStatus.description,
          icon: <ErrorIcon />,
        });
      })
      .exhaustive();
  }, [lockerStatus]);

  return null;
};
