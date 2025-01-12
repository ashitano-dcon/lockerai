import { Sonner } from '@lockerai/core/component/sonner';
import { ThemeProvider } from '@lockerai/core/component/theme-provider';
import { firaCode, getFontVariables, notoSans } from '@lockerai/core/font/family';
import { getBaseUrl } from '@lockerai/core/util/get-base-url';
import { colors } from '@lockerai/design-token';
import { cn } from '@lockerai/tailwind';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Metadata, NextPage, Viewport } from 'next';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import { UrqlProvider } from '#website/infra/urql/ssr';
import { Footer } from '#website/layout/global/footer';
import { Header } from '#website/layout/global/header';
import { findUserUseCase } from '#website/use-case/find-user';
import '#website/style/global.css';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: NextPage<RootLayoutProps> = async ({ children }) => {
  // HACK: To avoid next build errors, functions that depend on async contexts need to be called outside the function that creates the new execution context.
  // ref: https://nextjs.org/docs/messages/dynamic-server-error
  const cookieStore = cookies();

  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const foundUser = user && (await findUserUseCase(user.id));

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
        <UrqlProvider>
          <ThemeProvider attribute="data-theme" enableSystem defaultTheme="system">
            <Header user={foundUser} />
            {children}
            <Footer />
            <Sonner />
          </ThemeProvider>
        </UrqlProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'Locker.ai | deliver, store, retrieve lost items securely';
  const description = 'Locker.ai is a service that uses a unique AI-driven authentication mechanism to safely report and retrieve lost items.';

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
