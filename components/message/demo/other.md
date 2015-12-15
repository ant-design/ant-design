# 其他提示类型

- order: 1

包括成功、失败、警告。

---

````jsx
import { message, Button } from 'antd';

const success = function() {
  message.success('这是一条成功提示');
};

const error = function() {
  message.error('这是一条报错提示');
};

const warn = function() {
  message.warn('这是一条警告提示');
};

ReactDOM.render(<div>
  <Button onClick={success}>显示成功提示</Button>
  <Button onClick={error}>显示报错提示</Button>
  <Button onClick={warn}>显示警告提示</Button>
</div>, document.getElementById('components-message-demo-other'));
````

<style>
#components-message-demo-other .ant-btn {
  margin-right: 8px;
}
</style>
