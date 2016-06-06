---
order: 1
title: 四种样式
---

共有四种样式 `success`、`info`、`warning`、`error`。

````jsx
import { Alert } from 'antd';

ReactDOM.render(<div>
  <Alert message="成功提示的文案" type="success" />
  <Alert message="消息提示的文案" type="info" />
  <Alert message="警告提示的文案" type="warning" />
  <Alert message="错误提示的文案" type="error" />
</div>, mountNode);
````
