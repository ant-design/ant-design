---
order: 10
title:
  zh-CN: 通过 Hooks 获取上下文（4.5.0+）
  en-US: Get context with hooks (4.5.0+)
---

## zh-CN

通过 `message.useMessage` 创建支持读取 context 的 `contextHolder`。

## en-US

Use `message.useMessage` to get `contextHolder` with context accessible issue.

```jsx
import { message, Button } from 'antd';

const Context = React.createContext({ name: 'Default' });

function Demo() {
  const [messsageApi, contextHolder] = message.useMessage();
  const info = () => {
    messsageApi.open({
      type: 'info',
      content: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
      duration: 1,
    });
  };

  return (
    <Context.Provider value={{ name: 'Ant Design' }}>
      {contextHolder}
      <Button type="primary" onClick={info}>
        Display normal message
      </Button>
    </Context.Provider>
  );
}

ReactDOM.render(<Demo />, mountNode);
```
