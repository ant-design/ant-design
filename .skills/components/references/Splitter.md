# Splitter — 分隔面板

## 功能概述

自由切分指定区域。

## 应用场景

- 可以水平或垂直地分隔区域。
- 当需要自由拖拽调整各区域大小。
- 当需要指定区域的最大最小宽高时。

## 输入字段

### Splitter 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `collapsibleIcon`: `{start?: ReactNode; end?: ReactNode}`，折叠图标，版本 6.0.0。
- `draggerIcon`: `ReactNode`，拖拽图标，版本 6.0.0。
- `~~layout~~`: `horizontal` | `vertical`，布局方向，默认 `horizontal`。
- `lazy`: `boolean`，延迟渲染模式，默认 `false`，版本 5.23.0。
- `onCollapse`: `(collapsed: boolean[], sizes: number[]) => void`，展开-收起时回调，版本 5.28.0。
- `orientation`: `horizontal` | `vertical`，布局方向，默认 `horizontal`。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `vertical`: boolean，排列方向，与 `orientation` 同时存在，以 `orientation` 优先，默认 `false`。
- `onResize`: `(sizes: number[]) => void`，面板大小变化回调。
- `onResizeEnd`: `(sizes: number[]) => void`，拖拽结束回调。
- `onResizeStart`: `(sizes: number[]) => void`，开始拖拽之前回调。

### Panel 属性

#### 必填

- 无必填属性。

#### 可选

- `collapsible`: `boolean | { start?: boolean; end?: boolean; showCollapsibleIcon?: boolean | 'auto' }`，快速折叠，默认 `false`，版本 showCollapsibleIcon: 5.27.0。
- `defaultSize`: `number | string`，初始面板大小，支持数字 px 或者文字 '百分比%' 类型。
- `max`: `number | string`，最大阈值，支持数字 px 或者文字 '百分比%' 类型。
- `min`: `number | string`，最小阈值，支持数字 px 或者文字 '百分比%' 类型。
- `resizable`: `boolean`，是否开启拖拽伸缩，默认 `true`。
- `size`: `number | string`，受控面板大小，支持数字 px 或者文字 '百分比%' 类型。

## 方法

无公开方法。

## 使用建议

需要可调整大小的面板布局时使用；配合 min/max 限制尺寸范围；使用 collapsible 支持折叠。

## 示例代码

```tsx
import { Flex, Splitter, Typography } from 'antd';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => (
  <>
    <Splitter style={{ height: 300, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <Splitter.Panel>
        <Desc text="First" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Second" />
      </Splitter.Panel>
    </Splitter>

    <Splitter layout="vertical" style={{ height: 300 }}>
      <Splitter.Panel>
        <Desc text="First" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Second" />
      </Splitter.Panel>
    </Splitter>

    <Splitter style={{ height: 300 }}>
      <Splitter.Panel>
        <Desc text="First" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Second" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Third" />
      </Splitter.Panel>
    </Splitter>

    <Splitter style={{ height: 300 }}>
      <Splitter.Panel min={100} max={500}>
        <Desc text="First (min: 100, max: 500)" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Second" />
      </Splitter.Panel>
    </Splitter>

    <Splitter style={{ height: 300 }}>
      <Splitter.Panel collapsible>
        <Desc text="Collapsible" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Second" />
      </Splitter.Panel>
    </Splitter>

    <Splitter style={{ height: 300 }}>
      <Splitter.Panel collapsible={{ start: true, end: true }}>
        <Desc text="Both collapsible" />
      </Splitter.Panel>
      <Splitter.Panel collapsible={{ start: true, end: true }}>
        <Desc text="Both collapsible" />
      </Splitter.Panel>
    </Splitter>

    <Splitter style={{ height: 300 }}>
      <Splitter.Panel>
        <Splitter layout="vertical">
          <Splitter.Panel>
            <Desc text="Top" />
          </Splitter.Panel>
          <Splitter.Panel>
            <Desc text="Bottom" />
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Right" />
      </Splitter.Panel>
    </Splitter>

    <Splitter style={{ height: 300 }} onResize={(sizes) => console.log('Resize:', sizes)}>
      <Splitter.Panel defaultSize="40%">
        <Desc text="40%" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="60%" />
      </Splitter.Panel>
    </Splitter>
  </>
);
```

## 返回结果

渲染一个可分割调整大小的面板组件。
