---
order: 5
title:
  zh-CN: 连接线
  en-US: Tree With Line
---

## zh-CN

带连接线的树。

## en-US

Tree With Line

```tsx
import { Tree } from 'antd';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          { title: 'leaf', key: '0-0-0-0' },
          { title: 'leaf', key: '0-0-0-1' },
          { title: 'leaf', key: '0-0-0-2' },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: 'leaf', key: '0-0-1-0' }],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [{ title: 'leaf', key: '0-0-2-0' }, { title: 'leaf', key: '0-0-2-1' }],
      },
    ],
  },
];

const Demo: React.FC<{}> = () => {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  return <Tree showLine defaultExpandedKeys={['0-0-0']} onSelect={onSelect} treeData={treeData} />;
};

ReactDOM.render(<Demo />, mountNode);
```
