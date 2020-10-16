import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import AppointmentPickerTime from './AppointmentPickerTime';
import AppointmentPickerFP from './AppointmentPickerFP';
import AppointmentPickerSuccess from './AppointmentPickerSuccess';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
}));

const steps = ['Time', 'Financial Planner'];

export default function AppointmentPicker({ date }) {
  const classes = useStyles();
  const { getAccessTokenSilently } = useAuth0();
  const [activeStep, setActiveStep] = useState(0);
  const [time, setTime] = useState('');

  useEffect(() => {
    setActiveStep(0);
    setTime('');
  }, [date]);

  const selectTime = (event) => {
    const { name } = event.currentTarget;

    setTime(name);
    setActiveStep(1);
  };

  const selectAvailability = async (event) => {
    const { id } = event.currentTarget;

    try {
      const token = await getAccessTokenSilently();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const createAppointmentURL = `${process.env.REACT_APP_API_URL}/appointments`;
      const data = {
        availability_id: id,
      };

      await axios.post(createAppointmentURL, data, {
        headers,
      });
      setActiveStep(2);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AppointmentPickerTime date={date} selectTime={selectTime} />;
      case 1:
        return (
          <AppointmentPickerFP
            time={time}
            selectAvailability={selectAvailability}
          />
        );
      case 2:
        return <AppointmentPickerSuccess />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography component="h2" variant="h5" align="center">
        Pick a...
      </Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
    </Paper>
  );
}
