import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import { Button, Flex, Segmented } from 'antd';
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
  const [justify, setJustify] = useState<CSSProperties['justifyContent']>('space-around');
  const [alignItems, setAlignItems] = useState<CSSProperties['alignItems']>('center');
  return (
    <>
      <p>Select justify :</p>
      <br />
      <Segmented options={justifyOptions} onChange={setJustify as SegmentedProps['onChange']} />
      <br />
      <br />
      <p>Select align :</p>
      <br />
      <Segmented options={alignOptions} onChange={setAlignItems as SegmentedProps['onChange']} />
      <br />
      <br />
      <Flex style={boxStyle} justify={justify} align={alignItems}>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
      </Flex>
    </>
  );
};

export default App;
