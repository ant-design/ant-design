import React, { useState } from 'react';
import { Flex, Splitter, Typography } from 'antd';

const defaultSizes = ['30%', '40%', '30%'];

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      Panel {props.text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => {
  const [sizes, setSizes] = useState<(number | string)[]>(defaultSizes);

  const handleDoubleClick = () => {
    setSizes(defaultSizes);
  };

  return (
    <Splitter
      style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      onResize={setSizes}
      onDraggerDoubleClick={handleDoubleClick}
    >
      <Splitter.Panel size={sizes[0]}>
        <Desc text={1} />
      </Splitter.Panel>

      <Splitter.Panel size={sizes[1]}>
        <Desc text={2} />
      </Splitter.Panel>

      <Splitter.Panel size={sizes[2]}>
        <Desc text={3} />
      </Splitter.Panel>
    </Splitter>
  );
};

export default App;
