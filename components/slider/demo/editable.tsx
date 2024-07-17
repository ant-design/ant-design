import React from 'react';
import { Slider } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = React.useState([0, 100]);

  return <Slider range={{ editable: true }} value={value} onChange={setValue} />;
};

export default App;
