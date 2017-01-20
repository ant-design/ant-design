---
order: 1
title: 
    zh-CN: 三种大小
    en-US: Three sizes of Input
---

## zh-CN

我们为 `<Input />` 输入框定义了三种尺寸（大、默认、小），高度分别为 `32px`、`28px` 和 `22px`。

注意： 在表单里面，我们只使用大尺寸的输入框。

## en-US

There are three sizes of an Input box: `large` (32px)、`default` (28px) and `small` (22px). 

Note: Inside of forms, only the large size is used.

````__react
import { Input } from 'antd';

ReactDOM.render(
  <div className="example-input">
    <Input size="large" placeholder="large size" />
    <Input placeholder="default size" />
    <Input size="small" placeholder="small size" />
  </div>
, mountNode);
````

````css
.example-input .ant-input {
  width: 200px;
  margin: 0 8px 8px 0;
}
````
