# Grid Component

**Purpose**: 24-column grid system for responsive layouts.

## When to Use

- Create responsive page layouts
- Need column-based layout system
- Build forms and data displays with consistent spacing

## Basic Usage

```typescript
import { Row, Col } from 'antd';

<Row>
  <Col span={12}>col-12</Col>
  <Col span={12}>col-12</Col>
</Row>
```

## Common Props

### Row Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `gutter` | Spacing between columns | number \| [number, number] | 0 |
| `align` | Vertical alignment | `'top'` \| `'middle'` \| `'bottom'` | `'top'` |
| `justify` | Horizontal alignment | `'start'` \| `'end'` \| `'center'` \| `'space-around'` \| `'space-between'` | `'start'` |
| `wrap` | Auto wrap | boolean | true |

### Col Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `span` | Column span (1-24) | number | - |
| `offset` | Column offset | number | 0 |
| `push` | Column push | number | 0 |
| `pull` | Column pull | number | 0 |
| `xs` | <576px breakpoint | number \| object | - |
| `sm` | ≥576px breakpoint | number \| object | - |
| `md` | ≥768px breakpoint | number \| object | - |
| `lg` | ≥992px breakpoint | number \| object | - |
| `xl` | ≥1200px breakpoint | number \| object | - |
| `xxl` | ≥1600px breakpoint | number \| object | - |

## Examples

### Basic Grid

```typescript
<Row gutter={16}>
  <Col span={8}>col-8</Col>
  <Col span={8}>col-8</Col>
  <Col span={8}>col-8</Col>
</Row>
```

### Responsive Grid

```typescript
<Row gutter={16}>
  <Col xs={24} sm={12} md={8} lg={6} xl={4}>
    Responsive column
  </Col>
</Row>
```

### Gutter

```typescript
<Row gutter={[16, 16]}>
  <Col span={12}>Column 1</Col>
  <Col span={12}>Column 2</Col>
</Row>
```

## Best Practices

1. **Total 24 columns** - Sum of spans should equal 24
2. **Use gutter** - Always set gutter for spacing between columns
3. **Responsive design** - Use breakpoint props for responsive layouts
4. **Nested grids** - Can nest Row/Col for complex layouts
