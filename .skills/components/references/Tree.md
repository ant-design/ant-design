# Tree — 树形控件

## 功能概述

多层次的结构列表。

## 应用场景

- 文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。
- 使用 `树控件` 可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## 输入字段

### Tree props 属性

#### 必填

- 无必填属性。

#### 可选

- `allowDrop`: ({ dropNode, dropPosition }) => boolean，是否允许拖拽时放置在该节点。
- `autoExpandParent`: boolean，是否自动展开父节点，默认 false。
- `blockNode`: boolean，是否节点占据一行，默认 false。
- `checkable`: boolean，节点前添加 Checkbox 复选框，默认 false。
- `checkedKeys`: string\[] | {checked: string\[], halfChecked: string\[]}，（受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置 `checkable` 和 `checkStrictly`，它是一个有`checked`和`halfChecked`属性的对象，并且父子节点的选中与否不再关联，默认 \[]。
- `checkStrictly`: boolean，checkable 状态下节点选择完全受控（父子节点选中状态不再关联），默认 false。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `defaultCheckedKeys`: string\[]，默认选中复选框的树节点，默认 \[]。
- `defaultExpandAll`: boolean，默认展开所有树节点，默认 false。
- `defaultExpandedKeys`: string\[]，默认展开指定的树节点，默认 \[]。
- `defaultExpandParent`: boolean，默认展开父节点，默认 true。
- `defaultSelectedKeys`: string\[]，默认选中的树节点，默认 \[]。
- `disabled`: boolean，将树禁用，默认 false。
- `draggable`: boolean | ((node: DataNode) => boolean) | { icon?: React.ReactNode | false, nodeDraggable?: (node: DataNode) => boolean }，设置节点可拖拽，可以通过 `icon: false` 关闭拖拽提示图标，默认 false，版本 `config`: 4.17.0。
- `expandedKeys`: string\[]，（受控）展开指定的树节点，默认 \[]。
- `fieldNames`: object，自定义节点 title、key、children 的字段，默认 { title: `title`, key: `key`, children: `children` }，版本 4.17.0。
- `filterTreeNode`: function(node)，按需筛选树节点（高亮），返回 true。
- `height`: number，设置虚拟滚动容器高度，设置后内部节点不再支持横向滚动。
- `icon`: ReactNode | (props) => ReactNode，在标题之前插入自定义图标。需要设置 `showIcon` 为 true。
- `loadData`: function(node)，异步加载数据。
- `loadedKeys`: string\[]，（受控）已经加载的节点，需要配合 `loadData` 使用，默认 \[]。
- `multiple`: boolean，支持点选多个节点（节点本身），默认 false。
- `rootStyle`: CSSProperties，添加在 Tree 最外层的 style，版本 4.20.0。
- `selectable`: boolean，是否可选中，默认 true。
- `selectedKeys`: string\[]，（受控）设置选中的树节点，多选需设置 `multiple` 为 true。
- `showIcon`: boolean，控制是否展示 `icon` 节点，没有默认样式，默认 false。
- `showLine`: boolean | { showLeafIcon: ReactNode | ((props: AntTreeNodeProps) => ReactNode) }，是否展示连接线，默认 false。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `switcherIcon`: ReactNode | ((props: AntTreeNodeProps) => ReactNode)，自定义树节点的展开/折叠图标（带有默认 rotate 角度样式），版本 renderProps: 4.20.0。
- `switcherLoadingIcon`: ReactNode，自定义树节点的加载图标，版本 5.20.0。
- `titleRender`: (nodeData) => ReactNode，自定义渲染节点，版本 4.5.0。
- `treeData`: array<{key, title, children, \[disabled, selectable]}>，treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一）。
- `virtual`: boolean，设置 false 时关闭虚拟滚动，默认 true，版本 4.1.0。
- `onCheck`: function(checkedKeys, e:{checked: boolean, checkedNodes, node, event, halfCheckedKeys})，点击复选框触发。
- `onDragEnd`: function({event, node})，dragend 触发时调用。
- `onDragEnter`: function({event, node, expandedKeys})，dragenter 触发时调用。
- `onDragLeave`: function({event, node})，dragleave 触发时调用。
- `onDragOver`: function({event, node})，dragover 触发时调用。
- `onDragStart`: function({event, node})，开始拖拽时调用。
- `onDrop`: function({event, node, dragNode, dragNodesKeys})，drop 触发时调用。
- `onExpand`: function(expandedKeys, {expanded: boolean, node})，展开/收起节点时触发。
- `onLoad`: function(loadedKeys, {event, node})，节点加载完毕时触发。
- `onRightClick`: function({event, node})，响应右键点击。
- `onSelect`: function(selectedKeys, e:{selected: boolean, selectedNodes, node, event})，点击树节点触发。

### TreeNode props 属性

#### 必填

- 无必填属性。

#### 可选

- `checkable`: boolean，当树为 checkable 时，设置独立节点是否展示 Checkbox。
- `disableCheckbox`: boolean，禁掉 checkbox，默认 false。
- `disabled`: boolean，禁掉响应，默认 false。
- `icon`: ReactNode | (props) => ReactNode，自定义图标。可接收组件，props 为当前节点 props。
- `isLeaf`: boolean，设置为叶子节点 (设置了 `loadData` 时有效)。为 `false` 时会强制将其作为父节点。
- `key`: string，被树的 (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys 属性所用。注意：整个树范围内的所有节点的 key 值不能重复！，默认 (内部计算出的节点位置)。
- `selectable`: boolean，设置节点是否可被选中，默认 true。
- `title`: ReactNode，标题，默认 `---`。

### DirectoryTree props 属性

#### 必填

- 无必填属性。

#### 可选

- `expandAction`: string | boolean，目录展开逻辑，可选：false | `click` | `doubleClick`，默认 `click`。

## 方法

- `scrollTo({ key: string | number; align?: 'top' | 'bottom' | 'auto'; offset?: number })`: 虚拟滚动下，滚动到指定 key 条目

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
