# Tree — 树形控件

## 功能概述

多层次的结构列表，支持展开/收起、选择、勾选、拖拽等交互。适用于组织结构、文件目录、分类导航等场景。

## 核心概念

### 树形数据渲染流程

```
treeData 数据源
     ↓
 Tree 组件递归渲染
     ↓
 节点展开状态 (expandedKeys)
     ↓
 选择/勾选状态 (selectedKeys/checkedKeys)
     ↓
 用户交互 (click/check/expand)
     ↓
 回调触发 (onSelect/onCheck/onExpand)
```

### 关键数据结构

```tsx
// 树节点数据结构
interface TreeNode {
  key: string | number; // 唯一标识（必须）
  title?: ReactNode; // 节点标题
  children?: TreeNode[]; // 子节点
  disabled?: boolean; // 禁用节点
  disableCheckbox?: boolean; // 禁用 checkbox
  selectable?: boolean; // 是否可选，默认 true
  checkable?: boolean; // 是否可勾选
  isLeaf?: boolean; // 是否叶子节点（loadData 时使用）
  icon?: ReactNode; // 节点图标
  data?: any; // 自定义数据
}

// 拖拽信息
interface DragEvent {
  event: DragEvent;
  node: TreeNode;
  expandedKeys: string[];
}

// 放置信息
interface DropEvent {
  event: DragEvent;
  node: TreeNode;
  dragNode: TreeNode;
  dragNodesKeys: string[];
  dropPosition: -1 | 0 | 1; // -1: 上方，0: 内部，1: 下方
  dropToGap: boolean;
}

// 异步加载返回值
type LoadDataFn = (node: TreeNode) => Promise<void>;
```

## 输入字段

### 必填

- `treeData`: TreeNode[]，树形数据数组。

### 常用可选

| 属性                  | 类型                                 | 默认值 | 说明                   |
| --------------------- | ------------------------------------ | ------ | ---------------------- |
| `selectedKeys`        | string[]                             | -      | 选中的节点 key（受控） |
| `defaultSelectedKeys` | string[]                             | -      | 默认选中               |
| `checkedKeys`         | string[] \| { checked, halfChecked } | -      | 勾选的节点 key（受控） |
| `defaultCheckedKeys`  | string[]                             | -      | 默认勾选               |
| `expandedKeys`        | string[]                             | -      | 展开的节点 key（受控） |
| `defaultExpandedKeys` | string[]                             | -      | 默认展开               |
| `defaultExpandAll`    | boolean                              | false  | 默认展开所有           |
| `autoExpandParent`    | boolean                              | true   | 自动展开父节点         |
| `checkable`           | boolean                              | false  | 显示 checkbox          |
| `checkStrictly`       | boolean                              | false  | 父子节点不关联         |
| `selectable`          | boolean                              | true   | 允许选中               |
| `multiple`            | boolean                              | false  | 允许多选               |
| `draggable`           | boolean \| (node) => boolean         | false  | 可拖拽                 |
| `blockNode`           | boolean                              | false  | 节点撑满               |
| `showLine`            | boolean \| { showLeafIcon }          | false  | 显示连接线             |
| `showIcon`            | boolean                              | true   | 显示节点图标           |
| `virtual`             | boolean                              | true   | 虚拟滚动               |
| `height`              | number                               | 400    | 虚拟滚动高度           |
| `disabled`            | boolean                              | false  | 禁用整棵树             |

### 筛选和加载

- `filterTreeNode`: (node) => boolean，筛选函数。
- `loadData`: (node) => Promise<void>，异步加载数据。
- `loadedKeys`: string[]，已加载的节点（受控）。

### 自定义渲染

- `titleRender`: (node) => ReactNode，自定义标题渲染。
- `icon`: ReactNode | (props) => ReactNode，自定义节点图标。
- `switcherIcon`: ReactNode | (props) => ReactNode，自定义展开/收起图标。
- `switcherLoadingIcon`: ReactNode，加载中显示的图标（5.20.0+）。

### 拖拽配置

- `allowDrop`: ({ dropNode, dropPosition }) => boolean，允许放置判断。
- `onDragStart`: (info) => void，拖拽开始回调。
- `onDragEnter`: (info) => void，拖拽进入回调。
- `onDragOver`: (info) => void，拖拽经过回调。
- `onDragLeave`: (info) => void，拖拽离开回调。
- `onDragEnd`: (info) => void，拖拽结束回调。
- `onDrop`: (info) => void，放置回调。

### 事件回调

- `onSelect`: (selectedKeys, info) => void，节点选中回调。
- `onCheck`: (checkedKeys, info) => void，节点勾选回调。
- `onExpand`: (expandedKeys, info) => void，节点展开回调。
- `onLoad`: (loadedKeys, info) => void，异步加载完成回调。
- `onRightClick`: (info) => void，右键点击回调。

### Tree.DirectoryTree 属性

目录树，继承 Tree 所有属性，额外：

- `expandAction`: `'click'` | `'doubleClick'` | false，展开触发方式。

## 常见场景示例

### 场景 1: 基础树形结构

```tsx
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          { title: 'leaf 0-0-0-0', key: '0-0-0-0' },
          { title: 'leaf 0-0-0-1', key: '0-0-0-1' },
        ],
      },
      { title: 'parent 1-1', key: '0-0-1' },
    ],
  },
];

const App: React.FC = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  return (
    <Tree
      defaultExpandedKeys={['0-0-0']}
      defaultSelectedKeys={['0-0-0']}
      onSelect={onSelect}
      treeData={treeData}
    />
  );
};
```

### 场景 2: 勾选和多选

```tsx
import { useState } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title: '全国',
    key: 'root',
    children: [
      {
        title: '北京',
        key: 'beijing',
        children: [
          { title: '朝阳区', key: 'chaoyang' },
          { title: '海淀区', key: 'haidian' },
        ],
      },
      { title: '上海', key: 'shanghai' },
    ],
  },
];

const App: React.FC = () => {
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['chaoyang']);

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    setCheckedKeys(checkedKeys as React.Key[]);
  };

  return (
    <>
      <Tree
        checkable
        defaultExpandedKeys={['root', 'beijing']}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
        treeData={treeData}
      />
      <p>选中: {checkedKeys.join(', ')}</p>
    </>
  );
};
```

### 场景 3: 受控展开和选择

```tsx
import { useState } from 'react';
import { Button, Space, Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title: 'Parent 1',
    key: '0-0',
    children: [
      { title: 'Child 1-0', key: '0-0-0' },
      { title: 'Child 1-1', key: '0-0-1' },
    ],
  },
];

const App: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => setExpandedKeys(['0-0'])}>展开</Button>
        <Button onClick={() => setExpandedKeys([])}>收起</Button>
      </Space>
      <Tree
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onExpand={setExpandedKeys}
        onSelect={setSelectedKeys}
        treeData={treeData}
      />
    </>
  );
};
```

### 场景 4: 异步加载

```tsx
import { useState } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

const App: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeDataNode[]>([{ title: 'Expand to load', key: '0' }]);

  const onLoadData: TreeProps['loadData'] = ({ key, children }) => {
    return new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        setTreeData((origin) =>
          origin.map((node) => {
            if (node.key === key) {
              return {
                ...node,
                children: [
                  { title: `Child ${key}-0`, key: `${key}-0` },
                  { title: `Child ${key}-1`, key: `${key}-1` },
                ],
              };
            }
            return node;
          }),
        );
        resolve();
      }, 1000);
    });
  };

  return <Tree loadData={onLoadData} treeData={treeData} />;
};
```

### 场景 5: 拖拽排序

```tsx
import { useState } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title: 'Item 1',
    key: '0-0',
    children: [
      { title: 'Item 1-1', key: '0-0-0' },
      { title: 'Item 1-2', key: '0-0-1' },
    ],
  },
];

const App: React.FC = () => {
  const [data, setData] = useState(treeData);

  const onDrop: TreeProps['onDrop'] = (info) => {
    console.log('Drop info:', info);
    // 处理拖拽排序逻辑
  };

  return <Tree draggable blockNode treeData={data} onDrop={onDrop} />;
};
```

### 场景 6: 目录树 (DirectoryTree)

```tsx
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title: 'src',
    key: 'src',
    children: [
      {
        title: 'components',
        key: 'components',
        children: [
          { title: 'Button.tsx', key: 'button' },
          { title: 'Input.tsx', key: 'input' },
        ],
      },
      { title: 'utils', key: 'utils' },
    ],
  },
];

const App: React.FC = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('Selected:', selectedKeys);
  };

  return (
    <Tree.DirectoryTree
      defaultExpandedKeys={['src', 'components']}
      onSelect={onSelect}
      treeData={treeData}
    />
  );
};
```

## AI 生成指引

### 场景判断表

| 用户需求   | 选择方案              | 关键属性                      |
| ---------- | --------------------- | ----------------------------- |
| 简单树展示 | Tree 基础             | treeData, defaultExpandedKeys |
| 节点选择   | onSelect              | selectedKeys, onSelect        |
| 节点勾选   | checkable             | checkable, onCheck            |
| 多选       | multiple + checkable  | multiple, checkable           |
| 受控模式   | key + onChange        | expandedKeys, onExpand 等     |
| 异步加载   | loadData              | loadData, loadedKeys          |
| 搜索/筛选  | filterTreeNode        | filterTreeNode, treeData 过滤 |
| 拖拽排序   | draggable + onDrop    | draggable, onDrop             |
| 目录树     | DirectoryTree         | Tree.DirectoryTree            |
| 虚拟滚动   | virtual + height      | virtual, height               |
| 自定义图标 | icon                  | icon, switcherIcon            |
| 父子关联   | checkStrictly={false} | checkStrictly                 |
| 父子不关联 | checkStrictly={true}  | checkStrictly                 |

### 类型导入

```tsx
import type {
  DirectoryTreeProps, // DirectoryTree props 类型
  EventDataNode, // 事件中的节点类型
  TreeDataNode, // 树节点数据类型
  TreeProps, // Tree 组件 props 类型
} from 'antd';
```

## 使用建议

大数据量使用 `virtual` 虚拟滚动；异步加载使用 `loadData`；需要勾选功能使用 `checkable`；目录场景使用 `Tree.DirectoryTree`；受控展开使用 `expandedKeys` + `onExpand`；受控选择使用 `selectedKeys` + `onSelect`；勾选父子关联配置 `checkStrictly`。

## 示例代码

```tsx
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

const treeData: TreeDataNode[] = [
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
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: 'leaf', key: '0-0-1-0' }],
      },
    ],
  },
];

const App: React.FC = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <Tree
      checkable
      defaultExpandedKeys={['0-0-0']}
      defaultSelectedKeys={['0-0-0']}
      defaultCheckedKeys={['0-0-0']}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={treeData}
    />
  );
};
```

## 返回结果

渲染一个树形控件，支持展开、选择、勾选等交互。
