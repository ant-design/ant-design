---
category: Components
group: 导航
title: Tabs
subtitle: 标签页
description: 选项卡切换组件。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*72NDQqXkyOEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*8HMoTZUoSGoAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用 {#when-to-use}

提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

Ant Design 依次提供了三级选项卡，分别用于不同的场景。

- 卡片式的页签，提供可关闭的样式，常用于容器顶部。
- 既可用于容器顶部，也可用于容器内部，是最通用的 Tabs。
- [Radio.Button](/components/radio-cn/#radio-demo-radiobutton) 可作为更次级的页签来使用。

## 代码演示 {#examples}

### 基本

默认选中第一项。

```tsx
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

const App: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default App;
```

### 禁用

禁用某一项。

```tsx
import React from 'react';
import { Tabs } from 'antd';

const App: React.FC = () => (
  <Tabs
    defaultActiveKey="1"
    items={[
      {
        label: 'Tab 1',
        key: '1',
        children: 'Tab 1',
      },
      {
        label: 'Tab 2',
        key: '2',
        children: 'Tab 2',
        disabled: true,
      },
      {
        label: 'Tab 3',
        key: '3',
        children: 'Tab 3',
      },
    ]}
  />
);

export default App;
```

### 居中

标签居中展示。

```tsx
import React from 'react';
import { Tabs } from 'antd';

const App: React.FC = () => (
  <Tabs
    defaultActiveKey="1"
    centered
    items={Array.from({ length: 3 }).map((_, i) => {
      const id = String(i + 1);
      return {
        label: `Tab ${id}`,
        key: id,
        children: `Content of Tab Pane ${id}`,
      };
    })}
  />
);

export default App;
```

### 图标

有图标的标签。

```tsx
import React from 'react';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';

const App: React.FC = () => (
  <Tabs
    defaultActiveKey="2"
    items={[AppleOutlined, AndroidOutlined].map((Icon, i) => {
      const id = String(i + 1);
      return {
        key: id,
        label: `Tab ${id}`,
        children: `Tab ${id}`,
        icon: <Icon />,
      };
    })}
  />
);

export default App;
```

### 指示条

设置 `indicator` 属性，自定义指示条宽度和对齐方式。

```tsx
import React from 'react';
import { Segmented, Tabs } from 'antd';
import type { TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  { key: '1', label: 'Tab 1', children: 'Content of Tab Pane 1' },
  { key: '2', label: 'Tab 2', children: 'Content of Tab Pane 2' },
  { key: '3', label: 'Tab 3', children: 'Content of Tab Pane 3' },
];

type Align = 'start' | 'center' | 'end';

const App: React.FC = () => {
  const [alignValue, setAlignValue] = React.useState<Align>('center');
  return (
    <>
      <Segmented
        value={alignValue}
        style={{ marginBottom: 8 }}
        onChange={setAlignValue}
        options={['start', 'center', 'end']}
      />
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        indicator={{ size: (origin) => origin - 20, align: alignValue }}
      />
    </>
  );
};

export default App;
```

### 滑动

可以左右、上下滑动，容纳更多标签。

```tsx
import React, { useState } from 'react';
import type { RadioChangeEvent, TabsProps } from 'antd';
import { Radio, Tabs } from 'antd';

const App: React.FC = () => {
  const [mode, setMode] = useState<TabsProps['tabPlacement']>('top');

  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  return (
    <div>
      <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
        <Radio.Button value="top">Horizontal</Radio.Button>
        <Radio.Button value="left">Vertical</Radio.Button>
      </Radio.Group>
      <Tabs
        defaultActiveKey="1"
        tabPlacement={mode}
        style={{ height: 220 }}
        items={Array.from({ length: 30 }, (_, i) => {
          const id = String(i);
          return {
            label: `Tab-${id}`,
            key: id,
            disabled: i === 28,
            children: `Content of tab ${id}`,
          };
        })}
      />
    </div>
  );
};

export default App;
```

### 附加内容

可以在页签两边添加附加操作。

```tsx
import React, { useMemo, useState } from 'react';
import type { TabBarExtraMap } from '@rc-component/tabs/es/interface';
import { Button, Checkbox, Divider, Tabs } from 'antd';

const CheckboxGroup = Checkbox.Group;

const operations = <Button>Extra Action</Button>;

const operationsSlot: Record<PositionType, React.ReactNode> = {
  left: <Button className="tabs-extra-demo-button">Left Extra Action</Button>,
  right: <Button>Right Extra Action</Button>,
};

const options = ['left', 'right'];

type PositionType = 'left' | 'right';

const items = Array.from({ length: 3 }).map((_, i) => {
  const id = String(i + 1);
  return {
    label: `Tab ${id}`,
    key: id,
    children: `Content of tab ${id}`,
  };
});

const App: React.FC = () => {
  const [position, setPosition] = useState<PositionType[]>(['left', 'right']);

  const slot = useMemo(() => {
    if (position.length === 0) {
      return null;
    }
    return position.reduce<TabBarExtraMap>(
      (acc, direction) => ({ ...acc, [direction]: operationsSlot[direction] }),
      {},
    );
  }, [position]);

  return (
    <>
      <Tabs tabBarExtraContent={operations} items={items} />
      <br />
      <br />
      <br />
      <div>You can also specify its direction or both side</div>
      <Divider />
      <CheckboxGroup<PositionType> options={options} value={position} onChange={setPosition} />
      <br />
      <br />
      <Tabs tabBarExtraContent={slot} items={items} />
    </>
  );
};

export default App;
```

### 大小

大号页签用在页头区域，小号用在弹出框等较狭窄的容器内。

```tsx
import React, { useRef, useState } from 'react';
import type { RadioChangeEvent, TabsProps } from 'antd';
import { Radio, Tabs } from 'antd';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const App: React.FC = () => {
  const [size, setSize] = useState<'small' | 'middle' | 'large'>('small');
  const [activeKey, setActiveKey] = useState('1');
  const [items, setItems] = useState<TabsProps['items']>([
    {
      label: 'Tab 1',
      key: '1',
      children: 'Content of editable tab 1',
    },
    {
      label: 'Tab 2',
      key: '2',
      children: 'Content of editable tab 2',
    },
    {
      label: 'Tab 3',
      key: '3',
      children: 'Content of editable tab 3',
    },
  ]);
  const newTabIndex = useRef(0);

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    setItems([
      ...(items || []),
      {
        label: 'New Tab',
        key: newActiveKey,
        children: 'Content of new Tab',
      },
    ]);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    if (!items) {
      return;
    }
    const targetIndex = items.findIndex((item) => item.key === targetKey);
    const newItems = items.filter((item) => item.key !== targetKey);

    if (newItems.length && targetKey === activeKey) {
      const newActiveKey =
        newItems[targetIndex === newItems.length ? targetIndex - 1 : targetIndex].key;
      setActiveKey(newActiveKey);
    }

    setItems(newItems);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  const onChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  return (
    <div>
      <Radio.Group value={size} onChange={onChange} style={{ marginBottom: 16 }}>
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="middle">Middle</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
      </Radio.Group>
      <Tabs
        defaultActiveKey="1"
        size={size}
        style={{ marginBottom: 32 }}
        items={Array.from({ length: 3 }).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of tab ${id}`,
          };
        })}
      />
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={size}
        style={{ marginBottom: 32 }}
        items={Array.from({ length: 3 }).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Card Tab ${id}`,
            key: id,
            children: `Content of card tab ${id}`,
          };
        })}
      />
      <Tabs
        type="editable-card"
        size={size}
        activeKey={activeKey}
        onChange={setActiveKey}
        onEdit={onEdit}
        items={items}
      />
    </div>
  );
};

export default App;
```

### 位置

有四个位置，`tabPlacement="start|end|top|bottom"`。在移动端下，`start|end` 会自动切换成 `top`。

```tsx
import React, { useState } from 'react';
import type { RadioChangeEvent, TabsProps } from 'antd';
import { Radio, Space, Tabs } from 'antd';

const App: React.FC = () => {
  const [tabPlacement, setTabPlacement] = useState<TabsProps['tabPlacement']>('start');

  const changeTabPlacement = (e: RadioChangeEvent) => {
    setTabPlacement(e.target.value);
  };

  return (
    <>
      <Space style={{ marginBottom: 24 }}>
        Tab placement:
        <Radio.Group value={tabPlacement} onChange={changeTabPlacement}>
          <Radio.Button value="top">top</Radio.Button>
          <Radio.Button value="bottom">bottom</Radio.Button>
          <Radio.Button value="start">start</Radio.Button>
          <Radio.Button value="end">end</Radio.Button>
        </Radio.Group>
      </Space>
      <Tabs
        tabPlacement={tabPlacement}
        items={Array.from({ length: 3 }).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab ${id}`,
          };
        })}
      />
    </>
  );
};

export default App;
```

### 卡片式页签

另一种样式的页签，不提供对应的垂直样式。

```tsx
import React from 'react';
import { Tabs } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const App: React.FC = () => (
  <Tabs
    onChange={onChange}
    type="card"
    items={Array.from({ length: 3 }).map((_, i) => {
      const id = String(i + 1);
      return {
        label: `Tab ${id}`,
        key: id,
        children: `Content of Tab Pane ${id}`,
      };
    })}
  />
);

export default App;
```

### 新增和关闭页签

只有卡片样式的页签支持新增和关闭选项。使用 `closable={false}` 禁止关闭。

```tsx
import React, { useRef, useState } from 'react';
import { Tabs } from 'antd';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
  { label: 'Tab 1', children: 'Content of Tab 1', key: '1' },
  { label: 'Tab 2', children: 'Content of Tab 2', key: '2' },
  {
    label: 'Tab 3',
    children: 'Content of Tab 3',
    key: '3',
    closable: false,
  },
];

const App: React.FC = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({ label: 'New Tab', children: 'Content of new Tab', key: newActiveKey });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  );
};

export default App;
```


### 自定义新增页签触发器

隐藏默认的页签增加图标，给自定义触发器绑定事件。

```tsx
import React, { useRef, useState } from 'react';
import { Button, Tabs } from 'antd';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const defaultPanes = Array.from({ length: 2 }).map((_, index) => {
  const id = String(index + 1);
  return { label: `Tab ${id}`, children: `Content of Tab Pane ${index + 1}`, key: id };
});

const App: React.FC = () => {
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);
  const newTabIndex = useRef(0);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    setItems([...items, { label: 'New Tab', children: 'New Tab Pane', key: newActiveKey }]);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    }
    setItems(newPanes);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={add}>ADD</Button>
      </div>
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={items}
      />
    </div>
  );
};

export default App;
```

### 自定义页签头

使用 [react-sticky-box](https://www.npmjs.com/package/react-sticky-box) 和 `renderTabBar` 实现吸顶效果。

```tsx
import React from 'react';
import type { TabsProps } from 'antd';
import { Tabs, theme } from 'antd';
import StickyBox from 'react-sticky-box';

const items = Array.from({ length: 3 }).map((_, i) => {
  const id = String(i + 1);
  return {
    label: `Tab ${id}`,
    key: id,
    children: `Content of Tab Pane ${id}`,
    style: i === 0 ? { height: 200 } : undefined,
  };
});

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={64} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
    </StickyBox>
  );
  return <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} items={items} />;
};

export default App;
```

### 可拖拽标签

使用 [dnd-kit](https://github.com/clauderic/dnd-kit) 实现标签可拖拽。

```tsx
import React, { useState } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { closestCenter, DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string;
}

const DraggableTabNode: React.FC<Readonly<DraggableTabPaneProps>> = ({ className, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props['data-node-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
  };

  return React.cloneElement(props.children as React.ReactElement<any>, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

const App: React.FC = () => {
  const [items, setItems] = useState<NonNullable<TabsProps['items']>>([
    { key: '1', label: 'Tab 1', children: 'Content of Tab Pane 1' },
    { key: '2', label: 'Tab 2', children: 'Content of Tab Pane 2' },
    { key: '3', label: 'Tab 3', children: 'Content of Tab Pane 3' },
  ]);

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <Tabs
      items={items}
      renderTabBar={(tabBarProps, DefaultTabBar) => (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd} collisionDetection={closestCenter}>
          <SortableContext items={items.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
            <DefaultTabBar {...tabBarProps}>
              {(node) => (
                <DraggableTabNode
                  {...(node as React.ReactElement<DraggableTabPaneProps>).props}
                  key={node.key}
                >
                  {node}
                </DraggableTabNode>
              )}
            </DefaultTabBar>
          </SortableContext>
        </DndContext>
      )}
    />
  );
};

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Tabs 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Flex, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border-width: 2px;
    border-style: dashed;
    padding: 16px;
    margin-bottom: 10px;
  `,
}));

const stylesObject: TabsProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed', padding: 16, marginBottom: 10 },
  header: { backgroundColor: 'rgba(245,245,245,0.5)' },
  item: { fontWeight: 'bold', color: '#1890ff', padding: `6px 10px` },
  indicator: { backgroundColor: 'rgba(255,77,79, 0.3)', height: 4 },
  content: { backgroundColor: 'rgba(230,247,255,0.8)', padding: 16 },
};

const stylesFn: TabsProps['styles'] = (info) => {
  if (info.props.type === 'card') {
    return {
      root: { backgroundColor: 'rgba(250,250,250, 0.8)', borderColor: '#d9d9d9' },
      header: { textAlign: 'start' },
    } satisfies TabsProps['styles'];
  }
  return {};
};

const items = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

const App: React.FC = () => {
  const shareProps: TabsProps = {
    items,
    defaultActiveKey: '1',
    classNames,
  };

  return (
    <Flex vertical gap="middle">
      <Tabs {...shareProps} styles={stylesObject} />
      <Tabs tabPlacement="start" type="card" {...shareProps} styles={stylesFn} />
    </Flex>
  );
};

export default App;
```





## API

通用属性参考：[通用属性](/docs/react/common-props)

### Tabs

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| activeKey | 当前激活 tab 面板的 key | string | - |  |
| addIcon | 自定义添加按钮，设置 `type="editable-card"` 时有效 | ReactNode | `<PlusOutlined />` | 4.4.0 |
| animated | 是否使用动画切换 Tabs | boolean\| { inkBar: boolean, tabPane: boolean } | { inkBar: true, tabPane: false } |  |
| centered | 标签居中展示 | boolean | false | 4.4.0 |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey | string | `第一个面板的 key` |  |
| hideAdd | 是否隐藏加号图标，在 `type="editable-card"` 时有效 | boolean | false |  |
| indicator | 自定义指示条的长度和对齐方式 | { size?: number \| (origin: number) => number; align: `start` \| `center` \| `end`; } | - | 5.13.0 |
| items | 配置选项卡内容 | [TabItemType](#tabitemtype) | [] | 4.23.0 |
| more | 自定义折叠菜单属性 | [MoreProps](#moreprops) | { icon: `<EllipsisOutlined />` , trigger: 'hover' } |  |
| removeIcon | 自定义删除按钮，设置 `type="editable-card"` 时有效 | ReactNode | `<CloseOutlined />` | 5.15.0 |
| ~~popupClassName~~ | 更多菜单的 `className`, 请使用 `classNames.popup` 替换 | string | - | 4.21.0 |
| renderTabBar | 替换 TabBar，用于二次封装标签头 | (props: DefaultTabBarProps, DefaultTabBar: React.ComponentClass) => React.ReactElement | - |  |
| size | 大小，提供 `large` `middle` 和 `small` 三种大小 | string | `middle` |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| tabBarExtraContent | tab bar 上额外的元素 | ReactNode \| {left?: ReactNode, right?: ReactNode} | - | object: 4.6.0 |
| tabBarGutter | tabs 之间的间隙 | number | - |  |
| tabBarStyle | tab bar 的样式对象 | CSSProperties | - |  |
| tabPlacement | 页签位置，可选值有 `top` `end` `bottom` `start` | string | `top` |  |
| ~~tabPosition~~ | 页签位置，可选值有 `top` `right` `bottom` `left`，请使用 `tabPlacement` 替换 | string | `top` |  |
| ~~destroyInactiveTabPane~~ | 被隐藏时是否销毁 DOM 结构，使用 `destroyOnHidden` 代替 | boolean | false |  |
| destroyOnHidden | 被隐藏时是否销毁 DOM 结构 | boolean | false | 5.25.0 |
| type | 页签的基本样式，可选 `line`、`card` `editable-card` 类型 | string | `line` |  |
| onChange | 切换面板的回调 | (activeKey: string) => void | - |  |
| onEdit | 新增和删除页签的回调，在 `type="editable-card"` 时有效 | (action === 'add' ? event : targetKey, action) => void | - |  |
| onTabClick | tab 被点击的回调 | (key: string, event: MouseEvent) => void | - |  |
| onTabScroll | tab 滚动时触发 | ({ direction: `left` \| `right` \| `top` \| `bottom` }) => void | - | 4.3.0 |

> 更多属性查看 [@rc-component/tabs](https://github.com/react-component/tabs#tabs)

### TabItemType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| closeIcon | 自定义关闭图标，在 `type="editable-card"` 时有效。5.7.0：设置为 `null` 或 `false` 时隐藏关闭按钮 | ReactNode | - |  |
| ~~destroyInactiveTabPane~~ | 被隐藏时是否销毁 DOM 结构，使用 `destroyOnHidden` 代替 | boolean | false | 5.11.0 |
| destroyOnHidden | 被隐藏时是否销毁 DOM 结构 | boolean | false | 5.25.0 |
| disabled | 禁用某一项 | boolean | false |  |
| forceRender | 被隐藏时是否渲染 DOM 结构 | boolean | false |  |
| key | 对应 activeKey | string | - |  |
| label | 选项卡头部文字元素 | ReactNode | - |  |
| icon | 选项卡头部图标元素 | ReactNode | - | 5.12.0 |
| children | 选项卡内容元素 | ReactNode | - |  |
| closable | 是否显示选项卡的关闭按钮，在 `type="editable-card"` 时有效 | boolean | true |  |

### MoreProps

| 参数                                         | 说明           | 类型      | 默认值 | 版本 |
| -------------------------------------------- | -------------- | --------- | ------ | ---- |
| icon                                         | 自定义折叠图标 | ReactNode | -      |      |
| [DropdownProps](/components/dropdown-cn#api) |                |           |        |      |

## Semantic DOM

https://ant.design/components/tabs-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Tabs)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cardBg | 卡片标签页背景色 | string | rgba(0,0,0,0.02) |
| cardGutter | 卡片标签间距 | number | 2 |
| cardHeight | 卡片标签页高度 | number | 40 |
| cardHeightLG | 大尺寸卡片标签页高度 | number | 48 |
| cardHeightSM | 小尺寸卡片标签页高度 | number | 32 |
| cardPadding | 卡片标签页内间距 | string | 8px 16px |
| cardPaddingLG | 大号卡片标签页内间距 | string | 11px 16px |
| cardPaddingSM | 小号卡片标签页内间距 | string | 4px 8px |
| horizontalItemGutter | 横向标签页标签间距 | number | 32 |
| horizontalItemMargin | 横向标签页标签外间距 | string |  |
| horizontalItemMarginRTL | 横向标签页标签外间距（RTL） | string |  |
| horizontalItemPadding | 横向标签页标签内间距 | string | 12px 0 |
| horizontalItemPaddingLG | 大号横向标签页标签内间距 | string | 16px 0 |
| horizontalItemPaddingSM | 小号横向标签页标签内间距 | string | 8px 0 |
| horizontalMargin | 横向标签页外间距 | string | 0 0 16px 0 |
| inkBarColor | 指示条颜色 | string | #1677ff |
| itemActiveColor | 标签激活态文本颜色 | string | #0958d9 |
| itemColor | 标签文本颜色 | string | rgba(0,0,0,0.88) |
| itemHoverColor | 标签悬浮态文本颜色 | string | #4096ff |
| itemSelectedColor | 标签选中态文本颜色 | string | #1677ff |
| titleFontSize | 标签页标题文本大小 | number | 14 |
| titleFontSizeLG | 大号标签页标题文本大小 | number | 16 |
| titleFontSizeSM | 小号标签页标题文本大小 | number | 14 |
| verticalItemMargin | 纵向标签页标签外间距 | string | 16px 0 0 0 |
| verticalItemPadding | 纵向标签页标签内间距 | string | 8px 24px |
| zIndexPopup | 下拉菜单 z-index | number | 1050 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadius | 基础组件的圆角大小，例如按钮、输入框、卡片等 | number |  |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| boxShadowSecondary | 控制元素二级阴影样式。 | string |  |
| colorBgContainer | 组件的容器背景色，例如：默认按钮、输入框等。务必不要将其与 `colorBgElevated` 混淆。 | string |  |
| colorBorder | 默认使用的边框颜色, 用于分割不同的元素，例如：表单的分割线、卡片的分割线等。 | string |  |
| colorBorderSecondary | 比默认使用的边框色要浅一级，此颜色和 colorSplit 的颜色一致。使用的是实色。 | string |  |
| colorIcon | 控制弱操作图标的颜色，例如 allowClear 或 Alert 关闭按钮。  * | string |  |
| colorPrimaryBorder | 主色梯度下的描边用色，用在 Slider 等组件的描边上。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextDisabled | 控制禁用状态下的字体颜色。 | string |  |
| colorTextHeading | 控制标题字体颜色。 | string |  |
| controlHeight | Ant Design 中按钮和输入框等基础控件的高度 | number |  |
| controlHeightLG | 较高的组件高度 | number |  |
| controlItemBgHover | 控制组件项在鼠标悬浮时的背景颜色。 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeSM | 小号字体大小 | number |  |
| lineHeight | 文本行高 | number |  |
| lineHeightLG | 大型文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| lineWidthBold | 描边类组件的默认线宽，如 Button、Input、Select 等输入类控件。 | number |  |
| lineWidthFocus | 控制线条的宽度，当组件处于聚焦态时。 | number |  |
| margin | 控制元素外边距，中等尺寸。 | number |  |
| marginSM | 控制元素外边距，中小尺寸。 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| marginXXS | 控制元素外边距，最小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| motionEaseInOut | 预设动效曲率 | string |  |
| motionEaseInQuint | 预设动效曲率 | string |  |
| motionEaseOutQuint | 预设动效曲率 | string |  |
| paddingLG | 控制元素的大内间距。 | number |  |
| paddingSM | 控制元素的小内间距。 | number |  |
| paddingXXS | 控制元素的极小内间距。 | number |  |


