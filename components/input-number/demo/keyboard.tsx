import React, { useState } from 'react';
import { Checkbox, InputNumber, Space } from 'antd';

const App: React.FC = () => {
  const [keyboard, setKeyboard] = useState(true);

  return (
    <Space>
      <InputNumber min={1} max={10} keyboard={keyboard} defaultValue={3} />
      <Checkbox
        onChange={() => {
          setKeyboard(!keyboard);
        }}
        checked={keyboard}
      >
        Toggle keyboard
      </Checkbox>
    </Space>
  );
};

export default App;
