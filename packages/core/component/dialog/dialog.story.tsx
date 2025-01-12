import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '#core/component/button';
import { DialogContent } from './dialog-content.presenter';
import { DialogTrigger } from './dialog-trigger.presenter';
import { Dialog } from './dialog.presenter';

type Story = StoryObj<typeof Dialog>;

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  argTypes: {},
};

export default meta;

export const Default: Story = {
  render: ({ ...props }) => (
    <Dialog {...props}>
      <DialogTrigger>
        <Button
          variant={{
            border: true,
            color: 'sage',
          }}
        >
          Open
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex w-[560px] items-center gap-4">
          <div className="h-8 w-8 shrink-0 rounded-full bg-sage-3" />
          <div className="h-8 grow rounded-full bg-sage-3" />
        </div>
        <div className="flex w-[560px] flex-col gap-4">
          <div className="h-24 w-full rounded-2xl bg-sage-3" />
          <div className="h-8 w-full rounded-2xl bg-sage-3" />
        </div>
      </DialogContent>
    </Dialog>
  ),
};
