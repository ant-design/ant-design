---
category: Components
group: Layout
title: Masonry
cover: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*cELTRrM5HpAAAAAAOGAAAAgAegCCAQ/original
coverDark: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*2CxJRYJmfbIAAAAAPqAAAAgAegCCAQ/original
demo:
  cols: 1
tag: 6.0.0
---

A masonry layout component for displaying content with different heights.

## When To Use

- When displaying images or cards with irregular heights
- When content needs to be evenly distributed in columns
- When column count needs to be responsive

## Examples

### Basic

Basic usage. Set number of columns with `columns` and spacing with `gutter`.

```tsx
import React from 'react';
import { Card, Masonry } from 'antd';

import type { MasonryItemType } from '../MasonryItem';

const heights = [150, 50, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 60, 50, 80].map(
  (height, index) => {
    const item: MasonryItemType = {
      key: `item-${index}`,
      data: height,
    };

    if (index === 4) {
      item.children = (
        <Card
          size="small"
          cover={
            <img
              alt="food"
              src="https://images.unsplash.com/photo-1491961865842-98f7befd1a60?w=523&auto=format"
            />
          }
        >
          <Card.Meta title="I'm Special" description="Let's have a meal" />
        </Card>
      );
    }

    return item;
  },
);

const App: React.FC = () => (
  <Masonry
    columns={4}
    gutter={16}
    items={heights}
    itemRender={({ data, index }) => (
      <Card size="small" style={{ height: data }}>
        {index + 1}
      </Card>
    )}
  />
);

export default App;
```

### Responsive

Responsive layout adapts to different screen widths. Use `columns` to specify the number of columns at different breakpoints, and `gutter` to adjust spacing between items.

```tsx
import React from 'react';
import { Card, Masonry } from 'antd';

const heights = [120, 55, 85, 160, 95, 140, 75, 110, 65, 130, 90, 145, 55, 100, 80];

const App: React.FC = () => {
  const items = heights.map((height, index) => ({
    key: `item-${index}`,
    data: height,
    index,
  }));

  return (
    <Masonry
      columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      gutter={{ xs: 8, sm: 12, md: 16 }}
      items={items}
      itemRender={(item) => (
        <Card size="small" style={{ height: item.data }}>
          {item.index + 1}
        </Card>
      )}
    />
  );
};

export default App;
```

### Image

Dynamically adjust the height of images as they load.

```tsx
import React from 'react';
import { Masonry } from 'antd';

const imageList = [
  'https://images.unsplash.com/photo-1510001618818-4b4e3d86bf0f',
  'https://images.unsplash.com/photo-1507513319174-e556268bb244',
  'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2',
  'https://images.unsplash.com/photo-1492778297155-7be4c83960c7',
  'https://images.unsplash.com/photo-1508062878650-88b52897f298',
  'https://images.unsplash.com/photo-1506158278516-d720e72406fc',
  'https://images.unsplash.com/photo-1552203274-e3c7bd771d26',
  'https://images.unsplash.com/photo-1528163186890-de9b86b54b51',
  'https://images.unsplash.com/photo-1727423304224-6d2fd99b864c',
  'https://images.unsplash.com/photo-1675090391405-432434e23595',
  'https://images.unsplash.com/photo-1554196967-97a8602084d9',
  'https://images.unsplash.com/photo-1491961865842-98f7befd1a60',
  'https://images.unsplash.com/photo-1721728613411-d56d2ddda959',
  'https://images.unsplash.com/photo-1731901245099-20ac7f85dbaa',
  'https://images.unsplash.com/photo-1617694455303-59af55af7e58',
  'https://images.unsplash.com/photo-1709198165282-1dab551df890',
];

const App = () => (
  <Masonry
    columns={4}
    gutter={16}
    items={imageList.map((img, index) => ({
      key: `item-${index}`,
      data: img,
    }))}
    itemRender={({ data }) => (
      <img src={`${data}?w=523&auto=format`} alt="sample" style={{ width: '100%' }} />
    )}
  />
);

export default App;
```

### Dynamic

Demonstrate how masonry layout updates dynamically. Use `item.column` to keep items in place.

```tsx
import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Flex, theme } from 'antd';

import Masonry from '../Masonry';

const heights = [150, 50, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 70, 50, 80];

type ItemType = {
  key: number;
  column?: number;
  data: number;
};

const Update: React.FC = () => {
  const { token } = theme.useToken();

  const [items, setItems] = useState<ItemType[]>(() =>
    heights.map((height, index) => ({
      key: index,
      column: index % 4,
      data: height,
    })),
  );

  const removeItem = (removeKey: React.Key) => {
    setItems((prevItems) => prevItems.filter(({ key }) => key !== removeKey));
  };

  const addItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        key: prevItems.length ? prevItems[prevItems.length - 1].key + 1 : 0,
        data: Math.floor(Math.random() * 100) + 50,
      },
    ]);
  };

  return (
    <Flex vertical gap={16}>
      <Masonry
        columns={4}
        gutter={16}
        items={items}
        itemRender={({ data, key }) => (
          <Card size="small" style={{ height: data }}>
            {Number(key) + 1}
            <Button
              style={{
                position: 'absolute',
                insetBlockStart: token.paddingSM,
                insetInlineEnd: token.paddingSM,
              }}
              size="small"
              icon={<CloseOutlined />}
              onClick={() => removeItem(key)}
            />
          </Card>
        )}
        onLayoutChange={(sortedItems) => {
          setItems((prevItems) =>
            prevItems.map((item) => {
              const matchItem = sortedItems.find((sortedItem) => sortedItem.key === item.key);
              return matchItem
                ? {
                    ...item,
                    column: matchItem.column,
                  }
                : item;
            }),
          );
        }}
      />
      <Button block onClick={addItem}>
        Add Item
      </Button>
    </Flex>
  );
};

export default Update;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Masonry by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Card, Divider, Flex, Masonry, Typography } from 'antd';
import type { MasonryProps } from 'antd';
import { createStaticStyles } from 'antd-style';
import type { MasonryItemType } from 'antd/es/masonry/MasonryItem';
const { Title } = Typography;

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    padding: 16px;
    height: 260px;
    background-color: #fafafa;
  `,
  item: css`
    transform: scale(0.98);
    transition: transform 0.2s ease;
    border-radius: 12px;
    border: 1px solid #ccc;
    overflow: hidden;
  `,
}));

const items = [120, 80, 100, 60, 140, 90, 110, 70].map<MasonryItemType<number>>(
  (height, index) => ({
    key: `item-${index}`,
    data: height,
  }),
);

const styles: MasonryProps['styles'] = {
  root: {
    borderRadius: 12,
    padding: 20,
    height: 260,
    backgroundColor: 'rgba(250,250,250,0.5)',
  },
  item: {
    transform: 'scale(0.98)',
    transition: 'transform 0.2s ease',
    border: '1px solid #ccc',
  },
};

const stylesFn: MasonryProps['styles'] = (info) => {
  const { props } = info;
  return {
    root: {
      border: `2px solid ${typeof props.columns === 'number' && props.columns > 2 ? '#1890ff' : '#52c41a'}`,
      padding: 20,
      height: 280,
      backgroundColor: 'rgba(240,248,255,.6)',
    },
    item: {
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #1890ff',
    },
  } satisfies MasonryProps['styles'];
};

const App: React.FC = () => {
  const sharedProps: MasonryProps = {
    classNames,
    itemRender: ({ data, index }) => (
      <Card size="small" style={{ height: data }}>
        {index + 1}
      </Card>
    ),
  };
  return (
    <Flex vertical gap={24}>
      <div>
        <Title level={4}>classNames and styles Object</Title>
        <Masonry columns={4} gutter={16} items={items} {...sharedProps} styles={styles} />
      </div>
      <Divider />
      <div>
        <Title level={4}>classNames and styles Function</Title>
        <Masonry
          columns={3}
          gutter={12}
          items={items.slice(0, 6)}
          {...sharedProps}
          styles={stylesFn}
        />
      </div>
    </Flex>
  );
};

export default App;
```



## API

Common props ref：[Common props](/docs/react/common-props)

## Masonry

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| columns | Number of columns, can be a fixed value or a responsive configuration | `number \| { xs?: number; sm?: number; md?: number }` | `3` |  |
| fresh | Whether to continuously monitor the size changes of child items | `boolean` | `false` |  |
| gutter | Spacing, can be a fixed value, responsive configuration, or a configuration for horizontal and vertical spacing | [Gap](#gap) \| \[[Gap](#gap), [Gap](#gap)\] | `0` |  |
| items | Masonry items | [MasonryItem](#masonryitem)[] | - |  |
| itemRender | Custom item rendering function | `(item: MasonryItem) => React.ReactNode` | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| onLayoutChange | Callback for column sorting changes | `({ key: React.Key; column: number }[]) => void` | - |  |

### MasonryItem

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| children | Custom display content, takes precedence over `itemRender` | `React.ReactNode` | - |
| column | Specifies the column to which the item belongs | `number` | - |
| data | Custom data storage | `T` | - |
| height | Height of the item | `number` | - |
| key | Unique identifier for the item | `string` \| `number` | - |

### Gap

`Gap` represents the spacing between items. It can either be a fixed value or a responsive configuration.

```ts
type Gap = undefined | number | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', number>>;
```

## Semantic DOM

https://ant.design/components/masonry/semantic.md

## Design Token



## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| motionDurationFast | Motion speed, fast speed. Used for small element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| motionEaseOut | Preset motion curve. | string |  |


