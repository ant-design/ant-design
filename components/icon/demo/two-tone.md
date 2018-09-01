---
order: 1
title:
  zh-CN: 多色图标
  en-US: Two-tone icon and colorful icon
---

## zh-CN

可以通过设置 `theme` 属性为 `twoTone` 来渲染双色图标，并且可以设置主题色。

## en-US

Specific them property `theme` to `twoTone` to render two-tone icons. You can also set the primary color.

````jsx
import { Icon } from 'antd';

ReactDOM.render(
  <div className="icons-list">
    <Icon type="dollar" theme="twoTone" />
    <Icon type="euro" theme="twoTone" />
    <Icon type="check-circle" theme="twoTone" primaryColor="#eb2f96" />
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
