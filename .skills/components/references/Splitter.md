# Splitter — 分隔面板

## 功能概述

可以将区域分割为多个可调整大小的面板。

## 输入字段

### Splitter 属性

- `layout`: string，布局方向，可选 `horizontal` | `vertical`，默认 `horizontal`。
- `lazy`: boolean，懒更新模式（拖拽结束后才更新）（5.21.0+）。
- `onResize`: (sizes) => void，面板大小变化回调。
- `onResizeStart`: (sizes) => void，开始调整回调。
- `onResizeEnd`: (sizes) => void，结束调整回调。

### Splitter.Panel 属性

- `size`: number | string，面板大小（受控）。
- `defaultSize`: number | string，默认大小。
- `min`: number | string，最小尺寸。
- `max`: number | string，最大尺寸。
- `collapsible`: boolean | { start, end }，可折叠配置。
- `resizable`: boolean，是否可调整大小，默认 `true`。

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
    {/* 基础用法 */}
    <Splitter style={{ height: 300, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <Splitter.Panel>
        <Desc text="First" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Second" />
      </Splitter.Panel>
    </Splitter>

    {/* 垂直布局 */}
    <Splitter layout="vertical" style={{ height: 300 }}>
      <Splitter.Panel>
        <Desc text="First" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Second" />
      </Splitter.Panel>
    </Splitter>

    {/* 多面板 */}
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

    {/* 设置大小限制 */}
    <Splitter style={{ height: 300 }}>
      <Splitter.Panel min={100} max={500}>
        <Desc text="First (min: 100, max: 500)" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Second" />
      </Splitter.Panel>
    </Splitter>

    {/* 可折叠 */}
    <Splitter style={{ height: 300 }}>
      <Splitter.Panel collapsible>
        <Desc text="Collapsible" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Second" />
      </Splitter.Panel>
    </Splitter>

    {/* 双向折叠 */}
    <Splitter style={{ height: 300 }}>
      <Splitter.Panel collapsible={{ start: true, end: true }}>
        <Desc text="Both collapsible" />
      </Splitter.Panel>
      <Splitter.Panel collapsible={{ start: true, end: true }}>
        <Desc text="Both collapsible" />
      </Splitter.Panel>
    </Splitter>

    {/* 嵌套 */}
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

    {/* 受控 */}
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
