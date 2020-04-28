---
order: 0
title:
  zh-CN: 普通提示
  en-US: Normal prompt
---

## zh-CN

信息提醒反馈。

## en-US

Normal message for information.

```jsx
import { message, Button } from 'antd';
import { ConfigContext } from '../../config-provider';

const info = () => {
  message.info('This is a normal message');
};

const Demo = () => {
  const { direction } = React.useContext(ConfigContext);

  message.config({
    rtl: direction === 'rtl',
  });

  return (
    <Button type="primary" onClick={info}>
      Display normal message
    </Button>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
