---
category: Components
group: 数据展示
title: Listy
subtitle: 虚拟列表
description: 高性能列表，支持分组，并可为长列表开启虚拟滚动。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*EYuhSpw1iSwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*tBzwQ7raKX8AAAAAAAAAAAAADrJ8AQ/original
tag: 6.6.0
---

## 何时使用 {#when-to-use}

- 需要渲染长列表，又不想为每一行都付出挂载成本时 —— 开启 `virtual` 后只渲染视口内的行。
- 列表需要分组，并让分组标题吸顶时。
- 需要以命令式方式控制滚动位置（跳到某一项、某个分组或某个像素位置）时。

## 代码演示 {#examples}

### 基础用法

基础示例，渲染一个简单的列表。

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

### 虚拟滚动

一万条数据的长列表。通过设置 `virtual` 和 `height` 开启虚拟滚动，仅渲染视口内的行。

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

### 分组与吸顶

通过 `group` 从数据项中取出分组键并渲染分组标题，开启 `sticky` 后分组标题会在滚动时吸顶。

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

### 复杂内容

`itemRender` 可以渲染任意复杂的内容，行高不必相同。

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

### 拖拽排序

通过集成第三方库 [dnd-kit](https://github.com/clauderic/dnd-kit)，实现列表项的拖拽排序。

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

### 无限加载

在 `onScroll` 中判断列表即将滚动到底部时，按需加载下一页数据，实现无限滚动。配合 `virtual`，数据积累也只渲染视口内的行。

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

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 自定义 Listy 的[语义化结构](#semantic-dom)样式。

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

> 自 `antd@6.6.0` 版本开始提供该组件。

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 | [全局配置](/components/config-provider-cn#component-config) |
| --- | --- | --- | --- | --- | --- |
| classNames | 语义化结构 class | `{ root?, item?, groupHeader? }` | - | 6.6.0 | 6.6.0 |
| group | 分组配置，见下方 [Group](#group) | `Group<T, K>` | - | 6.6.0 | × |
| height | 滚动容器高度，内容超出后滚动 | number | - | 6.6.0 | × |
| itemRender | 渲染单行 | `(item: T, index: number) => ReactNode` | - | 6.6.0 | × |
| items | 列表数据源 | `T[]` | `[]` | 6.6.0 | × |
| rowKey | 每一项的唯一键，字段名或取值函数 | `keyof T \| (item: T) => Key` | - | 6.6.0 | × |
| sticky | 分组标题是否吸顶 | boolean | false | 6.6.0 | × |
| styles | 语义化结构 style | `{ root?, item?, groupHeader? }` | - | 6.6.0 | 6.6.0 |
| virtual | 是否开启虚拟滚动，仅渲染视口内的行，需配合 `height` 使用 | boolean | false | 6.6.0 | × |
| onScroll | 原生滚动事件回调 | `React.UIEventHandler<HTMLElement>` | - | 6.6.0 | × |

### Group

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| key | 计算每条数据所属的分组键，返回值相同的数据归为一组 | `(item: T) => K` |
| title | 渲染分组标题，入参为分组键与该组数据 | `(groupKey: K, items: T[]) => ReactNode` |

### Ref

| 名称     | 说明                             | 类型                                     |
| -------- | -------------------------------- | ---------------------------------------- |
| scrollTo | 滚动到某个位置、某一项或某个分组 | `(config?: ListyScrollToConfig) => void` |

`ListyScrollToConfig` 为以下之一：

| 形态                            | 说明                                |
| ------------------------------- | ----------------------------------- |
| number                          | 滚动到某个像素位置（scrollTop）     |
| `{ top?, left? }`               | 滚动到绝对像素坐标                  |
| `{ key, align?, offset? }`      | 滚动到 `rowKey` 等于 `key` 的数据项 |
| `{ groupKey, align?, offset? }` | 滚动到某个分组标题                  |

`align` 可选 `'top' | 'bottom' | 'auto'`；`offset` 为对齐后额外的像素偏移。

## Semantic DOM

https://ant.design/components/listy-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Listy)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| itemPaddingBlock | 列表项的纵向内间距。 | number | 12 |
| itemPaddingInline | 列表项的横向内间距。 | number | 16 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorBgContainer | 组件的容器背景色，例如：默认按钮、输入框等。务必不要将其与 `colorBgElevated` 混淆。 | string |  |
| colorFillAlter | 控制元素替代背景色。 | string |  |
| colorFillQuaternary | 最弱一级的填充色，适用于不易引起注意的色块，例如斑马纹、区分边界的色块等。 | string |  |
| colorSplit | 用于作为分割线的颜色，此颜色和 colorBorderSecondary 的颜色一致，但是用的是透明色。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextDescription | 控制文本描述字体颜色。 | string |  |
| controlItemBgHover | 控制组件项在鼠标悬浮时的背景颜色。 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontWeightStrong | 控制标题类组件（如 h1、h2、h3）或选中项的字体粗细。 | number |  |
| lineHeight | 文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionEaseInOut | 预设动效曲率 | string |  |
| paddingXS | 控制元素的特小内间距。 | number |  |


