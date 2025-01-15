import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Radio.Group
      onChange={onChange}
      value={value}
      options={[
        { value: 1, label: <span>A</span> },
        { value: 2, label: <span>B</span> },
        { value: 3, label: <span>C</span> },
        { value: 4, label: <span>D</span> },
      ]}
    />
  );
};

export default App;
