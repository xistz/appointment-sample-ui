import React from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Typography, Container, Grid, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Layout({ children, date, changeDate, title }) {
  const classes = useStyles();

  const disableSunday = (date) => {
    return date.getDay() === 0;
  };

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          {title}
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
          <Grid item sm>
            {children}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
