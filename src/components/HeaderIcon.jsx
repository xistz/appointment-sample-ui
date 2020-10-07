import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Event as EventIcon } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
  eventIcon: {
    marginRight: theme.spacing(2),
  },
}));

export default function HeaderIcon() {
  const classes = useStyles();
  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <Avatar
        alt={user.name}
        src={user.picture}
        edge="start"
        className={classes.eventIcon}
      >
        {user.family_name[0] + user.given_name[0]}
      </Avatar>
    );
  }

  return (
    <EventIcon
      edge="start"
      className={classes.eventIcon}
      color="inherit"
      aria-label="menu"
    />
  );
}
