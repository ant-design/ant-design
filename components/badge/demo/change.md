---
order: 4
title:
  zh-CN: 动态
  en-US: Dynamic
---

## zh-CN

展示动态变化的效果。

## en-US

The count will be animated as it changes.

```jsx
import React, { useState } from 'react';
import { Badge, Button, Switch, Divider, Avatar } from 'antd';
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';

const ButtonGroup = Button.Group;

export default () => {
  const [count, setCount] = useState(5);
  const [show, setShow] = useState(true);

  const increase = () => {
    setCount(count + 1);
  };

  const decline = () => {
    let countValue = count - 1;
    if (countValue < 0) {
      countValue = 0;
    }
    setCount(countValue);
  };

  const random = () => {
    const countValue = Math.floor(Math.random() * 100);
    setCount(countValue);
  };

  const onChange = isShow => {
    setShow(isShow);
  };

  return (
    <>
      <Badge count={count}>
        <Avatar shape="square" size="large" />
      </Badge>
      <ButtonGroup>
        <Button onClick={decline}>
          <MinusOutlined />
        </Button>
        <Button onClick={increase}>
          <PlusOutlined />
        </Button>
        <Button onClick={random}>
          <QuestionOutlined />
        </Button>
      </ButtonGroup>
      <Divider />
      <Badge dot={show}>
        <Avatar shape="square" size="large" />
      </Badge>
      <Switch onChange={onChange} checked={show} />
    </>
  );
};
```
