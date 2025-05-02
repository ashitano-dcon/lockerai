'use client';

import { Link } from '@lockerai/core/component/link';
import { cn } from '@lockerai/tailwind';
import { Map, Marker } from '@vis.gl/react-google-maps';
import type { ComponentPropsWithoutRef } from 'react';
import type { CurrentTargetLostItem } from '#website/common/model/lost-item';

type LockerMapProps = NonNullable<Required<CurrentTargetLostItem>['drawer']>['locker'] & ComponentPropsWithoutRef<typeof Map>;

export const LockerMap = ({ lat, lng, location, defaultZoom = 15, className, ...props }: LockerMapProps) => (
  <div className={cn('flex flex-col items-start gap-2', className)}>
    <div className="flex w-full flex-row justify-between gap-2">
      <p className="font-bold">Stored at &quot;{location}&quot;</p>
      <span className="inline-flex gap-4 text-sage-11 underline">
        <Link href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`} external>
          Google Maps
        </Link>
        <Link
          href={`https://maps.apple.com/?${new URLSearchParams({
            q: location,
            ll: `${lat},${lng}`,
            daddr: `${lat},${lng}`,
          }).toString()}`}
          external
        >
          Apple Maps
        </Link>
      </span>
    </div>
    <div className="w-full flex-1 overflow-hidden rounded-2xl">
      <Map defaultZoom={defaultZoom} defaultCenter={{ lat, lng }} {...props}>
        <Marker position={{ lat, lng }} title={location} />
      </Map>
    </div>
  </div>
);
