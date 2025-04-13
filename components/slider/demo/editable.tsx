import React from 'react';
import { Slider } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = React.useState([20, 80]);

  return (
    <Slider
      range={{ editable: true, minCount: 1, maxCount: 5 }}
      value={value}
      onChange={setValue}
    />
  );
};

export default App;
