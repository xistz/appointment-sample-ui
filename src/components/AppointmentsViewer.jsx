import { useAuth0 } from '@auth0/auth0-react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getFrom, getTo } from '../helpers';
import AppointmentViewerCard from './AppointmentViewerCard';

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

export default function AppointmentsViewer({ date }) {
  const classes = useStyles();
  const { getAccessTokenSilently, user } = useAuth0();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // get appointments for current date
    (async (date) => {
      const token = await getAccessTokenSilently();

      const getAppointmentsURL = `${process.env.REACT_APP_API_URL}/appointments`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const params = {
        from: getFrom(date),
        to: getTo(date),
      };

      const response = await axios.get(getAppointmentsURL, {
        params,
        headers,
      });
      const { data } = response.data;

      const isClient = user[
        `${process.env.REACT_APP_AUTH0_NAMESPACE}/roles`
      ].includes('client');

      const initial = data.map((appointment) => {
        const parsed = {};

        const {
          id,
          attributes: { from },
        } = appointment;
        parsed['id'] = id;
        parsed['from'] = from;

        let name;
        let picture;

        if (isClient) {
          ({ name, picture } = appointment.attributes.fp);
        } else {
          ({ name, picture } = appointment.attributes.client);
        }

        parsed['name'] = name;
        parsed['picture'] = picture;

        return parsed;
      });

      setAppointments(initial);
    })(date);
  }, [date, user, getAccessTokenSilently]);

  const deleteAppointment = async (id, index) => {
    try {
      const token = await getAccessTokenSilently();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const deleteAppointmentURL = `${process.env.REACT_APP_API_URL}/appointments/${id}`;

      await axios.delete(deleteAppointmentURL, { headers });

      const updated = [...appointments];
      updated.splice(index, 1);
      setAppointments(updated);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const renderAppointments = () => {
    if (appointments.length === 0)
      return (
        <Typography component="h3" variant="h6" align="center">
          You have no appointments today!
        </Typography>
      );

    return appointments.map((appointment, index) => {
      return (
        <AppointmentViewerCard
          appointment={appointment}
          index={index}
          key={appointment.id}
          handleChange={deleteAppointment}
        />
      );
    });
  };

  return <Paper className={classes.paper}>{renderAppointments()}</Paper>;
}
