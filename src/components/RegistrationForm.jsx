import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const useRole = (initialValue) => {
  const [role, setRole] = useState(initialValue);

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  return {
    role,
    onChange: handleChange,
  };
};

export default function Register() {
  const classes = useStyles();
  const { role, onChange } = useRole('financial planner');
  const history = useHistory();
  const registerURL = `${process.env.REACT_APP_API_URL}/register`;

  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await getAccessTokenSilently();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const data = {
      role,
    };

    try {
      await axios.post(registerURL, data, { headers });

      history.go(0);
    } catch (error) {
      const { message } = error.response.data;

      console.error(message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Typography component="h2" variant="body1">
          Welcome! How would you like to use the service?
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="user-type"
              name="user-type"
              value={role}
              onChange={onChange}
            >
              <FormControlLabel
                value="financial planner"
                control={<Radio />}
                label="I would like to offer financial planning advice."
              />
              <FormControlLabel
                value="client"
                control={<Radio />}
                label="I would like financial planning advice."
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}
