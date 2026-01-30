import React from 'react';
import { Flex, Space, Splitter, Typography } from 'antd';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <Typography.Title level={5}>Step with Percentage</Typography.Title>
    <Splitter
      step="10%"
      style={{ height: 200, marginTop: 16, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
    >
      <Splitter.Panel defaultSize="30%" min="0" max="100%">
        <Desc text="First Panel" />
      </Splitter.Panel>
      <Splitter.Panel defaultSize="30%">
        <Desc text="Second Panel" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Splitter orientation="vertical" step="30">
          <Splitter.Panel>
            <Desc text="Top" />
          </Splitter.Panel>
          <Splitter.Panel>
            <Desc text="Bottom" />
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
    </Splitter>
    <Typography.Title level={5}>Step with Lazy Mode</Typography.Title>
    <Splitter
      lazy
      step="10%"
      style={{ height: 200, marginTop: 16, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
    >
      <Splitter.Panel defaultSize="30%" min="0" max="100%">
        <Desc text="First Panel" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Second Panel" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Third Panel" />
      </Splitter.Panel>
    </Splitter>
  </Space>
);

export default App;
