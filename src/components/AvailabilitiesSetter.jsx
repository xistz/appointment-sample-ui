import { useAuth0 } from '@auth0/auth0-react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { formatISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { getFrom, getTimes, getTo } from '../helpers';
import AvailabiltySetterCard from './AvailabilitySetterCard';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));

export default function AvailabilitiesSetter({ date }) {
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
        const { id, from } = current;

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
      console.error(error.response.data);
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
        <AvailabiltySetterCard
          datetime={availability}
          key={availability}
          id={availabilities[datetime]}
          handleChange={handleChange}
        />
      );
    });

  return <Paper className={classes.paper}>{renderAvailabilities()}</Paper>;
}
