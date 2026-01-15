# Tag — 标签

## 功能概述

进行标记和分类的小标签。用于标记事物的属性和维度、分类。

## 输入字段

### 必填

无必填属性。

### 可选

- `children`: ReactNode，标签内容。
- `color`: string，标签颜色（预设或十六进制）。
  - 预设颜色：`magenta` | `red` | `volcano` | `orange` | `gold` | `lime` | `green` | `cyan` | `blue` | `geekblue` | `purple`
  - 状态颜色：`success` | `processing` | `error` | `warning` | `default`
- `closable`: boolean | { closeIcon, disabled, 'aria-label' }，是否可关闭。
- `closeIcon`: ReactNode，自定义关闭图标。
- `icon`: ReactNode，标签图标。
- `bordered`: boolean，是否有边框，默认 `true`。
- `onClose`: (e) => void，关闭回调。

### Tag.CheckableTag 属性

可选中标签：

- `checked`: boolean，是否选中。
- `onChange`: (checked) => void，选中变化回调。

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
      {/* 基础用法 */}
      <Space>
        <Tag>Tag 1</Tag>
        <Tag>
          <a href="#">Link</a>
        </Tag>
        <Tag closable onClose={() => console.log('close')}>
          Tag 2
        </Tag>
      </Space>

      {/* 颜色 */}
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

      {/* 状态颜色 */}
      <Space wrap>
        <Tag color="success">success</Tag>
        <Tag color="processing">processing</Tag>
        <Tag color="error">error</Tag>
        <Tag color="warning">warning</Tag>
        <Tag color="default">default</Tag>
      </Space>

      {/* 带图标 */}
      <Space>
        <Tag icon={<TwitterOutlined />} color="#55acee">
          Twitter
        </Tag>
        <Tag icon={<YoutubeOutlined />} color="#cd201f">
          Youtube
        </Tag>
      </Space>

      {/* 可选择标签 */}
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
