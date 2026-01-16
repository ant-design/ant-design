# Flex — 弹性布局

## 功能概述

用于对齐的弹性布局容器。

## 应用场景

- 适合设置元素之间的间距。
- 适合设置各种水平、垂直对齐方式。
- ### 与 Space 组件的区别 {#difference-with-space-component}。
- Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。
- Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。

## 输入字段

### Flex 属性

#### 必填

- 无必填属性。

#### 可选

- `vertical`: boolean，flex 主轴的方向是否垂直，使用 `flex-direction: column`，默认 `false`。
- `wrap`: [flex-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap) | boolean，设置元素单行显示还是多行显示，默认 nowrap，版本 boolean: 5.17.0。
- `justify`: [justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content)，设置元素在主轴方向上的对齐方式，默认 normal。
- `align`: [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items)，设置元素在交叉轴方向上的对齐方式，默认 normal。
- `flex`: [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)，flex CSS 简写属性，默认 normal。
- `gap`: `small` | `middle` | `large` | string | number，设置网格之间的间隙。
- `component`: React.ComponentType，自定义元素类型，默认 `div`。
- `orientation`: `horizontal` | `vertical`，主轴的方向类型，默认 `horizontal`。

## 方法

无公开方法。

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
