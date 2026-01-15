# Card — 卡片

## 功能概述

通用卡片容器，可承载文字、列表、图片等内容。用于信息聚合展示。

## 输入字段

### 必填

无必填属性。

### 可选

- `title`: ReactNode，卡片标题。
- `children`: ReactNode，卡片内容。
- `extra`: ReactNode，卡片右上角操作区域。
- `bordered`: boolean，显示边框，默认 `true`。
- `size`: string，卡片尺寸，可选 `default` | `small`，默认 `default`。
- `type`: string，卡片类型，设置 `inner` 嵌套卡片。
- `loading`: boolean，加载状态，显示骨架屏。
- `hoverable`: boolean，鼠标悬停时浮起。
- `cover`: ReactNode，卡片封面图。
- `actions`: ReactNode[]，卡片底部操作按钮组。
- `tabList`: { key, tab, disabled }[]，页签标题列表。
- `activeTabKey`: string，当前激活页签（受控）。
- `defaultActiveTabKey`: string，默认激活页签。
- `tabProps`: TabsProps，页签属性。
- `tabBarExtraContent`: ReactNode，页签栏额外内容。
- `onTabChange`: (key) => void，页签切换回调。
- `headStyle`: CSSProperties，标题区域样式（已废弃，使用 styles.header）。
- `bodyStyle`: CSSProperties，内容区域样式（已废弃，使用 styles.body）。
- `styles`: { header, body, extra, title, actions, cover }，各部分样式。
- `classNames`: object，各部分类名。

### Card.Grid 属性

- `hoverable`: boolean，悬停浮起，默认 `true`。
- `style`: CSSProperties，样式。
- `className`: string，类名。

### Card.Meta 属性

- `avatar`: ReactNode，头像。
- `title`: ReactNode，标题。
- `description`: ReactNode，描述。
- `style`: CSSProperties，样式。
- `className`: string，类名。

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
