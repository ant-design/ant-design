# Slider — 滑动输入条

## 功能概述

滑动型输入器，用于在数值区间/自定义区间内进行选择。

## 输入字段

### 必填

无必填属性。

### 可选

- `value`: number | `[number, number]`，当前值（受控）。
- `defaultValue`: number | `[number, number]`，默认值。
- `min`: number，最小值，默认 `0`。
- `max`: number，最大值，默认 `100`。
- `step`: number | null，步长，为 `null` 时只能选择 marks 中的点，默认 `1`。
- `range`: boolean | { draggableTrack }，双滑块模式。
- `marks`: object，刻度标记，格式：`{ number: ReactNode | { style, label } }`。
- `dots`: boolean，是否只能拖拽到刻度上，默认 `false`。
- `included`: boolean，marks 是否包含，默认 `true`。
- `disabled`: boolean，禁用状态。
- `vertical`: boolean，垂直方向。
- `reverse`: boolean，反向坐标轴。
- `tooltip`: object，tooltip 配置。
  - `open`: boolean，控制显示（受控）。
  - `placement`: string，tooltip 位置。
  - `formatter`: (value) => ReactNode | null，格式化函数，返回 null 隐藏。
  - `getPopupContainer`: () => HTMLElement，容器。
- `keyboard`: boolean，支持键盘操作，默认 `true`。
- `handleRender`: (handle, info) => ReactNode，自定义滑块渲染。
- `track`: boolean，是否显示轨迹，默认 `true`（5.10.0+）。
- `onChange`: (value) => void，拖动时回调（连续触发）。
- `onChangeComplete`: (value) => void，拖动结束回调（原 onAfterChange，5.11.0+）。

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
      {/* 基础用法 */}
      <Slider defaultValue={30} />

      {/* 带输入框 */}
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

      {/* 范围选择 */}
      <Slider range defaultValue={[20, 50]} />

      {/* 带刻度 */}
      <Slider marks={marks} defaultValue={37} />

      {/* 禁用 */}
      <Slider defaultValue={30} disabled />
    </Space>
  );
};
```

## 返回结果

渲染一个滑动输入条，用于在范围内选择数值。
