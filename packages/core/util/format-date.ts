import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

type Pattern =
  | 'yyyy-MM-dd HH:mm:ss'
  | 'yyyy-MM-dd HH:mm'
  | 'yyyy-MM-dd'
  | 'yyyy/MM/dd HH:mm:ss'
  | 'yyyy/MM/dd HH:mm'
  | 'yyyy/MM/dd'
  | 'MMM. dd, yyyy'
  | 'MMM. dd, yyyy HH:mm'
  | 'MMMM dd, yyyy';

export const formatDate = (date: Date, pattern: Pattern) => format(utcToZonedTime(date, 'Asia/Tokyo'), pattern);
