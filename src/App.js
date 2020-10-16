import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  Home,
  Header,
  Profile,
  Register,
  PrivateRoute,
  NotFound,
  AppointmentsCommon,
} from './components';

export default function App() {
  return (
    <React.Fragment>
      <Header />

      {/* A <Switch> looks through its children <Route>s and
renders the first one that matches the current URL. */}
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/register" component={Register} />
        <PrivateRoute
          exact
          path="/appointments"
          component={AppointmentsCommon}
        />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}
