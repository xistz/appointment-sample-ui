import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';

import HeaderMessage from './HeaderMessage';
import HeaderAvatar from './HeaderAvatar';
import HeaderIcons from './HeaderIcons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <HeaderIcons />
          <HeaderMessage />
          <HeaderAvatar />
        </Toolbar>
      </AppBar>
    </div>
  );
}
