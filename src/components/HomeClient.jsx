import React, { useState } from 'react';

import Layout from './Layout';
import AppointmentPicker from './AppointmentPicker';

export default function HomeClient() {
  const [date, changeDate] = useState(new Date());

  return (
    <Layout date={date} changeDate={changeDate} title="Make an Appointment">
      <AppointmentPicker date={date} />
    </Layout>
  );
}
