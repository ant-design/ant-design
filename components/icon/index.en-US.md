---
category: Components
type: General
title: Icon
toc: false
---

Semantic vector graphics.

## Icons naming convention

We provide semantic name for every icon, and naming rules are as follows:

- Scanning line icon has the similar name with its solid one，but it's distinguished by `-o`, for example, `question-circle` (a full circle) and `question-circle-o` (an empty circle);
- Naming sequence：`[name]-[shape?]-[outline?]-[direction?]`.

> `?` means is optional.

See more design detail at [here](/docs/spec/icon).

## How To Use

Use tag <Icon /> to create an icon and set its type in the type prop, for example:

```html
<Icon type="link" />
```

## Local deployment

By default, icons are deployed at [iconfont.cn](http://iconfont.cn), publicly available repository of a huge set of icons. In case you need to use a locally deployed version of the icon font, you can refer to [this example](https://github.com/ant-design/antd-init/tree/master/examples/local-iconfont)。

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

## API

You can set `style` and `className` for size and color of icons because they are still words in essence.

```jsx
<Icon type="question" style={{ fontSize: 16, color: '#08c' }} />
```

| Property | Description      | Type   | Default |
|----------|------------------|------- |---------|
| type | Type of ant design icons | string | - |
| spin | Rotate icon with animation | boolean | false |
