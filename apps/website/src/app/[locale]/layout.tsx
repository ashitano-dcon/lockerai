import { Sonner } from '@lockerai/core/component/sonner';
import { ThemeProvider } from '@lockerai/core/component/theme-provider';
import { firaCode, getFontVariables, notoSans } from '@lockerai/core/font/family';
import { getBaseUrl } from '@lockerai/core/util/get-base-url';
import { colors } from '@lockerai/design-token';
import { cn } from '@lockerai/tailwind';
import type { Metadata, NextPage, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { GoogleMapsAPIProvider } from '#website/common/component/google-maps-api-provider';
import { routing } from '#website/i18n/routing';
import { UrqlProvider } from '#website/infra/urql/ssr';
import { Footer } from '#website/layout/global/footer';
import '#website/style/global.css';

type RootLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const RootLayout: NextPage<RootLayoutProps> = async ({ children, params }) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(getFontVariables([firaCode, notoSans]), 'relative bg-sage-1 font-sans')}>
        <div
          aria-hidden
          className={cn(
            'absolute -z-20 h-full w-full bg-grid-light-green-7/50 dark:bg-grid-dark-green-7/50',
            'from-pure to-[70%] [-webkit-mask-image:linear-gradient(to_bottom,var(--tw-gradient-stops))] [mask-image:linear-gradient(to_bottom,var(--tw-gradient-stops))]',
          )}
        />
        <NextIntlClientProvider>
          <UrqlProvider>
            <ThemeProvider attribute="data-theme" enableSystem defaultTheme="system">
              <GoogleMapsAPIProvider apiKey={process.env['NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'] || ''}>
                {children}
                <Footer />
                <Sonner />
              </GoogleMapsAPIProvider>
            </ThemeProvider>
          </UrqlProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('Layout');
  const title = t('metadataTitle');
  const description = t('metadataDescription');

  return {
    description,
    metadataBase: getBaseUrl({ app: 'website' }),
    openGraph: {
      title,
      description,
      locale: 'en_US',
      url: getBaseUrl({ app: 'website' }),
    },
    title: {
      default: title,
      template: '%s | Locker.ai',
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
};

export const generateViewport = async (): Promise<Viewport> => ({
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: colors.light.green['7'] },
    { media: '(prefers-color-scheme: dark)', color: colors.dark.green['7'] },
  ],
});
