---
order: 98
title:
  zh-CN: 自动换行
  en-US: Wrap
---

## zh-CN

自动换行。

## en-US

Auto wrap line.

```jsx
import { Space, Button } from 'antd';

const Demo = () => {
  return (
    <Space size={[8, 16]} wrap>
      {new Array(20).fill(null).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Button key={index}>Button</Button>
      ))}
    </Space>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
