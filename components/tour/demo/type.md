---
order: 1
iframe: 360
title:
  zh-CN: 类型
  en-US: Type
---

## zh-CN

通过 `type` 改变悬浮按钮的类型

## en-US

Change the type of the FloatButton with `type`.

```tsx
import React from 'react';
import { FloatButton } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const App: React.FC = () => (
  <>
    <FloatButton icon={<QuestionCircleOutlined />} type="primary" style={{ right: 24 }} />
    <FloatButton icon={<QuestionCircleOutlined />} type="default" style={{ right: 94 }} />
  </>
);

export default App;
```
