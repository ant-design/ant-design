---
order: 1
title:
  zh-CN: 自定义图标
  en-US: Custom Icon
---

## zh-CN

利用 `Icon` 组件封装一个可复用的自定义图标。可以将 `svg` 图标的路径信息作为 `children` 传入至组件，也可以进一步通过 `component` 属性传入一个组件来渲染最终的图标，以满足特定的需求。这个例子中使用了 `@svgr/webpack` 来将 `svg` 图标转化为 `React` 组件。

## en-US

Todo, Please replace me.

````jsx
import { Icon } from 'antd';
import HeartSvg from './assets/heart.svg';
import AntDesignSvg from './assets/ant-design.svg';
// use webpack loader `@svgr/webpack`,
// which convert `*.svg` file into react component.

const HeartIcon = props => (
  <Icon component={HeartSvg} {...props} />
);

const AntDesignIcon = props => (
  <Icon component={AntDesignSvg} {...props} />
);

const SvgDefinitions = () => (
  <svg className="svg-common-definitions">
    <defs>
      <linearGradient id="gradient-demo">
        <stop offset="20%" stopColor="#39F" />
        <stop offset="90%" stopColor="#F3F" />
      </linearGradient>
    </defs>
  </svg>
);

const MaterialHomeIcon = props => (
  <Icon viewBox="0 0 24 24" {...props}>
    {/* you should pass SVG paths */}
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </Icon>
);

const MaterialColorfulHomeIcon = props => (
  <MaterialHomeIcon
    {...props}
    component={svgProps => (
      <svg {...svgProps}>
        <defs>
          <linearGradient id="gradient">
            <stop offset="30%" stopColor="#8360c3" />
            <stop offset="70%" stopColor="#2ebf91" />
          </linearGradient>
        </defs>
        {React.Children.map(
            svgProps.children,
            child => React.cloneElement(
              child,
              child.type === 'path' ? { fill: 'url(#gradient)' } : {}
            )
        )}
      </svg>
    )}
  />
);

ReactDOM.render(
  <div className="custom-icons-list">
    <HeartIcon style={{ color: 'hotpink' }} />
    <SvgDefinitions />
    <HeartIcon
      style={{ fontSize: '18px' }}
      svgStyle={{ fill: 'url(#gradient-demo)' }}
    />
    <MaterialHomeIcon style={{ color: '#8360c3' }} />
    <MaterialColorfulHomeIcon style={{ fontSize: '18px' }} />
    <AntDesignIcon style={{ fontSize: '32px' }} />
  </div>,
  mountNode
);
````

```css
.custom-icons-list > .anticon {
  margin-right: 6px;
}

.custom-icons-list > .svg-common-definitions {
  position: absolute;
  width: 0;
  height: 0;
}
```
