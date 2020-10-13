import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';

import AppointmentPickerFPCard from './AppointmentPickerFPCard';

const got = [
  { user_id: 'test_1', name: 'test_1_name' },
  { user_id: 'test_2', name: 'test_2_name' },
  { user_id: 'test_3', name: 'test_3_name' },
];

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

export default function AvailabilitiesPickerFP({ time, selectFP }) {
  const classes = useStyles();
  const { getAccessTokenSilently } = useAuth0();
  const [fps, setFPs] = useState([]);

  useEffect(() => {
    // get availabilities for current date
    (async (time) => {
      const initial = got;

      setFPs(initial);
    })(time);
  }, [time, getAccessTokenSilently]);

  const renderFPs = () =>
    fps.map((fp) => (
      <AppointmentPickerFPCard fp={fp} selectFP={selectFP} key={fp.user_id} />
    ));

  return <div className={classes.root}>{renderFPs()}</div>;
}
