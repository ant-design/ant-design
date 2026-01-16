# Image — 图片

## 功能概述

可预览的图片。

## 应用场景

- 需要展示图片时使用。
- 加载显示大图或加载失败时容错处理。

## 输入字段

### Image 属性

#### 必填

- 无必填属性。

#### 可选

- `alt`: string，图像描述。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `fallback`: string，加载失败容错地址。
- `height`: string | number，图像高度。
- `placeholder`: ReactNode，加载占位，为 `true` 时使用默认占位。
- `preview`: boolean | [PreviewType](#previewtype)，预览参数，为 `false` 时禁用，默认 true。
- `src`: string，图片地址。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `width`: string | number，图像宽度。
- `onError`: (event: Event) => void，加载错误回调。

### PreviewType 属性

#### 必填

- 无必填属性。

#### 可选

- `actionsRender`: (originalNode: React.ReactElement, info: ToolbarRenderInfoType) => React.ReactNode，自定义工具栏渲染。
- `closeIcon`: React.ReactNode，自定义关闭 Icon。
- `cover`: React.ReactNode | [CoverConfig](#coverconfig)，自定义预览遮罩，版本 CoverConfig v6.0 开始支持。
- `~~destroyOnClose~~`: boolean，关闭预览时销毁子元素，已移除，不再支持，默认 false。
- `~~forceRender~~`: boolean，强制渲染预览图，已移除，不再支持。
- `getContainer`: string | HTMLElement | (() => HTMLElement) | false，指定预览挂载的节点，但依旧为全屏展示，false 为挂载在当前位置。
- `imageRender`: (originalNode: React.ReactElement, info: { transform: [TransformType](#transformtype), image: [ImgInfo](#imginfo) }) => React.ReactNode，自定义预览内容。
- `mask`: boolean | { enabled?: boolean, blur?: boolean }，预览遮罩效果，默认 true。
- `~~maskClassName~~`: string，缩略图遮罩类名，请使用 `classNames.cover` 替换。
- `maxScale`: number，最大缩放倍数，默认 50。
- `minScale`: number，最小缩放倍数，默认 1。
- `movable`: boolean，是否可移动，默认 true。
- `open`: boolean，是否显示预览。
- `rootClassName`: string，预览图的根 DOM 类名，会同时作用在图片和预览层最外侧。
- `scaleStep`: number，`1 + scaleStep` 为缩放放大的每步倍数，默认 0.5。
- `src`: string，自定义预览 src。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties>，自定义语义化结构样式。
- `~~toolbarRender~~`: (originalNode: React.ReactElement, info: Omit<ToolbarRenderInfoType, 'current' | 'total'>) => React.ReactNode，自定义工具栏，请使用 `actionsRender` 替换。
- `~~visible~~`: boolean，是否显示，请使用 `open` 替换。
- `onOpenChange`: (visible: boolean) => void，预览打开状态变化的回调。
- `onTransform`: { transform: [TransformType](#transformtype), action: [TransformAction](#transformaction) }，预览图 transform 变化的回调。
- `~~onVisibleChange~~`: (visible: boolean, prevVisible: boolean) => void，当 `visible` 发生改变时的回调，请使用 `onOpenChange` 替换。

### PreviewGroup 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `fallback`: string，加载失败容错地址。
- `items`: string[] | { src: string, crossOrigin: string, ... }[]，预览数组。
- `preview`: boolean | [PreviewGroupType](#previewgrouptype)，预览参数，为 `false` 时禁用，默认 true。

### PreviewGroupType 属性

#### 必填

- 无必填属性。

#### 可选

- `actionsRender`: (originalNode: React.ReactElement, info: ToolbarRenderInfoType) => React.ReactNode，自定义工具栏渲染。
- `closeIcon`: React.ReactNode，自定义关闭 Icon。
- `countRender`: (current: number, total: number) => React.ReactNode，自定义预览计数内容。
- `current`: number，当前预览图的 index。
- `~~forceRender~~`: boolean，强制渲染预览图，已移除，不再支持。
- `getContainer`: string | HTMLElement | (() => HTMLElement) | false，指定预览挂载的节点，但依旧为全屏展示，false 为挂载在当前位置。
- `imageRender`: (originalNode: React.ReactElement, info: { transform: [TransformType](#transformtype), image: [ImgInfo](#imginfo), current: number }) => React.ReactNode，自定义预览内容。
- `mask`: boolean | { enabled?: boolean, blur?: boolean }，预览遮罩效果，默认 true。
- `~~maskClassName~~`: string，缩略图遮罩类名，请使用 `classNames.cover` 替换。
- `minScale`: number，最小缩放倍数，默认 1。
- `maxScale`: number，最大放大倍数，默认 50。
- `movable`: boolean，是否可移动，默认 true。
- `open`: boolean，是否显示预览。
- `~~rootClassName~~`: string，预览图的根 DOM 类名，会同时作用在图片和预览层最外侧，请使用 `classNames.root` 替换。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties>，自定义语义化结构样式。
- `scaleStep`: number，`1 + scaleStep` 为缩放放大的每步倍数，默认 0.5。
- `~~toolbarRender~~`: (originalNode: React.ReactElement, info: ToolbarRenderInfoType) => React.ReactNode，自定义工具栏，请使用 `actionsRender` 替换。
- `~~visible~~`: boolean，是否显示，请使用 `open` 替换。
- `onOpenChange`: (visible: boolean, info: { current: number }) => void，预览打开状态变化回调，额外携带当前预览图索引。
- `onChange`: (current: number, prevCurrent: number) => void，切换预览图的回调。
- `onTransform`: { transform: [TransformType](#transformtype), action: [TransformAction](#transformaction) }，预览图 transform 变化的回调。
- `~~onVisibleChange~~`: (visible: boolean, prevVisible: boolean, current: number) => void，当 `visible` 发生改变时的回调，请使用 `onOpenChange` 替换。

## 方法

无公开方法。

## 使用建议

图片展示使用 Image；多图预览使用 PreviewGroup；配合 fallback 处理加载失败。

## 示例代码

```tsx
import { Image, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical">
    <Image
      width={200}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />

    <Image
      width={200}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      preview={{
        src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }}
    />

    <Image width={200} src="error.png" fallback="https://via.placeholder.com/200" preview={false} />

    <Image.PreviewGroup
      items={[
        'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
      ]}
    >
      <Image
        width={200}
        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />
    </Image.PreviewGroup>

    <Image
      width={200}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      placeholder={
        <Image
          preview={false}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
          width={200}
        />
      }
    />
  </Space>
);
```

## 返回结果

渲染一个可预览的图片组件。
