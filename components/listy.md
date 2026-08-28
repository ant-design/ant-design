---
category: Components
group: Data Display
title: Listy
description: A high-performance list that supports grouping and can virtualize long data sets.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*EYuhSpw1iSwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*tBzwQ7raKX8AAAAAAAAAAAAADrJ8AQ/original
tag: 6.6.0
---

## When To Use

- When you need to render a long list without paying the cost of mounting every row — enable `virtual` to render only the rows in view.
- When the list needs grouped sections with sticky headers.
- When you need imperative control over scroll position (jump to an item, a group, or a pixel offset).

## Examples

### Basic

Basic example.

```tsx
import React from 'react';
import { Listy } from 'antd';

interface Item {
  id: number;
  content: string;
}

const items = Array.from<any, Item>({ length: 20 }, (_, index) => ({
  id: index,
  content: `Item ${index}`,
}));

const App: React.FC = () => {
  return <Listy<Item> items={items} height={400} rowKey="id" itemRender={(item) => item.content} />;
};

export default App;
```

### Virtual scrolling

A long list of 10,000 rows. Set `virtual` and `height` to enable virtual scrolling, so only the rows in view are rendered.

```tsx
import React from 'react';
import { Listy } from 'antd';

interface Item {
  id: number;
  content: string;
}

const items = Array.from<any, Item>({ length: 10000 }, (_, index) => ({
  id: index,
  content: `Item ${index}`,
}));

const App: React.FC = () => {
  return (
    <Listy<Item>
      virtual
      items={items}
      height={400}
      rowKey="id"
      itemRender={(item) => item.content}
    />
  );
};

export default App;
```

### Grouping and sticky headers

Use `group` to derive a group key from each item and render group headers. With `sticky` enabled, the current group header sticks to the top while scrolling.

```tsx
import React from 'react';
import { Avatar, Flex, Listy } from 'antd';

interface Contact {
  id: number;
  name: string;
}

const names = [
  'Aaron Baker',
  'Alice Adams',
  'Bella Carter',
  'Brian Diaz',
  'Chloe Evans',
  'Colin Foster',
  'Daisy Garcia',
  'David Hayes',
  'Elena Ingram',
  'Eric Jensen',
  'Fiona Kim',
  'Frank Lopez',
  'Grace Miller',
  'Gavin Nguyen',
  'Hannah Ortiz',
  'Henry Parker',
  'Iris Quincy',
  'Ivan Reed',
  'Jack Smith',
  'Julia Turner',
];

const contacts = names.map<Contact>((name, id) => ({ id, name }));

const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#87d068'];

const colorOf = (letter: string) => colors[(letter.charCodeAt(0) - 65) % colors.length];

const App: React.FC = () => (
  <Listy<Contact>
    items={contacts}
    rowKey="id"
    height={400}
    sticky
    group={{
      key: (contact) => contact.name[0],
      title: (letter) => letter,
    }}
    itemRender={(contact) => (
      <Flex align="center" gap="small">
        <Avatar size="small" style={{ backgroundColor: colorOf(contact.name[0]) }}>
          {contact.name[0]}
        </Avatar>
        {contact.name}
      </Flex>
    )}
  />
);

export default App;
```

### Rich content

`itemRender` can render arbitrarily rich content, and rows do not need the same height.

```tsx
import React from 'react';
import { Avatar, Flex, Listy, Typography } from 'antd';

interface Notification {
  id: number;
  user: string;
  message: string;
  time: string;
}

const users = ['Olivia', 'Liam', 'Emma', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Lucas'];

const messages = [
  'commented on your merge request',
  'invited you to the quarterly planning review. Please confirm your availability before Friday so the agenda can be finalized in time.',
  'mentioned you in the design review thread',
  'assigned you a task that is due next Monday. It covers the remaining accessibility issues found in the latest audit.',
  'starred the report you shared yesterday',
  'requested changes on your pull request. Most of the comments are about naming and the test coverage of the new cache layer.',
];

const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

const colorOf = (user: string) => colors[users.indexOf(user) % colors.length];

const pad = (value: number) => String(value).padStart(2, '0');

const notifications = Array.from<any, Notification>({ length: 12 }, (_, index) => ({
  id: index,
  user: users[index % users.length],
  message: messages[index % messages.length],
  time: `${pad((8 + index) % 24)}:${pad((index * 17) % 60)}`,
}));

const App: React.FC = () => (
  <Listy<Notification>
    items={notifications}
    rowKey="id"
    height={400}
    itemRender={(item) => (
      <Flex gap="middle" align="flex-start">
        <Avatar style={{ backgroundColor: colorOf(item.user), flex: 'none' }}>
          {item.user[0]}
        </Avatar>
        <Flex vertical flex="auto" style={{ minWidth: 0 }}>
          <Flex justify="space-between" gap="small">
            <Typography.Text strong>{item.user}</Typography.Text>
            <Typography.Text type="secondary">{item.time}</Typography.Text>
          </Flex>
          <Typography.Text type="secondary">{item.message}</Typography.Text>
        </Flex>
      </Flex>
    )}
  />
);

export default App;
```

### Drag sorting

Implement drag sorting for list items by integrating the third-party library [dnd-kit](https://github.com/clauderic/dnd-kit).

```tsx
import React, { useState } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Flex, Listy } from 'antd';

interface Item {
  id: number;
  content: string;
}

const items = Array.from<any, Item>({ length: 20 }, (_, index) => ({
  id: index,
  content: `Item ${index}`,
}));

const SortableItem: React.FC<Readonly<Item>> = (props) => {
  const { id, content } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 1 } : {}),
  };

  return (
    <Flex ref={setNodeRef} style={style} align="center" gap="small">
      <Button
        type="text"
        size="small"
        icon={<HolderOutlined />}
        style={{ cursor: 'move' }}
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
      />
      {content}
    </Flex>
  );
};

const Demo: React.FC = () => {
  const [data, setData] = useState<Item[]>(items);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 1 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return;
    }
    setData((prev) => {
      const activeIndex = prev.findIndex((item) => item.id === active.id);
      const overIndex = prev.findIndex((item) => item.id === over.id);
      return arrayMove(prev, activeIndex, overIndex);
    });
  };

  return (
    <DndContext
      id="listy-drag-sorting"
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={data.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <Listy<Item>
          items={data}
          height={400}
          rowKey="id"
          itemRender={(item) => <SortableItem {...item} />}
        />
      </SortableContext>
    </DndContext>
  );
};

export default Demo;
```

### Infinite loading

Detect in `onScroll` that the list is about to reach the bottom, then load the next page on demand for endless scrolling. Combined with `virtual`, only the rows in view are rendered no matter how much data piles up.

```tsx
import React from 'react';
import { Flex, Listy, Spin, Typography } from 'antd';

interface Item {
  id: number;
  content: string;
}

const PAGE_SIZE = 50;

const makePage = (offset: number) =>
  Array.from<any, Item>({ length: PAGE_SIZE }, (_, index) => ({
    id: offset + index,
    content: `Item ${offset + index}`,
  }));

const App: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>(() => makePage(0));
  const [loading, setLoading] = React.useState(false);
  const loadingRef = React.useRef(false);

  const onScroll: React.UIEventHandler<HTMLElement> = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop - clientHeight > 200 || loadingRef.current) {
      return;
    }
    loadingRef.current = true;
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => [...prev, ...makePage(prev.length)]);
      loadingRef.current = false;
      setLoading(false);
    }, 600);
  };

  return (
    <Flex vertical gap="small">
      <Listy<Item>
        virtual
        items={items}
        rowKey="id"
        height={400}
        itemRender={(item) => item.content}
        onScroll={onScroll}
      />
      <Flex justify="center" align="center" style={{ height: 24 }}>
        {loading ? (
          <Spin size="small" />
        ) : (
          <Typography.Text type="secondary">{items.length} items loaded</Typography.Text>
        )}
      </Flex>
    </Flex>
  );
};

export default App;
```

### Custom semantic dom styling

Customize the [semantic DOM](#semantic-dom) styles of Listy with `classNames` and `styles`.

```tsx
import React from 'react';
import { Listy } from 'antd';
import type { ListyProps } from 'antd';
import { createStaticStyles } from 'antd-style';

interface User {
  id: number;
  name: string;
  team: string;
}

const users: User[] = [
  { id: 0, name: 'Olivia', team: 'Design' },
  { id: 1, name: 'Liam', team: 'Design' },
  { id: 2, name: 'Emma', team: 'Design' },
  { id: 3, name: 'Noah', team: 'Engineering' },
  { id: 4, name: 'Ava', team: 'Engineering' },
  { id: 5, name: 'Ethan', team: 'Engineering' },
  { id: 6, name: 'Sophia', team: 'Marketing' },
  { id: 7, name: 'Lucas', team: 'Marketing' },
];

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 1px solid #91caff;
    border-radius: 8px;
    overflow: hidden;
  `,
  groupHeader: css`
    color: #1677ff;
    background: #e6f4ff;
  `,
}));

const styles: ListyProps['styles'] = {
  item: { fontStyle: 'italic' },
};

const App: React.FC = () => (
  <Listy<User, string>
    items={users}
    rowKey="id"
    height={260}
    sticky
    group={{ key: (user) => user.team, title: (team) => team }}
    itemRender={(user) => user.name}
    classNames={classNames}
    styles={styles}
  />
);

export default App;
```



## API

> Listy component is available since `antd@6.6.0`.

Common props ref: [Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version | [Global Config](/components/config-provider#component-config) |
| --- | --- | --- | --- | --- | --- |
| classNames | Semantic class names | `{ root?, item?, groupHeader? }` | - | 6.6.0 | 6.6.0 |
| group | Grouping config, see [Group](#group) below | `Group<T, K>` | - | 6.6.0 | × |
| height | Height of the scroll container; content scrolls when it overflows | number | - | 6.6.0 | × |
| itemRender | Render a single row | `(item: T, index: number) => ReactNode` | - | 6.6.0 | × |
| items | Data source of the list | `T[]` | `[]` | 6.6.0 | × |
| rowKey | Unique key of an item, a field name or a getter | `keyof T \| (item: T) => Key` | - | 6.6.0 | × |
| sticky | Whether group headers stick to the top | boolean | false | 6.6.0 | × |
| styles | Semantic inline styles | `{ root?, item?, groupHeader? }` | - | 6.6.0 | 6.6.0 |
| virtual | Whether to enable virtual scrolling, rendering only rows in view, requires `height` | boolean | false | 6.6.0 | × |
| onScroll | Native scroll event handler | `React.UIEventHandler<HTMLElement>` | - | 6.6.0 | × |

### Group

| Property | Description | Type |
| --- | --- | --- |
| key | Compute the group key an item belongs to; items with the same key are grouped together | `(item: T) => K` |
| title | Render the group header; receives the group key and its items | `(groupKey: K, items: T[]) => ReactNode` |

### Ref

| Name     | Description                               | Type                                     |
| -------- | ----------------------------------------- | ---------------------------------------- |
| scrollTo | Scroll to a position, an item, or a group | `(config?: ListyScrollToConfig) => void` |

`ListyScrollToConfig` is one of:

| Shape                           | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| number                          | Scroll to a pixel offset (scrollTop)            |
| `{ top?, left? }`               | Scroll to an absolute pixel position            |
| `{ key, align?, offset? }`      | Scroll to the item whose `rowKey` matches `key` |
| `{ groupKey, align?, offset? }` | Scroll to a group header                        |

`align` is `'top' | 'bottom' | 'auto'`; `offset` is an extra pixel offset applied after alignment.

## Semantic DOM

https://ant.design/components/listy/semantic.md

## Design Token



## Component Token (Listy)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| itemPaddingBlock | Vertical padding of a list item. | number | 12 |
| itemPaddingInline | Horizontal padding of a list item. | number | 16 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorFillAlter | Control the alternative background color of element. | string |  |
| colorFillQuaternary | The weakest level of fill color is suitable for color blocks that are not easy to attract attention, such as zebra stripes, color blocks that distinguish boundaries, etc. | string |  |
| colorSplit | Used as the color of separator, this color is the same as colorBorderSecondary but with transparency. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDescription | Control the font color of text description. | string |  |
| controlItemBgHover | Control the background color of control component item when hovering. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontWeightStrong | Control the font weight of heading components (such as h1, h2, h3) or selected item. | number |  |
| lineHeight | Line height of text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionEaseInOut | Preset motion curve. | string |  |
| paddingXS | Control the extra small padding of the element. | number |  |


