---
order: 3
title:
  zh-CN: 可交互
  en-US: Interactive
---

## zh-CN

提供额外的交互能力。

## en-US

Provide additional interactive capacity.

```jsx
import { Typography } from 'antd';
import { useState } from 'react';

const { Paragraph } = Typography;
const Demo = () => {
  const [str, setStr] = useState('This is an editable text.');
  const onChange = str => {
    console.log('Content change:', str);
    setStr(str);
  };
  return (
    <div>
      <Paragraph editable={{ onChange }}>{str}</Paragraph>
      <Paragraph copyable>This is a copyable text.</Paragraph>
      <Paragraph copyable={{ text: 'Hello, Ant Design!' }}>Replace copy text.</Paragraph>
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
