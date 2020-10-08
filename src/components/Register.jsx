import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';

import RegistrationForm from './RegistrationForm';

export default function Register() {
  const { user } = useAuth0();

  if (user[`${process.env.REACT_APP_AUTH0_NAMESPACE}/roles`].length > 0) {
    return <Redirect to="/" />;
  }

  return <RegistrationForm />;
}
