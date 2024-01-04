---
title: Action
date: 2024-01-04
author: crazyair
---

当我们在业务项目使用 `Modal` 组件经常会遇到再次打开 `Modal` 会带着上次关闭后的数据，让人很苦恼，经常需要手动做些清理工作。而站在开发者角度，这样肯定是不优美的，为了改变这一现象，`Action` 组件应运而生

### Action 实现原理

先来看个实现代码

```tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Button, Input, Modal } from 'antd';

export interface ActionProps {
  open?: boolean;
  children?: React.ReactNode;
  onCancel: (e?: React.MouseEvent<HTMLElement>) => void;
}

export interface ActionContextProps {
  open?: boolean;
  onCancel?: ActionProps['onCancel'];
  afterClose?: () => void;
}

export const ActionContext = createContext<ActionContextProps>({});

const Action = ({ open, children, onCancel }: ActionProps) => {
  const [afterOpen, setAfterOpen] = useState(false);

  useEffect(() => {
    open && setAfterOpen(true);
  }, [open]);

  return (
    <ActionContext.Provider value={{ open, onCancel, afterClose: () => setAfterOpen(false) }}>
      {(afterOpen || open) && children}
    </ActionContext.Provider>
  );
};

const Child = () => {
  const { open, onCancel, afterClose } = useContext(ActionContext);
  useEffect(() => {
    console.log('加载了');
    return () => {
      console.log('卸载了');
    };
  }, []);

  return (
    <Modal open={open} onCancel={onCancel} onOk={onCancel} afterClose={afterClose} title="标题">
      <Input autoFocus />
    </Modal>
  );
};

const Demo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>open</Button>
      <Action open={open} onCancel={() => setOpen(false)}>
        <Child />
      </Action>
    </>
  );
};

export default Demo;
```

`Action` 组件包裹了 `Child` 组件，当用户点击按钮 `open`，则弹出弹窗，控制台输出 `加载了`，当用户点击空白处，则关闭弹窗，当 `Modal` 卸载后(通过执行 `afterClose`)控制台输出 `卸载了`
