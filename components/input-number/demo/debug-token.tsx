import React from 'react';
import { ConfigProvider, InputNumber, Space } from 'antd';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        InputNumber: {
          handleWidth: 50,
        },
      },
    }}
  >
    <Space>
      <InputNumber />

      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              handleWidth: 25,
            },
          },
        }}
      >
        <InputNumber />
      </ConfigProvider>

      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              paddingBlockLG: 12,
              paddingInlineLG: 16,
            },
          },
        }}
      >
        <InputNumber size="large" />
        <InputNumber size="large" prefix="$" />
      </ConfigProvider>
    </Space>
  </ConfigProvider>
);
