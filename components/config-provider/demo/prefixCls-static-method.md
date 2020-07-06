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
import { ConfigProvider, message, notification, Modal, Space, Button, Input } from 'antd';

const messageInfo = () => {
  message.info('info');
};

const notifictionWarning = () => {
  notification.warning('info');
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
        <Space>
          <Button onClick={messageInfo}>message.info</Button>
          <Button onClick={notifictionWarning}>notifiction.warning</Button>
          <Button onClick={confirm}>Modal.confirm</Button>
        </Space>
      </ConfigProvider>
    </>
  );
};

ReactDOM.render(<App />, mountNode);
```
