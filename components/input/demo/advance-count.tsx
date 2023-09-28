import React from 'react';
import { Flex, Input, Typography } from 'antd';
import { runes } from 'runes2';

const App: React.FC = () => (
  <Flex vertical>
    <Typography.Title level={5}>Exceed Style</Typography.Title>
    <Input
      count={{
        show: true,
        max: 10,
      }}
      defaultValue="Hello, antd!"
    />

    <Typography.Title level={5}>Emoji count as length 1</Typography.Title>
    <Input
      count={{
        show: true,
        strategy: (txt) => runes(txt).length,
      }}
      defaultValue="🔥🔥🔥"
    />

    <Typography.Title level={5}>Not exceed max</Typography.Title>
    <Input
      count={{
        show: true,
        max: 5,
        strategy: (txt) => runes(txt).length,
        exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
      }}
      defaultValue="Type"
    />
  </Flex>
);

export default App;
