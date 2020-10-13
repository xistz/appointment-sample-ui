import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { set } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { formatISO } from 'date-fns';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

import Availabilty from './Availability';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

const isWeekday = (date) => date.getDay() !== 6;

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

const getFrom = (date) =>
  formatISO(
    set(date, {
      hours: isWeekday(date) ? 10 : 11,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    })
  );

const getTo = (date) =>
  formatISO(
    set(date, {
      hours: isWeekday(date) ? 17 : 14,
      minutes: 30,
      seconds: 0,
      milliseconds: 0,
    })
  );

export default function Availabilities({ date }) {
  const classes = useStyles();
  const { getAccessTokenSilently } = useAuth0();
  const [availabilities, setAvailabilities] = useState({});

  useEffect(() => {
    // get availabilities for current date
    (async (date) => {
      const token = await getAccessTokenSilently();

      const getAvailabilitiesURL = `${process.env.REACT_APP_API_URL}/availabilities`;
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

      const got = data.reduce((result, current) => {
        const {
          id,
          attributes: { from },
        } = current;

        const datetime = formatISO(new Date(from));

        result[datetime] = id;

        return result;
      }, {});

      setAvailabilities(got);
    })(date);
  }, [date, getAccessTokenSilently]);

  const handleChange = async (event) => {
    const { checked, name } = event.target;

    const updated = {};
    try {
      const token = await getAccessTokenSilently();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (checked) {
        const createAvailabilityURL = `${process.env.REACT_APP_API_URL}/availabilities`;
        const data = {
          from: name,
        };

        const response = await axios.post(createAvailabilityURL, data, {
          headers,
        });

        const { id } = response.data;

        updated[name] = id;
      } else {
        const id = availabilities[name];
        const deleteAvailabilityURL = `${process.env.REACT_APP_API_URL}/availabilities/${id}`;

        await axios.delete(deleteAvailabilityURL, { headers });

        updated[name] = undefined;
      }
    } catch (error) {
      console.log(error.response.data);
    }

    setAvailabilities({
      ...availabilities,
      ...updated,
    });
  };

  const times = getTimes(date);
  const renderAvailabilities = () =>
    times.map((availability) => {
      const datetime = formatISO(availability);

      return (
        <Availabilty
          datetime={availability}
          key={availability}
          id={availabilities[datetime]}
          handleChange={handleChange}
        />
      );
    });

  return (
    <Grid item>
      <div className={classes.root}>{renderAvailabilities()}</div>
    </Grid>
  );
}
