# TreeSelect — 树选择

## 功能概述

树型选择控件。

## 应用场景

- 类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。

## 输入字段

### Tree props 属性

#### 必填

- 无必填属性。

#### 可选

- `allowClear`: boolean | { clearIcon?: ReactNode }，自定义清除按钮，默认 false，版本 5.8.0: 支持对象形式。
- `~~autoClearSearchValue~~`: boolean，当多选模式下值被选择，自动清空搜索框，默认 true。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `defaultOpen`: boolean，是否默认展开下拉菜单。
- `defaultValue`: string | string\[]，指定默认选中的条目。
- `disabled`: boolean，是否禁用，默认 false。
- `~~popupClassName~~`: string，下拉菜单的 className 属性，使用 `classNames.popup.root` 替换，版本 4.23.0。
- `popupMatchSelectWidth`: boolean | number，下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动，默认 true，版本 5.5.0。
- `~~dropdownRender~~`: (originNode: ReactNode, props) => ReactNode，自定义下拉框内容，使用 `popupRender` 替换。
- `popupRender`: (originNode: ReactNode, props) => ReactNode，自定义下拉框内容。
- `~~dropdownStyle~~`: object，下拉菜单的样式，使用 `styles.popup.root` 替换。
- `fieldNames`: object，自定义节点 label、value、children 的字段，默认 { label: `label`, value: `value`, children: `children` }，版本 4.17.0。
- `~~filterTreeNode~~`: boolean | function(inputValue: string, treeNode: TreeNode) (函数需要返回 bool 值)，是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值，默认 function。
- `getPopupContainer`: function(triggerNode)，菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codepen.io/afc163/pen/zEjNOy?editors=0010)，默认 () => document.body。
- `labelInValue`: boolean，是否把每个选项的 label 包装到 value 中，会把 value 类型从 `string` 变为 {value: string, label: ReactNode, halfChecked: boolean(选项列表是否为半选状态，并且不会展示到值中) } 的格式，默认 false。
- `listHeight`: number，设置弹窗滚动高度，默认 256。
- `loadData`: function(node)，异步加载数据。在过滤时不会调用以防止网络堵塞，可参考 FAQ 获得更多内容。
- `maxCount`: number，指定可选中的最多 items 数量，仅在 `multiple=true` 时生效。如果此时 (`showCheckedStrategy = 'SHOW_ALL'` 且未开启 `treeCheckStrictly`)，或使用 `showCheckedStrategy = 'SHOW_PARENT'`，则maxCount无效，版本 5.23.0。
- `maxTagCount`: number | `responsive`，最多显示多少个 tag，响应式模式会对性能产生损耗，版本 responsive: 4.10。
- `maxTagPlaceholder`: ReactNode | function(omittedValues)，隐藏 tag 时显示的内容。
- `maxTagTextLength`: number，最大显示的 tag 文本长度。
- `multiple`: boolean，支持多选（当设置 treeCheckable 时自动变为 true），默认 false。
- `notFoundContent`: ReactNode，当下拉列表为空时显示的内容，默认 `Not Found`。
- `open`: boolean，是否展开下拉菜单。
- `placeholder`: string，选择框默认文字。
- `placement`: `bottomLeft` `bottomRight` `topLeft` `topRight`，选择框弹出的位置，默认 bottomLeft。
- `prefix`: ReactNode，自定义前缀，版本 5.22.0。
- `~~searchValue~~`: string，搜索框的值，可以通过 `onSearch` 获取用户输入。
- `showCheckedStrategy`: `TreeSelect.SHOW_ALL` | `TreeSelect.SHOW_PARENT` | `TreeSelect.SHOW_CHILD`，配置 `treeCheckable` 时，定义选中项回填的方式。`TreeSelect.SHOW_ALL`: 显示所有选中节点(包括父节点)。`TreeSelect.SHOW_PARENT`: 只显示父节点(当父节点下所有子节点都选中时)。 默认只显示子节点，默认 `TreeSelect.SHOW_CHILD`。
- `showSearch`: boolean | [Object](#showsearch)，是否支持搜索框，默认 单选：false | 多选：true。
- `size`: `large` | `middle` | `small`，选择框大小。
- `status`: 'error' | 'warning'，设置校验状态，版本 4.19.0。
- `suffixIcon`: ReactNode，自定义的选择框后缀图标，默认 `<DownOutlined />`。
- `switcherIcon`: ReactNode | ((props: AntTreeNodeProps) => ReactNode)，自定义树节点的展开/折叠图标，版本 renderProps: 4.20.0。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `tagRender`: (props) => ReactNode，自定义 tag 内容，多选时生效。
- `treeCheckable`: boolean，显示 Checkbox，默认 false。
- `treeCheckStrictly`: boolean，`checkable` 状态下节点选择完全受控（父子节点选中状态不再关联），会使得 `labelInValue` 强制为 true，默认 false。
- `treeData`: array<{value, title, children, \[disabled, disableCheckbox, selectable, checkable]}>，treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（value 在整个树范围内唯一），默认 \[]。
- `treeDataSimpleMode`: boolean | object<{ id: string, pId: string, rootPId: string }>，使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: \[{id:1, pId:0, value:'1', title:"test1",...},...]， `pId` 是父节点的 id)，默认 false。
- `treeTitleRender`: (nodeData) => ReactNode，自定义渲染节点，版本 5.12.0。
- `treeDefaultExpandAll`: boolean，默认展开所有树节点，默认 false。
- `treeDefaultExpandedKeys`: string\[]，默认展开的树节点。
- `treeExpandAction`: string | boolean，点击节点 title 时的展开逻辑，可选：false | `click` | `doubleClick`，默认 false，版本 4.21.0。
- `treeExpandedKeys`: string\[]，设置展开的树节点。
- `treeIcon`: boolean，是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式，默认 false。
- `treeLine`: boolean | object，是否展示线条样式，请参考 [Tree - showLine](/components/tree-cn#tree-demo-line)，默认 false，版本 4.17.0。
- `treeLoadedKeys`: string[]，（受控）已经加载的节点，需要配合 `loadData` 使用，默认 []。
- `~~treeNodeFilterProp~~`: string，输入项过滤对应的 treeNode 属性，默认 `value`。
- `treeNodeLabelProp`: string，作为显示的 prop 设置，默认 `title`。
- `value`: string | string\[]，指定当前选中的条目。
- `variant`: `outlined` | `borderless` | `filled` | `underlined`，形态变体，默认 `outlined`，版本 5.13.0 | `underlined`: 5.24.0。
- `virtual`: boolean，设置 false 时关闭虚拟滚动，默认 true，版本 4.1.0。
- `onChange`: function(value, label, extra)，选中树节点时调用此函数。
- `~~onDropdownVisibleChange~~`: (open: boolean) => void，展开下拉菜单的回调，使用 `onOpenChange` 替换。
- `onOpenChange`: (open: boolean) => void，展开下拉菜单的回调。
- `~~onSearch~~`: function(value: string)，文本框值变化时的回调。
- `onSelect`: function(value, node, extra)，被选中时调用。
- `onTreeExpand`: function(expandedKeys)，展示节点时调用。
- `onPopupScroll`: (event: UIEvent) => void，下拉列表滚动时的回调，版本 5.17.0。

### showSearch 属性

#### 必填

- 无必填属性。

#### 可选

- `autoClearSearchValue`: boolean，当多选模式下值被选择，自动清空搜索框，默认 true。
- `filterTreeNode`: boolean | function(inputValue: string, treeNode: TreeNode) (函数需要返回 bool 值)，是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值，默认 function。
- `searchValue`: string，搜索框的值，可以通过 `onSearch` 获取用户输入。
- `treeNodeFilterProp`: string，输入项过滤对应的 treeNode 属性，默认 `value`。
- `onSearch`: function(value: string)，文本框值变化时的回调。

### TreeNode props 属性

#### 必填

- 无必填属性。

#### 可选

- `checkable`: boolean，当树为 Checkbox 时，设置独立节点是否展示 Checkbox。
- `disableCheckbox`: boolean，禁掉 Checkbox，默认 false。
- `disabled`: boolean，是否禁用，默认 false。
- `isLeaf`: boolean，是否是叶子节点，默认 false。
- `key`: string，此项必须设置（其值在整个树范围内唯一）。
- `selectable`: boolean，是否可选，默认 true。
- `title`: ReactNode，树节点显示的内容，默认 `---`。
- `value`: string，默认根据此属性值进行筛选（其值在整个树范围内唯一）。

## 方法

- `blur()`: 移除焦点
- `focus()`: 获取焦点

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
      <TreeSelect
        multiple
        style={{ width: '100%' }}
        value={value}
        placeholder="多选"
        treeDefaultExpandAll
        onChange={setValue}
        treeData={treeData}
      />

      <TreeSelect
        treeCheckable
        style={{ width: '100%' }}
        placeholder="勾选模式"
        treeDefaultExpandAll
        onChange={console.log}
        treeData={treeData}
      />

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
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={value}
        placeholder="搜索"
        treeDefaultExpandAll
        onChange={setValue}
        treeData={treeData}
      />

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
    <TreeSelect disabled style={{ width: '100%' }} placeholder="禁用" treeData={treeData} />

    <TreeSelect
      style={{ width: '100%' }}
      placeholder="禁用部分节点"
      treeDefaultExpandAll
      treeData={treeData}
    />

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

      <TreeSelect
        fieldNames={{ label: 'name', value: 'id', children: 'sub' }}
        style={{ width: '100%' }}
        placeholder="自定义字段"
        treeDefaultExpandAll
        onChange={setValue}
        treeData={treeData}
      />

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
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={value}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={setValue}
        treeData={treeData}
      />

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
