---
order: 999
title:
  zh-CN: 覆盖组件样式
  en-US: Override Component Style
debug: true
---

```tsx
import { Button, ConfigProvider } from 'antd';

ReactDOM.render(
  <ConfigProvider
    theme={{
      override: {
        button: {
          colorBgTextHover: 'red',
          colorBgTextActive: 'blue',
        },
      },
    }}
  >
    <Button type="text">Text Button</Button>
  </ConfigProvider>,
  mountNode,
);
```
