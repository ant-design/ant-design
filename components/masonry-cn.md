---
category: Components
subtitle: 瀑布流
group: 布局
title: Masonry
cover: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*cELTRrM5HpAAAAAAOGAAAAgAegCCAQ/original
coverDark: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*2CxJRYJmfbIAAAAAPqAAAAgAegCCAQ/original
demo:
  cols: 1
tag: 6.0.0
---

瀑布流布局组件，用于展示不同高度的内容。

## 何时使用

- 展示不规则高度的图片或卡片时
- 需要按照列数均匀分布内容时
- 需要响应式调整列数时

## 代码演示 {#examples}

### 基础用法

基础用法展示。通过 `columns` 设置列数，`gutter` 设置间距。

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

### 响应式

使用响应式参数来适配不同屏幕宽度。`columns` 可以设置在不同断点下的列数，`gutter` 可以设置不同断点下的间距大小。

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

### 图片

随加载动态调整位置。

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

### 动态更新

展示瀑布流动态更新的效果，配合 `item.column` 固化位置。

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

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Masonry 的[语义化结构](#semantic-dom)样式。

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

通用属性参考：[通用属性](/docs/react/common-props)

### Masonry

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| columns | 列数，可以是固定值或响应式配置 | `number \| { xs?: number; sm?: number; md?: number }` | `3` |  |
| fresh | 是否持续监听子项尺寸变化 | `boolean` | `false` |  |
| gutter | 间距，可以是固定值、响应式配置或水平垂直间距配置 | [Gap](#gap) \| \[[Gap](#gap), [Gap](#gap)\] | `0` |  |
| items | 瀑布流项 | [MasonryItem](#masonryitem)[] | - |  |
| itemRender | 自定义项渲染 | `(item: MasonryItem) => React.ReactNode` | - |  |
| styles | 语义化结构 style，支持对象和函数形式 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| ((info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties>) | - |  |
| onLayoutChange | 列排序回调 | `({ key: React.Key; column: number }[]) => void` | - |  |

### MasonryItem

| 参数     | 说明                                             | 类型                 | 默认值 |
| -------- | ------------------------------------------------ | -------------------- | ------ |
| children | 自定义展示内容，相对 `itemRender` 具有更高优先级 | `React.ReactNode`    | -      |
| column   | 自定义所在列                                     | `number`             | -      |
| data     | 自定义存储数据                                   | `T`                  | -      |
| height   | 高度                                             | `number`             | -      |
| key      | 唯一标识                                         | `string` \| `number` | -      |

### Gap

Gap 是项之间的间距，可以是固定值，也可以是响应式配置。

```ts
type Gap = undefined | number | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', number>>;
```

## Semantic DOM

https://ant.design/components/masonry-cn/semantic.md

## Design Token



## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| motionDurationFast | 动效播放速度，快速。用于小型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| motionEaseOut | 预设动效曲率 | string |  |


