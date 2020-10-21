---
order: 7
title:
  zh-CN: 目录
  en-US: directory
---

## zh-CN

内置的目录树，`multiple` 模式支持 `ctrl(Windows)` / `command(Mac)` 复选。

## en-US

Built-in directory tree. `multiple` support `ctrl(Windows)` / `command(Mac)` selection.

```tsx
import { Tree } from 'antd';

const { DirectoryTree } = Tree;

const treeData = [
  {
    title: 'Default',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'FAQ',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
  {
    title: 'Request',
    key: '0-2',
    children: [
      { title: 'leaf 2-0', key: '0-2-0', isLeaf: true },
      { title: 'leaf 2-1', key: '0-2-1', isLeaf: true },
    ],
  },
];

const Demo: React.FC<{}> = () => {
  const onSelect = (keys, event) => {
    console.log('Trigger Select', keys, event);
  };

  const onMouseEnter = info => {
    console.log('Trigger MouseEnter', info);
  };

  const onMouseLeave = info => {
    console.log('Trigger MouseLeave', info);
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };

  return (
    <DirectoryTree
      multiple
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

ReactDOM.render(<Demo />, mountNode);
```
