import React from 'react';
import { Flex, Splitter } from 'antd';
import type { SplitterProps } from 'antd';

const renderSplitter = ({ style, ...restProps }: SplitterProps) => (
  <Splitter
    style={{
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      ...style,
    }}
    {...restProps}
  >
    <Splitter.Panel collapsible min="20%">
      <div style={{ padding: 12 }}>first</div>
    </Splitter.Panel>

    <Splitter.Panel collapsible>
      <div style={{ padding: 12 }}>second</div>
    </Splitter.Panel>
  </Splitter>
);

const App: React.FC = () => (
  <Flex gap={16} vertical style={{ padding: 32 }}>
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
