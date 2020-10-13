import { formatISO, set } from 'date-fns';
import isWeekday from './isWeekday';

const getFrom = (date) =>
  formatISO(
    set(date, {
      hours: isWeekday(date) ? 10 : 11,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    })
  );

export default getFrom;
