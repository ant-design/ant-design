# 四种样式

- order: 1

共有四种样式`success`、`info`、`warn`、`error`。

---

````jsx
import { Alert } from 'antd';

ReactDOM.render(<div>
  <Alert message="成功提示的文案" type="success" />
  <Alert message="消息提示的文案" type="info" />
  <Alert message="警告提示的文案" type="warn" />
  <Alert message="错误提示的文案" type="error" />
</div>,
document.getElementById('components-alert-demo-style'));
````
