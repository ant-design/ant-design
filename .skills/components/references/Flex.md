# Flex — 弹性布局

## 功能概述

Flex 是 CSS Flex 布局的封装，用于设置子元素的弹性布局。

## 输入字段

### 必填

无必填属性。

### 可选

- `children`: ReactNode，子组件。
- `vertical`: boolean，是否垂直排列，默认 `false`。
- `wrap`: string，换行方式，可选 `nowrap` | `wrap` | `wrap-reverse`。
- `justify`: string，主轴对齐，可选 `flex-start` | `center` | `flex-end` | `space-between` | `space-around` | `space-evenly` | `normal`。
- `align`: string，交叉轴对齐，可选 `flex-start` | `center` | `flex-end` | `stretch` | `normal`。
- `flex`: string，flex CSS 简写属性。
- `gap`: number | string | `small` | `middle` | `large`，间隙大小。
- `component`: keyof JSX.IntrinsicElements，渲染的 HTML 标签，默认 `div`。
- `className`: string，类名。
- `style`: CSSProperties，样式。

## 使用建议

简单的 Flex 布局使用 Flex 组件；需要栅格的复杂布局使用 Row + Col；结合 gap 设置间距。

## 示例代码

```tsx
import { useState } from 'react';
import { Button, Flex, Radio, Slider } from 'antd';

const App: React.FC = () => {
  const [justify, setJustify] = useState<string>('flex-start');
  const [align, setAlign] = useState<string>('flex-start');
  const [gap, setGap] = useState<number>(8);

  return (
    <>
      <Radio.Group value={justify} onChange={(e) => setJustify(e.target.value)}>
        <Radio value="flex-start">flex-start</Radio>
        <Radio value="center">center</Radio>
        <Radio value="flex-end">flex-end</Radio>
        <Radio value="space-between">space-between</Radio>
        <Radio value="space-around">space-around</Radio>
      </Radio.Group>

      <Slider min={0} max={24} value={gap} onChange={setGap} />

      <Flex justify={justify} align={align} gap={gap} style={{ height: 100 }}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="text">Text</Button>
      </Flex>

      {/* 垂直布局 */}
      <Flex vertical gap="small">
        <Button type="primary">Button 1</Button>
        <Button>Button 2</Button>
        <Button type="dashed">Button 3</Button>
      </Flex>
    </>
  );
};
```

## 返回结果

渲染一个 Flex 容器，用于弹性布局。
