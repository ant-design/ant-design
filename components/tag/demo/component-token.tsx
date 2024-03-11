import React from 'react';
import { CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { ConfigProvider, Flex, Tag } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{ components: { Tag: { defaultBg: '#f9f0ff', defaultColor: '#4b34d3' } } }}
  >
    <Flex gap="4px 0" wrap="wrap">
      <Tag>
        <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
      </Tag>
      <Tag bordered={false}>
        <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
      </Tag>
      <Tag closable color="magenta">
        Tag 2
      </Tag>
      <Tag icon={<CloseCircleOutlined />} color="error">
        error
      </Tag>
      <Tag color="red-inverse">red</Tag>
      <Tag bordered={false} color="magenta">
        magenta
      </Tag>
      <Tag icon={<SyncOutlined spin />} color="processing">
        processing
      </Tag>
    </Flex>
  </ConfigProvider>
);

export default App;
