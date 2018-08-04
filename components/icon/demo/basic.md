---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

使用 `<Icon />` 标签声明组件，指定图标对应的 `type` 属性。可以通过设置 `spin` 属性来实现动画旋转效果。

## en-US

Use tag `<Icon />` to create an icon and set its type in the `type` prop.

````jsx
import { Icon } from 'antd';

ReactDOM.render(
  <div>
    <Icon type="home" fixedWidth/>
    <Icon type="message" flip="vertical" rotate={90}/>
    <Icon type="setting" />
    <Icon type="smile" />
    <Icon type="smile" rotate={180}/>
    <Icon type="reload" spin />
  </div>,
  mountNode
);
````
