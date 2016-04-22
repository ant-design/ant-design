---
order: 1
title:
  zh-CN: 图标按钮
  en-US: Icon
---

## zh-CN

`Button` 内可以嵌套图标，图标可以放在文字前、后，也可以单独存在。

## en-US

`Button` works fine with `Icon`, just set `icon` property or put `Icon` component in `Button`

````jsx
import { Button, Icon } from 'antd';

ReactDOM.render(
  <div>
    <Button type="primary" shape="circle" icon="search" />
    <Button type="primary" icon="search">Button</Button>
    <br />
    <Button type="ghost" shape="circle-outline"><Icon type="search" /></Button>
    <Button type="ghost"><Icon type="search" />Button</Button>
  </div>,
  mountNode
);
````
