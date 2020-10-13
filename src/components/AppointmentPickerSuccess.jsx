import React from 'react';
import { Typography } from '@material-ui/core';

export default function AppointmentPickerSuccess() {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Thank you.
      </Typography>
      <Typography variant="subtitle1">
        The appointment has been made.
      </Typography>
    </React.Fragment>
  );
}
