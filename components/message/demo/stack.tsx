import React from 'react';
import { Button, Divider, InputNumber, message, Space, Switch } from 'antd';

const App: React.FC = () => {
  const [enabled, setEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState(3);
  const indexRef = React.useRef(0);
  const [messageApi, contextHolder] = message.useMessage({
    stack: enabled
      ? {
          threshold,
        }
      : false,
  });

  const openMessage = () => {
    indexRef.current += 1;
    const isOdd = indexRef.current % 2 === 1;

    messageApi.open({
      type: 'info',
      content: isOdd
        ? `Message ${indexRef.current}: This is a stacked message.`
        : `Message ${indexRef.current}: This is a slightly longer stacked message.`,
      duration: 0,
    });
  };

  return (
    <>
      {contextHolder}
      <Space size="large">
        <Space style={{ width: '100%' }}>
          <span>Enabled: </span>
          <Switch
            aria-label="Enable message stack"
            checked={enabled}
            onChange={(v) => setEnabled(v)}
          />
        </Space>
        <Space style={{ width: '100%' }}>
          <span>Threshold: </span>
          <InputNumber
            aria-label="Stack threshold"
            disabled={!enabled}
            value={threshold}
            step={1}
            min={1}
            max={10}
            onChange={(v) => setThreshold(v ?? 1)}
          />
        </Space>
      </Space>
      <Divider />
      <Space>
        <Button type="primary" onClick={openMessage}>
          Open the message box
        </Button>
        <Button onClick={() => messageApi.destroy()}>Destroy all</Button>
      </Space>
    </>
  );
};

export default App;
