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

export default function FPPicker({ fp, selectFP }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardActions>
          <Button onClick={selectFP} id={fp.user_id} fullWidth>
            <Avatar alt={fp.name} src={fp.picture} className={classes.avatar} />
            {fp.name}
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
