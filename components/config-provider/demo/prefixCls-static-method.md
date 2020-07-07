---
order: 99
title:
  zh-CN: 静态方法的 prefixCls
  en-US: prefixCls in static methods
debug: true
---

## zh-CN

支持配置 `message.xxx` `notificaction.xxx` `Modal.xxx` 渲染节点的 `prefixCls`。

## en-US

Support `prefixCls` of `message.xxx` `notificaction.xxx` `Modal.xxx`.

```jsx
import { useState } from 'react';
import { ConfigProvider, message, notification, Modal, Button, Input } from 'antd';

const messageInfo = () => {
  message.info('message');
};

const notifictionWarning = () => {
  notification.warning({
    message: 'message',
    description: 'description',
  });
};

const confirm = () => {
  Modal.confirm({
    title: 'title',
    content: 'content',
  });
};

const App = () => {
  const [prefixCls, setPrefixCls] = useState('ant');
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        prefixCls:{' '}
        <Input
          value={prefixCls}
          style={{ width: 200 }}
          onChange={e => setPrefixCls(e.target.value)}
        />
      </div>
      <ConfigProvider prefixCls={prefixCls}>
        <Button style={{ margin: '0 8px' }} onClick={messageInfo}>
          message.info
        </Button>
        <Button style={{ margin: '0 8px' }} onClick={notifictionWarning}>
          notifiction.warning
        </Button>
        <Button style={{ margin: '0 8px' }} onClick={confirm}>
          Modal.confirm
        </Button>
      </ConfigProvider>
    </>
  );
};

ReactDOM.render(<App />, mountNode);
```
