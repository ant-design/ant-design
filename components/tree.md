---
category: Components
group: Data Display
title: Tree
description: Multiple-level structure list.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*zYIWT52S4UMAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*_9MMRpWoOcYAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

Almost anything can be represented in a tree structure. Examples include directories, organization hierarchies, biological classifications, countries, etc. The `Tree` component is a way of representing the hierarchical relationship between these things. You can also expand, collapse, and select a treeNode within a `Tree`.

## Examples

### Basic

The most basic usage, tell you how to use checkable, selectable, disabled, defaultExpandKeys, and etc.

```tsx
import React from 'react';
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
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1677ff' }}>sss</span>, key: '0-0-1-0' }],
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
      defaultExpandedKeys={['0-0-0', '0-0-1']}
      defaultSelectedKeys={['0-0-1']}
      defaultCheckedKeys={['0-0-0', '0-0-1']}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={treeData}
    />
  );
};

export default App;
```

### Controlled Tree

Controlled mode lets parent nodes reflect the status of child nodes more intelligently.

```tsx
import React, { useState } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

const App: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0-0', '0-0-1']);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <Tree
      checkable
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={treeData}
    />
  );
};

export default App;
```

### draggable

Drag treeNode to insert after the other treeNode or insert into the other parent TreeNode.

```tsx
import React, { useState } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

const x = 3;
const y = 2;
const z = 1;
const defaultData: TreeDataNode[] = [];

const generateData = (_level: number, _preKey?: React.Key, _tns?: TreeDataNode[]) => {
  const preKey = _preKey || '0';
  const tns = _tns || defaultData;

  const children: React.Key[] = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const App: React.FC = () => {
  const [gData, setGData] = useState(defaultData);
  const [expandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);

  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    console.log(info);
    // expandedKeys, set it when controlled is needed
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop: TreeProps['onDrop'] = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1

    const loop = (
      data: TreeDataNode[],
      key: React.Key,
      callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj: TreeDataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else {
      let ar: TreeDataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        // Drop on the top of the drop node
        ar.splice(i!, 0, dragObj!);
      } else {
        // Drop on the bottom of the drop node
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setGData(data);
  };

  return (
    <Tree
      className="draggable-tree"
      defaultExpandedKeys={expandedKeys}
      draggable
      blockNode
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      treeData={gData}
    />
  );
};

export default App;
```

### load data asynchronously

To load data asynchronously when click to expand a treeNode.

```tsx
import React, { useState } from 'react';
import { Tree } from 'antd';

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

const initTreeData: DataNode[] = [
  { title: 'Expand to load', key: '0' },
  { title: 'Expand to load', key: '1' },
  { title: 'Tree Node', key: '2', isLeaf: true },
];

// It's just a simple demo. You can use tree map to optimize update perf.
const updateTreeData = (list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] =>
  list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });

const App: React.FC = () => {
  const [treeData, setTreeData] = useState(initTreeData);

  const onLoadData = ({ key, children }: any) =>
    new Promise<void>((resolve) => {
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        setTreeData((origin) =>
          updateTreeData(origin, key, [
            { title: 'Child Node', key: `${key}-0` },
            { title: 'Child Node', key: `${key}-1` },
          ]),
        );

        resolve();
      }, 1000);
    });

  return <Tree loadData={onLoadData} treeData={treeData} />;
};

export default App;
```

### Searchable

Searchable Tree.

```css
.site-tree-search-value {
  color: #f50;
}
```

```tsx
import React, { useMemo, useState } from 'react';
import { Input, Tree } from 'antd';
import type { TreeDataNode } from 'antd';

const { Search } = Input;

const x = 3;
const y = 2;
const z = 1;
const defaultData: TreeDataNode[] = [];

const generateData = (_level: number, _preKey?: React.Key, _tns?: TreeDataNode[]) => {
  const preKey = _preKey || '0';
  const tns = _tns || defaultData;

  const children: React.Key[] = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList: { key: React.Key; title: string }[] = [];
const generateList = (data: TreeDataNode[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: key as string });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(defaultData);

const getParentKey = (key: React.Key, tree: TreeDataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};

const App: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.includes(value)) {
          return getParentKey(item.key, defaultData);
        }
        return null;
      })
      .filter((item, i, self): item is React.Key => !!(item && self.indexOf(item) === i));
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const treeData = useMemo(() => {
    const loop = (data: TreeDataNode[]): TreeDataNode[] =>
      data.map((item) => {
        const strTitle = item.title as string;
        const index = strTitle.indexOf(searchValue);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchValue.length);
        const title =
          index > -1 ? (
            <span key={item.key}>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span key={item.key}>{strTitle}</span>
          );
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }

        return {
          title,
          key: item.key,
        };
      });

    return loop(defaultData);
  }, [searchValue]);

  return (
    <div>
      <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
      />
    </div>
  );
};

export default App;
```

### Tree with line

Tree with connected line between nodes, turn on by `showLine`, customize the preset icon by `switcherIcon`.

```tsx
import React, { useState } from 'react';
import { CarryOutOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons';
import { Select, Switch, Tree } from 'antd';
import type { TreeDataNode } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined /> },
          {
            title: (
              <>
                <div>multiple line title</div>
                <div>multiple line title</div>
              </>
            ),
            key: '0-0-0-1',
            icon: <CarryOutOutlined />,
          },
          { title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined /> },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [{ title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined /> }],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-2-0', icon: <CarryOutOutlined /> },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-1-0-0', icon: <CarryOutOutlined /> },
          { title: 'leaf', key: '0-1-0-1', icon: <CarryOutOutlined /> },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const [showLine, setShowLine] = useState<boolean>(true);
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [showLeafIcon, setShowLeafIcon] = useState<React.ReactNode>(true);

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const handleLeafIconChange = (value: 'true' | 'false' | 'custom') => {
    if (value === 'custom') {
      return setShowLeafIcon(<CheckOutlined />);
    }

    if (value === 'true') {
      return setShowLeafIcon(true);
    }

    return setShowLeafIcon(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        showLine: <Switch checked={!!showLine} onChange={setShowLine} />
        <br />
        <br />
        showIcon: <Switch checked={showIcon} onChange={setShowIcon} />
        <br />
        <br />
        showLeafIcon:{' '}
        <Select
          defaultValue="true"
          onChange={handleLeafIconChange}
          options={[
            { label: 'True', value: 'true' },
            { label: 'False', value: 'false' },
            { label: 'Custom icon', value: 'custom' },
          ]}
        />
      </div>
      <Tree
        showLine={showLine ? { showLeafIcon } : false}
        showIcon={showIcon}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  );
};

export default App;
```

### Customize Icon

You can customize icons for different nodes.

```tsx
import React from 'react';
import {
  DownOutlined,
  FrownFilled,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Tree } from 'antd';
import type { TreeDataNode } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <SmileOutlined />,
    children: [
      {
        title: 'leaf',
        key: '0-0-0',
        icon: <MehOutlined />,
      },
      {
        title: 'leaf',
        key: '0-0-1',
        icon: ({ selected }) => (selected ? <FrownFilled /> : <FrownOutlined />),
      },
    ],
  },
];

const App: React.FC = () => (
  <Tree
    showIcon
    defaultExpandAll
    defaultSelectedKeys={['0-0-0']}
    switcherIcon={<DownOutlined />}
    treeData={treeData}
  />
);

export default App;
```

### directory

Built-in directory tree. `multiple` support `ctrl(Windows)` / `command(Mac)` selection.

```tsx
import React from 'react';
import { Tree } from 'antd';
import type { GetProps, TreeDataNode } from 'antd';

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

const treeData: TreeDataNode[] = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];

const App: React.FC = () => {
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  return (
    <DirectoryTree
      multiple
      draggable
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
    />
  );
};

export default App;
```


### Customize collapse/expand icon

customize collapse/expand icon of tree node

```tsx
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
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
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  return (
    <Tree
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={['0-0-0']}
      onSelect={onSelect}
      treeData={treeData}
    />
  );
};

export default App;
```

### Virtual scroll

Use virtual list through `height` prop.

```tsx
import React from 'react';
import { Tooltip, Tree } from 'antd';
import type { TreeDataNode } from 'antd';

const dig = (path = '0', level = 3) => {
  const list: TreeDataNode[] = [];
  for (let i = 0; i < 10; i += 1) {
    const key = `${path}-${i}`;
    const treeNode: TreeDataNode = {
      title: key,
      key,
    };

    if (level > 0) {
      treeNode.children = dig(key, level - 1);
    }

    list.push(treeNode);
  }
  return list;
};

const treeData = dig();

const MemoTooltip = React.memo(Tooltip);

const App: React.FC = () => (
  <Tree
    treeData={treeData}
    height={233}
    defaultExpandAll
    titleRender={(item) => {
      const title = item.title as React.ReactNode;
      return <MemoTooltip title={title}>{title}</MemoTooltip>;
    }}
  />
);

export default App;
```



### Block Node



```tsx
import React from 'react';
import { Tree } from 'antd';
import type { TreeDataNode } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title: 'parent',
    key: '0',
    children: [
      {
        title: 'child 1',
        key: '0-0',
        disabled: true,
      },
      {
        title: 'child 2',
        key: '0-1',
        disableCheckbox: true,
      },
    ],
  },
];

const App: React.FC = () => (
  <Tree checkable defaultSelectedKeys={['0-1']} defaultExpandAll treeData={treeData} blockNode />
);

export default App;
```



### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Tree by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Flex, Tree } from 'antd';
import type { TreeProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    padding: 8px;
    border-radius: 4px;
  `,
  item: css`
    border-radius: 2px;
  `,
  itemTitle: css`
    font-size: 14px;
  `,
}));

const treeData: TreeProps['treeData'] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
];

const styles: TreeProps['styles'] = {
  root: { border: '2px solid #d9d9d9' },
  item: { margin: '2px 0' },
};

const stylesFn: TreeProps['styles'] = (info) => {
  if (!info.props.checkable) {
    return {
      root: {
        border: `2px solid #E5D9F2`,
        borderRadius: 4,
      },
    } satisfies TreeProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const sharedProps: TreeProps = {
    treeData,
    classNames,
    autoExpandParent: true,
    checkable: true,
  };
  return (
    <Flex vertical gap="middle">
      <Tree {...sharedProps} treeData={treeData} styles={styles} />
      <Tree
        {...sharedProps}
        checkable={false}
        treeData={treeData}
        styles={stylesFn}
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}
      />
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
| allowDrop | Whether to allow dropping on the node | ({ dropNode, dropPosition }) => boolean | - |  |
| autoExpandParent | Whether to automatically expand a parent treeNode | boolean | false |  |
| blockNode | Whether treeNode fill remaining horizontal space | boolean | false |  |
| checkable | Add a Checkbox before the treeNodes | boolean | false |  |
| checkedKeys | (Controlled) Specifies the keys of the checked treeNodes (PS: When this specifies the key of a treeNode which is also a parent treeNode, all the children treeNodes of will be checked; and vice versa, when it specifies the key of a treeNode which is a child treeNode, its parent treeNode will also be checked. When `checkable` and `checkStrictly` is true, its object has `checked` and `halfChecked` property. Regardless of whether the child or parent treeNode is checked, they won't impact each other | string\[] \| {checked: string\[], halfChecked: string\[]} | \[] |  |
| checkStrictly | Check treeNode precisely; parent treeNode and children treeNodes are not associated | boolean | false |  |
| className | Additional class to Tree | string | - |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultCheckedKeys | Specifies the keys of the default checked treeNodes | string\[] | \[] |  |
| defaultExpandAll | Whether to expand all treeNodes by default | boolean | false |  |
| defaultExpandedKeys | Specify the keys of the default expanded treeNodes | string\[] | \[] |  |
| defaultExpandParent | If auto expand parent treeNodes when init | boolean | true |  |
| defaultSelectedKeys | Specifies the keys of the default selected treeNodes | string\[] | \[] |  |
| disabled | Whether the tree is disabled | boolean | false |  |
| draggable | Specifies whether this Tree or the node is draggable. Use `icon: false` to disable drag handler icon | boolean \| ((node: DataNode) => boolean) \| { icon?: React.ReactNode \| false, nodeDraggable?: (node: DataNode) => boolean } | false | `config`: 4.17.0 |
| expandedKeys | (Controlled) Specifies the keys of the expanded treeNodes | string\[] | \[] |  |
| fieldNames | Customize node title, key, children field name | object | { title: `title`, key: `key`, children: `children` } | 4.17.0 |
| filterTreeNode | Defines a function to filter (highlight) treeNodes. When the function returns `true`, the corresponding treeNode will be highlighted | function(node) | - |  |
| height | Config virtual scroll height. Will not support horizontal scroll when enabled | number | - |  |
| icon | Insert a custom icon before the title. Need to set `showIcon` to true | ReactNode \| (props) => ReactNode | - |  |
| loadData | Load data asynchronously | function(node) | - |  |
| loadedKeys | (Controlled) Set loaded tree nodes. Need to work with `loadData` | string\[] | \[] |  |
| motion | Custom motion config for the tree | CSSMotionProps | - |  |
| multiple | Allows selecting multiple treeNodes | boolean | false |  |
| rootStyle | Style on the root element | CSSProperties | - | 4.20.0 |
| selectable | Whether it can be selected | boolean | true |  |
| selectedKeys | (Controlled) Specifies the keys of the selected treeNodes, multiple selection needs to set `multiple` to true | string\[] | - |  |
| showIcon | Controls whether to display the `icon` node (no default style) | boolean | false |  |
| showLine | Shows a connecting line | boolean \| {showLeafIcon: ReactNode \| ((props: AntTreeNodeProps) => ReactNode)} | false |  |
| style | Style of Tree component | CSSProperties | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| switcherIcon | Customize expand/collapse icons for tree nodes (With default rotate angular style) | ReactNode \| ((props: AntTreeNodeProps) => ReactNode) | - | renderProps: 4.20.0 |
| switcherLoadingIcon | Customize loading icons for tree nodes | ReactNode | - | 5.20.0 |
| titleRender | Customize tree node title render | (nodeData) => ReactNode | - | 4.5.0 |
| treeData | The treeNodes data Array, if set it then you need not to construct children TreeNode. (key should be unique across the whole array) | array&lt;{ key, title, children, \[disabled, selectable] }> | - |  |
| virtual | Disable virtual scroll when set to false | boolean | true | 4.1.0 |
| onCheck | Callback function for when the onCheck event occurs | function(checkedKeys, e:{checked: boolean, checkedNodes, node, event, halfCheckedKeys}) | - |  |
| onDoubleClick | Callback function for when the user double clicks a treeNode | function(event, node) | - |  |
| onDragEnd | Callback function for when the onDragEnd event occurs | function({event, node}) | - |  |
| onDragEnter | Callback function for when the onDragEnter event occurs | function({event, node, expandedKeys}) | - |  |
| onDragLeave | Callback function for when the onDragLeave event occurs | function({event, node}) | - |  |
| onDragOver | Callback function for when the onDragOver event occurs | function({event, node}) | - |  |
| onDragStart | Callback function for when the onDragStart event occurs | function({event, node}) | - |  |
| onDrop | Callback function for when the onDrop event occurs | function({event, node, dragNode, dragNodesKeys}) | - |  |
| onExpand | Callback function for when a treeNode is expanded or collapsed | function(expandedKeys, {expanded: boolean, node}) | - |  |
| onLoad | Callback function for when a treeNode is loaded | function(loadedKeys, {event, node}) | - |  |
| onRightClick | Callback function for when the user right clicks a treeNode | function({event, node}) | - |  |
| onSelect | Callback function for when the user clicks a treeNode | function(selectedKeys, e:{selected: boolean, selectedNodes, node, event}) | - |  |

### TreeNode props

| Property | Description | Type | Default |  |
| --- | --- | --- | --- | --- |
| checkable | When Tree is checkable, set TreeNode display Checkbox or not | boolean | - |  |
| disableCheckbox | Disables the checkbox of the treeNode | boolean | false |  |
| disabled | Disables the treeNode | boolean | false |  |
| icon | Customize icon. When you pass component, whose render will receive full TreeNode props as component props | ReactNode \| (props) => ReactNode | - |  |
| isLeaf | Determines if this is a leaf node (effective when `loadData` is specified). `false` will force the TreeNode to be treated as a parent node | boolean | - |  |
| key | Used with (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys. P.S.: It must be unique in all of treeNodes of the tree | string | (internal calculated position of treeNode) |  |
| selectable | Set whether the treeNode can be selected | boolean | true |  |
| title | Title | ReactNode | `---` |  |

### DirectoryTree props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| expandAction | Directory opening logic, options: false \| `click` \| `doubleClick` | string \| boolean | `click` |

## Note

Before `3.4.0`: The number of treeNodes can be very large, but when `checkable=true`, it will increase the compute time. So, we cache some calculations (e.g. `this.treeNodesStates`) to avoid double computing. But, this brings some restrictions. **When you load treeNodes asynchronously, you should render tree like this**:

```jsx
{
  this.state.treeData.length ? (
    <Tree>
      {this.state.treeData.map((data) => (
        <TreeNode />
      ))}
    </Tree>
  ) : (
    'loading tree'
  );
}
```

### Tree Methods

| Name | Description |
| --- | --- |
| scrollTo({ key: string \| number; align?: 'top' \| 'bottom' \| 'auto'; offset?: number }) | Scroll to key item in virtual scroll |

## Semantic DOM

https://ant.design/components/tree/semantic.md

## Design Token



## Component Token (Tree)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| directoryNodeSelectedBg | Background color of selected directory node | string | #1677ff |
| directoryNodeSelectedColor | Text color of selected directory node | string | #fff |
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
| motionEaseInOut | Preset motion curve. | string |  |
| motionEaseOutBack | Preset motion curve. | string |  |
| paddingXS | Control the extra small padding of the element. | number |  |



## FAQ

### Why defaultExpandAll not working on ajax data? {#faq-default-expand-all}

`default` prefix props only work when initializing. So `defaultExpandAll` has already been executed when ajax loads data. You can control `expandedKeys` or render the Tree when data is loaded to realize expanding all nodes.

### Virtual scroll limitation {#faq-virtual-scroll-limitation}

Virtual scroll only render items in visible region. Thus not support auto width (like long `title` with horizontal scroll).

### What does `disabled` node work logic in the tree? {#faq-disabled-node}

Tree change its data by conduction. Includes checked or auto expanded, it will conduction state to parent / children node until current node is `disabled`. So if a controlled node is `disabled`, it will only modify self state and not affect other nodes. For example, a parent node contains 3 child nodes and one of them is `disabled`. When check the parent node, it will only check rest 2 child nodes. As the same, when check these 2 child node, parent will be checked whatever checked state the `disabled` one is.

This conduction logic prevents modifying `disabled` parent checked state by checking children nodes, and users cannot modify directly with click which avoids interactive conflicts. If you want to modify this conduction logic, you can customize it with the `checkStrictly` prop.
