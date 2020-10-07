import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import HomeClient from './HomeClient';
import HomeFinancialPlanner from './HomeFinancialPlanner';

export default function Home() {
  const { user } = useAuth0();

  if (user['https://appointment-sample.io/roles'].includes('Client')) {
    return <HomeClient />;
  }

  return <HomeFinancialPlanner />;
}
