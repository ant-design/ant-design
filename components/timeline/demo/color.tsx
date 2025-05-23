import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Flex, Timeline } from 'antd';

const App: React.FC = () => (
  <Timeline
    items={[
      {
        color: 'green',
        content: 'Create a services site 2015-09-01',
      },
      {
        color: 'green',
        content: 'Create a services site 2015-09-01',
      },
      {
        color: 'red',
        content: (
          <Flex vertical>
            <div>Solve initial network problems 1</div>
            <div>Solve initial network problems 2</div>
            <div>Solve initial network problems 3 2015-09-01</div>
          </Flex>
        ),
      },
      {
        content: (
          <Flex vertical>
            <div>Technical testing 1</div>
            <div>Technical testing 2</div>
            <div>Technical testing 3 2015-09-01</div>
          </Flex>
        ),
      },
      {
        color: 'gray',
        content: (
          <Flex vertical>
            <div>Technical testing 1</div>
            <div>Technical testing 2</div>
            <div>Technical testing 3 2015-09-01</div>
          </Flex>
        ),
      },
      {
        color: 'gray',
        content: (
          <Flex vertical>
            <div>Technical testing 1</div>
            <div>Technical testing 2</div>
            <div>Technical testing 3 2015-09-01</div>
          </Flex>
        ),
      },
      {
        color: '#00CCFF',
        icon: <SmileOutlined />,
        content: <div>Custom color testing</div>,
      },
    ]}
  />
);

export default App;
