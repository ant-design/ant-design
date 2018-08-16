---
order: 3
title:
  zh-CN: 使用 iconfont.cn
  en-US: Use iconfont.cn
---

## zh-CN

对于使用 [iconfont.cn](http://iconfont.cn/) 的用户，通过设置 `createFromIconfontCN` 方法参数对象中的 `namespace` 和 `url` 字段， 即可轻松地使用已有项目中的图标。

## en-US

Todo, please replace me!

````jsx
import { Icon } from 'antd';

const IconFont = Icon.createFromIconfontCN({
  namespace: 'iconfont-foo',
  url: 'at.alicdn.com/t/font_8d5l8fzk5b87iudi',
  prefix: 'icon-',
});

ReactDOM.render(
  <div className="icons-list">
    <IconFont type="tuichu" />
    <IconFont type="facebook" />
    <IconFont type="twitter" />
  </div>,
  mountNode
);
````

```css
.icons-list > .anticon {
  margin-right: 6px;
}
```
