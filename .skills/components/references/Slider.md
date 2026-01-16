# Slider — 滑动输入条

## 功能概述

滑动型输入器，展示当前值和可选范围。

## 应用场景

- 当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。

## 输入字段

### Slider 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `defaultValue`: number | \[number, number]，设置初始取值。当 `range` 为 false 时，使用 number，否则用 \[number, number]，默认 0 | \[0, 0]。
- `disabled`: boolean，值为 true 时，滑块为禁用状态，默认 false。
- `keyboard`: boolean，支持使用键盘操作 handler，默认 true，版本 5.2.0+。
- `dots`: boolean，是否只能拖拽到刻度上，默认 false。
- `included`: boolean，`marks` 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列，默认 true。
- `marks`: object，刻度标记，key 的类型必须为 `number` 且取值在闭区间 \[min, max] 内，每个标签可以单独设置样式，默认 { number: ReactNode } or { number: { style: CSSProperties, label: ReactNode } }。
- `max`: number，最大值，默认 100。
- `min`: number，最小值，默认 0。
- `orientation`: `horizontal` | `vertical`，排列方向，默认 `horizontal`。
- `range`: boolean | [range](#range)，双滑块模式，默认 false。
- `reverse`: boolean，反向坐标轴，默认 false。
- `step`: number | null，步长，取值必须大于 0，并且可被 (max - min) 整除。当 `marks` 不为空对象时，可以设置 `step` 为 null，此时 Slider 的可选值仅有 `marks`、`min` 和 `max`，默认 1。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `tooltip`: [tooltip](#tooltip)，设置 Tooltip 相关属性，版本 4.23.0。
- `value`: number | \[number, number]，设置当前取值。当 `range` 为 false 时，使用 number，否则用 \[number, number]。
- `vertical`: boolean，值为 true 时，Slider 为垂直方向。与 `orientation` 同时存在，以 `orientation` 优先，默认 false。
- `onChangeComplete`: (value) => void，与 `mouseup` 和 `keyup` 触发时机一致，把当前值作为参数传入。
- `onChange`: (value) => void，当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入。

### range 属性

#### 必填

- 无必填属性。

#### 可选

- `draggableTrack`: boolean，范围刻度是否可被拖拽，默认 false。
- `editable`: boolean，启动动态增减节点，不能和 `draggableTrack` 一同使用，默认 false，版本 5.20.0。
- `minCount`: number，配置 `editable` 时，最小节点数量，默认 0，版本 5.20.0。
- `maxCount`: number，配置 `editable` 时，最大节点数量，版本 5.20.0。

### tooltip 属性

#### 必填

- 无必填属性。

#### 可选

- `autoAdjustOverflow`: boolean，是否自动调整弹出位置，默认 true，版本 5.8.0。
- `open`: boolean，值为 true 时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时，版本 4.23.0。
- `placement`: string，设置 Tooltip 展示位置。参考 [Tooltip](/components/tooltip-cn)，版本 4.23.0。
- `getPopupContainer`: (triggerNode) => HTMLElement，Tooltip 渲染父节点，默认渲染到 body 上，默认 () => document.body，版本 4.23.0。
- `formatter`: value => ReactNode | null，Slider 会把当前值传给 `formatter`，并在 Tooltip 中显示 `formatter` 的返回值，若为 null，则隐藏 Tooltip，默认 IDENTITY，版本 4.23.0。

## 方法

- `blur()`: 移除焦点
- `focus()`: 获取焦点

## 使用建议

数值输入使用 Slider 代替 InputNumber 提供更直观的操作；需要精确值时配合 InputNumber 使用；使用 marks 标记重要刻度。

## 示例代码

```tsx
import { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = useState(30);

  const marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: { color: '#f50' },
      label: <strong>100°C</strong>,
    },
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Slider defaultValue={30} />

      <Row>
        <Col span={12}>
          <Slider
            min={1}
            max={20}
            onChange={setValue}
            value={typeof value === 'number' ? value : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber min={1} max={20} value={value} onChange={(v) => setValue(v ?? 0)} />
        </Col>
      </Row>

      <Slider range defaultValue={[20, 50]} />

      <Slider marks={marks} defaultValue={37} />

      <Slider defaultValue={30} disabled />
    </Space>
  );
};
```

## 返回结果

渲染一个滑动输入条，用于在范围内选择数值。
