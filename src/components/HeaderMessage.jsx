import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function HeaderMessage() {
  const classes = useStyles();
  const { user, isAuthenticated } = useAuth0();

  return (
    <Typography variant="h6" className={classes.title}>
      {isAuthenticated ? `Hi, ${user.given_name}!` : 'Welcome'}
    </Typography>
  );
}
