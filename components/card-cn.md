---
category: Components
group: 数据展示
title: Card
subtitle: 卡片
description: 通用卡片容器。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*QXO1SKEdIzYAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*5WDvQp_H7LUAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用 {#when-to-use}

最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。

## 代码演示 {#examples}

### 典型卡片

包含标题、内容、操作区域。

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

### 无边框

在灰色背景上使用无边框的卡片。

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

### 简洁卡片

只包含内容区域。

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

### 更灵活的内容展示

可以利用 `Card.Meta` 支持更灵活的内容。

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

### 栅格卡片

在系统概览页面常常和栅格进行配合。

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

### 预加载的卡片

数据读入前会有文本块样式。

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

### 网格型内嵌卡片

一种常见的卡片内容区隔模式。

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

### 内部卡片

可以放在普通卡片内部，展示多层级结构的信息。

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

### 带页签的卡片

可承载更多内容。

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

### 支持更多内容配置

一种支持封面、头像、标题和描述信息的卡片。

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

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Card 的[语义化结构](#semantic-dom)样式。

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

通用属性参考：[通用属性](/docs/react/common-props)

```jsx
<Card title="卡片标题">卡片内容</Card>
```

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| actions | 卡片操作组，位置在卡片底部 | Array&lt;ReactNode> | - |  |
| activeTabKey | 当前激活页签的 key | string | - |  |
| ~~bordered~~ | 是否有边框, 请使用 `variant` 替换 | boolean | true |  |
| variant | 形态变体 | `outlined` \| `borderless` \| | `outlined` | 5.24.0 |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| cover | 卡片封面 | ReactNode | - |  |
| defaultActiveTabKey | 初始化选中页签的 key，如果没有设置 activeTabKey | string | `第一个页签的 key` |  |
| extra | 卡片右上角的操作区域 | ReactNode | - |  |
| hoverable | 鼠标移过时可浮起 | boolean | false |  |
| loading | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | boolean | false |  |
| size | card 的尺寸 | `default` \| `small` | `default` |  |
| tabBarExtraContent | tab bar 上额外的元素 | ReactNode | - |  |
| tabList | 页签标题列表 | [TabItemType](/components/tabs-cn#tabitemtype)[] | - |  |
| tabProps | [Tabs](/components/tabs-cn#tabs) | - | - |  |
| title | 卡片标题 | ReactNode | - |  |
| type | 卡片类型，可设置为 `inner` 或 不设置 | string | - |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| onTabChange | 页签切换的回调 | (key) => void | - |  |

### Card.Grid

| 参数      | 说明                   | 类型          | 默认值 | 版本 |
| --------- | ---------------------- | ------------- | ------ | ---- |
| className | 网格容器类名           | string        | -      |      |
| hoverable | 鼠标移过时可浮起       | boolean       | true   |      |
| style     | 定义网格容器类名的样式 | CSSProperties | -      |      |

### Card.Meta

| 参数        | 说明               | 类型          | 默认值 | 版本 |
| ----------- | ------------------ | ------------- | ------ | ---- |
| avatar      | 头像/图标          | ReactNode     | -      |      |
| className   | 容器类名           | string        | -      |      |
| description | 描述内容           | ReactNode     | -      |      |
| style       | 定义容器类名的样式 | CSSProperties | -      |      |
| title       | 标题内容           | ReactNode     | -      |      |

## Semantic DOM

### Card

https://ant.design/components/card-cn/semantic.md

### Card.Meta

https://ant.design/components/card-cn/semantic_meta.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Card)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| actionsBg | 操作区背景色 | string | #ffffff |
| actionsLiMargin | 操作区每一项的外间距 | string | 12px 0 |
| bodyPadding | 卡片内边距 | number | 24 |
| bodyPaddingSM | 小号卡片内边距 | number | 12 |
| extraColor | 额外区文字颜色 | string | rgba(0,0,0,0.88) |
| headerBg | 卡片头部背景色 | string | transparent |
| headerFontSize | 卡片头部文字大小 | string \| number | 16 |
| headerFontSizeSM | 小号卡片头部文字大小 | string \| number | 14 |
| headerHeight | 卡片头部高度 | string \| number | 56 |
| headerHeightSM | 小号卡片头部高度 | string \| number | 38 |
| headerPadding | 卡片头部内边距 | number | 24 |
| headerPaddingSM | 小号卡片头部内边距 | number | 12 |
| tabsMarginBottom | 内置标签页组件下间距 | number | -17 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| boxShadowTertiary | 控制元素三级盒子阴影样式。 | string |  |
| colorBgContainer | 组件的容器背景色，例如：默认按钮、输入框等。务必不要将其与 `colorBgElevated` 混淆。 | string |  |
| colorBorderSecondary | 比默认使用的边框色要浅一级，此颜色和 colorSplit 的颜色一致。使用的是实色。 | string |  |
| colorFillAlter | 控制元素替代背景色。 | string |  |
| colorIcon | 控制弱操作图标的颜色，例如 allowClear 或 Alert 关闭按钮。  * | string |  |
| colorPrimary | 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextDescription | 控制文本描述字体颜色。 | string |  |
| colorTextHeading | 控制标题字体颜色。 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeLG | 大号字体大小 | number |  |
| fontWeightStrong | 控制标题类组件（如 h1、h2、h3）或选中项的字体粗细。 | number |  |
| lineHeight | 文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| marginXXS | 控制元素外边距，最小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| padding | 控制元素的内间距。 | number |  |
| paddingLG | 控制元素的大内间距。 | number |  |


