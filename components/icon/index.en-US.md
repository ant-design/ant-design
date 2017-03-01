---
category: Components
type: General
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
ReactDOM.render(<IconSet className="icons" catigory="direction" />, mountNode);
```

### Suggested Icons

```__react
import IconSet from 'site/theme/template/IconSet';
ReactDOM.render(<IconSet className="icons" catigory="suggestion" />, mountNode);
```

### Other Icons

```__react
import IconSet from 'site/theme/template/IconSet';
ReactDOM.render(<IconSet className="icons" catigory="other" />, mountNode);
```

## Props

| Property | Description      | Type   | Default |
|----------|------------------|------- |---------|
| type | Type of ant design icons | string | - |
| spin | Rotate icon with animation | boolean | false |

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
  color: #108ee9;
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  opacity: 0;
}
ul.anticons-list li.copied:after {
  opacity: 1;
  top: -10px;
}
.anticon {
  font-size: 24px;
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
  font-family: "Lucida Console", Consolas;
  white-space: nowrap;
}
</style>
