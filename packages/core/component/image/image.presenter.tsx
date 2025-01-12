'use client';

import NextImage, { unstable_getImgProps as getImgProps } from 'next/image';
import type { ComponentPropsWithRef, ElementRef } from 'react';
import { forwardRef, useMemo } from 'react';

const isImageSourceRemote = (src: string | unknown): src is string => typeof src === 'string';

type ImageProps = ComponentPropsWithRef<typeof NextImage>;

export const Image = forwardRef<ElementRef<typeof NextImage>, Omit<ImageProps, 'ref'>>(({ src, blurDataURL, ...props }, ref) => {
  const remoteBlurDataURL = useMemo(() => (isImageSourceRemote(src) ? `/_next/image?url=${encodeURIComponent(src)}&w=8&q=70` : undefined), [src]);

  return <NextImage ref={ref} src={src} blurDataURL={remoteBlurDataURL || blurDataURL} {...props} />;
});

Image.displayName = Image.name;

export const getBackgroundImageUrl = ({ ...props }: ImageProps) =>
  getImgProps(props)
    .props.srcSet?.split(', ')
    .map((src) => src.split(' '))
    .map(([src, width]) => `url(${src}) ${width}`)
    .join(',');
