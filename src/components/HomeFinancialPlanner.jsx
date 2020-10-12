import React, { useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Typography, Container, Grid, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';

import Availabilities from './Availabilities';
// import Appointments from './Appointments';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function HomeFinancialPlanner() {
  const [date, changeDate] = useState(new Date());
  const classes = useStyles();

  const disableSunday = (date) => {
    return date.getDay() === 0;
  };

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Please set your availability
        </Typography>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                autoOk
                variant="static"
                openTo="date"
                value={date}
                onChange={changeDate}
                shouldDisableDate={disableSunday}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid container item sm wrap="nowrap">
            <Availabilities date={date} />
            {/* <Appointments date={date} /> */}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
