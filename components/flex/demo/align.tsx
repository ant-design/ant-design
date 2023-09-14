import React from 'react';
import { Button, Flex, Segmented } from 'antd';
import type { FlexProps } from 'antd';
import type { SegmentedProps } from 'antd/es/segmented';

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 120,
  borderRadius: 6,
  border: '1px solid #40a9ff',
};

const justifyOptions = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
];

const alignOptions = ['flex-start', 'center', 'flex-end'];

const App: React.FC = () => {
  const [justify, setJustify] = React.useState<FlexProps['justify']>(justifyOptions[0]);
  const [alignItems, setAlignItems] = React.useState<FlexProps['align']>(alignOptions[0]);
  return (
    <Flex gap="middle" align="start" vertical>
      <p>Select justify :</p>
      <Segmented options={justifyOptions} onChange={setJustify as SegmentedProps['onChange']} />
      <p>Select align :</p>
      <Segmented options={alignOptions} onChange={setAlignItems as SegmentedProps['onChange']} />
      <Flex style={boxStyle} justify={justify} align={alignItems}>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
      </Flex>
    </Flex>
  );
};

export default App;
