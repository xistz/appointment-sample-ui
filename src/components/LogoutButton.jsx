import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogoutButton() {
  const classes = useStyles();
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log Out
      </Button>
    )
  );
}
