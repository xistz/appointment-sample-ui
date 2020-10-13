import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Stepper, Step, StepLabel, Typography } from '@material-ui/core';

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
  const [activeStep, setActiveStep] = React.useState(0);
  const [time, setTime] = React.useState('');
  const [fp, setFP] = React.useState('');

  useEffect(() => {
    setActiveStep(0);
    setTime('');
    setFP('');
  }, [date]);

  const selectTime = (event) => {
    const { name } = event.currentTarget;

    setTime(name);
    setActiveStep(1);
  };

  const selectFP = (event) => {
    const { id } = event.currentTarget;
    setFP(id);
    setActiveStep(2);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AppointmentPickerTime date={date} selectTime={selectTime} />;
      case 1:
        return <AppointmentPickerFP time={time} selectFP={selectFP} />;
      case 2:
        return <AppointmentPickerSuccess />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h4" align="center">
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
