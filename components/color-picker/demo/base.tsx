import React, { useEffect, useState } from 'react';
import { ColorPicker, Form } from 'antd';

const App = () => {
  const [color, setColor] = useState<string>('');
  useEffect(() => {
    setTimeout(() => {
      setColor('#1677ff');
    }, 500);
  }, []);
  return <ColorPicker value={color} allowClear />;
};

export default App;
