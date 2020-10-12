import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { format, formatISO } from 'date-fns';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minWidth: 290,
    margin: theme.spacing(1),
  },
}));

export default function Availability({ datetime }) {
  const [checked, setChecked] = useState(false);
  const [id, setID] = useState(null);
  const classes = useStyles();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    console.log('call show');
  }, [datetime]);

  const handleChange = async (event) => {
    const { checked } = event.target;

    const token = await getAccessTokenSilently();
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      if (checked) {
        console.log('create');
        const data = {
          from: formatISO(datetime),
        };

        const createAvailabilityURL = `${process.env.REACT_APP_API_URL}/availabilities`;

        const response = await axios.post(createAvailabilityURL, data, {
          headers,
        });

        const { id } = response.data;
        setID(id);
      } else {
        console.log('delete');
        const deleteAvailabilityURL = `${process.env.REACT_APP_API_URL}/availabilities/${id}`;

        await axios.delete(deleteAvailabilityURL, { headers });

        setID(null);
      }
    } catch (error) {
      const { message } = error.response.data;
      console.error(message);
      return;
    }

    setChecked(checked);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
          {format(datetime, 'HH:mm')}
        </Typography>
      </CardContent>
      <FormControlLabel
        control={
          <Switch checked={checked} onChange={handleChange} name="checkedA" />
        }
        label={checked ? 'Available' : 'Unavailable'}
      />
    </Card>
  );
}
