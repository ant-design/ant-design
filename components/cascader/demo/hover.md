---
order: 3
title:
  zh-CN: 移入展开
  en-US: Hover
---

## zh-CN

通过移入展开下级菜单，点击完成选择。

## en-US

Hover to expand sub menu, click to select option.

```jsx
import { Cascader } from 'antd';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

function onChange(value) {
  console.log(value);
}

// Just show the latest item.
function displayRender(label) {
  return label[label.length - 1];
}

ReactDOM.render(
  <Cascader
    options={options}
    expandTrigger="hover"
    displayRender={displayRender}
    onChange={onChange}
  />,
  mountNode,
);
```
