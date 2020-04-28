---
order: 4
title:
  zh-CN: 使用iconfont.cn的多个资源
  en-US: use multiple resources from iconfont.cn
---

## zh-CN

`@ant-design/icons@4.1.0`以后，`scriptUrl` 可引用多个资源，用户可灵活的管理 [iconfont.cn](http://iconfont.cn/) 图标。

## en-US

you can use `scriptUrl` as an array in version `4.1.0`. you can manage the icons in [iconfont.cn](http://iconfont.cn/) gracefully;

```jsx
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // icon-tuichu, icon-twitter, icon-facebook
    '//at.alicdn.com/t/font_1788044_3njz4jrnujz.js', // icon-shoppingcart, icon-javascript
  ],
});

ReactDOM.render(
  <div className="icons-list">
    <IconFont type="icon-tuichu" />
    <IconFont type="icon-twitter" />
    <IconFont type="icon-facebook" />
    <IconFont type="icon-shoppingcart" />
    <IconFont type="icon-javascript" />
  </div>,
  mountNode,
);
```
