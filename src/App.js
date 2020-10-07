import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import {
  Home,
  Header,
  Profile,
  Register,
  Loading,
  PrivateRoute,
  NotFound,
} from './components';

export default function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Header />

      {/* A <Switch> looks through its children <Route>s and
renders the first one that matches the current URL. */}
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}
