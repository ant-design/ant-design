---
order: 6
title:
  zh-CN: 自定义图标
  en-US: Customize Icon
---

## zh-CN

可以针对不同的节点定制图标。

## en-US

You can customize icons for different nodes.

```jsx
import { Tree } from 'antd';
import { Down, Frown, Smile, Meh, FrownFilled } from '@ant-design/icons';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <Smile />,
    children: [
      {
        title: 'leaf',
        key: '0-0-0',
        icon: <Meh />,
      },
      {
        title: 'leaf',
        key: '0-0-1',
        icon: ({ selected }) => (selected ? <FrownFilled /> : <Frown />),
      },
    ],
  },
];

ReactDOM.render(
  <Tree
    showIcon
    defaultExpandAll
    defaultSelectedKeys={['0-0-0']}
    switcherIcon={<Down />}
    treeData={treeData}
  />,
  mountNode,
);
```
