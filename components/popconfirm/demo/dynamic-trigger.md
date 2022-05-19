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

```jsx
import { useState } from 'react';
import { Popconfirm, Switch, message } from 'antd';

export default () => {
  const [visible, setVisible] = useState(false);
  // Whether meet the condition, if not show popconfirm.
  const [condition, setCondition] = useState(true);

  const changeCondition = value => {
    setCondition(value);
  };

  const confirm = () => {
    setVisible(false);
    message.success('Next step.');
  };

  const cancel = () => {
    setVisible(false);
    message.error('Click on cancel.');
  };

  const handleVisibleChange = visibleConfirm => {
    if (!visibleConfirm) {
      setVisible(visibleConfirm);
      return;
    }
    // Determining condition before show the popconfirm.
    console.log(condition);
    if (condition) {
      confirm(); // next step
    } else {
      setVisible(visibleConfirm); // show the popconfirm
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
```
