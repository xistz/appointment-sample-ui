import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    minWidth: 290,
    margin: theme.spacing(1),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
}));

export default function AppointmentViewerCard({
  appointment,
  index,
  handleChange,
}) {
  const classes = useStyles();
  const { id, name, picture, from } = appointment;
  const datetime = new Date(from);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h5" variant="h5">
          {format(datetime, 'HH:mm')}
        </Typography>
      </CardContent>
      <Avatar alt={name} src={picture} className={classes.avatar} />
      <CardContent>
        <Typography component="h6" variant="body1">
          {name}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton color="inherit" onClick={() => handleChange(id, index)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
