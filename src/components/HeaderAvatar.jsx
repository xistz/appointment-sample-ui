import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, IconButton } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  eventIcon: {
    marginRight: theme.spacing(2),
  },
}));

export default function HeaderIcon() {
  const classes = useStyles();
  const { isAuthenticated, user } = useAuth0();
  const history = useHistory();

  return (
    isAuthenticated && (
      <IconButton
        edge="start"
        className={classes.eventIcon}
        onClick={() => history.push('/profile')}
      >
        <Avatar alt={user.name} src={user.picture}>
          {user.family_name[0] + user.given_name[0]}
        </Avatar>
      </IconButton>
    )
  );
}
