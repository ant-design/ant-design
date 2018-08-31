---
order: 1
title:
  zh-CN: 多色图标
  en-US: Two-tone icon and colorful icon
---

## zh-CN

可以通过设置 `theme` 属性为 `two-tone` 来渲染双色图标，并且可以设置全局性的主题色。

## en-US

Specific them property `theme` to `two-tone` to render two-tone icons. You can also set the primary color globally.

````jsx
import { Icon } from 'antd';

Icon.setTwoTonePrimaryColor('#1890ff');

ReactDOM.render(
  <div className="icons-list">
    <Icon type="dollar" theme="two-tone" />
    <Icon type="euro" theme="two-tone" />
    <Icon type="check-circle" theme="two-tone" primaryColor="#f5222d" />
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
