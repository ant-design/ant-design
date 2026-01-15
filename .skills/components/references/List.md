# List — 列表

## 功能概述

通用列表。最基础的列表展示，可承载文字、列表、图片、段落。

## 输入字段

### 必填

- `dataSource`: any[]，列表数据源。
- `renderItem`: (item, index) => ReactNode，渲染列表项。

### 可选

- `header`: ReactNode，列表头部。
- `footer`: ReactNode，列表底部。
- `bordered`: boolean，是否有边框。
- `size`: string，列表尺寸，可选 `default` | `large` | `small`。
- `split`: boolean，是否有分割线，默认 `true`。
- `loading`: boolean | SpinProps，加载状态。
- `pagination`: boolean | PaginationProps，分页配置。
- `grid`: object，栅格配置。
  - `gutter`: number，栅格间隔。
  - `column`: number，列数。
  - `xs` / `sm` / `md` / `lg` / `xl` / `xxl`: number，响应式列数。
- `itemLayout`: string，布局方式，可选 `horizontal` | `vertical`，默认 `horizontal`。
- `rowKey`: string | (item) => string，行 key。
- `locale`: { emptyText }，本地化。

### List.Item 属性

- `children`: ReactNode，内容。
- `actions`: ReactNode[]，操作按钮组。
- `extra`: ReactNode，额外内容（通常是图片）。

### List.Item.Meta 属性

- `avatar`: ReactNode，头像。
- `title`: ReactNode，标题。
- `description`: ReactNode，描述。

## 使用建议

简单列表使用 List；需要复杂操作使用 Table；卡片列表使用 grid 配置；加载更多使用分页或无限滚动。

## 示例代码

```tsx
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Space } from 'antd';

interface DataType {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}

const data: DataType[] = [
  {
    href: 'https://ant.design',
    title: 'ant design part 1',
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'Ant Design, a design language for background applications.',
    content: 'We supply a series of design principles...',
  },
  // ...more items
];

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
    pagination={{ pageSize: 3 }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="star" />,
          <IconText icon={LikeOutlined} text="156" key="like" />,
          <IconText icon={MessageOutlined} text="2" key="message" />,
        ]}
        extra={<img width={272} alt="logo" src="https://example.com/image.png" />}
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
```

## 返回结果

渲染一个列表，用于展示同类数据集合。
