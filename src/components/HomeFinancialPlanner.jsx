import React, { useState } from 'react';

import Layout from './Layout';
import Availabilities from './Availabilities';

export default function HomeFinancialPlanner() {
  const [date, changeDate] = useState(new Date());

  return (
    <Layout date={date} changeDate={changeDate} title="When are you available?">
      <Availabilities date={date} />
    </Layout>
  );
}
