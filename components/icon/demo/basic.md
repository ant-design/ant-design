---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

使用 `<Icon />` 标签声明组件，指定图标对应的 `type` 属性。可以通过 `theme` 属性来设置不同的主题风格的图标，也可以通过设置 `spin` 属性来实现动画旋转效果。

## en-US

Use tag `<Icon />` to create an icon and set its type in the `type` prop. Specific the `spin` property to show spinning animation and the `theme` property to switch different themes.

```jsx
import { Icon } from 'antd';

ReactDOM.render(
  <div className="icons-list">
    <Icon type="home" />
    <Icon type="setting" theme="filled" />
    <Icon type="smile" theme="outlined" />
    <Icon type="sync" spin />
    <Icon type="smile" rotate={180} />
    <Icon type="loading" />
  </div>,
  mountNode,
);
```

<style>
.icons-list > .anticon {
  margin-right: 6px;
  font-size: 24px;
}
</style>
