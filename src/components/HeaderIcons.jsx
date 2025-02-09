import React from 'react';
import { Add as AddIcon, Event as EventIcon } from '@material-ui/icons';
import { useAuth0 } from '@auth0/auth0-react';

import HeaderIcon from './HeaderIcon';

export default function Header() {
  const { isAuthenticated, user } = useAuth0();

  if (!isAuthenticated) return null;

  const tooltip = user[
    `${process.env.REACT_APP_AUTH0_NAMESPACE}/roles`
  ].includes('client')
    ? 'Make an Appointment'
    : 'Set Availability';

  return (
    <React.Fragment>
      <HeaderIcon location={'/'} icon={<AddIcon />} tooltip={tooltip} />
      <HeaderIcon
        location={'/appointments'}
        icon={<EventIcon />}
        tooltip={'View Appointments'}
      />
    </React.Fragment>
  );
}
