import React from 'react';
import { Button, Divider, Flex, Radio } from 'antd';
import type { ButtonProps } from 'antd';

const App: React.FC = () => {
  const [color, setColor] = React.useState<ButtonProps['color']>('default');

  return (
    <>
      <Radio.Group value={color} onChange={(e) => setColor(e.target.value)}>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="primary">Primary</Radio.Button>
        <Radio.Button value="danger">Danger</Radio.Button>
      </Radio.Group>
      <Divider orientation="left" plain>
        Preview
      </Divider>
      <Flex gap="small" wrap>
        <Button color={color} variant="outlined">
          Outlined
        </Button>
        <Button color={color} variant="dashed">
          Dashed
        </Button>
        <Button color={color} variant="solid">
          Solid
        </Button>
        <Button color={color} variant="filled">
          Filled
        </Button>
        <Button color={color} variant="text">
          Text
        </Button>
        <Button color={color} variant="link">
          Link
        </Button>
      </Flex>
    </>
  );
};

export default App;
