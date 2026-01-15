# TreeSelect — 树选择

## 功能概述

树型选择控件，类似 Select 的选择控件，可选择的数据结构是一个树形结构。支持单选、多选、勾选、搜索、虚拟滚动等功能。

## 核心概念

### 树形选择流程

```
点击输入框
     ↓
 打开树形下拉菜单
     ↓
 展开/选择树节点
     ↓
 onChange 回调
     ↓
 更新输入框显示
```

### 关键数据结构

```tsx
// 树节点结构
interface TreeNode {
  value: string | number; // 选中时的值（必须）
  title: ReactNode; // 节点显示标题
  key?: string | number; // 唯一标识，默认=value
  children?: TreeNode[]; // 子节点
  disabled?: boolean; // 禁用此节点
  disableCheckbox?: boolean; // 禁用勾选
  selectable?: boolean; // 是否可选，默认 true
  checkable?: boolean; // 是否可勾选
  isLeaf?: boolean; // 叶子节点（loadData 时使用）
  icon?: ReactNode; // 自定义图标
}

// 选择变化信息
interface TreeSelectChangeInfo {
  value: string | string[] | number | number[];
  label: ReactNode; // 显示的标签
  extra?: {
    triggerValue?: any;
    triggerNode?: any;
  };
}

// 勾选策略
type ShowCheckedStrategy = 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD';
```

## 输入字段

### 必填

- `treeData`: TreeNode[]，树形数据。

### 常用可选

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | string \| string[] \| number \| number[] | - | 当前值（受控） |
| `defaultValue` | string \| string[] | - | 默认值 |
| `placeholder` | string | `'请选择'` | 占位文本 |
| `size` | `'large'` \| `'middle'` \| `'small'` | `'middle'` | 尺寸 |
| `variant` | `'outlined'` \| `'borderless'` \| `'filled'` | `'outlined'` | 形态变体 |
| `disabled` | boolean | false | 禁用状态 |
| `status` | `'error'` \| `'warning'` | - | 校验状态 |
| `allowClear` | boolean \| { clearIcon } | true | 允许清除 |
| `multiple` | boolean | false | 多选模式 |
| `treeCheckable` | boolean | false | 显示勾选框 |
| `treeCheckStrictly` | boolean | false | 父子节点不关联 |
| `showSearch` | boolean | false | 是否可搜索 |
| `virtual` | boolean | true | 虚拟滚动 |
| `treeDefaultExpandAll` | boolean | false | 默认展开所有 |
| `treeExpandedKeys` | string[] | - | 展开的节点（受控） |
| `treeDefaultExpandedKeys` | string[] | - | 默认展开的节点 |

### 搜索和过滤

- `searchValue`: string，搜索值（受控）。
- `filterTreeNode`: boolean | (inputValue, treeNode) => boolean，筛选函数。
- `treeNodeFilterProp`: string，输入项过滤对应的属性，默认 `value`。

### 树形配置

- `treeIcon`: boolean，显示节点图标。
- `treeLine`: boolean | object，显示连接线。
- `treeExpandAction`: `'click'` | `'doubleClick'`，展开触发方式。
- `loadData`: (node) => Promise<void>，异步加载数据。

### 展示配置

- `labelInValue`: boolean，value 包含 label。
- `fieldNames`: { label, value, children }，自定义字段名。
- `maxTagCount`: number | `'responsive'`，最多显示标签数。
- `maxTagPlaceholder`: ReactNode | (omittedValues) => ReactNode，隐藏标签占位。
- `showCheckedStrategy`: `'SHOW_ALL'` | `'SHOW_PARENT'` | `'SHOW_CHILD'`，勾选策略。

### 下拉配置

- `dropdownRender`: (menu) => ReactNode，自定义下拉内容。
- `popupClassName`: string，下拉类名。
- `getPopupContainer`: (node) => HTMLElement，下拉容器。
- `open`: boolean，控制下拉显示（受控）。
- `listHeight`: number，下拉高度，默认 `256`。

### 事件回调

- `onChange`: (value, label, extra) => void，选择变化回调。
- `onSelect`: (value, node, extra) => void，选中回调。
- `onSearch`: (value) => void，搜索变化回调。
- `onTreeExpand`: (expandedKeys) => void，展开回调。
- `onDropdownVisibleChange`: (open) => void，下拉展开收起回调。

## 常见场景示例

### 场景 1: 基础树形选择

```tsx
import { useState } from 'react';
import { TreeSelect } from 'antd';

const treeData = [
  {
    value: 'parent1',
    title: 'Parent 1',
    children: [
      {
        value: 'child1-1',
        title: 'Child 1-1',
        children: [
          { value: 'leaf1-1-1', title: 'Leaf 1-1-1' },
          { value: 'leaf1-1-2', title: 'Leaf 1-1-2' },
        ],
      },
      {
        value: 'child1-2',
        title: 'Child 1-2',
        children: [{ value: 'leaf1-2-1', title: 'Leaf 1-2-1' }],
      },
    ],
  },
  {
    value: 'parent2',
    title: 'Parent 2',
    children: [{ value: 'child2-1', title: 'Child 2-1' }],
  },
];

const App: React.FC = () => {
  const [value, setValue] = useState<string>();

  return (
    <TreeSelect
      style={{ width: '100%' }}
      value={value}
      placeholder="选择树形数据"
      treeDefaultExpandAll
      onChange={setValue}
      treeData={treeData}
    />
  );
};
```

### 场景 2: 多选和勾选

```tsx
import { useState } from 'react';
import { TreeSelect } from 'antd';

const treeData = [
  {
    value: 'parent1',
    title: 'Parent 1',
    children: [
      { value: 'child1-1', title: 'Child 1-1' },
      { value: 'child1-2', title: 'Child 1-2' },
    ],
  },
  {
    value: 'parent2',
    title: 'Parent 2',
    children: [{ value: 'child2-1', title: 'Child 2-1' }],
  },
];

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <>
      {/* 多选模式 */}
      <TreeSelect
        multiple
        style={{ width: '100%' }}
        value={value}
        placeholder="多选"
        treeDefaultExpandAll
        onChange={setValue}
        treeData={treeData}
      />

      {/* 勾选模式 */}
      <TreeSelect
        treeCheckable
        style={{ width: '100%' }}
        placeholder="勾选模式"
        treeDefaultExpandAll
        onChange={console.log}
        treeData={treeData}
      />

      {/* 多选 + 勾选 */}
      <TreeSelect
        multiple
        treeCheckable
        showCheckedStrategy="SHOW_PARENT"
        placeholder="多选且勾选（显示父节点）"
        treeDefaultExpandAll
        onChange={console.log}
        treeData={treeData}
      />
    </>
  );
};
```

### 场景 3: 搜索和过滤

```tsx
import { useState } from 'react';
import { TreeSelect } from 'antd';

const treeData = [
  {
    value: 'zhejiang',
    title: 'Zhejiang',
    children: [
      { value: 'hangzhou', title: 'Hangzhou' },
      { value: 'ningbo', title: 'Ningbo' },
    ],
  },
  {
    value: 'jiangsu',
    title: 'Jiangsu',
    children: [{ value: 'nanjing', title: 'Nanjing' }],
  },
];

const App: React.FC = () => {
  const [value, setValue] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>();

  return (
    <>
      {/* 基础搜索 */}
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={value}
        placeholder="搜索"
        treeDefaultExpandAll
        onChange={setValue}
        treeData={treeData}
      />

      {/* 受控搜索 */}
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={value}
        searchValue={searchValue}
        placeholder="受控搜索"
        treeDefaultExpandAll
        onChange={setValue}
        onSearch={setSearchValue}
        filterTreeNode={(inputValue, treeNode) =>
          treeNode.title.toLowerCase().includes(inputValue.toLowerCase())
        }
        treeData={treeData}
      />
    </>
  );
};
```

### 场景 4: 受控展开和异步加载

```tsx
import { useState } from 'react';
import { TreeSelect } from 'antd';

interface DataNode {
  value: string;
  title: string;
  children?: DataNode[];
  isLeaf?: boolean;
}

const App: React.FC = () => {
  const [treeData, setTreeData] = useState<DataNode[]>([
    { value: 'parent1', title: 'Parent 1', isLeaf: false },
    { value: 'parent2', title: 'Parent 2', isLeaf: false },
  ]);

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const onLoadData = (node: DataNode) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        node.children = [
          {
            value: `${node.value}-1`,
            title: `${node.title} - Child 1`,
            isLeaf: true,
          },
          {
            value: `${node.value}-2`,
            title: `${node.title} - Child 2`,
            isLeaf: true,
          },
        ];
        setTreeData([...treeData]);
        resolve();
      }, 1000);
    });
  };

  return (
    <TreeSelect
      style={{ width: '100%' }}
      placeholder="异步加载"
      treeExpandedKeys={expandedKeys}
      onTreeExpand={setExpandedKeys}
      loadData={onLoadData}
      treeData={treeData}
    />
  );
};
```

### 场景 5: 禁用和自定义显示

```tsx
import { TreeSelect } from 'antd';

const treeData = [
  {
    value: 'parent1',
    title: 'Parent 1',
    children: [
      { value: 'child1-1', title: 'Child 1-1' },
      { value: 'child1-2', title: 'Child 1-2', disabled: true }, // 禁用
    ],
  },
  {
    value: 'parent2',
    title: 'Parent 2',
    disabled: true, // 禁用父节点
    children: [{ value: 'child2-1', title: 'Child 2-1' }],
  },
];

const App: React.FC = () => (
  <>
    {/* 禁用整个组件 */}
    <TreeSelect disabled style={{ width: '100%' }} placeholder="禁用" treeData={treeData} />

    {/* 禁用某些节点 */}
    <TreeSelect
      style={{ width: '100%' }}
      placeholder="禁用部分节点"
      treeDefaultExpandAll
      treeData={treeData}
    />

    {/* 自定义显示值 */}
    <TreeSelect
      labelInValue
      style={{ width: '100%' }}
      placeholder="包含标签"
      treeDefaultExpandAll
      onChange={(value) => {
        console.log('value:', value);
      }}
      treeData={treeData}
    />
  </>
);
```

### 场景 6: 高级配置（虚拟滚动、自定义字段等）

```tsx
import { useState } from 'react';
import { TreeSelect } from 'antd';

interface Node {
  id: string;
  name: string;
  sub?: Node[];
}

const treeData = [
  {
    id: 'parent1',
    name: 'Parent 1',
    sub: [
      { id: 'child1-1', name: 'Child 1-1' },
      { id: 'child1-2', name: 'Child 1-2' },
    ],
  },
];

const App: React.FC = () => {
  const [value, setValue] = useState<string>();

  return (
    <>
      {/* 虚拟滚动和自定义高度 */}
      <TreeSelect
        virtual
        listHeight={300}
        style={{ width: '100%' }}
        value={value}
        placeholder="虚拟滚动"
        treeDefaultExpandAll
        onChange={setValue}
        treeData={Array.from({ length: 100 }).map((_, i) => ({
          value: i.toString(),
          title: `Item ${i}`,
        }))}
      />

      {/* 自定义字段名 */}
      <TreeSelect
        fieldNames={{ label: 'name', value: 'id', children: 'sub' }}
        style={{ width: '100%' }}
        placeholder="自定义字段"
        treeDefaultExpandAll
        onChange={setValue}
        treeData={treeData}
      />

      {/* 只读 */}
      <TreeSelect
        readOnly
        style={{ width: '100%' }}
        defaultValue="child1-1"
        placeholder="只读"
        treeDefaultExpandAll
        treeData={treeData}
      />
    </>
  );
};
```

## AI 生成指引

### 场景判断表

| 用户需求       | 选择方案             | 关键属性                              |
| -------------- | -------------------- | ------------------------------------- |
| 简单树选择     | TreeSelect 基础      | treeData, value, onChange             |
| 单选           | 单选模式             | value 为字符串                        |
| 多选           | multiple             | multiple={true}                       |
| 勾选           | treeCheckable        | treeCheckable={true}                  |
| 搜索           | showSearch           | showSearch={true}                     |
| 异步加载       | loadData             | loadData 函数                         |
| 受控展开       | treeExpandedKeys     | treeExpandedKeys, onTreeExpand        |
| 默认展开所有   | treeDefaultExpandAll | treeDefaultExpandAll={true}           |
| 父子不关联     | treeCheckStrictly    | treeCheckStrictly={true}              |
| 大数据虚拟滚动 | virtual + listHeight | virtual={true}, listHeight            |
| 自定义字段名   | fieldNames           | fieldNames={ label, value, children } |
| 禁用节点       | disabled             | treeData 中 disabled 属性             |

### 类型导入

```tsx
import type {
  DefaultOptionType, // 选项类型
  TreeSelectProps, // TreeSelect 组件 props 类型
  TreeSelectRef, // TreeSelect ref 类型
} from 'antd';
```

## 使用建议

需要选择树形数据时使用 TreeSelect；需要勾选功能使用 `treeCheckable`；多选使用 `multiple={true}`；大数据量使用 `virtual` 虚拟滚动和 `loadData` 动态加载；搜索功能使用 `showSearch`；受控展开使用 `treeExpandedKeys` + `onTreeExpand`；父子节点不关联使用 `treeCheckStrictly={true}`；在 Form 中配合 `Form.Item` 使用。

## 示例代码

```tsx
import { useState } from 'react';
import { TreeSelect } from 'antd';

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          { value: 'leaf1', title: 'leaf1' },
          { value: 'leaf2', title: 'leaf2' },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [{ value: 'leaf3', title: 'leaf3' }],
      },
    ],
  },
];

const App: React.FC = () => {
  const [value, setValue] = useState<string>();

  return (
    <>
      {/* 基础用法 */}
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={value}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={setValue}
        treeData={treeData}
      />

      {/* 多选 + 勾选 */}
      <TreeSelect
        treeData={treeData}
        treeCheckable
        showCheckedStrategy="SHOW_PARENT"
        placeholder="Please select"
        style={{ width: '100%' }}
      />
    </>
  );
};
```

## 返回结果

渲染一个树形选择器，用于树形数据的选择。
