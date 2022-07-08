---
order: 12
title:
  zh-CN: 使用 hooks 获得上下文
  en-US: Use hooks to get context
---

## zh-CN

通过 `Modal.useModal` 创建支持读取 context 的 `contextHolder`。

## en-US

Use `Modal.useModal` to get `contextHolder` with context accessible issue.

```tsx
import { Button, Modal, Space } from 'antd';
import React, { createContext } from 'react';

const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null);

const config = {
  title: 'Use Hook!',
  content: (
    <>
      <ReachableContext.Consumer>{name => `Reachable: ${name}!`}</ReachableContext.Consumer>
      <br />
      <UnreachableContext.Consumer>{name => `Unreachable: ${name}!`}</UnreachableContext.Consumer>
    </>
  ),
};

const App: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();

  return (
    <ReachableContext.Provider value="Light">
      <Space>
        <Button
          onClick={() => {
            modal.confirm(config);
          }}
        >
          Confirm
        </Button>
        <Button
          onClick={() => {
            modal.warning(config);
          }}
        >
          Warning
        </Button>
        <Button
          onClick={() => {
            modal.info(config);
          }}
        >
          Info
        </Button>
        <Button
          onClick={() => {
            modal.error(config);
          }}
        >
          Error
        </Button>
      </Space>
      {/* `contextHolder` should always be placed under the context you want to access */}
      {contextHolder}

      {/* Can not access this context since `contextHolder` is not in it */}
      <UnreachableContext.Provider value="Bamboo" />
    </ReachableContext.Provider>
  );
};

export default App;
```
