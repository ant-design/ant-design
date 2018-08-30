---
order: 1
title:
  zh-CN: 多色图标
  en-US: Two-tone icon and colorful icon
---

## zh-CN

可以通过设置 `theme` 属性为 `twotone` 来渲染双色图标，并且可以设置全局性的主题色。

## en-US

Specific them property `theme` to `twotone` to render two-tone icons. You can also set the primary color globally.

````jsx
import { Icon } from 'antd';

Icon.setTwoTonePrimaryColor('#1890ff');

ReactDOM.render(
  <div className="icons-list">
    <Icon type="dollar" theme="twotone" />
    <Icon type="euro" theme="twotone" />
    <Icon type="check-circle" theme="twotone" primaryColor="#f5222d" />
  </div>,
  mountNode
);
````

```css
.icons-list > .anticon {
  margin-right: 6px;
  font-size: 16px;
}
```
