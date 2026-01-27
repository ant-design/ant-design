# Spacing and Size Design Tokens

Ant Design uses a systematic spacing and size token system based on a 4px base unit. All spacing and size values should use these tokens for consistency.

## Design Philosophy

- **Base unit**: 4px (defined by `sizeUnit`)
- **Size step**: 4px (defined by `sizeStep`)
- All spacing and sizes are multiples of 4px
- This creates a consistent rhythm throughout the design system

## Spacing Tokens

### Padding Tokens

- **`paddingXXS`**: Extra extra small padding (default: `4px`)
- **`paddingXS`**: Extra small padding (default: `8px`)
- **`paddingSM`**: Small padding (default: `12px`)
- **`padding`**: Base padding (default: `16px`)
- **`paddingMD`**: Medium padding (default: `16px`)
- **`paddingLG`**: Large padding (default: `24px`)
- **`paddingXL`**: Extra large padding (default: `32px`)

### Margin Tokens

- **`marginXXS`**: Extra extra small margin (default: `4px`)
- **`marginXS`**: Extra small margin (default: `8px`)
- **`marginSM`**: Small margin (default: `12px`)
- **`margin`**: Base margin (default: `16px`)
- **`marginMD`**: Medium margin (default: `16px`)
- **`marginLG`**: Large margin (default: `24px`)
- **`marginXL`**: Extra large margin (default: `32px`)

### Common Spacing Values

These are the most commonly used spacing values:

- **4px** (`paddingXXS` / `marginXXS`): Minimal spacing, tight layouts
- **8px** (`paddingXS` / `marginXS`): Small spacing, compact UI
- **12px** (`paddingSM` / `marginSM`): Small-medium spacing
- **16px** (`padding` / `margin`): Default spacing, most common
- **24px** (`paddingLG` / `marginLG`): Large spacing, section separation
- **32px** (`paddingXL` / `marginXL`): Extra large spacing, major sections

## Size Tokens

### Control Heights

- **`controlHeightSM`**: Small control height (default: `24px`)
  - Use for: Small buttons, small inputs, compact UI

- **`controlHeight`**: Base control height (default: `32px`)
  - Use for: Default buttons, default inputs, most form controls

- **`controlHeightLG`**: Large control height (default: `40px`)
  - Use for: Large buttons, large inputs, prominent actions

### Border Radius

- **`borderRadius`**: Base border radius (default: `6px`)
  - Use for: Buttons, inputs, cards, most components

- **`borderRadiusSM`**: Small border radius (default: `4px`)
  - Use for: Small elements, tags, badges

- **`borderRadiusLG`**: Large border radius (default: `8px`)
  - Use for: Large cards, prominent elements

- **`borderRadiusXS`**: Extra small border radius (default: `2px`)
  - Use for: Very small elements

- **`borderRadiusOuter`**: Outer border radius (default: `4px`)
  - Use for: Outer containers, modals

### Line Width

- **`lineWidth`**: Base line width (default: `1`)
  - Use for: Borders, dividers, outlines

- **`lineWidthBold`**: Bold line width (default: `2`)
  - Use for: Strong borders, emphasis

- **`lineWidthFocus`**: Focus outline width (default: `4`)
  - Use for: Focus indicators, active states

### Size Units

- **`sizeUnit`**: Size change unit (default: `4`)
  - Base unit for all size calculations

- **`sizeStep`**: Size base step (default: `4`)
  - Base step for size variations

- **`sizePopupArrow`**: Popup arrow size (default: `16`)

## Usage Examples

### Using Spacing Tokens

```typescript
import { theme } from 'antd';

const { token } = theme.useToken();

// ✅ CORRECT - Using spacing tokens
<div style={{
  padding: token.padding,
  margin: token.marginLG,
}}>
  Content
</div>

// ✅ CORRECT - Using different spacing sizes
<Card style={{
  padding: token.paddingLG,
  marginBottom: token.margin,
}}>
  Card content
</Card>

// ✅ CORRECT - Using Space component (recommended)
import { Space } from 'antd';

<Space size="middle">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Space>
```

### Using Size Tokens

```typescript
// ✅ CORRECT - Using control height tokens
<button style={{
  height: token.controlHeight,
  borderRadius: token.borderRadius,
}}>
  Button
</button>

// ✅ CORRECT - Using border radius tokens
<div style={{
  borderRadius: token.borderRadiusLG,
  border: `${token.lineWidth}px solid ${token.colorBorder}`,
}}>
  Content
</div>
```

### Incorrect Usage

```typescript
// ❌ WRONG - Hardcoding spacing values
<div style={{ padding: '15px', margin: '20px' }}>

// ❌ WRONG - Not using tokens
<button style={{ height: '30px', borderRadius: '5px' }}>

// ❌ WRONG - Inconsistent spacing
<div style={{ padding: '13px' }}>  // Should use token values (multiples of 4px)
```

## Spacing Component

The `Space` component is the recommended way to add spacing between components:

```typescript
import { Space } from 'antd';

// Small spacing (8px)
<Space size="small">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Space>

// Middle spacing (16px) - default
<Space size="middle">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Space>

// Large spacing (24px)
<Space size="large">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Space>

// Custom spacing
<Space size={32}>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Space>
```

## Grid System

Ant Design uses a 24-column grid system:

```typescript
import { Row, Col } from 'antd';

<Row gutter={[16, 16]}>  // 16px horizontal and vertical gutter
  <Col span={8}>Column 1</Col>
  <Col span={8}>Column 2</Col>
  <Col span={8}>Column 3</Col>
</Row>
```

The `gutter` prop uses spacing tokens internally. Common gutter values:

- `[8, 8]` - Small gutter
- `[16, 16]` - Default gutter (most common)
- `[24, 24]` - Large gutter

## Best Practices

1. **Always use spacing tokens** - Never hardcode padding, margin, or size values
2. **Use Space component** - Prefer `Space` component over manual margins
3. **Maintain 4px rhythm** - All spacing should be multiples of 4px
4. **Consistent spacing** - Use the same spacing tokens for similar elements
5. **Use appropriate sizes** - Choose spacing that matches the element's importance
6. **Respect component spacing** - Components have built-in spacing - don't override unnecessarily
7. **Use Grid system** - Use Row/Col for layout instead of manual spacing

## Common Spacing Patterns

### Card Spacing

```typescript
<Card style={{ padding: token.paddingLG }}>
  {/* Card content */}
</Card>
```

### Form Spacing

```typescript
<Form>
  <Form.Item style={{ marginBottom: token.marginLG }}>
    {/* Form field */}
  </Form.Item>
</Form>
```

### Section Spacing

```typescript
<section style={{
  padding: token.paddingXL,
  marginBottom: token.marginLG
}}>
  {/* Section content */}
</section>
```

### Button Group Spacing

```typescript
<Space>
  <Button>Cancel</Button>
  <Button type="primary">Submit</Button>
</Space>
```

## Customizing Spacing

### Global Theme Customization

```typescript
import { ConfigProvider } from 'antd';

<ConfigProvider
  theme={{
    token: {
      sizeUnit: 4,           // Base unit (keep as 4)
      sizeStep: 4,            // Size step (keep as 4)
      borderRadius: 8,       // Change base border radius
      controlHeight: 36,      // Change control height
    },
  }}
>
  {/* Your app */}
</ConfigProvider>
```

### Compact Mode

For compact spacing, use the `compactAlgorithm`:

```typescript
import { ConfigProvider, theme } from 'antd';

<ConfigProvider
  theme={{
    algorithm: theme.compactAlgorithm,
  }}
>
  {/* Your app with compact spacing */}
</ConfigProvider>
```
