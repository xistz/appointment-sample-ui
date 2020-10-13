import React, { useState, useEffect } from 'react';
import { formatISO } from 'date-fns';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';

import AppointmentPickerTimeCard from './AppointmentPickerTimeCard';
import { getTimes } from '../helpers';

const got = {
  '2020-10-13T01:00:00.000Z': true,
  '2020-10-13T03:00:00.000Z': true,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));

export default function AvailabilitiesPickerTime({ date, selectTime }) {
  const classes = useStyles();
  const { getAccessTokenSilently } = useAuth0();
  const [availabilities, setAvailabilities] = useState({});

  useEffect(() => {
    // get availabilities for current date
    (async (date) => {
      const initial = {};

      for (const from in got) {
        const datetime = formatISO(new Date(from));

        initial[datetime] = got[from];
      }

      setAvailabilities(initial);
    })(date);
  }, [date]);

  const times = getTimes(date);
  const renderAvailabilities = () =>
    times.reduce((result, availability) => {
      const datetime = formatISO(availability);

      if (availabilities[datetime]) {
        result.push(
          <AppointmentPickerTimeCard
            datetime={availability}
            key={availability}
            selectTime={selectTime}
          />
        );
      }

      return result;
    }, []);

  return <div className={classes.root}>{renderAvailabilities()}</div>;
}
