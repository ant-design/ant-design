import { TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [value, setValue] = useState<Dayjs | null>(null);

  const onChange = (time: Dayjs) => {
    setValue(time);
  };

  return <TimePicker value={value} onChange={onChange} />;
};

export default App;
