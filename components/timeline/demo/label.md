---
order: 5
title:
  zh-CN: Label 用法
  en-US: Label Usage
---

## zh-CN

使用 `Label` 单独展示时间。

## en-US

Use `Label` show time alone.

```jsx
import { useState } from 'react';
import { Timeline, Radio } from 'antd';

function TimelimeLabelDemo() {
  const [mode, setMode] = useState('left');

  const onChange = e => {
    setMode(e.target.value);
  };

  return (
    <>
      <Radio.Group
        onChange={onChange}
        value={mode}
        style={{
          marginBottom: 20,
        }}
      >
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
        <Radio value="alternate">Alternate</Radio>
      </Radio.Group>
      <Timeline mode={mode}>
        <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
        <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
        <Timeline.Item>Technical testing</Timeline.Item>
        <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
      </Timeline>
    </>
  );
}

ReactDOM.render(<TimelimeLabelDemo />, mountNode);
```
