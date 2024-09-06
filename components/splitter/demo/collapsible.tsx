import React from 'react';
import { Flex, Splitter, Typography } from 'antd';
import type { SplitterProps } from 'antd';

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

const renderSplitter = ({ style, ...restProps }: SplitterProps) => (
  <Splitter
    style={{
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      ...style,
    }}
    {...restProps}
  >
    <Splitter.Panel collapsible min="20%">
      {renderDesc('first')}
    </Splitter.Panel>

    <Splitter.Panel collapsible>{renderDesc('second')}</Splitter.Panel>
  </Splitter>
);

const App: React.FC = () => (
  <Flex gap="middle" vertical>
    {renderSplitter({
      style: { height: 200 },
    })}
    {renderSplitter({
      style: { height: 300 },
      layout: 'vertical',
    })}
  </Flex>
);

export default App;
