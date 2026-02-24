---
category: Components
group: Data Entry
title: TreeSelect
description: Tree selection control.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*1zcHQLltaJcAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*hjwGSIa4J8QAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

`TreeSelect` is similar to `Select`, but the values are provided in a tree like structure. Any data whose entries are defined in a hierarchical manner is fit to use this control. Examples of such case may include a corporate hierarchy, a directory structure, and so on.

## Examples

### Basic

The most basic usage.

```tsx
import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
          {
            value: 'leaf3',
            title: 'leaf3',
          },
          {
            value: 'leaf4',
            title: 'leaf4',
          },
          {
            value: 'leaf5',
            title: 'leaf5',
          },
          {
            value: 'leaf6',
            title: 'leaf6',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf11',
            title: <b style={{ color: '#08c' }}>leaf11</b>,
          },
        ],
      },
    ],
  },
];
const App: React.FC = () => {
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const onPopupScroll: TreeSelectProps['onPopupScroll'] = (e) => {
    console.log('onPopupScroll', e);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={value}
      styles={{
        popup: {
          root: { maxHeight: 400, overflow: 'auto' },
        },
      }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
      treeData={treeData}
      onPopupScroll={onPopupScroll}
    />
  );
};

export default App;
```

### Multiple Selection

Multiple selection usage.

```tsx
import React, { useState } from 'react';
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
          {
            value: 'leaf1',
            title: 'my leaf',
          },
          {
            value: 'leaf2',
            title: 'your leaf',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'sss',
            title: <b style={{ color: '#08c' }}>sss</b>,
          },
        ],
      },
    ],
  },
];
const App: React.FC = () => {
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={value}
      styles={{
        popup: {
          root: { maxHeight: 400, overflow: 'auto' },
        },
      }}
      placeholder="Please select"
      allowClear
      multiple
      treeDefaultExpandAll
      onChange={onChange}
      treeData={treeData}
    />
  );
};

export default App;
```

### Generate from tree data

The tree structure can be populated using `treeData` property. This is a quick and easy way to provide the tree content.

```tsx
import React, { useState } from 'react';
import { TreeSelect } from 'antd';

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
  },
];

const App: React.FC = () => {
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <TreeSelect
      style={{ width: '100%' }}
      value={value}
      styles={{
        popup: {
          root: { maxHeight: 400, overflow: 'auto' },
        },
      }}
      treeData={treeData}
      placeholder="Please select"
      treeDefaultExpandAll
      onChange={onChange}
    />
  );
};

export default App;
```

### Checkable

Multiple and checkable.

```tsx
import React, { useState } from 'react';
import { TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

const App: React.FC = () => {
  const [value, setValue] = useState(['0-0-0']);

  const onChange = (newValue: string[]) => {
    console.log('onChange ', newValue);
    setValue(newValue);
  };

  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  };

  return <TreeSelect {...tProps} />;
};

export default App;
```

### Asynchronous loading

Asynchronous loading tree node.

```tsx
import React, { useState } from 'react';
import type { GetProp, TreeSelectProps } from 'antd';
import { TreeSelect } from 'antd';

type DefaultOptionType = GetProp<TreeSelectProps, 'treeData'>[number];

const App: React.FC = () => {
  const [value, setValue] = useState<string>();
  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([
    { id: 1, pId: 0, value: '1', title: 'Expand to load' },
    { id: 2, pId: 0, value: '2', title: 'Expand to load' },
    { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
  ]);

  const genTreeNode = (parentId: number, isLeaf = false) => {
    const random = Math.random().toString(36).substring(2, 6);
    return {
      id: random,
      pId: parentId,
      value: random,
      title: isLeaf ? 'Tree Node' : 'Expand to load',
      isLeaf,
    };
  };

  const onLoadData: TreeSelectProps['loadData'] = ({ id }) =>
    new Promise((resolve) => {
      setTimeout(() => {
        setTreeData(
          treeData.concat([genTreeNode(id, false), genTreeNode(id, true), genTreeNode(id, true)]),
        );
        resolve(undefined);
      }, 300);
    });

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <TreeSelect
      treeDataSimpleMode
      style={{ width: '100%' }}
      value={value}
      styles={{
        popup: {
          root: { maxHeight: 400, overflow: 'auto' },
        },
      }}
      placeholder="Please select"
      onChange={onChange}
      loadData={onLoadData}
      treeData={treeData}
    />
  );
};

export default App;
```

### Show Tree Line

Use `treeLine` to show the line style.

```tsx
import React, { useState } from 'react';
import { CarryOutOutlined } from '@ant-design/icons';
import { Space, Switch, TreeSelect } from 'antd';

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    icon: <CarryOutOutlined />,
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
            icon: <CarryOutOutlined />,
          },
          {
            value: 'leaf2',
            title: 'leaf2',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        icon: <CarryOutOutlined />,
        children: [
          {
            value: 'sss',
            title: 'sss',
            icon: <CarryOutOutlined />,
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const [treeLine, setTreeLine] = useState(true);
  const [showLeafIcon, setShowLeafIcon] = useState(false);
  const [showIcon, setShowIcon] = useState<boolean>(false);

  return (
    <Space vertical>
      <Switch
        checkedChildren="showIcon"
        unCheckedChildren="showIcon"
        checked={showIcon}
        onChange={() => setShowIcon(!showIcon)}
      />
      <Switch
        checkedChildren="treeLine"
        unCheckedChildren="treeLine"
        checked={treeLine}
        onChange={() => setTreeLine(!treeLine)}
      />
      <Switch
        disabled={!treeLine}
        checkedChildren="showLeafIcon"
        unCheckedChildren="showLeafIcon"
        checked={showLeafIcon}
        onChange={() => setShowLeafIcon(!showLeafIcon)}
      />
      <TreeSelect
        treeLine={treeLine && { showLeafIcon }}
        style={{ width: 300 }}
        treeData={treeData}
        treeIcon={showIcon}
      />
    </Space>
  );
};

export default App;
```

### Placement

You can manually specify the position of the popup via `placement`.

```tsx
import React, { useState } from 'react';
import type { GetProp, RadioChangeEvent, TreeSelectProps } from 'antd';
import { Radio, TreeSelect } from 'antd';

type SelectCommonPlacement = GetProp<TreeSelectProps, 'placement'>;

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf3',
            title: <b style={{ color: '#08c' }}>leaf3</b>,
          },
        ],
      },
    ],
  },
];
const App: React.FC = () => {
  const [placement, setPlacement] = useState<SelectCommonPlacement>('topLeft');

  const placementChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  return (
    <>
      <Radio.Group value={placement} onChange={placementChange}>
        <Radio.Button value="topLeft">topLeft</Radio.Button>
        <Radio.Button value="topRight">topRight</Radio.Button>
        <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
        <Radio.Button value="bottomRight">bottomRight</Radio.Button>
      </Radio.Group>
      <br />
      <br />

      <TreeSelect
        showSearch
        styles={{
          popup: {
            root: {
              maxHeight: 400,
              overflow: 'auto',
              minWidth: 300,
            },
          },
        }}
        placeholder="Please select"
        popupMatchSelectWidth={false}
        placement={placement}
        allowClear
        treeDefaultExpandAll
        treeData={treeData}
      />
    </>
  );
};

export default App;
```

### Variants

Variants of TreeSelect, there are four variants: `outlined` `filled` `borderless` and `underlined`.

```tsx
import React from 'react';
import { Flex, TreeSelect } from 'antd';

const style: React.CSSProperties = {
  width: '100%',
  maxWidth: '100%',
};

const App: React.FC = () => {
  return (
    <Flex vertical gap="middle">
      <TreeSelect style={style} placeholder="Please select" variant="borderless" />
      <TreeSelect style={style} placeholder="Please select" variant="filled" />
      <TreeSelect style={style} placeholder="Please select" variant="outlined" />
      <TreeSelect style={style} placeholder="Please select" variant="underlined" />
    </Flex>
  );
};

export default App;
```

### Status

Add status to TreeSelect with `status`, which could be `error` or `warning`.

```tsx
import React from 'react';
import { Space, TreeSelect } from 'antd';

const App: React.FC = () => (
  <Space vertical style={{ width: '100%' }}>
    <TreeSelect status="error" style={{ width: '100%' }} placeholder="Error" />
    <TreeSelect
      status="warning"
      style={{ width: '100%' }}
      multiple
      placeholder="Warning multiple"
    />
  </Space>
);

export default App;
```

### Max Count

You can set the `maxCount` prop to control the max number of items can be selected. When the limit is exceeded, the options will become disabled.

```tsx
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { TreeSelect } from 'antd';

const MAX_COUNT = 3;

const treeData = [
  {
    title: 'Parent 1',
    value: 'parent1',
    children: [
      {
        title: 'Child 1-1',
        value: 'child1-1',
      },
      {
        title: 'Child 1-2',
        value: 'child1-2',
      },
    ],
  },
  {
    title: 'Parent 2',
    value: 'parent2',
    children: [
      {
        title: 'Child 2-1',
        value: 'child2-1',
      },
      {
        title: 'Child 2-2',
        value: 'child2-2',
      },
    ],
  },
];

const App: React.FC = () => {
  const [value, setValue] = React.useState<string[]>(['child1-1']);

  const onChange = (newValue: string[]) => {
    setValue(newValue);
  };

  const suffix = (
    <>
      <span>
        {value.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  );

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={onChange}
      multiple
      maxCount={MAX_COUNT}
      style={{ width: '100%' }}
      suffixIcon={suffix}
      treeCheckable
      placeholder="Please select"
      showCheckedStrategy={TreeSelect.SHOW_CHILD}
    />
  );
};

export default App;
```

### Prefix and Suffix

Custom `prefix` and `suffixIcon`.

```tsx
import React, { useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { TreeSelect } from 'antd';

const icon = <SmileOutlined />;
const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'my leaf',
          },
          {
            value: 'leaf2',
            title: 'your leaf',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'sss',
            title: <b style={{ color: '#08c' }}>sss</b>,
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <>
      <TreeSelect
        showSearch
        suffixIcon={icon}
        style={{ width: '100%' }}
        value={value}
        styles={{
          popup: {
            root: { maxHeight: 400, overflow: 'auto' },
          },
        }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
        treeData={treeData}
      />
      <br />
      <br />
      <TreeSelect
        showSearch
        prefix="Prefix"
        style={{ width: '100%' }}
        value={value}
        styles={{
          popup: {
            root: { maxHeight: 400, overflow: 'auto' },
          },
        }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
        treeData={treeData}
      />
    </>
  );
};

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of TreeSelect by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Flex, TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    width: 300,
    borderRadius: token.borderRadius,
  },
}));

const styleObject: TreeSelectProps['styles'] = {
  input: {
    fontSize: 16,
  },
  suffix: {
    color: '#1890ff',
  },
  popup: {
    root: {
      border: '1px solid #1890ff',
    },
  },
};

const styleFunction: TreeSelectProps['styles'] = (info) => {
  if (info.props.size === 'middle') {
    return {
      suffix: {
        color: '#722ed1',
      },
      popup: {
        item: {
          color: '#722ed1',
        },
      },
    } satisfies TreeSelectProps['styles'];
  }
  return {};
};

const treeData: TreeSelectProps['treeData'] = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf3',
            title: 'leaf3',
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const { styles: classNames } = useStyles();

  const sharedProps: TreeSelectProps = {
    treeData,
    classNames,
  };

  return (
    <Flex vertical gap="large">
      <TreeSelect {...sharedProps} styles={styleObject} placeholder="Object" />
      <TreeSelect {...sharedProps} styles={styleFunction} placeholder="Function" size="middle" />
    </Flex>
  );
};

export default App;
```




## API

Common props ref：[Common props](/docs/react/common-props)

### Tree props

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Customize clear icon | boolean \| { clearIcon?: ReactNode } | false | 5.8.0: Support object type |
| ~~autoClearSearchValue~~ | If auto clear search input value when multiple select is selected/deselected | boolean | true |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultOpen | Initial open state of dropdown | boolean | - |  |
| defaultValue | To set the initial selected treeNode(s) | string \| string\[] | - |  |
| disabled | Disabled or not | boolean | false |  |
| ~~popupClassName~~ | The className of dropdown menu, use `classNames.popup.root` instead | string | - | 4.23.0 |
| popupMatchSelectWidth | Determine whether the popup menu and the select input are the same width. Default set `min-width` same as input. Will ignore when value less than select width. `false` will disable virtual scroll | boolean \| number | true | 5.5.0 |
| ~~dropdownRender~~ | Customize dropdown content, use `popupRender` instead | (originNode: ReactNode, props) => ReactNode | - |  |
| popupRender | Customize dropdown content | (originNode: ReactNode, props) => ReactNode | - |  |
| ~~dropdownStyle~~ | To set the style of the dropdown menu, use `styles.popup.root` instead | CSSProperties | - |  |
| fieldNames | Customize node label, value, children field name | object | { label: `label`, value: `value`, children: `children` } | 4.17.0 |
| ~~filterTreeNode~~ | Whether to filter treeNodes by input value. The value of `treeNodeFilterProp` is used for filtering by default | boolean \| function(inputValue: string, treeNode: TreeNode) (should return boolean) | function |  |
| getPopupContainer | To set the container of the dropdown menu. The default is to create a `div` element in `body`, you can reset it to the scrolling area and make a relative reposition. [example](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | function(triggerNode) | () => document.body |  |
| labelInValue | Whether to embed label in value, turn the format of value from `string` to {value: string, label: ReactNode, halfChecked: boolean (Is the option list in a semi selected state and not displayed in the values)} | boolean | false |  |
| listHeight | Config popup height | number | 256 |  |
| loadData | Load data asynchronously. Will not load when filtering. Check FAQ for more info | function(node) | - |  |
| maxTagCount | Max tag count to show. `responsive` will cost render performance | number \| `responsive` | - | responsive: 4.10 |
| maxCount | The maximum number of items that can be selected. Only takes effect when `multiple=true`. If (`showCheckedStrategy = 'SHOW_ALL'` and `treeCheckStrictly` is disabled) or `showCheckedStrategy = 'SHOW_PARENT'` is used, `maxCount` will not take effect. | number | - | 5.23.0 |
| maxTagPlaceholder | Placeholder for not showing tags | ReactNode \| function(omittedValues) | - |  |
| maxTagTextLength | Max tag text length to show | number | - |  |
| multiple | Support multiple or not, will be `true` when enable `treeCheckable` | boolean | false |  |
| notFoundContent | Specify content to show when no result matches | ReactNode | `Not Found` |  |
| open | Controlled open state of dropdown | boolean | - |  |
| placeholder | Placeholder of the select input | string | - |  |
| placement | The position where the selection box pops up | `bottomLeft` `bottomRight` `topLeft` `topRight` | bottomLeft |  |
| prefix | The custom prefix | ReactNode | - | 5.22.0 |
| ~~searchValue~~ | Work with `onSearch` to make search value controlled | string | - |  |
| showCheckedStrategy | The way show selected item in box when `treeCheckable` set. **Default:** just show child nodes. **`TreeSelect.SHOW_ALL`:** show all checked treeNodes (include parent treeNode). **`TreeSelect.SHOW_PARENT`:** show checked treeNodes (just show parent treeNode) | `TreeSelect.SHOW_ALL` \| `TreeSelect.SHOW_PARENT` \| `TreeSelect.SHOW_CHILD` | `TreeSelect.SHOW_CHILD` |  |
| showSearch | Support search or not | boolean \| [Object](#showsearch) | single: false \| multiple: true |  |
| size | To set the size of the select input | `large` \| `middle` \| `small` | - |  |
| status | Set validation status | 'error' \| 'warning' | - | 4.19.0 |
| suffixIcon | The custom suffix icon | ReactNode | `<DownOutlined />` |  |
| switcherIcon | Customize collapse/expand icon of tree node | ReactNode \| ((props: AntTreeNodeProps) => ReactNode) | - | renderProps: 4.20.0 |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| tagRender | Customize tag render when `multiple` | (props) => ReactNode | - |  |
| treeCheckable | Whether to show checkbox on the treeNodes | boolean | false |  |
| treeCheckStrictly | Whether to check nodes precisely (in the `checkable` mode), means parent and child nodes are not associated, and it will make `labelInValue` be true | boolean | false |  |
| treeData | Data of the treeNodes, manual construction work is no longer needed if this property has been set(ensure the Uniqueness of each value) | array&lt;{ value, title, children, \[disabled, disableCheckbox, selectable, checkable] }> | \[] |  |
| treeDataSimpleMode | Enable simple mode of treeData. Changes the `treeData` schema to: \[{id:1, pId:0, value:'1', title:"test1",...},...] where pId is parent node's id). It is possible to replace the default `id` and `pId` keys by providing object to `treeDataSimpleMode` | boolean \| object&lt;{ id: string, pId: string, rootPId: string }> | false |  |
| treeTitleRender | Customize tree node title render | (nodeData) => ReactNode | - | 5.12.0 |
| treeDefaultExpandAll | Whether to expand all treeNodes by default | boolean | false |  |
| treeDefaultExpandedKeys | Default expanded treeNodes | string\[] | - |  |
| treeExpandAction | Tree title open logic when click, optional: false \| `click` \| `doubleClick` | string \| boolean | false | 4.21.0 |
| treeExpandedKeys | Set expanded keys | string\[] | - |  |
| treeIcon | Shows the icon before a TreeNode's title. There is no default style; you must set a custom style for it if set to `true` | boolean | false |  |
| treeLoadedKeys | (Controlled) Set loaded tree nodes, work with `loadData` only | string[] | [] |  |
| treeLine | Show the line. Ref [Tree - showLine](/components/tree/#tree-demo-line) | boolean \| object | false | 4.17.0 |
| ~~treeNodeFilterProp~~ | Will be used for filtering if `filterTreeNode` returns true | string | `value` |  |
| treeNodeLabelProp | Will render as content of select | string | `title` |  |
| value | To set the current selected treeNode(s) | string \| string\[] | - |  |
| variant | Variants of selector | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| virtual | Disable virtual scroll when set to false | boolean | true | 4.1.0 |
| onChange | A callback function, can be executed when selected treeNodes or input value change | function(value, label, extra) | - |  |
| ~~onDropdownVisibleChange~~ | Called when dropdown open, use `onOpenChange` instead | function(open) | - |  |
| ~~onSearch~~ | A callback function, can be executed when the search input changes | function(value: string) | - |  |
| onSelect | A callback function, can be executed when you select a treeNode | function(value, node, extra) | - |  |
| onTreeExpand | A callback function, can be executed when treeNode expanded | function(expandedKeys) | - |  |
| onPopupScroll | Called when dropdown scrolls | (event: UIEvent) => void | - | 5.17.0 |

### showSearch

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoClearSearchValue | If auto clear search input value when multiple select is selected/deselected | boolean | true |  |
| filterTreeNode | Whether to filter treeNodes by input value. The value of `treeNodeFilterProp` is used for filtering by default | boolean \| function(inputValue: string, treeNode: TreeNode) (should return boolean) | function |  |
| searchValue | Work with `onSearch` to make search value controlled | string | - |  |
| treeNodeFilterProp | Will be used for filtering if `filterTreeNode` returns true | string | `value` |  |
| onSearch | A callback function, can be executed when the search input changes | function(value: string) | - |  |

### Tree Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

### TreeNode props

> We recommend you to use `treeData` rather than `TreeNode`, to avoid the trouble of manual construction.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| checkable | When Tree is checkable, set TreeNode display Checkbox or not | boolean | - |  |
| disableCheckbox | Disables the checkbox of the treeNode | boolean | false |  |
| disabled | Disabled or not | boolean | false |  |
| isLeaf | Leaf node or not | boolean | false |  |
| key | Required property (unless using `treeDataSimpleMode`), should be unique in the tree | string | - |  |
| selectable | Whether can be selected | boolean | true |  |
| title | Content showed on the treeNodes | ReactNode | `---` |  |
| value | Will be treated as `treeNodeFilterProp` by default, should be unique in the tree | string | - |  |

## Semantic DOM

https://ant.design/components/tree-select/semantic.md

## Design Token



## Component Token (TreeSelect)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| indentSize | Indent width of tree | number | 24 |
| nodeHoverBg | Background color of hovered node | string | rgba(0,0,0,0.04) |
| nodeHoverColor | Text color of hovered node | string | rgba(0,0,0,0.88) |
| nodeSelectedBg | Background color of selected node | string | #e6f4ff |
| nodeSelectedColor | Text color of selected node | string | rgba(0,0,0,0.88) |
| titleHeight | Node title height | number | 24 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadius | Border radius of base components | number |  |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorBgContainerDisabled | Control the background color of container in disabled state. | string |  |
| colorBgElevated | Container background color of the popup layer, in dark mode the color value of this token will be a little brighter than `colorBgContainer`. E.g: modal, pop-up, menu, etc. | string |  |
| colorBgTextHover | Control the background color of text in hover state. | string |  |
| colorBorder | Default border color, used to separate different elements, such as: form separator, card separator, etc. | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorPrimaryBorder | The stroke color under the main color gradient, used on the stroke of components such as Slider. | string |  |
| colorPrimaryHover | Hover state under the main color gradient. | string |  |
| colorSplit | Used as the color of separator, this color is the same as colorBorderSecondary but with transparency. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| colorTextQuaternary | The fourth level of text color is the lightest text color, such as form input prompt text, disabled color text, etc. | string |  |
| colorWhite | Pure white color don't changed by theme | string |  |
| controlInteractiveSize | Control the interactive size of control component. | number |  |
| controlItemBgActiveDisabled | Control the background color of control component item when active and disabled. | string |  |
| controlItemBgHover | Control the background color of control component item when hovering. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeLG | Large font size | number |  |
| fontWeightStrong | Control the font weight of heading components (such as h1, h2, h3) or selected item. | number |  |
| lineHeight | Line height of text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| lineWidthBold | The default line width of the outline class components, such as Button, Input, Select, etc. | number |  |
| lineWidthFocus | Control the width of the line when the component is in focus state. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| motionDurationFast | Motion speed, fast speed. Used for small element animation interaction. | string |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| motionEaseInBack | Preset motion curve. | string |  |
| motionEaseOutBack | Preset motion curve. | string |  |
| paddingXS | Control the extra small padding of the element. | number |  |



## FAQ

### How to get parent node in onChange? {#faq-parent-node-info}

We don't provide this since performance consideration. You can get by this way: <https://codesandbox.io/s/get-parent-node-in-onchange-eb1608>

### Why sometimes customize Option cause scroll break? {#faq-custom-option-scroll}

You can ref Select [FAQ](/components/select).

### Why `loadData` not trigger when searching? {#faq-load-data-expand}

In earlier version, `loadData` will be triggered when searching. But we got feedback that it will block network when inputting. So we change it to not trigger `loadData` when searching. But you can still handle async logic by `filterTreeNode`:

```tsx
<TreeSelect
  filterTreeNode={(input, treeNode) => {
    const match = YOUR_LOGIC_HERE;

    if (match && !treeNode.isLeaf && !treeNode.children) {
      // Do some loading logic
    }

    return match;
  }}
/>
```

### Why can't popup scroll horizontally? {#faq-popup-not-scroll}

Just turn off virtual scrolling, because the `scrollWidth` of the complete list cannot be accurately measured when virtual scrolling is turned on.
