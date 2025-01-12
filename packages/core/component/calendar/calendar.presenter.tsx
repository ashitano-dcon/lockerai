'use client';

import { cn } from '@lockerai/tailwind';
import type { ComponentPropsWithoutRef } from 'react';
import { DayPicker } from 'react-day-picker';
import { ArrowHeadIcon } from '#core/icon/arrow-head-icon';

type CalendarProps = ComponentPropsWithoutRef<typeof DayPicker>;

export const Calendar = ({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    className={cn('w-fit rounded-md border border-sage-7 bg-sage-2 p-3 shadow', className)}
    classNames={{
      months: cn('flex flex-col space-y-4 mobile:flex-row mobile:space-x-4 mobile:space-y-0'),
      month: cn('space-y-4'),
      caption: cn('relative flex items-center justify-center pt-1'),
      caption_label: cn('text-sm'),
      nav: cn('flex items-center space-x-1'),
      nav_button: cn(
        'inline-flex items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-50',
        'border border-sage-7 bg-sage-3 fill-sage-11 shadow-sm hover:border-sage-8 hover:bg-sage-4 hover:fill-sage-12',
        'h-7 w-7',
      ),
      nav_button_previous: cn('absolute left-1'),
      nav_button_next: cn('absolute right-1'),
      table: cn('w-full border-collapse space-y-1'),
      head_row: cn('flex'),
      head_cell: cn('w-8 text-sm text-sage-11'),
      row: cn('mt-2 flex w-full'),
      cell: cn(
        'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-sage-8 [&:has([aria-selected].day-outside)]:bg-sage-8/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
        // eslint-disable-next-line react/prop-types
        props.mode === 'range'
          ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
          : '[&:has([aria-selected])]:rounded-md',
      ),
      day: cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
        'bg-transparent hover:bg-sage-4 hover:text-sage-12',
        'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
      ),
      day_range_start: 'day-range-start',
      day_range_end: 'day-range-end',
      day_selected: cn('bg-sage-8 text-sage-12 hover:bg-sage-8'),
      day_today: cn('border border-sage-7 bg-sage-3 text-sage-12'),
      // eslint-disable-next-line tailwindcss/no-custom-classname
      day_outside: cn('day-outside text-sage-11 opacity-50  aria-selected:bg-sage-3/50 aria-selected:text-sage-11 aria-selected:opacity-30'),
      day_disabled: cn('text-sage-11 opacity-50'),
      day_range_middle: cn('aria-selected:bg-sage-3 aria-selected:text-sage-12'),
      day_hidden: 'invisible',
      ...classNames,
    }}
    components={{
      // eslint-disable-next-line react/prop-types
      IconLeft: ({ className: iconClassName, ...iconProps }) => <ArrowHeadIcon className={cn('h-4 w-4 rotate-90', iconClassName)} {...iconProps} />,
      // eslint-disable-next-line react/prop-types
      IconRight: ({ className: iconClassName, ...iconProps }) => <ArrowHeadIcon className={cn('h-4 w-4 -rotate-90', iconClassName)} {...iconProps} />,
    }}
    {...props}
  />
);

Calendar.displayName = Calendar.name;
