---
order: 99
title:
  zh-CN: 图片不存在时
  en-US: Fallback
debug: true
---

## zh-CN

图片不存在时，如果 `src` 本身是个 ReactElement，会尝试回退到 `src`，否则尝试回退到 `icon`，最后回退到显示 `children`。

## en-US

图片不存在时，如果 `src` 本身是个 ReactElement，会尝试回退到 `src`，否则尝试回退到 `icon`，最后回退到显示 `children`。

```tsx
import { Avatar } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Avatar shape="circle" src="http://abc.com/not-exist.jpg">
      A
    </Avatar>
    <Avatar shape="circle" src="http://abc.com/not-exist.jpg">
      ABC
    </Avatar>
  </>
);

export default App;
```
