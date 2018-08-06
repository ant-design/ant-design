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
  return (
    <CustomIcon {...props} viewBox="0 0 1024 1024">
      <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3-12.3 12.7-12.1 32.9 0.6 45.3l183.7 179.1-43.4 252.9c-1.2 6.9-0.1 14.1 3.2 20.3 8.2 15.6 27.6 21.7 43.2 13.4L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" p-id="5827" />
    </CustomIcon>
  );
};

const CoolStarIcon = (props) => {
  const component = (svgProps) => {
    return (
      <svg {...svgProps}>
        <defs>
          <linearGradient id="Gradient-1">
            <stop offset="20%" stopColor="#39F" />
            <stop offset="90%" stopColor="#F3F" />
          </linearGradient>
        </defs>
        {React.cloneElement(svgProps.children, { fill: 'url(#Gradient-1)' })}
      </svg>
    );
  };
  return <StarIcon {...props} component={component} />;
};

ReactDOM.render(
  <div>
    <StarIcon />
    <CoolStarIcon />
  </div>,
  mountNode
);
````
