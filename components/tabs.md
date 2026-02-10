---
category: Components
group: Navigation
title: Tabs
description: Tabs make it easy to explore and switch between different views.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*72NDQqXkyOEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*8HMoTZUoSGoAAAAAAAAAAAAADrJ8AQ/original
---

### When To Use

Ant Design has 3 types of Tabs for different situations.

- Card Tabs: for managing too many closeable views.
- Normal Tabs: for functional aspects of a page.
- [Radio.Button](/components/radio/#radio-demo-radiobutton): for secondary tabs.

## Examples

### Basic

Default activate first tab.

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

### Disabled

Disabled a tab.

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

### Centered

Centered tabs.

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

### Icon

The Tab with Icon.

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

### Indicator

Set `indicator` prop to custom indicator size and align.

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

### Slide

In order to fit in more tabs, they can slide left and right (or up and down).

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

### Extra content

You can add extra actions to the right or left or even both side of Tabs.

```css
.tabs-extra-demo-button {
  margin-inline-end: 16px;
}

.ant-row-rtl .tabs-extra-demo-button {
  margin-inline-end: 0;
  margin-inline-start: 16px;
}
```

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

### Size

Large size tabs are usually used in page header, and small size could be used in Modal.

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

### Placement

Tab's placement: start, end, top or bottom. Will auto switch to `top` in mobile.

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

### Card type tab

Another type of Tabs, which doesn't support vertical mode.

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

### Add & close tab

Only card type Tabs support adding & closable. +Use `closable={false}` to disable close.

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


### Customized trigger of new tab

Hide default plus icon, and bind event for customized trigger.

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

### Customized bar of tab

Use [react-sticky-box](https://www.npmjs.com/package/react-sticky-box) and `renderTabBar`.

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

### Draggable Tabs

Use [dnd-kit](https://github.com/clauderic/dnd-kit) to make tabs draggable.

```css
/* set transition to none when type="editable-card" */
.ant-tabs-editable > .ant-tabs-nav .ant-tabs-tab {
  transition: none;
}
```

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

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Tabs by passing objects/functions through `classNames` and `styles`.

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

Common props ref：[Common props](/docs/react/common-props)

### Tabs

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| activeKey | Current TabPane's key | string | - |  |
| addIcon | Customize add icon, only works with `type="editable-card"` | ReactNode | `<PlusOutlined />` | 4.4.0 |
| animated | Whether to change tabs with animation. | boolean \| { inkBar: boolean, tabPane: boolean } | { inkBar: true, tabPane: false } |  |
| centered | Centers tabs | boolean | false | 4.4.0 |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>(#semantic-dom) | - |  |
| defaultActiveKey | Initial active TabPane's key, if `activeKey` is not set | string | `The key of first tab` |  |
| hideAdd | Hide plus icon or not. Only works while `type="editable-card"` | boolean | false |  |
| indicator | Customize `size` and `align` of indicator | { size?: number \| (origin: number) => number; align: `start` \| `center` \| `end`; } | - | 5.13.0 |
| items | Configure tab content | [TabItemType](#tabitemtype) | [] | 4.23.0 |
| more | Customize the collapse menu | [MoreProps](#moreprops) | { icon: `<EllipsisOutlined />` , trigger: 'hover' } |  |
| removeIcon | The custom icon of remove, only works with `type="editable-card"` | ReactNode | `<CloseOutlined />` | 5.15.0 |
| ~~popupClassName~~ | `className` for more dropdown, please use `classNames.popup` instead | string | - | 4.21.0 |
| renderTabBar | Replace the TabBar | (props: DefaultTabBarProps, DefaultTabBar: React.ComponentClass) => React.ReactElement | - |  |
| size | Preset tab bar size | `large` \| `middle` \| `small` | `middle` |  |
| styles |  Customize inline style for each semantic structure inside the component. Supports object or function.  | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| tabBarExtraContent | Extra content in tab bar | ReactNode \| {left?: ReactNode, right?: ReactNode} | - | object: 4.6.0 |
| tabBarGutter | The gap between tabs | number | - |  |
| tabBarStyle | Tab bar style object | CSSProperties | - |  |
| tabPlacement | Placement of tabs | `top` \| `end` \| `bottom` \| `start` | `top` |  |
| ~~tabPosition~~ | Position of tabs | `top` \| `right` \| `bottom` \| `left`, please use `tabPlacement` instead | `top` |  |
| ~~destroyInactiveTabPane~~ | Whether destroy inactive TabPane when change tab, use `destroyOnHidden` instead | boolean | false |  |
| destroyOnHidden | Whether destroy inactive TabPane when change tab | boolean | false | 5.25.0 |
| type | Basic style of tabs | `line` \| `card` \| `editable-card` | `line` |  |
| onChange | Callback executed when active tab is changed | (activeKey: string) => void | - |  |
| onEdit | Callback executed when tab is added or removed. Only works while `type="editable-card"` | (action === 'add' ? event : targetKey, action) => void | - |  |
| onTabClick | Callback executed when tab is clicked | (key: string, event: MouseEvent) => void | - |  |
| onTabScroll | Trigger when tab scroll | ({ direction: `left` \| `right` \| `top` \| `bottom` }) => void | - | 4.3.0 |

More option at [@rc-component/tabs](https://github.com/react-component/tabs#tabs)

### TabItemType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| closeIcon | Customize close icon in TabPane's head. Only works while `type="editable-card"`. 5.7.0: close button will be hidden when setting to `null` or `false` | ReactNode | - |  |
| ~~destroyInactiveTabPane~~ | Whether destroy inactive TabPane when change tab, use `destroyOnHidden` instead | boolean | false | 5.11.0 |
| destroyOnHidden | Whether destroy inactive TabPane when change tab | boolean | false | 5.25.0 |
| disabled | Set TabPane disabled | boolean | false |  |
| forceRender | Forced render of content in tabs, not lazy render after clicking on tabs | boolean | false |  |
| key | TabPane's key | string | - |  |
| label | Tab header text element | ReactNode | - |  |
| icon | Tab header icon element | ReactNode | - | 5.12.0 |
| children | Tab content element | ReactNode | - |  |
| closable | Whether a close (x) button is visible, Only works while `type="editable-card"` | boolean | true |  |

### MoreProps

| Property                                  | Description     | Type      | Default | Version |
| ----------------------------------------- | --------------- | --------- | ------- | ------- |
| icon                                      | The custom icon | ReactNode | -       |         |
| [DropdownProps](/components/dropdown#api) |                 |           |         |         |

## Semantic DOM

https://ant.design/components/tabs/semantic.md

## Design Token



## Component Token (Tabs)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| cardBg | Background color of card tab | string | rgba(0,0,0,0.02) |
| cardGutter | Gutter of card tab | number | 2 |
| cardHeight | Height of card tab | number | 40 |
| cardHeightLG | Height of large card tab | number | 48 |
| cardHeightSM | Height of small card tab | number | 32 |
| cardPadding | Padding of card tab | string | 8px 16px |
| cardPaddingLG | Padding of large card tab | string | 11px 16px |
| cardPaddingSM | Padding of small card tab | string | 4px 8px |
| horizontalItemGutter | Horizontal gutter of horizontal tab | number | 32 |
| horizontalItemMargin | Horizontal margin of horizontal tab item | string |  |
| horizontalItemMarginRTL | Horizontal margin of horizontal tab item (RTL) | string |  |
| horizontalItemPadding | Horizontal padding of horizontal tab item | string | 12px 0 |
| horizontalItemPaddingLG | Horizontal padding of large horizontal tab item | string | 16px 0 |
| horizontalItemPaddingSM | Horizontal padding of small horizontal tab item | string | 8px 0 |
| horizontalMargin | Horizontal margin of horizontal tab | string | 0 0 16px 0 |
| inkBarColor | Color of indicator | string | #1677ff |
| itemActiveColor | Text color of active tab | string | #0958d9 |
| itemColor | Text color of tab | string | rgba(0,0,0,0.88) |
| itemHoverColor | Text color of hover tab | string | #4096ff |
| itemSelectedColor | Text color of selected tab | string | #1677ff |
| titleFontSize | Font size of title | number | 14 |
| titleFontSizeLG | Font size of large title | number | 16 |
| titleFontSizeSM | Font size of small title | number | 14 |
| verticalItemMargin | Vertical margin of vertical tab item | string | 16px 0 0 0 |
| verticalItemPadding | Vertical padding of vertical tab item | string | 8px 24px |
| zIndexPopup | z-index of dropdown menu | number | 1050 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadius | Border radius of base components | number |  |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| boxShadowSecondary | Control the secondary box shadow style of an element. | string |  |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorBorder | Default border color, used to separate different elements, such as: form separator, card separator, etc. | string |  |
| colorBorderSecondary | Slightly lighter than the default border color, this color is the same as `colorSplit`. Solid color is used. | string |  |
| colorIcon | Weak action. Such as `allowClear` or Alert close button | string |  |
| colorPrimaryBorder | The stroke color under the main color gradient, used on the stroke of components such as Slider. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| colorTextHeading | Control the font color of heading. | string |  |
| controlHeight | The height of the basic controls such as buttons and input boxes in Ant Design | number |  |
| controlHeightLG | LG component height | number |  |
| controlItemBgHover | Control the background color of control component item when hovering. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeSM | Small font size | number |  |
| lineHeight | Line height of text. | number |  |
| lineHeightLG | Line height of large text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| lineWidthBold | The default line width of the outline class components, such as Button, Input, Select, etc. | number |  |
| lineWidthFocus | Control the width of the line when the component is in focus state. | number |  |
| margin | Control the margin of an element, with a medium size. | number |  |
| marginSM | Control the margin of an element, with a medium-small size. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| motionEaseInOut | Preset motion curve. | string |  |
| motionEaseInQuint | Preset motion curve. | string |  |
| motionEaseOutQuint | Preset motion curve. | string |  |
| paddingLG | Control the large padding of the element. | number |  |
| paddingSM | Control the small padding of the element. | number |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |


