# 可关闭的警告提示

- order: 2

显示关闭按钮，点击可关闭警告提示。

---

````jsx
import { Alert } from 'antd';

const onClose = function(e) {
  console.log(e, '我要被关闭啦！');
};

ReactDOM.render(<div>
  <Alert message="警告提示的文案"
    type="warn"
    closable
    onClose={onClose} />
  <Alert message="错误提示的文案"
    description="错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍"
    type="error"
    closable
    onClose={onClose} />
</div>, document.getElementById('components-alert-demo-closable'));
````
