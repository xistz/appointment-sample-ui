import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { format, formatISO } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minWidth: 290,
    margin: theme.spacing(1),
  },
}));

export default function AvailabilitySetter({ datetime, id, handleChange }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography component="h5" variant="h5">
          {format(datetime, 'HH:mm')}
        </Typography>
      </CardContent>
      <FormControlLabel
        control={
          <Switch
            checked={id !== undefined}
            onChange={handleChange}
            name={formatISO(datetime)}
          />
        }
        label={id ? 'Available' : 'Unavailable'}
      />
    </Card>
  );
}
