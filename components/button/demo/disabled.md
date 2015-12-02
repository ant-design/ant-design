# 不可用

- order: 3

添加 `disabled` 属性即可让按钮处于不可用状态，同时按钮样式也会改变。

---

````jsx
import { Button } from 'antd';

ReactDOM.render(<div>
  <Button type="primary">主按钮</Button>
  <Button type="primary" disabled>主按钮(失效)</Button>
  <br />
  <Button>次按钮</Button>
  <Button disabled>次按钮(失效)</Button>
  <br />
  <Button type="ghost">幽灵按钮</Button>
  <Button type="ghost" disabled>幽灵按钮(失效)</Button>
  <br />
  <Button type="dashed">虚线按钮</Button>
  <Button type="dashed" disabled>虚线按钮(失效)</Button>
</div>
, document.getElementById('components-button-demo-disabled'));
````

<style>
#components-button-demo-disabled .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
</style>
