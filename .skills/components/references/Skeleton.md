# Skeleton — 骨架屏

## 功能概述

在需要等待加载内容的位置提供一个占位图形组合。用于页面内容加载时的占位展示。

## 输入字段

### 必填

无必填属性。

### 可选

- `active`: boolean，显示动画效果，默认 `false`。
- `loading`: boolean，为 `true` 时显示骨架屏，为 `false` 时显示子组件，默认 `true`。
- `children`: ReactNode，加载完成后显示的内容。
- `avatar`: boolean | AvatarProps，显示头像占位。
  - `active`: boolean，是否显示动画。
  - `size`: number | `large` | `small` | `default`，尺寸。
  - `shape`: `circle` | `square`，形状。
- `title`: boolean | TitleProps，显示标题占位。
  - `width`: string | number，宽度。
- `paragraph`: boolean | ParagraphProps，显示段落占位。
  - `rows`: number，行数。
  - `width`: string | number | (string | number)[]，每行宽度。
- `round`: boolean，段落和标题显示圆角。

### 子组件

- `Skeleton.Avatar`: 头像骨架。
- `Skeleton.Button`: 按钮骨架。
- `Skeleton.Input`: 输入框骨架。
- `Skeleton.Image`: 图片骨架。
- `Skeleton.Node`: 自定义节点骨架。

### 子组件通用属性

- `active`: boolean，是否显示动画。
- `size`: string，尺寸。
- `shape`: string，形状（部分组件）。

## 使用建议

首屏加载使用骨架屏代替空白；配合 `loading` 控制显示切换；复杂布局组合使用多个子组件。

## 示例代码

```tsx
import { useState } from 'react';
import { Skeleton, Space, Switch } from 'antd';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Switch checked={!loading} onChange={(checked) => setLoading(!checked)} />
      <br />
      <br />

      <Skeleton loading={loading} avatar active>
        <div>
          <h4>Ant Design Title</h4>
          <p>Ant Design, a design language for background applications...</p>
        </div>
      </Skeleton>

      <Space>
        <Skeleton.Button active />
        <Skeleton.Avatar active />
        <Skeleton.Input active />
      </Space>

      <Skeleton.Image active />
    </>
  );
};
```

## 返回结果

渲染一个骨架屏占位，用于内容加载时的展示。
