import React from 'react';
import { Button, Flex, GetProp, Splitter } from 'antd';
import { set } from 'lodash';

const App: React.FC = () => {
  const [sizes, setSizes] = React.useState<(number | string)[]>(['50%', '50%']);

  return (
    <Flex vertical gap={16}>
      <Splitter
        style={{
          height: 300,
          borderRadius: 4,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
        onResize={(nextSizes) => {
          setSizes(nextSizes);
        }}
      >
        <Splitter.Panel size={sizes[0]} min={50}>
          <div style={{ padding: 12 }}>
            <div>first</div>
            <div>min=50</div>
          </div>
        </Splitter.Panel>

        <Splitter.Panel size={sizes[1]}>
          <div style={{ padding: 12 }}>second</div>
        </Splitter.Panel>
      </Splitter>

      <Button
        onClick={() => {
          setSizes(['50%', '50%']);
        }}
      >
        Reset
      </Button>
    </Flex>
  );
};

export default App;
