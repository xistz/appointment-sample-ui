import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Event as EventIcon } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  eventIcon: {
    marginRight: theme.spacing(2),
  },
}));

export default function HeaderIcon() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <IconButton
      edge="start"
      className={classes.eventIcon}
      color="inherit"
      aria-label="menu"
      onClick={() => history.push('/')}
    >
      <EventIcon />
    </IconButton>
  );
}
