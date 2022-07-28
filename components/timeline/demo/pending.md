---
order: 2
title:
  zh-CN: 最后一个及排序
  en-US: Last node and Reversing
---

## zh-CN

当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，当 pending 为真值时展示幽灵节点，如果 pending 是 React 元素可用于定制该节点内容，同时 pendingDot 将可以用于定制其轴点。reverse 属性用于控制节点排序，为 false 时按正序排列，为 true 时按倒序排列。

## en-US

When the timeline is incomplete and ongoing, put a ghost node at last. Set `pending` as truthy value to enable displaying pending item. You can customize the pending content by passing a React Element. Meanwhile, `pendingDot={a React Element}` is used to customize the dot of the pending item. `reverse={true}` is used for reversing nodes.

```tsx
import { Button, Timeline } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [reverse, setReverse] = useState(false);

  const handleClick = () => {
    setReverse(!reverse);
  };

  return (
    <div>
      <Timeline pending="Recording..." reverse={reverse}>
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
      </Timeline>
      <Button type="primary" style={{ marginTop: 16 }} onClick={handleClick}>
        Toggle Reverse
      </Button>
    </div>
  );
};

export default App;
```
