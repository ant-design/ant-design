# Card — 卡片

## 功能概述

通用卡片容器。

## 应用场景

- 最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。

## 输入字段

### Card 属性

#### 必填

- 无必填属性。

#### 可选

- `actions`: Array<ReactNode>，卡片操作组，位置在卡片底部。
- `activeTabKey`: string，当前激活页签的 key。
- `~~bordered~~`: boolean，是否有边框, 请使用 `variant` 替换，默认 true。
- `variant`: `outlined` | `borderless`，形态变体，默认 `outlined`，版本 5.24.0。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `cover`: ReactNode，卡片封面。
- `defaultActiveTabKey`: string，初始化选中页签的 key，如果没有设置 activeTabKey，默认 `第一个页签的 key`。
- `extra`: ReactNode，卡片右上角的操作区域。
- `hoverable`: boolean，鼠标移过时可浮起，默认 false。
- `loading`: boolean，当卡片内容还在加载中时，可以用 loading 展示一个占位，默认 false。
- `size`: `default` | `small`，card 的尺寸，默认 `default`。
- `tabBarExtraContent`: ReactNode，tab bar 上额外的元素。
- `tabList`: [TabItemType](/components/tabs-cn#tabitemtype)[]，页签标题列表。
- `tabProps`: [Tabs](/components/tabs-cn#tabs)。
- `title`: ReactNode，卡片标题。
- `type`: string，卡片类型，可设置为 `inner` 或 不设置。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `onTabChange`: (key) => void，页签切换的回调。

### Card.Grid 属性

#### 必填

- 无必填属性。

#### 可选

- `className`: string，网格容器类名。
- `hoverable`: boolean，鼠标移过时可浮起，默认 true。
- `style`: CSSProperties，定义网格容器类名的样式。

### Card.Meta 属性

#### 必填

- 无必填属性。

#### 可选

- `avatar`: ReactNode，头像/图标。
- `className`: string，容器类名。
- `description`: ReactNode，描述内容。
- `style`: CSSProperties，定义容器类名的样式。
- `title`: ReactNode，标题内容。

## 方法

无公开方法。

## 使用建议

信息展示优先使用卡片容器；配合 `Card.Meta` 展示标准化内容；栅格卡片使用 `Card.Grid`；加载时使用 `loading` 显示骨架。

## 示例代码

```tsx
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

const App: React.FC = () => (
  <Card
    style={{ width: 300 }}
    cover={<img alt="example" src="https://example.com/image.jpg" />}
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://example.com/avatar.jpg" />}
      title="Card title"
      description="This is the description"
    />
  </Card>
);
```

## 返回结果

渲染一个卡片容器，用于展示结构化内容。
