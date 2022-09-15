---
order: 999
title:
  zh-CN: 覆盖组件样式
  en-US: Override Component Style
debug: true
---

```tsx
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
    </Space>
  </ConfigProvider>
);
```
