---
category: Components
group: Data Display
title: Card
description: A container for displaying information.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*QXO1SKEdIzYAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*5WDvQp_H7LUAAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.

## Examples

### Basic card

A basic card containing a title, content and an extra corner content. Supports two sizes: `default` and `small`.

```tsx
import React from 'react';
import { Card, Space } from 'antd';

const App: React.FC = () => (
  <Space vertical size={16}>
    <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Space>
);

export default App;
```

### No border

A borderless card on a gray background.

```tsx
import React from 'react';
import { Card } from 'antd';

const App: React.FC = () => (
  <Card title="Card title" variant="borderless" style={{ width: 300 }}>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
);

export default App;
```

### Simple card

A simple card only containing a content area.

```tsx
import React from 'react';
import { Card } from 'antd';

const App: React.FC = () => (
  <Card style={{ width: 300 }}>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
);

export default App;
```

### Customized content

You can use `Card.Meta` to support more flexible content.

```tsx
import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const App: React.FC = () => (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={
      <img
        draggable={false}
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
);

export default App;
```

### Card in column

Cards usually cooperate with grid column layout in overview page.

```tsx
import React from 'react';
import { Card, Col, Row } from 'antd';

const App: React.FC = () => (
  <Row gutter={16}>
    <Col span={8}>
      <Card title="Card title" variant="borderless">
        Card content
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Card title" variant="borderless">
        Card content
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Card title" variant="borderless">
        Card content
      </Card>
    </Col>
  </Row>
);

export default App;
```

### Loading card

Shows a loading indicator while the contents of the card is being fetched.

```tsx
import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Switch } from 'antd';

const actions: React.ReactNode[] = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <Flex gap="middle" align="start" vertical>
      <Switch checked={!loading} onChange={(checked) => setLoading(!checked)} />
      <Card loading={loading} actions={actions} style={{ minWidth: 300 }}>
        <Card.Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
          title="Card title"
          description={
            <>
              <p>This is the description</p>
              <p>This is the description</p>
            </>
          }
        />
      </Card>
      <Card loading={loading} actions={actions} style={{ minWidth: 300 }}>
        <Card.Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
          title="Card title"
          description={
            <>
              <p>This is the description</p>
              <p>This is the description</p>
            </>
          }
        />
      </Card>
    </Flex>
  );
};

export default App;
```

### Grid card

Grid style card content.

```tsx
import React from 'react';
import { Card } from 'antd';

const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
};

const App: React.FC = () => (
  <Card title="Card Title">
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid hoverable={false} style={gridStyle}>
      Content
    </Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
  </Card>
);

export default App;
```

### Inner card

It can be placed inside the ordinary card to display the information of the multilevel structure.

```tsx
import React from 'react';
import { Card } from 'antd';

const App: React.FC = () => (
  <Card title="Card title">
    <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
      Inner Card content
    </Card>
    <Card
      style={{ marginTop: 16 }}
      type="inner"
      title="Inner Card title"
      extra={<a href="#">More</a>}
    >
      Inner Card content
    </Card>
  </Card>
);

export default App;
```

### With tabs

More content can be hosted.

```tsx
import React, { useState } from 'react';
import { Card } from 'antd';

const tabList = [
  {
    key: 'tab1',
    tab: 'tab1',
  },
  {
    key: 'tab2',
    tab: 'tab2',
  },
];

const contentList: Record<string, React.ReactNode> = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

const tabListNoTitle = [
  {
    key: 'article',
    label: 'article',
  },
  {
    key: 'app',
    label: 'app',
  },
  {
    key: 'project',
    label: 'project',
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  article: <p>article content</p>,
  app: <p>app content</p>,
  project: <p>project content</p>,
};

const App: React.FC = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
  const [activeTabKey2, setActiveTabKey2] = useState<string>('app');

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };
  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
  };

  return (
    <>
      <Card
        style={{ width: '100%' }}
        title="Card title"
        extra={<a href="#">More</a>}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
      <br />
      <br />
      <Card
        style={{ width: '100%' }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        tabBarExtraContent={<a href="#">More</a>}
        onTabChange={onTab2Change}
        tabProps={{
          size: 'middle',
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </>
  );
};

export default App;
```

### Support more content configuration

A Card that supports `cover`, `avatar`, `title` and `description`.

```tsx
import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

const App: React.FC = () => (
  <Card
    style={{ width: 300 }}
    cover={
      <img
        draggable={false}
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title="Card title"
      description="This is the description"
    />
  </Card>
);

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Card by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { EditOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex } from 'antd';
import type { CardMetaProps, CardProps } from 'antd';
import { createStyles } from 'antd-style';

const { Meta } = Card;

const useStyles = createStyles(({ token }) => ({
  root: {
    width: 300,
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadius,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: `1px solid ${token.colorBorderSecondary}`,
  },
  header: {
    borderBottom: 'none',
    paddingBottom: 8,
  },
  body: {
    paddingTop: 0,
  },
}));

const stylesCard: CardProps['styles'] = {
  root: {
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
  },
};

const stylesCardFn: CardProps['styles'] = (info) => {
  if (info.props.variant === 'outlined') {
    return {
      root: {
        borderColor: '#696FC7',
        boxShadow: '0 2px 8px #A7AAE1',
        borderRadius: 8,
      },
      extra: {
        color: '#696FC7',
      },
      title: {
        fontSize: 16,
        fontWeight: 500,
        color: '#A7AAE1',
      },
    } satisfies CardProps['styles'];
  }
};

const stylesCardMeta: CardMetaProps['styles'] = {
  title: {
    color: '#A7AAE1',
  },
  description: {
    color: '#A7AAE1',
  },
};

const actions = [
  <HeartOutlined key="heart" style={{ color: '#ff6b6b' }} />,
  <ShareAltOutlined key="share" style={{ color: '#4ecdc4' }} />,
  <EditOutlined key="edit" style={{ color: '#45b7d1' }} />,
];

const App: React.FC = () => {
  const { styles: classNames } = useStyles();

  const sharedCardProps: CardProps = {
    classNames,
    actions,
  };

  const sharedCardMetaProps: CardMetaProps = {
    avatar: <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />,
    description: 'This is the description',
  };

  return (
    <Flex gap="middle">
      <Card
        {...sharedCardProps}
        title="Object Card"
        styles={stylesCard}
        extra={<Button type="link">More</Button>}
        variant="borderless"
      >
        <Meta {...sharedCardMetaProps} title="Object Card Meta title" />
      </Card>
      <Card
        {...sharedCardProps}
        title="Function Card"
        styles={stylesCardFn}
        extra={
          <Button type="link" styles={{ root: { color: '#A7AAE1' } }}>
            More
          </Button>
        }
      >
        <Meta {...sharedCardMetaProps} styles={stylesCardMeta} title="Function Card Meta title" />
      </Card>
    </Flex>
  );
};

export default App;
```



## API

Common props ref：[Common props](/docs/react/common-props)

```jsx
<Card title="Card title">Card content</Card>
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| actions | The action list, shows at the bottom of the Card | Array&lt;ReactNode> | - |  |
| activeTabKey | Current TabPane's key | string | - |  |
| ~~bordered~~ | Toggles rendering of the border around the card, please use `variant` instead | boolean | true |  |
| variant | Variants of Card | `outlined` \| `borderless` \| | `outlined` | 5.24.0 |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| cover | Card cover | ReactNode | - |  |
| defaultActiveTabKey | Initial active TabPane's key, if `activeTabKey` is not set | string | `The key of first tab` |  |
| extra | Content to render in the top-right corner of the card | ReactNode | - |  |
| hoverable | Lift up when hovering card | boolean | false |  |
| loading | Shows a loading indicator while the contents of the card are being fetched | boolean | false |  |
| size | Size of card | `default` \| `small` | `default` |  |
| tabBarExtraContent | Extra content in tab bar | ReactNode | - |  |
| tabList | List of TabPane's head | [TabItemType](/components/tabs#tabitemtype)[] | - |  |
| tabProps | [Tabs](/components/tabs/#tabs) | - | - |  |
| title | Card title | ReactNode | - |  |
| type | Card style type, can be set to `inner` or not set | string | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| onTabChange | Callback when tab is switched | (key) => void | - |  |

### Card.Grid

| Property  | Description                     | Type          | Default | Version |
| --------- | ------------------------------- | ------------- | ------- | ------- |
| className | The className of container      | string        | -       |         |
| hoverable | Lift up when hovering card grid | boolean       | true    |         |
| style     | The style object of container   | CSSProperties | -       |         |

### Card.Meta

| Property    | Description                   | Type          | Default | Version |
| ----------- | ----------------------------- | ------------- | ------- | ------- |
| avatar      | Avatar or icon                | ReactNode     | -       |         |
| className   | The className of container    | string        | -       |         |
| description | Description content           | ReactNode     | -       |         |
| style       | The style object of container | CSSProperties | -       |         |
| title       | Title content                 | ReactNode     | -       |         |

## Semantic DOM

### Card

https://ant.design/components/card/semantic.md

### Card.Meta

https://ant.design/components/card/semantic_meta.md

## Design Token



## Component Token (Card)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| actionsBg | Background color of card actions | string | #ffffff |
| actionsLiMargin | Margin of each item in card actions | string | 12px 0 |
| bodyPadding | Padding of card body | number | 24 |
| bodyPaddingSM | Padding of small card body | number | 12 |
| extraColor | Text color of extra area | string | rgba(0,0,0,0.88) |
| headerBg | Background color of card header | string | transparent |
| headerFontSize | Font size of card header | string \| number | 16 |
| headerFontSizeSM | Font size of small card header | string \| number | 14 |
| headerHeight | Height of card header | string \| number | 56 |
| headerHeightSM | Height of small card header | string \| number | 38 |
| headerPadding | Padding of card head | number | 24 |
| headerPaddingSM | Padding of small card head | number | 12 |
| tabsMarginBottom | Margin bottom of tabs component | number | -17 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| boxShadowTertiary | Control the tertiary box shadow style of an element. | string |  |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorBorderSecondary | Slightly lighter than the default border color, this color is the same as `colorSplit`. Solid color is used. | string |  |
| colorFillAlter | Control the alternative background color of element. | string |  |
| colorIcon | Weak action. Such as `allowClear` or Alert close button | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDescription | Control the font color of text description. | string |  |
| colorTextHeading | Control the font color of heading. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeLG | Large font size | number |  |
| fontWeightStrong | Control the font weight of heading components (such as h1, h2, h3) or selected item. | number |  |
| lineHeight | Line height of text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| padding | Control the padding of the element. | number |  |
| paddingLG | Control the large padding of the element. | number |  |


