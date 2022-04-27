import React, { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

function MyApp() {

  const [value, onChange] = useState([null, null]);
  return (
    <div>
      <DateRangePicker onChange={onChange} value={value} />
    </div>
  );
}

export default MyApp;