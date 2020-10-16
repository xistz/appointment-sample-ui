import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function AppointmentPickerSuccess() {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => history.push('/appointments'), 5000);
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom align="center">
        Thank you.
      </Typography>
      <Typography variant="subtitle1" align="center">
        The appointment has been made. You will be redirected in 5s.
      </Typography>
    </React.Fragment>
  );
}
