'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type GoogleMapsAPIProviderProps = ComponentPropsWithoutRef<typeof APIProvider>;

export const GoogleMapsAPIProvider = ({ children, ...props }: GoogleMapsAPIProviderProps): ReactNode => (
  <APIProvider {...props}>{children}</APIProvider>
);
