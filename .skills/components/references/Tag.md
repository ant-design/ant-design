# Tag — 标签

## 功能概述

进行标记和分类的小标签。

## 应用场景

- 用于标记事物的属性和维度。
- 进行分类。

## 输入字段

### Tag 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `closeIcon`: ReactNode，自定义关闭按钮。5.7.0：设置为 `null` 或 `false` 时隐藏关闭按钮，默认 false，版本 4.4.0。
- `color`: string，标签色。
- `disabled`: boolean，是否禁用标签，默认 false，版本 6.0.0。
- `href`: string，点击跳转的地址，指定此属性`tag`组件会渲染成 `<a>` 标签，版本 6.0.0。
- `icon`: ReactNode，设置图标。
- `onClose`: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void，关闭时的回调（可通过 `e.preventDefault()` 来阻止默认行为）。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `target`: string，相当于 a 标签的 target 属性，href 存在时生效，版本 6.0.0。
- `variant`: `'filled' | 'solid' | 'outlined'`，标签变体，默认 `'filled'`，版本 6.0.0。

### Tag.CheckableTag 属性

#### 必填

- 无必填属性。

#### 可选

- `checked`: boolean，设置标签的选中状态，默认 false。
- `icon`: ReactNode，设置图标，版本 5.27.0。
- `onChange`: (checked) => void，点击标签时触发的回调。

### Tag.CheckableTagGroup 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-group), string> | (info: { props }) => Record<[SemanticDOM](#semantic-group), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `defaultValue`: `string | number | Array<string | number> | null`，初始选中值。
- `disabled`: `boolean`，禁用选中。
- `multiple`: `boolean`，多选模式。
- `options`: `Array<{ label: ReactNode; value: string | number } | string | number>`，选项列表。
- `styles`: Record<[SemanticDOM](#semantic-group), CSSProperties> | (info: { props }) => Record<[SemanticDOM](#semantic-group), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `value`: `string | number | Array<string | number> | null`，选中值。
- `onChange`: `(value: string | number | Array<string | number> | null) => void`，点击标签时触发的回调。

## 方法

无公开方法。

## 使用建议

分类标签使用不同颜色；可删除标签使用 closable；可选择标签使用 CheckableTag。

## 示例代码

```tsx
import { useState } from 'react';
import { TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Divider, Space, Tag } from 'antd';

const App: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['Books']);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <Space direction="vertical">
      <Space>
        <Tag>Tag 1</Tag>
        <Tag>
          <a href="#">Link</a>
        </Tag>
        <Tag closable onClose={() => console.log('close')}>
          Tag 2
        </Tag>
      </Space>

      <Space wrap>
        <Tag color="magenta">magenta</Tag>
        <Tag color="red">red</Tag>
        <Tag color="volcano">volcano</Tag>
        <Tag color="orange">orange</Tag>
        <Tag color="gold">gold</Tag>
        <Tag color="lime">lime</Tag>
        <Tag color="green">green</Tag>
        <Tag color="cyan">cyan</Tag>
        <Tag color="blue">blue</Tag>
        <Tag color="geekblue">geekblue</Tag>
        <Tag color="purple">purple</Tag>
      </Space>

      <Space wrap>
        <Tag color="success">success</Tag>
        <Tag color="processing">processing</Tag>
        <Tag color="error">error</Tag>
        <Tag color="warning">warning</Tag>
        <Tag color="default">default</Tag>
      </Space>

      <Space>
        <Tag icon={<TwitterOutlined />} color="#55acee">
          Twitter
        </Tag>
        <Tag icon={<YoutubeOutlined />} color="#cd201f">
          Youtube
        </Tag>
      </Space>

      <Divider orientation="left">CheckableTag</Divider>
      <Space>
        {['Movies', 'Books', 'Music', 'Sports'].map((tag) => (
          <Tag.CheckableTag
            key={tag}
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </Tag.CheckableTag>
        ))}
      </Space>
    </Space>
  );
};
```

## 返回结果

渲染标签，用于标记和分类。
