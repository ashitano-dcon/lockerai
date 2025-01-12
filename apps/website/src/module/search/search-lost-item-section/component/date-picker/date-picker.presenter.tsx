'use client';

import { Calendar } from '@lockerai/core/component/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@lockerai/core/component/popover';
import { CalendarIcon } from '@lockerai/core/icon/calendar-icon';
import { formatDate } from '@lockerai/core/util/format-date';
import { cn } from '@lockerai/tailwind';
import { type ComponentPropsWithoutRef, type Dispatch, type SetStateAction, useEffect, useId, useState } from 'react';

type DatePickerProps = Omit<ComponentPropsWithoutRef<'label'>, 'children' | 'className' | 'htmlFor'> & {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  error?: string;
  input?: Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'type' | 'className'>;
};

export const DatePicker = ({ date, setDate, error, input, ...props }: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const dateInputId = useId();

  useEffect(() => {
    setOpen(false);
  }, [date]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <input id={dateInputId} type="date" className="hidden" {...input} />
      <PopoverTrigger asChild>
        <label
          htmlFor={dateInputId}
          className={cn(
            'flex w-fit cursor-pointer flex-col overflow-hidden rounded-xl border border-green-7 bg-sage-3 transition hover:bg-sage-4',
            error && 'border-red-7',
          )}
          {...props}
        >
          <span className="flex w-full items-center justify-between gap-8 border-b border-sage-7 bg-sage-1 p-3 tablet:px-5">
            <span className="text-base font-bold text-sage-11 tablet:text-lg">Date of lost</span>
            {error && <span className="text-sm text-red-11 tablet:text-base">{error}</span>}
          </span>
          <span className="flex items-center justify-between gap-10 p-3 tablet:px-5">
            <span className="font-code text-sm tablet:text-base">
              {date ? <span className="text-sage-12">{formatDate(date, 'MMMM dd, yyyy')}</span> : <span className="text-sage-11">Pick a date</span>}
            </span>
            <CalendarIcon className="h-4 w-4 fill-sage-11" />
          </span>
        </label>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
};
