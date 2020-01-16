---
order: 12
title:
  zh-CN: 使用 hooks
  en-US: Use hooks
only: true
---

## zh-CN

通过 `Modal.useModal` 创建支持读取 context 的 `contextHolder`。

## en-US

Use `Modal.useModal` to get `contextHolder` with context accessible issue.

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

const ReachableContext = React.createContext();
const UnreachableContext = React.createContext();

const App = () => {
  const [modal, contextHolder] = Modal.useModal();

  return (
    <ReachableContext.Provider value="Light">
      <Button
        type="primary"
        onClick={() => {
          modal.confirm({
            ...config,
            content: (
              <div>
                <ReachableContext.Consumer>
                  {name => `Reachable: ${name}!`}
                </ReachableContext.Consumer>
                <br />
                <UnreachableContext.Consumer>
                  {name => `Unreachable: ${name}!`}
                </UnreachableContext.Consumer>
              </div>
            ),
          });
        }}
      >
        Use inline holder
      </Button>

      {/* `contextHolder` should always under the context you want to access */}
      {contextHolder}

      {/* Can not access this context since `contextHolder` is not in it */}
      <UnreachableContext.Provider value="Bamboo" />
    </ReachableContext.Provider>
  );
};

ReactDOM.render(<App />, mountNode);
```
