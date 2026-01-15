# Anchor — 锚点

## 功能概述

用于跳转到页面指定位置。

## 输入字段

### 必填

- `items`: AnchorItem[]，锚点项配置数组。

### AnchorItem 结构

```tsx
interface AnchorItem {
  key: string; // 唯一标识
  href: string; // 锚点链接
  title: ReactNode; // 标题
  target?: string; // 链接 target
  children?: AnchorItem[]; // 子锚点
  replace?: boolean; // 使用 replaceState 替换 pushState（5.7.0+）
}
```

### 可选

- `affix`: boolean，固定模式，默认 `true`。
- `bounds`: number，锚点区域边界，默认 `5`。
- `getContainer`: () => HTMLElement，滚动容器，默认 `() => window`。
- `getCurrentAnchor`: (activeLink) => string，自定义高亮锚点。
- `offsetTop`: number，固定模式时距顶部偏移量。
- `showInkInFixed`: boolean，固定模式时显示小圆点，默认 `false`。
- `targetOffset`: number，锚点滚动偏移量。
- `direction`: string，方向，可选 `vertical` | `horizontal`，默认 `vertical`。
- `replace`: boolean，使用 replaceState，默认 `false`（5.7.0+）。
- `onChange`: (currentActiveLink) => void，锚点变化回调。
- `onClick`: (e, link) => void，点击回调。

## 使用建议

长页面导航使用锚点；文档类页面使用侧边锚点；设置 targetOffset 避免被固定头部遮挡。

## 示例代码

```tsx
import { Anchor, Col, Row } from 'antd';
import type { AnchorProps } from 'antd';

const items: AnchorProps['items'] = [
  {
    key: 'part-1',
    href: '#part-1',
    title: 'Part 1',
  },
  {
    key: 'part-2',
    href: '#part-2',
    title: 'Part 2',
  },
  {
    key: 'part-3',
    href: '#part-3',
    title: 'Part 3',
    children: [
      {
        key: 'part-3-1',
        href: '#part-3-1',
        title: 'Part 3-1',
      },
      {
        key: 'part-3-2',
        href: '#part-3-2',
        title: 'Part 3-2',
      },
    ],
  },
];

const App: React.FC = () => (
  <Row>
    <Col span={16}>
      <div id="part-1" style={{ height: '100vh' }}>
        Part 1
      </div>
      <div id="part-2" style={{ height: '100vh' }}>
        Part 2
      </div>
      <div id="part-3" style={{ height: '100vh' }}>
        Part 3
      </div>
      <div id="part-3-1" style={{ height: '50vh' }}>
        Part 3-1
      </div>
      <div id="part-3-2" style={{ height: '50vh' }}>
        Part 3-2
      </div>
    </Col>
    <Col span={8}>
      {/* 基础用法 */}
      <Anchor items={items} />

      {/* 水平方向 */}
      <Anchor direction="horizontal" items={items} />

      {/* 不固定 */}
      <Anchor affix={false} items={items} />

      {/* 自定义容器 */}
      <Anchor getContainer={() => document.getElementById('custom-container')!} items={items} />

      {/* 设置偏移 */}
      <Anchor targetOffset={60} items={items} />
    </Col>
  </Row>
);
```

## 返回结果

渲染一个锚点导航，用于页面内快速跳转。
