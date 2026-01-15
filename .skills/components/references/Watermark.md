# Watermark — 水印

## 功能概述

给页面的某个区域加上水印。

## 输入字段

### 可选

- `content`: string | string[]，水印文字内容。
- `image`: string，图片源（优先级高于 content）。
- `width`: number，水印宽度，默认 `120`。
- `height`: number，水印高度，默认 `64`。
- `rotate`: number，水印旋转角度，默认 `-22`。
- `zIndex`: number，层级，默认 `9`。
- `font`: FontStyle，字体配置。
- `gap`: `[number, number]`，水印间隔，默认 `[100, 100]`。
- `offset`: `[number, number]`，水印偏移量。
- `inherit`: boolean，将水印传给弹出组件，默认 `true`（5.11.0+）。

### FontStyle 结构

```tsx
interface FontStyle {
  color?: CanvasFillStrokeStyles['fillStyle']; // 颜色
  fontSize?: number | string; // 字体大小，默认 16
  fontWeight?: 'normal' | 'light' | 'weight' | number; // 粗细
  fontFamily?: string; // 字体，默认 sans-serif
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique'; // 样式
  textAlign?: CanvasTextAlign; // 对齐（5.10.0+）
}
```

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
      {/* 基础用法 */}
      <Watermark content="Ant Design">
        <div style={{ height: 500 }}>Content with watermark</div>
      </Watermark>

      {/* 多行水印 */}
      <Watermark content={['Ant Design', 'Happy Working']}>
        <div style={{ height: 500 }}>Content with multi-line watermark</div>
      </Watermark>

      {/* 图片水印 */}
      <Watermark
        image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original"
        width={130}
        height={32}
      >
        <div style={{ height: 500 }}>Content with image watermark</div>
      </Watermark>

      {/* 自定义配置 */}
      <Watermark
        content="Ant Design"
        font={{ color: 'rgba(0, 0, 0, 0.15)', fontSize: 16 }}
        gap={[200, 200]}
        rotate={-20}
      >
        <div style={{ height: 500 }}>Custom watermark</div>
      </Watermark>

      {/* 弹出层继承水印 */}
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
