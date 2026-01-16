# Grid — 栅格

## 功能概述

24 栅格系统。

## 应用场景

- 24 栅格系统。
- 需要在页面中以一致样式呈现栅格能力时。

## 输入字段

### Row 属性

#### 必填

- 无必填属性。

#### 可选

- `align`: `top` | `middle` | `bottom` | `stretch` | `{[key in 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl']: 'top' | 'middle' | 'bottom' | 'stretch'}`，垂直对齐方式，默认 `top`，版本 object: 4.24.0。
- `gutter`: number | string | object | array，栅格间隔，可以写成[字符串CSS单位](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Values_and_Units)或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 `[水平间距, 垂直间距]`，默认 0，版本 string: 5.28.0。
- `justify`: `start` | `end` | `center` | `space-around` | `space-between` | `space-evenly` | `{[key in 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl']: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'}`，水平排列方式，默认 `start`，版本 object: 4.24.0。
- `wrap`: boolean，是否自动换行，默认 true，版本 4.8.0。

### Col 属性

#### 必填

- 无必填属性。

#### 可选

- `flex`: string | number，flex 布局属性。
- `offset`: number，栅格左侧的间隔格数，间隔内不可以有栅格，默认 0。
- `order`: number，栅格顺序，默认 0。
- `pull`: number，栅格向左移动格数，默认 0。
- `push`: number，栅格向右移动格数，默认 0。
- `span`: number，栅格占位格数，为 0 时相当于 `display: none`。
- `xs`: number | object，`窗口宽度 < 576px` 响应式栅格，可为栅格数或一个包含其他属性的对象。
- `sm`: number | object，`窗口宽度 ≥ 576px` 响应式栅格，可为栅格数或一个包含其他属性的对象。
- `md`: number | object，`窗口宽度 ≥ 768px` 响应式栅格，可为栅格数或一个包含其他属性的对象。
- `lg`: number | object，`窗口宽度 ≥ 992px` 响应式栅格，可为栅格数或一个包含其他属性的对象。
- `xl`: number | object，`窗口宽度 ≥ 1200px` 响应式栅格，可为栅格数或一个包含其他属性的对象。
- `xxl`: number | object，`窗口宽度 ≥ 1600px` 响应式栅格，可为栅格数或一个包含其他属性的对象。

## 方法

无公开方法。

## 使用建议

布局时优先使用 Row + Col；响应式设计使用断点属性；间隔使用 `gutter` 而非手动 margin。

## 示例代码

```tsx
import { Col, Row } from 'antd';

const App: React.FC = () => (
  <>
    <Row>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>

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
