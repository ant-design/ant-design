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
    <Space wrap>
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
        <Space wrap>
          <InputNumber size="large" />
          <InputNumber size="large" prefix="$" />
        </Space>
      </ConfigProvider>

      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              inputFontSize: 30,
              inputFontSizeSM: 20,
              inputFontSizeLG: 40,
            },
          },
        }}
      >
        <Space wrap>
          <InputNumber defaultValue={11111} size="small" />
          <InputNumber defaultValue={11111} />
          <InputNumber defaultValue={11111} size="large" />
        </Space>
      </ConfigProvider>
    </Space>
  </ConfigProvider>
);
