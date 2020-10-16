import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  eventIcon: {
    marginRight: theme.spacing(2),
  },
}));

export default function HeaderIcon({ location, icon, tooltip }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Tooltip title={tooltip}>
      <IconButton
        edge="start"
        className={classes.eventIcon}
        color="inherit"
        aria-label="menu"
        onClick={() => history.push(location)}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
