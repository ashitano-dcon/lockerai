import { Image } from '@lockerai/core/component/image';
import { ThemeProvider } from '@lockerai/core/component/theme-provider';
import { firaCode, getFontVariables, notoSans } from '@lockerai/core/font/family';
import { cn } from '@lockerai/tailwind';
import { withThemeByDataAttribute } from '@storybook/addon-styling';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
import React from 'react';
import './storybook.css';

Image.defaultProps = {
  unoptimized: true,
};

const themeDataAttribute = 'data-theme';
const defaultTheme = 'light';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute={themeDataAttribute} defaultTheme={defaultTheme}>
        <Story />
      </ThemeProvider>
    ),
    // FIXME: I'm trying to add fontFamily to className and load the font by next/font, but oddly enough this does not work correctly.
    // Probably due to the fact that it work on monorepo.
    (Story) => (
      <div className={cn(getFontVariables([firaCode, notoSans]), 'font-sans')}>
        <Story />
      </div>
    ),
    withThemeByDataAttribute({
      attributeName: themeDataAttribute,
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme,
    }),
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
};

export default preview;
