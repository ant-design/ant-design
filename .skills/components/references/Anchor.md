# Anchor — 锚点

## 功能概述

用于跳转到页面指定位置。

## 应用场景

- 需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## 输入字段

### Anchor Props 属性

#### 必填

- 无必填属性。

#### 可选

- `affix`: boolean | Omit<AffixProps, 'offsetTop' | 'target' | 'children'>，固定模式，默认 true，版本 object: 5.19.0。
- `bounds`: number，锚点区域边界，默认 5。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `getContainer`: () => HTMLElement，指定滚动的容器，默认 () => window。
- `getCurrentAnchor`: (activeLink: string) => string，自定义高亮的锚点。
- `offsetTop`: number，距离窗口顶部达到指定偏移量后触发。
- `showInkInFixed`: boolean，`affix={false}` 时是否显示小方块，默认 false。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `targetOffset`: number，锚点滚动偏移量，默认与 offsetTop 相同，[例子](#anchor-demo-targetoffset)。
- `onChange`: (currentActiveLink: string) => void，监听锚点链接改变。
- `onClick`: (e: MouseEvent, link: object) => void，`click` 事件的 handler。
- `items`: { key, href, title, target, children }\[] [具体见](#anchoritem)，数据化配置选项内容，支持通过 children 嵌套，版本 5.1.0。
- `direction`: `vertical` | `horizontal`，设置导航方向，默认 `vertical`，版本 5.2.0。
- `replace`: boolean，替换浏览器历史记录中项目的 href 而不是推送它，默认 false，版本 5.7.0。

### AnchorItem 属性

#### 必填

- 无必填属性。

#### 可选

- `key`: string | number，唯一标志。
- `href`: string，锚点链接。
- `target`: string，该属性指定在何处显示链接的资源。
- `title`: ReactNode，文字内容。
- `children`: [AnchorItem](#anchoritem)\[]，嵌套的 Anchor Link，`注意：水平方向该属性不支持`。
- `replace`: boolean，替换浏览器历史记录中的项目 href 而不是推送它，默认 false，版本 5.7.0。

### Link Props 属性

#### 必填

- 无必填属性。

#### 可选

- `href`: string，锚点链接。
- `target`: string，该属性指定在何处显示链接的资源。
- `title`: ReactNode，文字内容。

## 方法

无公开方法。

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
      <Anchor items={items} />

      <Anchor direction="horizontal" items={items} />

      <Anchor affix={false} items={items} />

      <Anchor getContainer={() => document.getElementById('custom-container')!} items={items} />

      <Anchor targetOffset={60} items={items} />
    </Col>
  </Row>
);
```

## 返回结果

渲染一个锚点导航，用于页面内快速跳转。
