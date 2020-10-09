import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';

import HomeClient from './HomeClient';
import HomeFinancialPlanner from './HomeFinancialPlanner';

export default function Home() {
  const { user } = useAuth0();

  if (user[`${process.env.REACT_APP_AUTH0_NAMESPACE}/roles`].length === 0) {
    return <Redirect to="/register" />;
  }

  if (
    user[`${process.env.REACT_APP_AUTH0_NAMESPACE}/roles`].includes('client')
  ) {
    return <HomeClient />;
  }

  return <HomeFinancialPlanner />;
}
