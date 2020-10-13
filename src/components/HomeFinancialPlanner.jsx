import React, { useState } from 'react';

import Layout from './Layout';
import AvailabilitiesSetter from './AvailabilitiesSetter';

export default function HomeFinancialPlanner() {
  const [date, changeDate] = useState(new Date());

  return (
    <Layout date={date} changeDate={changeDate} title="Set Availability">
      <AvailabilitiesSetter date={date} />
    </Layout>
  );
}
