import React from 'react';
import { Button, Avatar, Card, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 290,
    margin: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
  },
}));

export default function FPPicker({ availability, selectAvailability }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardActions>
          <Button onClick={selectAvailability} id={availability.id} fullWidth>
            <Avatar
              alt={availability.fp_name}
              src={availability.fp_picture}
              className={classes.avatar}
            />
            {availability.fp_name}
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
