---
order: 12
title:
  zh-CN: 使用 hooks
  en-US: Use hooks
only: true
---

## zh-CN

通过 `Modal.useModal` 调取支持 ConfigProvider context 的对话框。组件上层必须要有 ConfigProvider 组件。

## en-US

Use `Modal.useModal` to call with ConfigProvider context support modal. ConfigProvider must exist in parent.

```jsx
import { Modal, Button } from 'antd';

const config = {
  title: 'Do you Want to delete these items?',
  content: 'Some descriptions',
  onOk() {
    console.log('OK');
  },
  onCancel() {
    console.log('Cancel');
  },
};

const Context = React.createContext();

const App = () => {
  // const [modal] = Modal.useModal();
  const [inlineModal, inlineHolder] = Modal.useModal();

  return (
    <div>
      {/*<Button
        type="primary"
        onClick={() => {
          modal.confirm(config);
        }}
      >
        Use ConfigProvider
      </Button>*/}

      <Context.Provider value="Light">
        <Button
          type="primary"
          onClick={() => {
            inlineModal.confirm({
              ...config,
              content: <Context.Consumer>{name => `Hello, ${name}!`}</Context.Consumer>,
            });
          }}
        >
          Use inline holder
        </Button>
        {inlineHolder}
      </Context.Provider>
    </div>
  );
};

ReactDOM.render(<App />, mountNode);
```
