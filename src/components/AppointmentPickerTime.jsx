import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import AppointmentPickerTimeCard from './AppointmentPickerTimeCard';
import { getFrom, getTo } from '../helpers';
import { Typography } from '@material-ui/core';

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
  const [times, setTimes] = useState([]);

  useEffect(() => {
    // get availabilities for current date
    (async (date) => {
      const token = await getAccessTokenSilently();

      const getAvailabilitiesURL = `${window.location.origin}/api/availabilities/search`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const params = {
        from: getFrom(date),
        to: getTo(date),
      };

      const response = await axios.get(getAvailabilitiesURL, {
        params,
        headers,
      });
      const { data } = response.data;

      const initial = data.map((time) => {
        const {
          attributes: { from },
        } = time;

        return from;
      });

      setTimes(initial);
    })(date);
  }, [date, getAccessTokenSilently]);

  const renderAvailabilities = () => {
    if (times.length === 0) {
      return (
        <Typography component="h3" variant="h6" align="center">
          Sorry! Our financial planners are not available today.
        </Typography>
      );
    }

    return times.map((time) => {
      const availability = new Date(time);

      return (
        <AppointmentPickerTimeCard
          datetime={availability}
          key={availability}
          selectTime={selectTime}
        />
      );
    });
  };

  return <div className={classes.root}>{renderAvailabilities()}</div>;
}
