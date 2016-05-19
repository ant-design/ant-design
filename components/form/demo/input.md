---
order: 0
title: Input 输入框
---

我们为 `<Input />` 输入框定义了三种尺寸（大、默认、小），具体使用详见 [API](/components/form/#input)。

注意： 在表单里面，我们只使用**大尺寸**， 即高度为 **32px**，作为唯一的尺寸。

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
  width: 140px;
  margin-right: 8px;
}
````
