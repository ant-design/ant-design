import React, { useState } from 'react';
import { Alert, Switch, Space } from 'antd';

const App: React.FC = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {visible && (
        <Alert message="Alert Message Text" type="success" closable afterClose={handleClose} />
      )}
      <p>click the close button to see the effect</p>
      <Switch onChange={setVisible} checked={visible} disabled={visible} />
    </Space>
  );
};

export default App;
