'use client';

import type { ComponentPropsWithRef, ElementRef } from 'react';
import { forwardRef, useState } from 'react';
import { Skeleton } from '#core/component/skeleton';
import { Image as ImagePresenter } from './image.presenter';

type ImageProps = Omit<ComponentPropsWithRef<typeof ImagePresenter>, 'id' | 'placeholder'> & {
  skeleton?: Omit<ComponentPropsWithRef<typeof Skeleton>, 'children'>;
};

export const Image = forwardRef<ElementRef<typeof ImagePresenter>, Omit<ImageProps, 'ref'>>(({ priority, skeleton, ...props }, ref) => {
  const [isLoaded, setIsLoaded] = useState<boolean>();

  const placeholder = priority ? undefined : 'blur';

  return (
    <Skeleton
      variant={{
        'effect-hidden': isLoaded || !placeholder,
      }}
      {...skeleton}
    >
      <ImagePresenter
        ref={ref}
        placeholder={placeholder}
        priority={priority}
        onLoadStart={() => setIsLoaded(false)}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </Skeleton>
  );
});

Image.displayName = Image.name;
