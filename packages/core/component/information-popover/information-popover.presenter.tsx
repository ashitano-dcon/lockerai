import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '#core/component/popover';
import { InformationIcon } from '#core/icon/information-icon';

type InformationPopoverProps = Omit<ComponentPropsWithoutRef<typeof Popover>, 'children'> & {
  description: string;
};

export const InformationPopover = ({ description, ...props }: InformationPopoverProps): ReactNode => (
  <Popover {...props}>
    <PopoverTrigger className="transition hover:opacity-80">
      <InformationIcon className="h-3 w-3 fill-sage-11" />
    </PopoverTrigger>
    <PopoverContent>
      <p className="text-sm text-sage-11">{description}</p>
    </PopoverContent>
  </Popover>
);
