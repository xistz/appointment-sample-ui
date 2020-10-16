import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';

import Layout from './Layout';

export default function AppointmentsCommon() {
  const [date, changeDate] = useState(new Date());
  const { user } = useAuth0();

  if (user[`${process.env.REACT_APP_AUTH0_NAMESPACE}/roles`].length === 0) {
    return <Redirect to="/register" />;
  }

  return (
    <Layout date={date} changeDate={changeDate} title="Appointments">
      <div>appointments page</div>
    </Layout>
  );
}
