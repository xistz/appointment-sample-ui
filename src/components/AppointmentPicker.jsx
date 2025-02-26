import { useAuth0 } from '@auth0/auth0-react';
import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AppointmentPickerFP from './AppointmentPickerFP';
import AppointmentPickerSuccess from './AppointmentPickerSuccess';
import AppointmentPickerTime from './AppointmentPickerTime';

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

  const selectTime = (selectedTime) => {
    setTime(selectedTime);
    setActiveStep(1);
  };

  const selectAvailability = async (availability_id) => {
    try {
      const token = await getAccessTokenSilently();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const createAppointmentURL = `${process.env.REACT_APP_API_URL}/appointments`;
      const data = {
        availability_id,
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
