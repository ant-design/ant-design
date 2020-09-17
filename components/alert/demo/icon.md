---
order: 4
title:
  zh-CN: 图标
  en-US: Icon
---

## zh-CN

可口的图标让信息类型更加醒目。

## en-US

A relevant icon will make information clearer and more friendly.

```tsx
import { Alert } from 'antd';

ReactDOM.render(
  <>
    <Alert message="Success Tips" type="success" showIcon />
    <Alert message="Informational Notes" type="info" showIcon />
    <Alert message="Warning" type="warning" showIcon closable />
    <Alert message="Error" type="error" showIcon />
    <Alert
      message="Success Tips"
      description="Detailed description and advice about successful copywriting."
      type="success"
      showIcon
    />
    <Alert
      description="Additional description and information about copywriting."
      type="info"
      showIcon
    />
    <Alert
      description="This section contains all the conversation done with bot or agent. You can also filter the given table on the basis of certain criteria along with the search."
      type="warning"
      showIcon
      closable
    />
    <Alert
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      showIcon
    />
    <Alert description="Notification is disabled, want to enable ?" type="cta" showIcon />
    <Alert
      description="This section contains all the conversation done with bot or agent. You can also filter the given table on the basis of certain criteria along with the search."
      type="normal"
      showIcon
    />
  </>,
  mountNode,
);
```
