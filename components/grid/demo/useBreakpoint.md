---
order: 10
title: useBreakpoint Hook
---

## zh-CN

使用 `useBreakpoint` Hook 个性化布局。

## en-US

Use `useBreakpoint` Hook provide personalized layout.

```tsx
import { Grid, Tag } from 'antd';
import React from 'react';

const { useBreakpoint } = Grid;

const App: React.FC = () => {
  const screens = useBreakpoint();

  return (
    <>
      Current break point:{' '}
      {Object.entries(screens)
        .filter(screen => !!screen[1])
        .map(screen => (
          <Tag color="blue" key={screen[0]}>
            {screen[0]}
          </Tag>
        ))}
    </>
  );
};

export default App;
```
