import { CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { ConfigProvider, Space, Tag } from 'antd';
import React from 'react';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Tag: {
          defaultBg: '#f9f0ff',
          defaultColor: '#4b34d3',
        },
      },
    }}
  >
    <Space size={[0, 8]} wrap>
      <Tag>
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
    </Space>
  </ConfigProvider>
);
