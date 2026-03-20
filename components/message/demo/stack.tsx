import React from 'react';
import { Button, Divider, InputNumber, message, Space, Switch } from 'antd';

const App: React.FC = () => {
  const [enabled, setEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState(3);
  const [messageApi, contextHolder] = message.useMessage({
    stack: enabled
      ? {
          threshold,
        }
      : false,
  });

  const openMessage = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
      duration: 0,
    });
  };

  return (
    <>
      {contextHolder}
      <div>
        <Space size="large">
          <Space style={{ width: '100%' }}>
            <span>Enabled: </span>
            <Switch checked={enabled} onChange={(v) => setEnabled(v)} />
          </Space>
          <Space style={{ width: '100%' }}>
            <span>Threshold: </span>
            <InputNumber
              disabled={!enabled}
              value={threshold}
              step={1}
              min={1}
              max={10}
              onChange={(v) => setThreshold(v || 0)}
            />
          </Space>
        </Space>
        <Divider />
        <Button type="primary" onClick={openMessage}>
          Open the message
        </Button>
      </div>
    </>
  );
};

export default App;
