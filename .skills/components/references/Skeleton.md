# Skeleton — 骨架屏

## 功能概述

在需要等待加载内容的位置提供一个占位图形组合。

## 应用场景

- 网络较慢，需要长时间等待加载处理的情况下。
- 图文信息内容较多的列表/卡片中。
- 只在第一次加载数据的时候使用。
- 可以被 Spin 完全代替，但是在可用的场景下可以比 Spin 提供更好的视觉效果和用户体验。

## 输入字段

### Skeleton 属性

#### 必填

- 无必填属性。

#### 可选

- `avatar`: boolean | [SkeletonAvatar](#skeletonavatar)，是否显示头像占位图，默认 false。
- `loading`: boolean，为 true 时，显示占位图。反之则直接展示子组件。
- `paragraph`: boolean | [SkeletonParagraphProps](#skeletonparagraphprops)，是否显示段落占位图，默认 true。
- `round`: boolean，为 true 时，段落和标题显示圆角，默认 false。
- `title`: boolean | [SkeletonTitleProps](#skeletontitleprops)，是否显示标题占位图，默认 true。

### SkeletonTitleProps 属性

#### 必填

- 无必填属性。

#### 可选

- `width`: number | string，设置标题占位图的宽度。

### SkeletonParagraphProps 属性

#### 必填

- 无必填属性。

#### 可选

- `rows`: number，设置段落占位图的行数。
- `width`: number | string | Array<number | string>，设置段落占位图的宽度，若为数组时则为对应的每行宽度，反之则是最后一行的宽度。

### Skeleton.Avatar 属性

#### 必填

- 无必填属性。

#### 可选

- `shape`: `circle` | `square`，指定头像的形状，默认 `circle`。
- `size`: number | `large` | `small` | `default`，设置头像占位图的大小，默认 `default`。

### Skeleton.Button 属性

#### 必填

- 无必填属性。

#### 可选

- `block`: boolean，将按钮宽度调整为其父宽度的选项，默认 false，版本 4.17.0。
- `shape`: `circle` | `round` | `square` | `default`，指定按钮的形状。
- `size`: `large` | `small` | `default`，设置按钮的大小。

### Skeleton.Input 属性

#### 必填

- 无必填属性。

#### 可选

- `size`: `large` | `small` | `default`，设置输入框的大小。

## 方法

无公开方法。

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
