---
order: 1
title:
  zh-CN: 自定义图标
  en-US: Custom Icon
---

## zh-CN

利用 `Icon` 提供的 `<CustomIcon />` 组件封装一个可复用的自定义图标。可以进一步通过 `component` 属性传入一个组件来修饰 `<svg/>` 标签，以满足特定的需求。

## en-US

Todo, Please replace me.

````jsx
import { Icon } from 'antd';
const CustomIcon = Icon.CustomIcon;

const StarIcon = (props) => {
  const path = 'M908 353l-254-37L541 86c-3-6-8-11-15'
    + '-14-16-8-35-2-43 14L370 316l-254 37a32 32 0 0 0'
    + '-18 55l184 179-44 253c-1 7 0 14 4 20 8 16 27 22'
    + ' 43 13l227-119 227 119c6 4 14 5 20 4 18-3 29-20'
    + ' 26-37l-43-253 184-179a32 32 0 0 0-18-55z';
  return (
    <CustomIcon {...props} viewBox="0 0 1024 1024">
      <title>Cool Star</title>
      <path d={path} />
    </CustomIcon>
  );
};

ReactDOM.render(
  <div className="icons-list">
    <StarIcon />
    <StarIcon spin />
    <StarIcon
      component={svgProps => (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="gradient">
              <stop offset="20%" stopColor="#39F" />
              <stop offset="90%" stopColor="#F3F" />
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
  </div>,
  mountNode
);
````

```css
.icons-list > .anticon {
  margin-right: 6px;
}
```
