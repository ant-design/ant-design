# 普通提示

- order: 0

信息提醒反馈。

---

````jsx
import { message, Button } from 'antd';

const info = function() {
  message.info('这是一条普通的提醒');
};

ReactDOM.render(<Button type="primary" onClick={info}>显示普通提醒</Button>
, document.getElementById('components-message-demo-info'));
````
