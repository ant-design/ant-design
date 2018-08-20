---
order: 1
title:
  zh-CN: 自定义图标
  en-US: Custom Icon
---

## zh-CN

利用 `Icon` 组件封装一个可复用的自定义图标。可以通过 `component` 属性传入一个组件来渲染最终的图标，以满足特定的需求。这个例子中使用了 `@svgr/webpack` 来将 `svg` 图标转化为 `React` 组件。

## en-US

Create a reusable React component by using `<Icon component={...} />`. The property `component` takes a React component that renders to `svg` element. This demo shows how to convert `svg` icon to a React component by using `webpack` and loader `@svgr/webpack`.

````jsx
import { Icon } from 'antd';
import HeartSvg from './assets/heart.svg';
import AntDesignSvg from './assets/ant-design.svg';
// use webpack loader `@svgr/webpack`,
// which converts the `*.svg` file into a React component.

const HeartIcon = props => (
  <Icon component={HeartSvg} {...props} />
);

const AntDesignIcon = props => (
  <Icon component={AntDesignSvg} {...props} />
);

ReactDOM.render(
  <div className="custom-icons-list">
    <HeartIcon style={{ color: 'hotpink' }} />
    <AntDesignIcon style={{ fontSize: '32px' }} />
  </div>,
  mountNode
);
````

```css
.custom-icons-list > .anticon {
  margin-right: 6px;
}
```
