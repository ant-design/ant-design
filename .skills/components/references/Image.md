# Image — 图片

## 功能概述

可预览的图片。

## 输入字段

### 可选

- `src`: string，图片地址。
- `alt`: string，图片描述。
- `width`: string | number，图片宽度。
- `height`: string | number，图片高度。
- `preview`: boolean | PreviewType，预览配置，默认 `true`。
- `fallback`: string，加载失败时的占位图。
- `placeholder`: ReactNode，加载占位。
- `rootClassName`: string，根节点类名。
- `onError`: (e) => void，加载错误回调。

### PreviewType 结构

```tsx
interface PreviewType {
  visible?: boolean; // 受控显示
  onVisibleChange?: (visible, prev, current) => void;
  src?: string; // 自定义预览 src
  getContainer?: string | HTMLElement | (() => HTMLElement) | false;
  movable?: boolean; // 可移动
  mask?: ReactNode; // 缩略图遮罩
  maskClassName?: string; // 遮罩类名
  scaleStep?: number; // 缩放步进，默认 0.5
  minScale?: number; // 最小缩放
  maxScale?: number; // 最大缩放
  closeIcon?: ReactNode; // 关闭图标
  forceRender?: boolean; // 强制渲染
  toolbarRender?: (original, info) => ReactNode; // 自定义工具栏
  imageRender?: (original, info) => ReactNode; // 自定义渲染
  destroyOnClose?: boolean; // 关闭时销毁（5.18.1+）
  onTransform?: (info) => void; // 变换回调
}
```

### Image.PreviewGroup

图片组预览：

- `items`: (string | ImageItem)[]，预览图片列表。
- `current`: number，当前预览索引（受控）。
- `fallback`: string，加载失败占位。
- `preview`: PreviewGroupType，预览配置。
- `onChange`: (current) => void，切换回调。

## 使用建议

图片展示使用 Image；多图预览使用 PreviewGroup；配合 fallback 处理加载失败。

## 示例代码

```tsx
import { Image, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical">
    {/* 基础用法 */}
    <Image
      width={200}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />

    {/* 预览配置 */}
    <Image
      width={200}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      preview={{
        src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }}
    />

    {/* 禁用预览 */}
    <Image width={200} src="error.png" fallback="https://via.placeholder.com/200" preview={false} />

    {/* 图片组预览 */}
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

    {/* 渐进加载 */}
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
