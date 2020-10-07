import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';

import RegistrationForm from './RegistrationForm';

export default function Register() {
  const { user } = useAuth0();
  const isNewUser = user['https://appointment-sample.io/roles'].length === 0;

  return isNewUser ? <RegistrationForm /> : <Redirect to="/" />;
}
