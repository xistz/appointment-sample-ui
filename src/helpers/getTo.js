import { formatISO, set } from 'date-fns';
import isWeekday from './isWeekday';

const getTo = (date) =>
  formatISO(
    set(date, {
      hours: isWeekday(date) ? 17 : 14,
      minutes: 30,
      seconds: 0,
      milliseconds: 0,
    })
  );

export default getTo;
