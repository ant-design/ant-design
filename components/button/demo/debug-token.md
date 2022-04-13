---
order: 999
title:
  zh-CN: 覆盖组件样式
  en-US: Override Component Style
debug: true
---

```tsx
import { Button, ConfigProvider, Space } from 'antd';

export default () => (
  <ConfigProvider
    theme={{
      override: {
        Button: {
          colorBgTextHover: 'red',
          colorBgTextActive: 'blue',
        },
      },
    }}
  >
    <Space>
      <Button type="text">Text 1</Button>

      <ConfigProvider
        theme={{
          override: {
            Button: {
              colorBgTextHover: 'orange',
              colorBgTextActive: 'blue',
            },
          },
        }}
      >
        <Button type="text">Text 2</Button>
      </ConfigProvider>
    </Space>
  </ConfigProvider>
);
```
