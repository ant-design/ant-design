---
category: Components
group: Feedback
title: Skeleton
description: Provide a placeholder while you wait for content to load, or to visualize content that doesn't exist yet.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

- When a resource needs long time to load.
- When the component contains lots of information, such as List or Card.
- Only works when loading data for the first time.
- Could be replaced by Spin in any situation, but can provide a better user experience.

## Examples

### Basic

Simplest Skeleton usage.

```tsx
import React from 'react';
import { Skeleton } from 'antd';

const App: React.FC = () => <Skeleton />;

export default App;
```

### Complex combination

Complex combination with avatar and multiple paragraphs.

```tsx
import React from 'react';
import { Skeleton } from 'antd';

const App: React.FC = () => <Skeleton avatar paragraph={{ rows: 4 }} />;

export default App;
```

### Active Animation

Display active animation.

```tsx
import React from 'react';
import { Skeleton } from 'antd';

const App: React.FC = () => <Skeleton active />;

export default App;
```

### Button/Avatar/Input/Image/Node

Skeleton Button, Avatar, Input, Image and Node.

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

### Contains sub component

Skeleton contains sub component.

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

### List

Use skeleton in list component.

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

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Skeleton by passing objects or functions through `classNames` and `styles`.

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

Common props ref：[Common props](/docs/react/common-props)

### Common API

<embed src="./shared/sharedProps.en-US.md"></embed>

### Skeleton

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| active | Show animation effect | boolean | false |  |
| avatar | Show avatar placeholder | boolean \| [SkeletonAvatarProps](#skeletonavatarprops) | false |  |
| loading | Display the skeleton when true | boolean | - |  |
| paragraph | Show paragraph placeholder | boolean \| [SkeletonParagraphProps](#skeletonparagraphprops) | true |  |
| round | Show paragraph and title radius when true | boolean | false |  |
| title | Show title placeholder | boolean \| [SkeletonTitleProps](#skeletontitleprops) | true |  |

#### SkeletonTitleProps

| Property | Description            | Type             | Default |
| -------- | ---------------------- | ---------------- | ------- |
| width    | Set the width of title | number \| string | -       |

#### SkeletonParagraphProps

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| rows | Set the row count of paragraph | number | - |
| width | Set the width of paragraph. When width is an Array, it can set the width of each row. Otherwise only set the last row width | number \| string \| Array&lt;number \| string> | - |

### Skeleton.Avatar

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| active | Show animation effect, only valid when used avatar independently | boolean | false |
| shape | Set the shape of avatar | `circle` \| `square` | `circle` |
| size | Set the size of avatar | number \| `large` \| `small` \| `default` | `default` |

### Skeleton.Button

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| active | Show animation effect | boolean | false |  |
| block | Option to fit button width to its parent width | boolean | false | 4.17.0 |
| shape | Set the shape of button | `circle` \| `round` \| `square` \| `default` | - |  |
| size | Set the size of button | `large` \| `small` \| `default` | - |  |

### Skeleton.Input

| Property | Description           | Type                            | Default |
| -------- | --------------------- | ------------------------------- | ------- |
| active   | Show animation effect | boolean                         | false   |
| size     | Set the size of input | `large` \| `small` \| `default` | -       |

## Semantic DOM

### Skeleton

https://ant.design/components/skeleton/semantic.md

### Skeleton.Element

https://ant.design/components/skeleton/semantic_element.md

## Design Token



## Component Token (Skeleton)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| blockRadius | Border radius of skeleton | number | 4 |
| gradientFromColor | Start color of gradient | string | rgba(0,0,0,0.06) |
| gradientToColor | End color of gradient | string | rgba(0,0,0,0.15) |
| paragraphLiHeight | Line height of paragraph skeleton | number | 16 |
| paragraphMarginTop | Margin top of paragraph skeleton | number | 28 |
| titleHeight | Height of title skeleton | string \| number | 16 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| controlHeight | The height of the basic controls such as buttons and input boxes in Ant Design | number |  |
| controlHeightLG | LG component height | number |  |
| controlHeightSM | SM component height | number |  |
| controlHeightXS | XS component height | number |  |
| marginSM | Control the margin of an element, with a medium-small size. | number |  |
| padding | Control the padding of the element. | number |  |


