import React from 'react';
import { Button, Flex, Splitter, Switch } from 'antd';

const App: React.FC = () => {
  const [sizes, setSizes] = React.useState<(number | string)[]>(['50%', '50%']);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <Flex vertical gap={16}>
      <Splitter
        style={{
          height: 200,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
        onResize={(nextSizes) => {
          setSizes(nextSizes);
        }}
      >
        <Splitter.Panel size={sizes[0]} min={50} resizable={!disabled}>
          <div style={{ padding: 12 }}>
            <div>first</div>
            <div>min=50</div>
          </div>
        </Splitter.Panel>

        <Splitter.Panel size={sizes[1]} resizable={!disabled}>
          <div style={{ padding: 12 }}>second</div>
        </Splitter.Panel>
      </Splitter>

      <Flex gap={16} justify="space-between">
        <Switch
          value={disabled}
          onChange={() => {
            setDisabled(!disabled);
          }}
          checkedChildren="Disabled"
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
