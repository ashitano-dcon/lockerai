'use client';

import { Link } from '@lockerai/core/component/link';
import { cn } from '@lockerai/tailwind';
import { Map, Marker } from '@vis.gl/react-google-maps';
import { useLocale, useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import type { CurrentTargetLostItem } from '#website/common/model/lost-item';
import { pickI18nText } from '#website/i18n/locales';

type LockerMapProps = NonNullable<Required<CurrentTargetLostItem>['drawer']>['locker'] & ComponentPropsWithoutRef<typeof Map>;

export const LockerMap = ({ lat, lng, location, locationI18n, defaultZoom = 15, className, ...props }: LockerMapProps) => {
  const t = useTranslations('LockerMap');
  const locale = useLocale();
  const locationI18nText = pickI18nText(locationI18n, locale, location);

  return (
    <div className={cn('flex flex-col items-start gap-2', className)}>
      <div className="flex w-full flex-row justify-between gap-2">
        <p className="font-bold">{t('storedAt', { location: locationI18nText })}</p>
        <span className="inline-flex gap-4 text-sage-11 underline">
          <Link href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`} external>
            {t('googleMapsLink')}
          </Link>
          <Link
            href={`https://maps.apple.com/?${new URLSearchParams({
              q: location,
              ll: `${lat},${lng}`,
              daddr: `${lat},${lng}`,
            }).toString()}`}
            external
          >
            {t('appleMapsLink')}
          </Link>
        </span>
      </div>
      <div className="w-full flex-1 overflow-hidden rounded-2xl">
        <Map defaultZoom={defaultZoom} defaultCenter={{ lat, lng }} {...props}>
          <Marker position={{ lat, lng }} title={locationI18nText} />
        </Map>
      </div>
    </div>
  );
};
