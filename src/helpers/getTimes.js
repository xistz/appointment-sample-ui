import { set } from 'date-fns';

import isWeekday from './isWeekday';

const getTimes = (date) => {
  return [
    ...(isWeekday(date)
      ? [
          set(date, {
            hours: 10,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          }),
          set(date, {
            hours: 10,
            minutes: 30,
            seconds: 0,
            milliseconds: 0,
          }),
        ]
      : []),
    set(date, {
      hours: 11,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    set(date, {
      hours: 11,
      minutes: 30,
      seconds: 0,
      milliseconds: 0,
    }),
    set(date, {
      hours: 12,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    set(date, {
      hours: 12,
      minutes: 30,
      seconds: 0,
      milliseconds: 0,
    }),
    set(date, {
      hours: 13,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    set(date, {
      hours: 13,
      minutes: 30,
      seconds: 0,
      milliseconds: 0,
    }),
    set(date, {
      hours: 14,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    set(date, {
      hours: 14,
      minutes: 30,
      seconds: 0,
      milliseconds: 0,
    }),
    ...(isWeekday(date)
      ? [
          set(date, {
            hours: 15,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          }),
          set(date, {
            hours: 15,
            minutes: 30,
            seconds: 0,
            milliseconds: 0,
          }),
          set(date, {
            hours: 16,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          }),
          set(date, {
            hours: 16,
            minutes: 30,
            seconds: 0,
            milliseconds: 0,
          }),
          set(date, {
            hours: 17,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          }),
          set(date, {
            hours: 17,
            minutes: 30,
            seconds: 0,
            milliseconds: 0,
          }),
        ]
      : []),
  ];
};

export default getTimes;
