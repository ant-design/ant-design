---
category: Components
type: Basic
title: Icon
toc: false
---

Meaningful vector graphics.

## Icons naming convention

We provide semantic name for every icon, and naming rules are as follows:

- Scanning line icon has the similar name with its solid one，but it's distinguished by `-o`, for example, `question-circle`(a full circle) and `question-circle-o`(an empty circle);

- Naming sequence：`[icon's name]-[shape, optional]-[Scanning line or not]-[direction, optional]`.

## How To Use

Use tag <Icon /> to create an icon and set its type in the type prop, for example:

```html
<Icon type="link" />
```

Finally, it will be rendered as follow:

```html
<i class="anticon anticon-${type}"></i>
```

## Local deployment of icons font

By default, icon components uses [iconfont.cn](http://iconfont.cn), publicly available repository of a huge set of icons. In case you need to use a locally deployed version of the icon font, you can refer to [this example](https://github.com/ant-design/antd-init/tree/master/examples/local-iconfont)。

## List of icons

> Click the icon and copy the code。

### Directional Icons

```__react
import IconSet from 'site/theme/template/IconSet';
const icons1 = ['step-backward', 'step-forward', 'fast-backward', 'fast-forward', 'shrink', 'arrows-alt', 'down', 'up', 'left', 'right', 'caret-up', 'caret-down', 'caret-left', 'caret-right', 'caret-circle-right', 'caret-circle-left', 'caret-circle-o-right', 'caret-circle-o-left', 'up-circle', 'down-circle', 'left-circle', 'right-circle', 'up-circle-o', 'down-circle-o', 'right-circle-o', 'left-circle-o', 'double-right', 'double-left', 'verticle-left', 'verticle-right', 'forward', 'backward', 'rollback', 'enter', 'retweet', 'swap', 'swap-left', 'swap-right', 'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'play-circle', 'play-circle-o', 'caret-circle-o-up', 'caret-circle-o-down', 'caret-circle-up', 'caret-circle-down', 'up-square', 'down-square', 'left-square', 'right-square', 'up-square-o', 'down-square-o', 'left-square-o', 'right-square-o'];

ReactDOM.render(<IconSet className="icons" icons={icons1} key="icons1" />, mountNode);
```

### Suggested Icons

```__react
const icons2 = ['question', 'question-circle-o', 'question-circle', 'plus', 'plus-circle-o', 'plus-circle', 'pause', 'pause-circle-o', 'pause-circle', 'minus', 'minus-circle-o', 'minus-circle', 'plus-square', 'plus-square-o', 'minus-square', 'minus-square-o', 'info', 'info-circle-o', 'info-circle', 'exclamation', 'exclamation-circle-o', 'exclamation-circle', 'close', 'close-circle-o', 'close-circle', 'close-square', 'close-square-o', 'check', 'check-circle-o', 'check-circle', 'check-square', 'check-square-o', 'clock-circle-o', 'clock-circle'];

ReactDOM.render(<IconSet className="icons" icons={icons2} key="icons2" />, mountNode);
```

### Other Icons

```__react
const icons3 = ['lock', 'unlock', 'android', 'apple', 'apple-o', 'area-chart', 'bar-chart', 'dot-chart', 'bars', 'book', 'calendar', 'cloud', 'cloud-download', 'code', 'code-square', 'code-square-o', 'copy', 'credit-card', 'delete', 'desktop', 'download', 'edit', 'ellipsis', 'file', 'file-text', 'file-unknown', 'file-pdf','file-excel', 'file-jpg', 'file-ppt', 'folder', 'folder-open', 'github', 'hdd', 'frown', 'frown-o', 'meh','meh-o', 'smile', 'smile-o', 'inbox', 'laptop', 'appstore-o', 'appstore', 'line-chart', 'link', 'logout', 'mail', 'menu-fold', 'menu-unfold', 'mobile', 'notification', 'paper-clip', 'picture', 'pie-chart', 'poweroff', 'reload', 'search', 'setting', 'share-alt', 'shopping-cart', 'tablet', 'tag', 'tags', 'tags-o', 'tag-o', 'to-top', 'upload', 'user', 'video-camera', 'windows', 'windows-o', 'ie', 'chrome', 'home', 'loading', 'cloud-upload-o', 'cloud-download-o', 'cloud-upload', 'cloud-o', 'star-o', 'star', 'heart-o', 'heart', 'environment', 'environment-o', 'eye', 'eye-o', 'camera', 'camera-o', 'aliwangwang', 'aliwangwang-o', 'save', 'team', 'solution', 'phone', 'filter', 'exception', 'export', 'customer-service', 'qrcode', 'scan', 'like', 'dislike', 'message', 'pay-circle', 'pay-circle-o', 'calculator', 'pushpin', 'pushpin-o'];

ReactDOM.render(<IconSet className="icons" icons={icons3} key="icons3" />, mountNode);
```

<style>
.markdown .icons {
  width: 100%;
}
ul.anticons-list {
  margin: 40px 0;
  list-style: none;
  overflow: hidden;
}
ul.anticons-list li {
  float: left;
  width: 16.66%;
  text-align: center;
  list-style: none;
  cursor: pointer;
  height: 100px;
  color: #555;
  transition: all 0.2s ease;
  position: relative;
  margin: 3px 0;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  padding: 10px 0 0 0;
}
ul.anticons-list li:hover {
  background-color: #eaf8fe;
}
ul.anticons-list li.copied:hover {
  color: rgba(255,255,255,0.2);
}
ul.anticons-list li:after {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  content: "Copied!";
  text-align: center;
  line-height: 110px;
  color: #2db7f5;
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  opacity: 0;
}
ul.anticons-list li.copied:after {
  opacity: 1;
  top: -10px;
}
.anticon {
  font-size: 22px;
  margin: 12px 0 16px;
  transition: all .3s;
}
ul.anticons-list li:hover .anticon {
  transform: scale(1.4);
}
.anticon-class {
  display: block;
  text-align: center;
  transform: scale(0.83);
  font-family: Consolas;
  white-space: nowrap;
}
</style>
