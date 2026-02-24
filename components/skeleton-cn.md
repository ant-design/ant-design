---
category: Components
group: 反馈
title: Skeleton
subtitle: 骨架屏
description: 在需要等待加载内容的位置提供一个占位图形组合。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用 {#when-to-use}

- 网络较慢，需要长时间等待加载处理的情况下。
- 图文信息内容较多的列表/卡片中。
- 只在第一次加载数据的时候使用。
- 可以被 Spin 完全代替，但是在可用的场景下可以比 Spin 提供更好的视觉效果和用户体验。

## 代码演示 {#examples}

### 基本

最简单的占位效果。

```tsx
import React from 'react';
import { Skeleton } from 'antd';

const App: React.FC = () => <Skeleton />;

export default App;
```

### 复杂的组合

更复杂的组合。

```tsx
import React from 'react';
import { Skeleton } from 'antd';

const App: React.FC = () => <Skeleton avatar paragraph={{ rows: 4 }} />;

export default App;
```

### 动画效果

显示动画效果。

```tsx
import React from 'react';
import { Skeleton } from 'antd';

const App: React.FC = () => <Skeleton active />;

export default App;
```

### 按钮/头像/输入框/图像/自定义节点

骨架按钮、头像、输入框、图像和自定义节点。

```tsx
import React, { useState } from 'react';
import { DotChartOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { Divider, Flex, Form, Radio, Skeleton, Space, Switch } from 'antd';

type SizeType = 'default' | 'small' | 'large';
type ButtonShapeType = 'circle' | 'square' | 'round' | 'default';
type AvatarShapeType = 'circle' | 'square';

const App: React.FC = () => {
  const [active, setActive] = useState(false);
  const [block, setBlock] = useState(false);
  const [size, setSize] = useState<SizeType>('default');
  const [buttonShape, setButtonShape] = useState<ButtonShapeType>('default');
  const [avatarShape, setAvatarShape] = useState<AvatarShapeType>('circle');

  const handleActiveChange = (checked: boolean) => {
    setActive(checked);
  };

  const handleBlockChange = (checked: boolean) => {
    setBlock(checked);
  };

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  const handleShapeButton = (e: RadioChangeEvent) => {
    setButtonShape(e.target.value);
  };

  const handleAvatarShape = (e: RadioChangeEvent) => {
    setAvatarShape(e.target.value);
  };

  return (
    <Flex gap="middle" vertical>
      <Space>
        <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
        <Skeleton.Avatar active={active} size={size} shape={avatarShape} />
        <Skeleton.Input active={active} size={size} />
      </Space>
      <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
      <Skeleton.Input active={active} size={size} block={block} />
      <Space>
        <Skeleton.Image active={active} />
        <Skeleton.Node active={active} style={{ width: 160 }} />
        <Skeleton.Node active={active}>
          <DotChartOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
        </Skeleton.Node>
      </Space>
      <Divider />
      <Form layout="inline" style={{ margin: '16px 0' }}>
        <Space size={16} wrap>
          <Form.Item label="Active">
            <Switch checked={active} onChange={handleActiveChange} />
          </Form.Item>
          <Form.Item label="Button and Input Block">
            <Switch checked={block} onChange={handleBlockChange} />
          </Form.Item>
          <Form.Item label="Size">
            <Radio.Group value={size} onChange={handleSizeChange}>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
              <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Button Shape">
            <Radio.Group value={buttonShape} onChange={handleShapeButton}>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="square">Square</Radio.Button>
              <Radio.Button value="round">Round</Radio.Button>
              <Radio.Button value="circle">Circle</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Avatar Shape">
            <Radio.Group value={avatarShape} onChange={handleAvatarShape}>
              <Radio.Button value="square">Square</Radio.Button>
              <Radio.Button value="circle">Circle</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Space>
      </Form>
    </Flex>
  );
};

export default App;
```

### 包含子组件

加载占位图包含子组件。

```tsx
import React, { useState } from 'react';
import { Button, Skeleton, Space } from 'antd';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const showSkeleton = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <Space vertical style={{ width: '100%' }} size={16}>
      <Skeleton loading={loading}>
        <h4 style={{ marginBottom: 16 }}>Ant Design, a design language</h4>
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully
          and efficiently.
        </p>
      </Skeleton>
      <Button onClick={showSkeleton} disabled={loading}>
        Show Skeleton
      </Button>
    </Space>
  );
};

export default App;
```

### 列表

在列表组件中使用加载占位符。

```tsx
import React, { useState } from 'react';
import type Icon from '@ant-design/icons';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Skeleton, Switch } from 'antd';

interface IconTextProps {
  icon: typeof Icon;
  text: React.ReactNode;
}

const listData = Array.from({ length: 3 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i + 1}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText: React.FC<IconTextProps> = ({ icon, text }) => (
  <>
    {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
    {text}
  </>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const onChange = (checked: boolean) => {
    setLoading(!checked);
  };

  return (
    <>
      <Switch checked={!loading} onChange={onChange} style={{ marginBottom: 16 }} />
      <List
        itemLayout="vertical"
        size="large"
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={
              !loading
                ? [
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                  ]
                : undefined
            }
            extra={
              !loading && (
                <img
                  draggable={false}
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              )
            }
          >
            <Skeleton loading={loading} active avatar>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象或者函数可以自定义 Skeleton 组件的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Flex, Skeleton } from 'antd';
import type { SkeletonProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classnames = createStaticStyles(({ css }) => ({
  root: css`
    border-radius: 10px;
    padding: 12px;
  `,
  header: css`
    margin-bottom: 12px;
  `,
}));

const paragraphStyles = createStaticStyles(({ css }) => ({
  paragraph: css`
    & > li {
      background-color: rgba(229, 243, 254, 0.5);
    }
  `,
}));

const styles: SkeletonProps['styles'] = {
  avatar: {
    border: '1px solid #aaa',
  },
  title: {
    border: '1px solid #aaa',
  },
};

const stylesFn: SkeletonProps['styles'] = (info) => {
  if (info.props.active) {
    return {
      root: {
        border: '1px solid rgba(229, 243, 254, 0.3)',
      },
      title: {
        backgroundColor: 'rgba(229, 243, 254, 0.5)',
        height: 20,
        borderRadius: 20,
      },
    } satisfies SkeletonProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  return (
    <Flex gap="middle">
      <Skeleton classNames={classnames} styles={styles} avatar paragraph={false} />
      <Skeleton
        classNames={{ ...classnames, paragraph: paragraphStyles.paragraph }}
        styles={stylesFn}
        active
      />
    </Flex>
  );
};

export default App;
```



## API

通用属性参考：[通用属性](/docs/react/common-props)

### 共同的 API

<embed src="./shared/sharedProps.zh-CN.md"></embed>

### Skeleton

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| avatar | 是否显示头像占位图 | boolean \| [SkeletonAvatar](#skeletonavatar) | false |  |
| loading | 为 true 时，显示占位图。反之则直接展示子组件 | boolean | - |  |
| paragraph | 是否显示段落占位图 | boolean \| [SkeletonParagraphProps](#skeletonparagraphprops) | true |  |
| round | 为 true 时，段落和标题显示圆角 | boolean | false |  |
| title | 是否显示标题占位图 | boolean \| [SkeletonTitleProps](#skeletontitleprops) | true |  |

#### SkeletonTitleProps

| 属性  | 说明                 | 类型             | 默认值 |
| ----- | -------------------- | ---------------- | ------ |
| width | 设置标题占位图的宽度 | number \| string | -      |

#### SkeletonParagraphProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 设置段落占位图的行数 | number | - |
| width | 设置段落占位图的宽度，若为数组时则为对应的每行宽度，反之则是最后一行的宽度 | number \| string \| Array&lt;number \| string> | - |

### Skeleton.Avatar

| 属性  | 说明                 | 类型                                      | 默认值    |
| ----- | -------------------- | ----------------------------------------- | --------- |
| shape | 指定头像的形状       | `circle` \| `square`                      | `circle`  |
| size  | 设置头像占位图的大小 | number \| `large` \| `small` \| `default` | `default` |

### Skeleton.Button

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| block | 将按钮宽度调整为其父宽度的选项 | boolean | false | 4.17.0 |
| shape | 指定按钮的形状 | `circle` \| `round` \| `square` \| `default` | - |  |
| size | 设置按钮的大小 | `large` \| `small` \| `default` | - |  |

### Skeleton.Input

| 属性 | 说明             | 类型                            | 默认值 |
| ---- | ---------------- | ------------------------------- | ------ |
| size | 设置输入框的大小 | `large` \| `small` \| `default` | -      |

## Semantic DOM

### Skeleton

https://ant.design/components/skeleton-cn/semantic.md

### Skeleton.Element

https://ant.design/components/skeleton-cn/semantic_element.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Skeleton)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| blockRadius | 骨架屏圆角 | number | 4 |
| gradientFromColor | 渐变色起点颜色 | string | rgba(0,0,0,0.06) |
| gradientToColor | 渐变色终点颜色 | string | rgba(0,0,0,0.15) |
| paragraphLiHeight | 段落骨架屏单行高度 | number | 16 |
| paragraphMarginTop | 段落骨架屏上间距 | number | 28 |
| titleHeight | 标题骨架屏高度 | string \| number | 16 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadiusSM | SM号圆角，用于组件小尺寸下的圆角，如 Button、Input、Select 等输入类控件在 small size 下的圆角 | number |  |
| controlHeight | Ant Design 中按钮和输入框等基础控件的高度 | number |  |
| controlHeightLG | 较高的组件高度 | number |  |
| controlHeightSM | 较小的组件高度 | number |  |
| controlHeightXS | 更小的组件高度 | number |  |
| marginSM | 控制元素外边距，中小尺寸。 | number |  |
| padding | 控制元素的内间距。 | number |  |


