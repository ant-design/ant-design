---
order: 1
title: 三种大小
---

我们为 `<Input />` 输入框定义了三种尺寸（大、默认、小），高度分别为 `32px`、`28px` 和 `22px`。

注意： 在表单里面，我们只使用大尺寸的输入框。

````jsx
import { Input } from 'antd';

ReactDOM.render(
  <div className="example-input">
    <Input size="large" placeholder="大尺寸" />
    <Input placeholder="默认尺寸" />
    <Input size="small" placeholder="小尺寸" />
  </div>
, mountNode);
````

````css
.example-input .ant-input {
  width: 200px;
  margin: 0 8px 8px 0;
}
````