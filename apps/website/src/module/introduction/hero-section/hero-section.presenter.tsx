'use client';

import { BrandLogo } from '@lockerai/core/component/brand-logo';
import { LinkButton } from '@lockerai/core/component/link-button';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { type ComponentPropsWithoutRef, type ReactNode, useEffect, useState } from 'react';
import { useRouter } from '#website/i18n/navigation';
import { RelateResultDialog } from './component/relate-result-dialog';
import { SignInDialog } from './component/sign-in-dialog';

type HeroSectionProps = Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'className'> & {
  asAuth?: boolean;
  redirectPathname?: string;
  asRelateResult?: boolean;
};

export const HeroSection = ({ asAuth, redirectPathname, asRelateResult, ...props }: HeroSectionProps): ReactNode => {
  const t = useTranslations('HeroSection');
  const [isLogoAnimated, setIsLogoAnimated] = useState(false);
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState<boolean>();
  const [isRelateResultDialogOpen, setIsRelateResultDialogOpen] = useState<boolean>();

  const router = useRouter();

  useEffect(() => {
    setIsSignInDialogOpen(asAuth ?? false);
    setIsRelateResultDialogOpen(asRelateResult ?? false);
  }, [asAuth, asRelateResult]);

  useEffect(() => {
    if (isSignInDialogOpen === false && isRelateResultDialogOpen === false) {
      router.push('/');
    }
  }, [isSignInDialogOpen, isRelateResultDialogOpen, router]);

  return (
    <section className="relative flex h-[100svh] items-center justify-center px-5 tablet:px-20" {...props}>
      <SignInDialog open={isSignInDialogOpen} onOpenChange={setIsSignInDialogOpen} redirectPathname={redirectPathname} />
      <RelateResultDialog open={isRelateResultDialogOpen} onOpenChange={setIsRelateResultDialogOpen} defaultOpen={asRelateResult} />
      <div className="flex w-[940px] flex-col items-center gap-8 tablet:gap-16">
        <motion.hgroup layout data-chromatic="ignore" className="flex flex-col items-center gap-6">
          <motion.h1 layout className="w-fit">
            <span className="sr-only">{t('srTitle')}</span>
            <BrandLogo
              aria-hidden
              withAnimate
              onAnimationComplete={() => setIsLogoAnimated(true)}
              className="h-auto w-[84vw] drop-shadow-xl laptop:h-40 desktop:h-52"
            />
          </motion.h1>
          {isLogoAnimated && (
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: 'easeOut',
              }}
              layout
              data-chromatic="ignore"
              className="text-center text-4xl text-sage-12 tablet:text-5xl laptop:text-7xl"
            >
              <span className="flex flex-col font-extra-bold">
                <span className="flex flex-col tablet:inline">
                  <span className="text-purple-11">{t('deliver')}</span>
                  <span className="hidden tablet:inline">&nbsp;</span>
                  <span className="text-amber-11">{t('store')}</span>
                  <span className="hidden tablet:inline">&nbsp;</span>
                  <span className="text-cyan-11">{t('retrieve')}</span>
                </span>
                <span>{t('lostItems')}</span>
              </span>
              <span className="font-display-black text-green-11">{t('securely')}</span>
            </motion.p>
          )}
        </motion.hgroup>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
            delay: 2.5,
          }}
          data-chromatic="ignore"
          className="flex w-5/6 flex-col items-center gap-4 tablet:w-auto tablet:flex-row tablet:gap-20"
        >
          <LinkButton
            href="/report"
            variant={{
              blur: true,
              border: true,
              color: 'purple',
              width: {
                initial: 'full',
                tablet: 'auto',
              },
            }}
          >
            {t('iFound')}
          </LinkButton>
          <LinkButton
            href="/search"
            variant={{
              blur: true,
              border: true,
              color: 'cyan',
              width: {
                initial: 'full',
                tablet: 'auto',
              },
            }}
          >
            {t('iLost')}
          </LinkButton>
        </motion.div>
      </div>
    </section>
  );
};
