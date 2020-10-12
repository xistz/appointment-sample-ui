import React from 'react';
import { Grid } from '@material-ui/core';
import { set } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';

import Availabilty from './Availability';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

export default function Availabilities({ date }) {
  const isWeekday = date.getDay() !== 6;
  const classes = useStyles();

  return (
    <Grid item>
      <div className={classes.root}>
        {isWeekday && (
          <Availabilty
            datetime={set(date, {
              hours: 10,
              minutes: 0,
              seconds: 0,
              milliseconds: 0,
            })}
          />
        )}
        {isWeekday && (
          <Availabilty
            datetime={set(date, {
              hours: 10,
              minutes: 30,
              seconds: 0,
              milliseconds: 0,
            })}
          />
        )}
        <Availabilty
          datetime={set(date, {
            hours: 11,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          })}
        />
        <Availabilty
          datetime={set(date, {
            hours: 11,
            minutes: 30,
            seconds: 0,
            milliseconds: 0,
          })}
        />
        <Availabilty
          datetime={set(date, {
            hours: 12,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          })}
        />
        <Availabilty
          datetime={set(date, {
            hours: 12,
            minutes: 30,
            seconds: 0,
            milliseconds: 0,
          })}
        />
        <Availabilty
          datetime={set(date, {
            hours: 13,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          })}
        />
        <Availabilty
          datetime={set(date, {
            hours: 13,
            minutes: 30,
            seconds: 0,
            milliseconds: 0,
          })}
        />
        <Availabilty
          datetime={set(date, {
            hours: 14,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          })}
        />
        <Availabilty
          datetime={set(date, {
            hours: 14,
            minutes: 30,
            seconds: 0,
            milliseconds: 0,
          })}
        />
        {isWeekday && (
          <Availabilty
            datetime={set(date, {
              hours: 15,
              minutes: 0,
              seconds: 0,
              milliseconds: 0,
            })}
          />
        )}
        {isWeekday && (
          <Availabilty
            datetime={set(date, {
              hours: 15,
              minutes: 30,
              seconds: 0,
              milliseconds: 0,
            })}
          />
        )}
        {isWeekday && (
          <Availabilty
            datetime={set(date, {
              hours: 16,
              minutes: 0,
              seconds: 0,
              milliseconds: 0,
            })}
          />
        )}
        {isWeekday && (
          <Availabilty
            datetime={set(date, {
              hours: 16,
              minutes: 30,
              seconds: 0,
              milliseconds: 0,
            })}
          />
        )}
        {isWeekday && (
          <Availabilty
            datetime={set(date, {
              hours: 17,
              minutes: 0,
              seconds: 0,
              milliseconds: 0,
            })}
          />
        )}
        {isWeekday && (
          <Availabilty
            datetime={set(date, {
              hours: 17,
              minutes: 30,
              seconds: 0,
              milliseconds: 0,
            })}
          />
        )}
      </div>
    </Grid>
  );
}
