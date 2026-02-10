---
category: Components
group: Data Display
title: List
description: Basic list display, which can carry text, lists, pictures, paragraphs.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*EYuhSpw1iSwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*tBzwQ7raKX8AAAAAAAAAAAAADrJ8AQ/original
tag: DEPRECATED
---

## When To Use

A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.

:::warning{title=Deprecated Notice}
List component has been deprecated. Will be removed in the next major version.
:::

## Examples

### Simple list

Ant Design supports a default list size as well as a large and small size.

If a large or small list is desired, set the size property to either large or small respectively. Omit the size property for a list with the default size.

Customizing the header and footer of list by setting `header` and `footer` property.

```tsx
import React from 'react';
import { Divider, List, Typography } from 'antd';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const App: React.FC = () => (
  <>
    <Divider titlePlacement="start">Default Size</Divider>
    <List
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text mark>[ITEM]</Typography.Text> {item}
        </List.Item>
      )}
    />
    <Divider titlePlacement="start">Small Size</Divider>
    <List
      size="small"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
    <Divider titlePlacement="start">Large Size</Divider>
    <List
      size="large"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  </>
);

export default App;
```

### Basic list

Basic list.

```tsx
import React from 'react';
import { Avatar, List } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const App: React.FC = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />
);

export default App;
```

### Load more

Load more list with `loadMore` property.

```css
.demo-loadmore-list {
  min-height: 350px;
}
```

```tsx
import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';

interface DataType {
  gender?: string;
  name?: string;
  email?: string;
  avatar?: string;
  loading: boolean;
}

const PAGE_SIZE = 3;

const App: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);

  const fetchData = (currentPage: number) => {
    const fakeDataUrl = `https://660d2bd96ddfa2943b33731c.mockapi.io/api/users?page=${currentPage}&limit=${PAGE_SIZE}`;
    return fetch(fakeDataUrl)
      .then((res) => res.json())
      .catch(() => {
        console.log('fetch mock data failed');
        return [];
      });
  };

  useEffect(() => {
    fetchData(page).then((res) => {
      const results = Array.isArray(res) ? res : [];
      setInitLoading(false);
      setData(results);
      setList(results);
    });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(data.concat(Array.from({ length: PAGE_SIZE }).map(() => ({ loading: true }))));
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage).then((res) => {
      const results = Array.isArray(res) ? res : [];
      const newData = data.concat(results);
      setData(newData);
      setList(newData);
      setLoading(false);
      // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
      // In real scene, you can using public method of react-virtualized:
      // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
      window.dispatchEvent(new Event('resize'));
    });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <div>content</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default App;
```

### Vertical

Set the `itemLayout` property to `vertical` to create a vertical list.

```tsx
import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const App: React.FC = () => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={data}
    footer={
      <div>
        <b>ant design</b> footer part
      </div>
    }
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            draggable={false}
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
);

export default App;
```

### Pagination Settings

List pagination can be used and set through the `pagination` property.

```tsx
import React, { useState } from 'react';
import { Avatar, List, Radio, Space } from 'antd';

type PaginationPosition = 'top' | 'bottom' | 'both';

type PaginationAlign = 'start' | 'center' | 'end';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const positionOptions = ['top', 'bottom', 'both'];

const alignOptions = ['start', 'center', 'end'];

const App: React.FC = () => {
  const [position, setPosition] = useState<PaginationPosition>('bottom');
  const [align, setAlign] = useState<PaginationAlign>('center');

  return (
    <>
      <Space vertical style={{ marginBottom: '20px' }} size="middle">
        <Space>
          <span>Pagination Position:</span>
          <Radio.Group
            optionType="button"
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
            }}
          >
            {positionOptions.map((item) => (
              <Radio.Button key={item} value={item}>
                {item}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Space>
        <Space>
          <span>Pagination Align:</span>
          <Radio.Group
            optionType="button"
            value={align}
            onChange={(e) => {
              setAlign(e.target.value);
            }}
          >
            {alignOptions.map((item) => (
              <Radio.Button key={item} value={item}>
                {item}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Space>
      </Space>
      <List
        pagination={{ position, align }}
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default App;
```

### Grid

Create a grid layout by setting the `grid` property of List.

```tsx
import React from 'react';
import { Card, List } from 'antd';

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
];

const App: React.FC = () => (
  <List
    grid={{ gutter: 16, column: 4 }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <Card title={item.title}>Card content</Card>
      </List.Item>
    )}
  />
);

export default App;
```


### Responsive grid list

Responsive grid list. The size property the is as same as [Layout Grid](/components/grid/#col).

```tsx
import React from 'react';
import { Card, List } from 'antd';

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

const App: React.FC = () => (
  <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3,
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <Card title={item.title}>Card content</Card>
      </List.Item>
    )}
  />
);

export default App;
```

### Scrolling loaded

The example of infinite load with [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component).

```tsx
import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

interface DataType {
  gender?: string;
  name?: string;
  email?: string;
  avatar?: string;
  id?: string;
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?page=${page}&limit=10`)
      .then((res) => res.json())
      .then((res) => {
        const results = Array.isArray(res) ? res : [];
        setData([...data, ...results]);
        setLoading(false);
        setPage(page + 1);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default App;
```

### Drag sorting

By using `components`, we can integrate List with [dnd-kit](https://github.com/clauderic/dnd-kit) to implement drag sorting function.

```tsx
import React, { useState } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { List } from 'antd';
import type { GetProps } from 'antd';

const SortableListItem: React.FC<GetProps<typeof List.Item> & { itemKey: number }> = (props) => {
  const { itemKey, style, children, ...rest } = props;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: itemKey,
  });

  const listStyle: React.CSSProperties = {
    ...style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <List.Item {...rest} ref={setNodeRef} style={listStyle}>
      <div {...attributes} {...listeners}>
        {children}
      </div>
    </List.Item>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState([
    { key: 1, content: 'Racing car sprays burning fuel into crowd.' },
    { key: 2, content: 'Japanese princess to wed commoner.' },
    { key: 3, content: 'Australian walks 100km after outback crash.' },
    { key: 4, content: 'Man charged over missing wedding girl.' },
    { key: 5, content: 'Los Angeles battles huge wildfires.' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || !over) {
      return;
    }
    if (active.id !== over.id) {
      setData((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
      id="list-drag-sorting"
    >
      <SortableContext items={data.map((item) => item.key)} strategy={verticalListSortingStrategy}>
        <List
          dataSource={data}
          renderItem={(item) => (
            <SortableListItem key={item.key} itemKey={item.key}>
              {item.key} {item.content}
            </SortableListItem>
          )}
        />
      </SortableContext>
    </DndContext>
  );
};

export default App;
```

### Drag sorting with handler

Alternatively you can implement drag sorting with handler using [dnd-kit](https://github.com/clauderic/dnd-kit).

```tsx
import React, { createContext, useContext, useMemo, useState } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent, DraggableAttributes } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, List } from 'antd';
import type { GetProps } from 'antd';

interface SortableListItemContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
}

const SortableListItemContext = createContext<SortableListItemContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners, attributes } = useContext(SortableListItemContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
    />
  );
};

const SortableListItem: React.FC<GetProps<typeof List.Item> & { itemKey: number }> = (props) => {
  const { itemKey, style, ...rest } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemKey });

  const listStyle: React.CSSProperties = {
    ...style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const memoizedValue = useMemo<SortableListItemContextProps>(
    () => ({ setActivatorNodeRef, listeners, attributes }),
    [setActivatorNodeRef, listeners, attributes],
  );

  return (
    <SortableListItemContext.Provider value={memoizedValue}>
      <List.Item {...rest} ref={setNodeRef} style={listStyle} />
    </SortableListItemContext.Provider>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState([
    { key: 1, content: 'Racing car sprays burning fuel into crowd.' },
    { key: 2, content: 'Japanese princess to wed commoner.' },
    { key: 3, content: 'Australian walks 100km after outback crash.' },
    { key: 4, content: 'Man charged over missing wedding girl.' },
    { key: 5, content: 'Los Angeles battles huge wildfires.' },
  ]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || !over) {
      return;
    }
    if (active.id !== over.id) {
      setData((prevState) => {
        const activeIndex = prevState.findIndex((i) => i.key === active.id);
        const overIndex = prevState.findIndex((i) => i.key === over.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
      id="list-drag-sorting-handler"
    >
      <SortableContext items={data.map((item) => item.key)} strategy={verticalListSortingStrategy}>
        <List
          dataSource={data}
          renderItem={(item) => (
            <SortableListItem key={item.key} itemKey={item.key}>
              <DragHandle /> {item.key} {item.content}
            </SortableListItem>
          )}
        />
      </SortableContext>
    </DndContext>
  );
};

export default App;
```

### Grid Drag sorting

By using custom components, we can integrate List with [dnd-kit](https://github.com/clauderic/dnd-kit) to implement drag sorting function for grid layout.

```tsx
import React, { useState } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, List } from 'antd';
import type { GetProps } from 'antd';

const SortableListItem: React.FC<GetProps<typeof List.Item> & { itemKey: number }> = (props) => {
  const { itemKey, style, ...rest } = props;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: itemKey,
  });

  const listStyle: React.CSSProperties = {
    ...style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return <List.Item {...rest} ref={setNodeRef} style={listStyle} {...attributes} {...listeners} />;
};

const App: React.FC = () => {
  const [data, setData] = useState([
    { key: 1, title: 'Title 1' },
    { key: 2, title: 'Title 2' },
    { key: 3, title: 'Title 3' },
    { key: 4, title: 'Title 4' },
    { key: 5, title: 'Title 5' },
    { key: 6, title: 'Title 6' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || !over) {
      return;
    }
    if (active.id !== over.id) {
      setData((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd} id="list-grid-drag-sorting">
      <SortableContext items={data.map((item) => item.key)}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={(item) => (
            <SortableListItem key={item.key} itemKey={item.key}>
              <Card title={item.title}>Card content</Card>
            </SortableListItem>
          )}
        />
      </SortableContext>
    </DndContext>
  );
};

export default App;
```

### Grid Drag sorting with handler

By using custom components and drag handles, we can integrate List with [dnd-kit](https://github.com/clauderic/dnd-kit) to implement drag sorting function for grid layout.

```tsx
import React, { createContext, useContext, useMemo, useState } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent, DraggableAttributes } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Card, List } from 'antd';
import type { GetProps } from 'antd';

interface SortableListItemContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
}

const SortableListItemContext = createContext<SortableListItemContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners, attributes } = useContext(SortableListItemContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
    />
  );
};

const SortableListItem: React.FC<GetProps<typeof List.Item> & { itemKey: number }> = (props) => {
  const { itemKey, style, ...rest } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemKey });

  const listStyle: React.CSSProperties = {
    ...style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const memoizedValue = useMemo<SortableListItemContextProps>(
    () => ({ setActivatorNodeRef, listeners, attributes }),
    [setActivatorNodeRef, listeners, attributes],
  );

  return (
    <SortableListItemContext.Provider value={memoizedValue}>
      <List.Item {...rest} ref={setNodeRef} style={listStyle} />
    </SortableListItemContext.Provider>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState([
    { key: 1, title: 'Title 1' },
    { key: 2, title: 'Title 2' },
    { key: 3, title: 'Title 3' },
    { key: 4, title: 'Title 4' },
    { key: 5, title: 'Title 5' },
    { key: 6, title: 'Title 6' },
  ]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || !over) {
      return;
    }
    if (active.id !== over.id) {
      setData((prevState) => {
        const activeIndex = prevState.findIndex((i) => i.key === active.id);
        const overIndex = prevState.findIndex((i) => i.key === over.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd} id="list-grid-drag-sorting-handler">
      <SortableContext items={data.map((i) => i.key)}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={(item) => (
            <SortableListItem key={item.key} itemKey={item.key}>
              <Card
                title={
                  <>
                    <DragHandle />
                    {item.title}
                  </>
                }
              >
                Card content
              </Card>
            </SortableListItem>
          )}
        />
      </SortableContext>
    </DndContext>
  );
};

export default App;
```

### virtual list

An example of infinite & virtualized list via using [@rc-component/virtual-list](https://github.com/react-component/virtual-list).

```tsx
import React, { useEffect, useState } from 'react';
import VirtualList from '@rc-component/virtual-list';
import { Avatar, List, message } from 'antd';

interface UserItem {
  email: string;
  gender: string;
  name: string;
  avatar: string;
}

const CONTAINER_HEIGHT = 400;
const PAGE_SIZE = 20;

const App: React.FC = () => {
  const [data, setData] = useState<UserItem[]>([]);
  const [page, setPage] = useState(1);

  const appendData = (showMessage = true) => {
    const fakeDataUrl = `https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?page=${page}&limit=${PAGE_SIZE}`;
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        const results = Array.isArray(body) ? body : [];
        setData(data.concat(results));
        setPage(page + 1);
        showMessage && message.success(`${results.length} more items loaded!`);
      })
      .catch(() => {
        console.log('fetch mock data failed');
      });
  };

  useEffect(() => {
    appendData(false);
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - CONTAINER_HEIGHT) <= 1
    ) {
      appendData();
    }
  };

  return (
    <List>
      <VirtualList
        data={data}
        height={CONTAINER_HEIGHT}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item: UserItem) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.email}
            />
            <div>Content</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default App;
```




## API

Common props ref：[Common props](/docs/react/common-props)

### List

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| bordered | Toggles rendering of the border around the list | boolean | false |  |
| dataSource | DataSource array for list | any\[] | - |  |
| footer | List footer renderer | ReactNode | - |  |
| grid | The grid type of list. You can set grid to something like {gutter: 16, column: 4} | [object](#list-grid-props) | - |  |
| header | List header renderer | ReactNode | - |  |
| itemLayout | The layout of list | `horizontal` \| `vertical` | `horizontal` |  |
| loading | Shows a loading indicator while the contents of the list are being fetched | boolean \| [SpinProps](/components/spin/#api) ([more](https://github.com/ant-design/ant-design/issues/8659)) | false |  |
| loadMore | Shows a load more content | ReactNode | - |  |
| locale | The i18n text including empty text | object | {emptyText: `No Data`} |  |
| pagination | Pagination [config](/components/pagination/), hide it by setting it to false | boolean \| object | false |  |
| renderItem | Customize list item when using `dataSource` | (item: T, index: number) => ReactNode | - |  |
| rowKey | Item's unique value, could be an Item's key which holds a unique value of type `React.Key` or function that receives Item and returns a `React.Key` | `keyof` T \| (item: T) => `React.Key` | `"key"` |  |
| size | Size of list | `default` \| `large` \| `small` | `default` |  |
| split | Toggles rendering of the split under the list item | boolean | true |  |

### pagination

Properties for pagination.

| Property | Description                               | Type                         | Default  |
| -------- | ----------------------------------------- | ---------------------------- | -------- |
| position | The specify the position of `Pagination`  | `top` \| `bottom` \| `both`  | `bottom` |
| align    | The specify the alignment of `Pagination` | `start` \| `center` \| `end` | `end`    |

More about pagination, please check [`Pagination`](/components/pagination/).

### List grid props

| Property | Description              | Type   | Default | Version |
| -------- | ------------------------ | ------ | ------- | ------- |
| column   | The column of grid       | number | -       |         |
| gutter   | The spacing between grid | number | 0       |         |
| xs       | `<576px` column of grid  | number | -       |         |
| sm       | `≥576px` column of grid  | number | -       |         |
| md       | `≥768px` column of grid  | number | -       |         |
| lg       | `≥992px` column of grid  | number | -       |         |
| xl       | `≥1200px` column of grid | number | -       |         |
| xxl      | `≥1600px` column of grid | number | -       |         |
| xxxl     | `≥1920px` column of grid | number | -       | 6.3.0   |

### List.Item

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| actions | The actions content of list item. If `itemLayout` is `vertical`, shows the content on bottom, otherwise shows content on the far right | Array&lt;ReactNode> | - |  |
| classNames | Semantic structure className | [`Record<actions \| extra, string>`](#semantic-dom) | - | 5.18.0 |
| extra | The extra content of list item. If `itemLayout` is `vertical`, shows the content on right, otherwise shows content on the far right | ReactNode | - |  |
| styles | Semantic DOM style | [`Record<actions \| extra, CSSProperties>`](#semantic-dom) | - | 5.18.0 |

### List.Item.Meta

| Property    | Description                  | Type      | Default | Version |
| ----------- | ---------------------------- | --------- | ------- | ------- |
| avatar      | The avatar of list item      | ReactNode | -       |         |
| description | The description of list item | ReactNode | -       |         |
| title       | The title of list item       | ReactNode | -       |         |

## Semantic DOM

https://ant.design/components/list/semantic.md

## Design Token



## Component Token (List)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| avatarMarginRight | Right margin of avatar | MarginRight<string \| number> \| undefined | 16 |
| contentWidth | Width of content | string \| number | 220 |
| descriptionFontSize | Font size of description | number | 14 |
| emptyTextPadding | Padding of empty text | Padding<string \| number> \| undefined | 16 |
| footerBg | Background color of footer | string | transparent |
| headerBg | Background color of header | string | transparent |
| itemPadding | Padding of item | string | 12px 0 |
| itemPaddingLG | Padding of large item | string | 16px 24px |
| itemPaddingSM | Padding of small item | string | 8px 16px |
| metaMarginBottom | Margin bottom of meta | MarginBottom<string \| number> \| undefined | 16 |
| titleMarginBottom | Margin bottom of title | MarginBottom<string \| number> \| undefined | 12 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| colorBorder | Default border color, used to separate different elements, such as: form separator, card separator, etc. | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorSplit | Used as the color of separator, this color is the same as colorBorderSecondary but with transparency. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDescription | Control the font color of text description. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| controlHeight | The height of the basic controls such as buttons and input boxes in Ant Design | number |  |
| controlHeightLG | LG component height | number |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeLG | Large font size | number |  |
| fontSizeSM | Small font size | number |  |
| lineHeight | Line height of text. | number |  |
| lineHeightLG | Line height of large text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| margin | Control the margin of an element, with a medium size. | number |  |
| marginLG | Control the margin of an element, with a large size. | number |  |
| marginSM | Control the margin of an element, with a medium-small size. | number |  |
| marginXXL | Control the margin of an element, with the largest size. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| padding | Control the padding of the element. | number |  |
| paddingLG | Control the large padding of the element. | number |  |
| paddingSM | Control the small padding of the element. | number |  |
| paddingXS | Control the extra small padding of the element. | number |  |
| screenMD | Control the screen width of medium screens. | number |  |
| screenSM | Control the screen width of small screens. | number |  |



## FAQ {#faq}

### Is there a replacement for the deprecated List component? {#faq-listy-replacement}

In Ant Design v6, we will introduce a brand-new Listy component as the successor to List.

Listy comes with built-in virtual scrolling and places greater emphasis on flexible layout control, empowering developers to build highly customizable lists tailored to various business scenarios.

The underlying implementation, rc-listy, is already largely complete and is currently awaiting review and further adjustments by core maintainers.

Ant Design v6 will officially provide the Listy component based on rc-listy.

Related links:

- Pull Request: [PR #54182](https://github.com/ant-design/ant-design/pull/54182)
- RFC Discussion: [Discussion #54458](https://github.com/ant-design/ant-design/discussions/54458)
