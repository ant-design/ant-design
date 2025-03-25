import React from 'react';
import { CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { ConfigProvider, Flex, Tag, theme } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="small" align="start">
    <ConfigProvider
      theme={{
        components: {
          Tag: { defaultBg: '#f9f0ff', defaultColor: '#4b34d3', colorBorderDisabled: '#FF0000' },
        },
      }}
    >
      <Flex gap="small" align="center" wrap>
        <Tag>
          <a
            href="https://github.com/ant-design/ant-design/issues/1862"
            target="_blank"
            rel="noreferrer"
          >
            Link
          </a>
        </Tag>
        <Tag variant="filled">
          <a
            href="https://github.com/ant-design/ant-design/issues/1862"
            target="_blank"
            rel="noreferrer"
          >
            Link
          </a>
        </Tag>
        <Tag closable color="magenta">
          Tag 2
        </Tag>
        <Tag icon={<CloseCircleOutlined />} color="error">
          error
        </Tag>
        <Tag color="red" variant="solid">
          red
        </Tag>
        <Tag variant="filled" color="magenta">
          magenta
        </Tag>
        <Tag icon={<SyncOutlined spin />} color="processing">
          processing
        </Tag>
        <Tag color="success" disabled>
          disabled
        </Tag>
      </Flex>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Flex
        gap="small"
        align="center"
        wrap
        style={{
          background: '#000',
          padding: 4,
        }}
      >
        <Tag variant="solid" color="default">
          Dark
        </Tag>
      </Flex>
    </ConfigProvider>
  </Flex>
);

export default App;
