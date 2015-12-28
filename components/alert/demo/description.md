# 含有辅助性文字介绍

- order: 3

含有辅助性文字介绍的警告提示。

---

````jsx
import { Alert } from 'antd';

ReactDOM.render(<div>
  <Alert message="成功提示的文案"
    description="成功提示的辅助性文字介绍成功提示的辅助性文字介绍成功提示的辅助性文字介绍成功提示的辅助性文字介绍"
    type="success" />
  <Alert message="消息提示的文案"
    description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
    type="info" />
  <Alert
    message="警告提示的文案"
    description="警告提示的辅助性文字介绍警告提示的辅助性文字介绍"
    type="warn" />
  <Alert
    message="错误提示的文案"
    description="错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍"
    type="error" />
</div>, document.getElementById('components-alert-demo-description'));
````
