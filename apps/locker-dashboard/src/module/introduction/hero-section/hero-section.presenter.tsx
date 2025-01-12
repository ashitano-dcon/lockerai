'use client';

import { BrandLogo } from '@lockerai/core/component/brand-logo';
import { motion } from 'framer-motion';
import { type ComponentPropsWithoutRef, type ReactNode, useState } from 'react';

type HeroSectionProps = Omit<ComponentPropsWithoutRef<typeof motion.section>, 'children' | 'className'>;

export const HeroSection = ({ ...props }: HeroSectionProps): ReactNode => {
  const [isLogoAnimated, setIsLogoAnimated] = useState(false);

  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="relative flex h-[100svh] items-center justify-center px-5 tablet:px-20"
      {...props}
    >
      <div className="flex w-[940px] flex-col items-center gap-8 tablet:gap-16">
        <motion.hgroup layout data-chromatic="ignore" className="flex flex-col items-center gap-6">
          <motion.h1 layout className="w-fit">
            <span className="sr-only">Locker.ai</span>
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
                  <span className="text-purple-11">deliver,</span>
                  <span className="hidden tablet:inline">&nbsp;</span>
                  <span className="text-amber-11">store,</span>
                  <span className="hidden tablet:inline">&nbsp;</span>
                  <span className="text-cyan-11">retrieve</span>
                </span>
                <span>Lost items</span>
              </span>
              <span className="font-display-black text-green-11">Securely.</span>
            </motion.p>
          )}
        </motion.hgroup>
      </div>
    </motion.section>
  );
};
