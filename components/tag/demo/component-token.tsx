import { ConfigProvider, Space, Tag } from 'antd';
import React from 'react';
export default () => (
  <ConfigProvider
    theme={{
      components: {
        Tag: {
          tagFontSize: 20,
          defaultBg: '#f9f0ff',
          defaultColor: '#4b34d3',
          tagLineHeight: 30,
        },
      },
    }}
  >
    <Space size={[0, 8]} wrap>
      <Tag>Tag 1</Tag>
      <Tag>
        <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
      </Tag>
      <Tag closable>Tag 2</Tag>
      <Tag closable>Prevent Default</Tag>
    </Space>
  </ConfigProvider>
);
