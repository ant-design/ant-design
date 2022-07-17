---
order: 10
title: useBreakpoint Hook
---

## zh-CN

使用 `useBreakpoint` Hook 个性化布局。

## en-US

Use `useBreakpoint` Hook provide personalized layout.

```jsx
import { Grid, Tag } from 'antd';

const { useBreakpoint } = Grid;

function UseBreakpointDemo() {
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
}

ReactDOM.render(<UseBreakpointDemo />, mountNode);
```
