---
order: 10
title:
  zh-CN: 通过 Hooks 获取上下文
  en-US: Get context with hooks
---

## zh-CN

通过 `message.useMessage` 创建支持读取 context 的 `contextHolder`。

## en-US

Use `message.useMessage` to get `contextHolder` with context accessible issue.

```jsx
import { message, Button } from 'antd';

function Demo() {
  const [messsageApi, contextHolder] = message.useMessage();
  const info = () => {
    messsageApi.info('This is a normal message', 3).then(() => {
      console.log('promise me');
    });
  };

  return (
    <Button type="primary" onClick={info}>
      Display normal message
      {contextHolder}
    </Button>
  );
}

ReactDOM.render(<Demo />, mountNode);
```
