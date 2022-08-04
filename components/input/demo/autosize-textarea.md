---
order: 6
title:
  zh-CN: 适应文本高度的文本域
  en-US: Autosizing the height to fit the content
---

## zh-CN

`autoSize` 属性适用于 `textarea` 节点，并且只有高度会自动变化。另外 `autoSize` 可以设定为一个对象，指定最小行数和最大行数。

## en-US

`autoSize` prop for a `textarea` type of `Input` makes the height to automatically adjust based on the content. An option object can be provided to `autoSize` to specify the minimum and maximum number of lines the textarea will automatically adjust.

```tsx
import { Input } from 'antd';
import React, { useState } from 'react';

const { TextArea } = Input;

const App: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <TextArea placeholder="Autosize height based on content lines" autoSize />
      <div style={{ margin: '24px 0' }} />
      <TextArea
        placeholder="Autosize height with minimum and maximum number of lines"
        autoSize={{ minRows: 2, maxRows: 6 }}
      />
      <div style={{ margin: '24px 0' }} />
      <TextArea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Controlled autosize"
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
    </>
  );
};

export default App;
```
