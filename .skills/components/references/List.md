# List — 列表

## 功能概述

最基础的列表展示，可承载文字、列表、图片、段落。

## 应用场景

- 最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。
- :::warning{title=废弃提示}List 组件已经进入废弃阶段，将于下个 major 版本移除。

## 输入字段

### List 属性

#### 必填

- 无必填属性。

#### 可选

- `bordered`: boolean，是否展示边框，默认 false。
- `dataSource`: any\[]，列表数据源。
- `footer`: ReactNode，列表底部。
- `grid`: [object](#list-grid-props)，列表栅格配置。
- `header`: ReactNode，列表头部。
- `itemLayout`: string，设置 `List.Item` 布局，设置成 `vertical` 则竖直样式显示，默认横排。
- `loading`: boolean | [object](/components/spin-cn#api) ([更多](https://github.com/ant-design/ant-design/issues/8659))，当卡片内容还在加载中时，可以用 `loading` 展示一个占位，默认 false。
- `loadMore`: ReactNode，加载更多。
- `locale`: object，默认文案设置，目前包括空数据文案，默认 {emptyText: `暂无数据`}。
- `pagination`: boolean | object，对应的 `pagination` 配置，设置 false 不显示，默认 false。
- `renderItem`: (item: T, index: number) => ReactNode，当使用 dataSource 时，可以用 `renderItem` 自定义渲染列表项。
- `rowKey`: `keyof` T | (item: T) => `React.Key`，当 `renderItem` 自定义渲染列表项有效时，自定义每一行的 `key` 的获取方式，默认 `"key"`。
- `size`: `default` | `large` | `small`，list 的尺寸，默认 `default`。
- `split`: boolean，是否展示分割线，默认 true。

### pagination 属性

#### 必填

- 无必填属性。

#### 可选

- `position`: `top` | `bottom` | `both`，指定分页显示的位置，默认 `bottom`。
- `align`: `start` | `center` | `end`，指定分页对齐的位置，默认 `end`。

### List grid props 属性

#### 必填

- 无必填属性。

#### 可选

- `column`: number，列数。
- `gutter`: number，栅格间隔，默认 0。
- `xs`: number，`<576px` 展示的列数。
- `sm`: number，`≥576px` 展示的列数。
- `md`: number，`≥768px` 展示的列数。
- `lg`: number，`≥992px` 展示的列数。
- `xl`: number，`≥1200px` 展示的列数。
- `xxl`: number，`≥1600px` 展示的列数。

### List.Item 属性

#### 必填

- 无必填属性。

#### 可选

- `actions`: Array<ReactNode>，列表操作组，根据 `itemLayout` 的不同，位置在卡片底部或者最右侧。
- `classNames`: [`Record<actions | extra, string>`](#semantic-dom)，语义化结构 className，版本 5.18.0。
- `extra`: ReactNode，额外内容，通常用在 `itemLayout` 为 `vertical` 的情况下，展示右侧内容; `horizontal` 展示在列表元素最右侧。
- `styles`: [`Record<actions | extra, CSSProperties>`](#semantic-dom)，语义化结构 style，版本 5.18.0。

### List.Item.Meta 属性

#### 必填

- 无必填属性。

#### 可选

- `avatar`: ReactNode，列表元素的图标。
- `description`: ReactNode，列表元素的描述内容。
- `title`: ReactNode，列表元素的标题。

## 方法

无公开方法。

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
