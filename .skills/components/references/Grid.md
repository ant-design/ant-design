# Grid — 栅格

## 功能概述

24 栅格系统，基于 Flex 布局的栅格系统。包含 Row 和 Col 组件。

## 输入字段

### Row 属性

- `children`: ReactNode，Col 组件。
- `gutter`: number | `[horizontal, vertical]` | object，栅格间隔。
  - 可以是数字：`gutter={16}`
  - 可以是数组：`gutter={[16, 24]}`（水平，垂直）
  - 可以是响应式对象：`gutter={{ xs: 8, sm: 16, md: 24 }}`
- `align`: string，垂直对齐，可选 `top` | `middle` | `bottom` | `stretch`，默认 `top`。
- `justify`: string，水平排列，可选 `start` | `end` | `center` | `space-around` | `space-between` | `space-evenly`，默认 `start`。
- `wrap`: boolean，是否换行，默认 `true`。

### Col 属性

- `children`: ReactNode，子组件。
- `span`: number，栅格占位格数（0-24），为 0 时隐藏。
- `offset`: number，左侧偏移格数。
- `push`: number，右移格数。
- `pull`: number，左移格数。
- `order`: number，栅格顺序。
- `flex`: string | number，flex 布局属性。

### 响应式属性

Col 支持响应式断点设置：

- `xs`: number | object，<576px。
- `sm`: number | object，≥576px。
- `md`: number | object，≥768px。
- `lg`: number | object，≥992px。
- `xl`: number | object，≥1200px。
- `xxl`: number | object，≥1600px。

响应式对象格式：`{ span: 8, offset: 4 }`

### useBreakpoint Hook

```tsx
const screens = Grid.useBreakpoint();
// 返回 { xs: false, sm: true, md: true, lg: true, xl: false, xxl: false }
```

## 使用建议

布局时优先使用 Row + Col；响应式设计使用断点属性；间隔使用 `gutter` 而非手动 margin。

## 示例代码

```tsx
import { Col, Row } from 'antd';

const App: React.FC = () => (
  <>
    {/* 基础栅格 */}
    <Row>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>

    {/* 带间隔 */}
    <Row gutter={16}>
      <Col span={6}>
        <div>col-6</div>
      </Col>
      <Col span={6}>
        <div>col-6</div>
      </Col>
      <Col span={6}>
        <div>col-6</div>
      </Col>
      <Col span={6}>
        <div>col-6</div>
      </Col>
    </Row>

    {/* 响应式 */}
    <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <div>col</div>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <div>col</div>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <div>col</div>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <div>col</div>
      </Col>
    </Row>

    {/* 偏移 */}
    <Row>
      <Col span={8}>col-8</Col>
      <Col span={8} offset={8}>
        col-8 offset-8
      </Col>
    </Row>
  </>
);
```

## 返回结果

渲染一个基于 24 栅格的响应式布局。
