---
order: 0
title:
  zh-CN: 按钮类型
  en-US: Type
---

## zh-CN

按钮有四种类型：主按钮、次按钮、幽灵按钮、虚线按钮。

通过设置 `type` 为 `primary` `default` `dashed` 可分别创建主按钮、次按钮（默认）、虚线按钮。不同的样式可以用来区别其重要程度。

需要强引导用主按钮，切记主按钮在同一个操作区域最多出现一次。

## en-US

There are primary button, default button, ghost button and dashed button in antd.

`type` can be set as `primary` or `default` or `dashed`, in order to create primary button or default button or dashed button. Users can tell the significance of button by it's appearance.

````__react
import { Button } from 'antd';

ReactDOM.render(
  <div>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
  </div>
, mountNode);
````
