---
order: 3
title:
  zh-CN: 条件触发
  en-US: Conditional trigger
---

## zh-CN

可以判断是否需要弹出。

## en-US

Make it pop up under some conditions.

```tsx
import { message, Popconfirm, Switch } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [condition, setCondition] = useState(true);

  const changeCondition = (checked: boolean) => {
    setCondition(checked);
  };

  const confirm = () => {
    setVisible(false);
    message.success('Next step.');
  };

  const cancel = () => {
    setVisible(false);
    message.error('Click on cancel.');
  };

  const handleVisibleChange = (newVisible: boolean) => {
    if (!newVisible) {
      setVisible(newVisible);
      return;
    }
    // Determining condition before show the popconfirm.
    console.log(condition);
    if (condition) {
      confirm(); // next step
    } else {
      setVisible(newVisible);
    }
  };

  return (
    <div>
      <Popconfirm
        title="Are you sure delete this task?"
        visible={visible}
        onVisibleChange={handleVisibleChange}
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <a href="#">Delete a task</a>
      </Popconfirm>
      <br />
      <br />
      Whether directly execute：
      <Switch defaultChecked onChange={changeCondition} />
    </div>
  );
};

export default App;
```
