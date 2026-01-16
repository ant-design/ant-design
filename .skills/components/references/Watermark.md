# Watermark — 水印

## 功能概述

给页面的某个区域加上水印。

## 应用场景

- 页面需要添加水印标识版权时使用。
- 适用于防止信息盗用。

## 输入字段

### Watermark 属性

#### 必填

- 无必填属性。

#### 可选

- `width`: number，水印的宽度，`content` 的默认值为自身的宽度，默认 120。
- `height`: number，水印的高度，`content` 的默认值为自身的高度，默认 64。
- `inherit`: boolean，是否将水印传导给弹出组件如 Modal、Drawer，默认 true，版本 5.11.0。
- `rotate`: number，水印绘制时，旋转的角度，单位 `°`，默认 -22。
- `zIndex`: number，追加的水印元素的 z-index，默认 9。
- `image`: string，图片源，建议导出 2 倍或 3 倍图，优先级高 (支持 base64 格式)。
- `content`: string | string[]，水印文字内容。
- `font`: [Font](#font)，文字样式，默认 [Font](#font)。
- `gap`: \[number, number\]，水印之间的间距，默认 \[100, 100\]。
- `offset`: \[number, number\]，水印距离容器左上角的偏移量，默认为 `gap/2`，默认 \[gap\[0\]/2, gap\[1\]/2\]。
- `onRemove`: `() => void`，水印因 DOM 变更被移除时触发的回调，版本 6.0.0。

### Font 属性

#### 必填

- 无必填属性。

#### 可选

- `color`: [CanvasFillStrokeStyles.fillStyle](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fillStyle)，字体颜色，默认 rgba(0,0,0,.15)。
- `fontSize`: number，字体大小，默认 16。
- `fontWeight`: `normal` | `lighter` | `bold` | `bolder` | number，字体粗细，默认 normal。
- `fontFamily`: string，字体类型，默认 sans-serif。
- `fontStyle`: `none` | `normal` | `italic` | `oblique`，字体样式，默认 normal。
- `textAlign`: [CanvasTextAlign](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/textAlign)，指定文本对齐方向，默认 `center`，版本 5.10.0。

## 方法

无公开方法。

## 使用建议

敏感信息页面添加水印；配合 inherit 传递给弹出层；使用 image 添加 logo 水印。

## 示例代码

```tsx
import { useState } from 'react';
import { Button, Card, Drawer, Modal, Watermark } from 'antd';

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Watermark content="Ant Design">
        <div style={{ height: 500 }}>Content with watermark</div>
      </Watermark>

      <Watermark content={['Ant Design', 'Happy Working']}>
        <div style={{ height: 500 }}>Content with multi-line watermark</div>
      </Watermark>

      <Watermark
        image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original"
        width={130}
        height={32}
      >
        <div style={{ height: 500 }}>Content with image watermark</div>
      </Watermark>

      <Watermark
        content="Ant Design"
        font={{ color: 'rgba(0, 0, 0, 0.15)', fontSize: 16 }}
        gap={[200, 200]}
        rotate={-20}
      >
        <div style={{ height: 500 }}>Custom watermark</div>
      </Watermark>

      <Watermark content="Ant Design" inherit>
        <Card title="Card">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
        </Card>

        <Modal title="Modal with Watermark" open={modalOpen} onCancel={() => setModalOpen(false)}>
          <p>Modal content with inherited watermark</p>
        </Modal>

        <Drawer
          title="Drawer with Watermark"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <p>Drawer content with inherited watermark</p>
        </Drawer>
      </Watermark>
    </>
  );
};
```

## 返回结果

渲染一个带水印的容器组件。
