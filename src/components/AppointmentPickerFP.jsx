import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AppointmentPickerFPCard from './AppointmentPickerFPCard';

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

export default function AvailabilitiesPickerFP({ time, selectAvailability }) {
  const classes = useStyles();
  const { getAccessTokenSilently } = useAuth0();
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    // get availabilities for current time
    (async (time) => {
      const token = await getAccessTokenSilently();

      const getAvailabilitiesURL = `${process.env.REACT_APP_API_URL}/availabilities/search`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const params = {
        at: time,
      };

      const response = await axios.get(getAvailabilitiesURL, {
        params,
        headers,
      });
      const { data } = response.data;

      const initial = data.map((availability) => {
        const {
          id,
          fp: { name: fp_name, picture: fp_picture },
        } = availability;

        return { id, fp_name, fp_picture };
      });

      setAvailabilities(initial);
    })(time);
  }, [time, getAccessTokenSilently]);

  const renderFPs = () =>
    availabilities.map((availability) => (
      <AppointmentPickerFPCard
        availability={availability}
        selectAvailability={selectAvailability}
        key={availability.id}
      />
    ));

  return <div className={classes.root}>{renderFPs()}</div>;
}
