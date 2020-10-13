import React from 'react';
import { Button, Card, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { format, formatISO } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(1),
    minWidth: 290,
  },
  button: {
    display: 'flex',
    margin: theme.spacing(1),
    minWidth: 290,
    minHeight: 72,
  },
  card: {
    minWidth: 290,
    margin: theme.spacing(1),
  },
}));

export default function AvailabilityPicker({ datetime, selectTime }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardActions>
          <Button onClick={selectTime} name={formatISO(datetime)} fullWidth>
            {format(datetime, 'HH:mm')}
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
    //
  );
}
