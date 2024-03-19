import React, { useState } from 'react';
import { Space, Button, Tooltip } from 'antd';

const App: React.FC = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <Space>
      <Button onClick={() => setDisabled(!disabled)}>{disabled ? 'Enable' : 'Disable'}</Button>
      <Tooltip title={disabled ? '' : 'prompt text'}>
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </Space>
  );
};

export default App;
