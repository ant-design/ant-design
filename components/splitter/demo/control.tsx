import React from 'react';
import { Button, Flex, Splitter, Switch, Typography } from 'antd';

const renderDesc = (text: string) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title
      type="secondary"
      level={5}
      style={{
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => {
  const [sizes, setSizes] = React.useState<(number | string)[]>(['50%', '50%']);
  const [enabled, setEnabled] = React.useState(true);

  return (
    <Flex vertical gap="middle">
      <Splitter
        style={{
          height: 200,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
        onResize={(nextSizes) => {
          setSizes(nextSizes);
        }}
      >
        <Splitter.Panel size={sizes[0]} resizable={enabled}>
          {renderDesc('First')}
        </Splitter.Panel>

        <Splitter.Panel size={sizes[1]}>{renderDesc('Second')}</Splitter.Panel>
      </Splitter>

      <Flex gap="middle" justify="space-between">
        <Switch
          value={enabled}
          onChange={() => {
            setEnabled(!enabled);
          }}
          checkedChildren="Enabled"
          unCheckedChildren="Disabled"
        />

        <Button
          onClick={() => {
            setSizes(['50%', '50%']);
          }}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  );
};

export default App;
