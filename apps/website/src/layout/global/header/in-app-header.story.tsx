import type { Meta, StoryObj } from '@storybook/react';
import {
  InAppHeader,
  InAppHeaderRouteIndicatorDivider,
  InAppHeaderRouteIndicatorIcon,
  InAppHeaderRouteIndicatorLabel,
} from './in-app-header.presenter';

type Story = StoryObj<typeof InAppHeader>;

const meta = {
  component: InAppHeader,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/dashboard',
      },
    },
  },
} satisfies Meta<typeof InAppHeader>;

export default meta;

export const Default: Story = {};

export const Search: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/search',
      },
    },
  },
};

export const Report: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/report',
      },
    },
  },
};

export const WithRouteIndicator: Story = {
  args: {
    children: (
      <>
        <InAppHeaderRouteIndicatorDivider />
        <InAppHeaderRouteIndicatorIcon
          src="https://avatars.githubusercontent.com/u/16751535?v=4"
          alt="An image of Knitted Cardigan With a Green Argyle Pattern"
        />
        <InAppHeaderRouteIndicatorLabel>Knitted Cardigan With a Green Argyle Pattern</InAppHeaderRouteIndicatorLabel>
      </>
    ),
  },
};
