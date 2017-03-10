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

### Application Icons

```__react
import IconSet from 'site/theme/template/IconSet';
ReactDOM.render(<IconSet className="icons" catigory="other" />, mountNode);
```

### Brand and Logos

```__react
import IconSet from 'site/theme/template/IconSet';
ReactDOM.render(<IconSet className="icons" catigory="logo" />, mountNode);
```

## Props

| Property | Description      | Type   | Default |
|----------|------------------|------- |---------|
| type | Type of ant design icons | string | - |
| spin | Rotate icon with animation | boolean | false |
