import React, { useState } from 'react';
import { Flex, Splitter, Switch, Typography } from 'antd';
import type { SplitterProps } from 'antd';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const CustomSplitter: React.FC<Readonly<SplitterProps>> = ({ style, ...restProps }) => (
  <Splitter style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', ...style }} {...restProps}>
    <Splitter.Panel collapsible min="20%">
      <Desc text="First" />
    </Splitter.Panel>
    <Splitter.Panel collapsible>
      <Desc text="Second" />
    </Splitter.Panel>
  </Splitter>
);

const App: React.FC = () => {
  const [motion, setMotion] = useState(true);

  return (
    <Flex vertical gap="middle">
      <Flex gap="middle">
        <Switch
          checked={motion}
          onChange={setMotion}
          checkedChildren="motion"
          unCheckedChildren="motion"
        />
      </Flex>
      <CustomSplitter style={{ height: 200 }} collapsible={{ motion }} />
      <CustomSplitter style={{ height: 300 }} orientation="vertical" collapsible={{ motion }} />
    </Flex>
  );
};

export default App;
