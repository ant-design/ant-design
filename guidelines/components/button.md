# Button Component

**Purpose**: Trigger operations and actions. Buttons are the primary way users interact with the interface.

## When to Use

- **Primary Button**: Use for the main action in a section. There should be at most one primary button per section.
- **Default Button**: Use for a series of actions without priority.
- **Dashed Button**: Commonly used for adding more actions.
- **Text Button**: Use for the most secondary actions.
- **Link Button**: Use for external links or navigation.

## Basic Usage

```typescript
import { Button } from 'antd';

// Primary button (main action)
<Button type="primary">Primary</Button>

// Default button
<Button>Default</Button>

// Dashed button
<Button type="dashed">Dashed</Button>

// Text button
<Button type="text">Text</Button>

// Link button
<Button type="link">Link</Button>
```

## Button Types and Variants

### Type vs Variant & Color

In Ant Design 5.21.0+, you can use either `type` (syntactic sugar) or `variant` + `color`:

```typescript
// These are equivalent:
<Button type="primary">Click</Button>
<Button color="primary" variant="solid">Click</Button>
```

**IMPORTANT**: If both `type` and `variant`/`color` are provided, `variant` and `color` take precedence.

### Variants

- **`solid`**: Solid filled button (default for primary)
- **`outlined`**: Outlined button with transparent background
- **`dashed`**: Dashed border button
- **`filled`**: Filled button with background
- **`text`**: Text-only button
- **`link`**: Link-style button

### Colors

- **`default`**: Default button color
- **`primary`**: Primary brand color
- **`danger`**: Danger/destructive action color
- **Preset colors**: `'blue'`, `'purple'`, `'cyan'`, `'green'`, `'magenta'`, `'pink'`, `'red'`, `'orange'`, `'yellow'`, `'volcano'`, `'geekblue'`, `'lime'`, `'gold'`

## Common Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `type` | Button type (syntactic sugar) | `'primary'` \| `'default'` \| `'dashed'` \| `'text'` \| `'link'` | `'default'` |
| `variant` | Button variant | `'solid'` \| `'outlined'` \| `'dashed'` \| `'filled'` \| `'text'` \| `'link'` | - |
| `color` | Button color | `'default'` \| `'primary'` \| `'danger'` \| PresetColors | - |
| `size` | Button size | `'small'` \| `'middle'` \| `'large'` | `'middle'` |
| `shape` | Button shape | `'default'` \| `'circle'` \| `'round'` | `'default'` |
| `icon` | Icon component | ReactNode | - |
| `iconPosition` | Icon position | `'start'` \| `'end'` | `'start'` |
| `loading` | Loading state | boolean \| { delay: number, icon: ReactNode } | false |
| `disabled` | Disabled state | boolean | false |
| `danger` | Danger status | boolean | false |
| `ghost` | Ghost button (transparent background) | boolean | false |
| `block` | Block button (full width) | boolean | false |
| `htmlType` | HTML button type | `'button'` \| `'submit'` \| `'reset'` | `'button'` |
| `onClick` | Click handler | (event) => void | - |

## Examples

### With Icons

```typescript
import { Button } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';

<Button icon={<SearchOutlined />}>Search</Button>
<Button icon={<DownloadOutlined />} iconPosition="end">Download</Button>
<Button icon={<SearchOutlined />} />  // Icon-only button
```

### Sizes

```typescript
<Button size="small">Small</Button>
<Button size="middle">Middle</Button>
<Button size="large">Large</Button>
```

### Shapes

```typescript
<Button shape="default">Default</Button>
<Button shape="round">Round</Button>
<Button shape="circle" icon={<SearchOutlined />} />  // Circle button (icon only)
```

### Loading State

```typescript
<Button loading>Loading</Button>
<Button loading={{ delay: 1000 }}>Delayed Loading</Button>
```

### Danger Buttons

```typescript
<Button danger>Danger</Button>
<Button type="primary" danger>Danger Primary</Button>
```

### Block Button

```typescript
<Button block>Full Width Button</Button>
```

### Ghost Button

```typescript
<Button ghost>Ghost Button</Button>
<Button type="primary" ghost>Ghost Primary</Button>
```

## Best Practices

1. **One primary action per section** - Use primary button for the main action only
2. **Clear hierarchy** - Use button types to establish visual hierarchy
3. **Appropriate sizing** - Use `middle` (default) for most cases, `large` for prominent actions, `small` for compact UI
4. **Loading states** - Show loading state during async operations to prevent multiple submissions
5. **Disabled states** - Disable buttons when actions are not available
6. **Icon placement** - Icons should be on the left (start) by default, use `iconPosition="end"` only when appropriate
7. **Danger actions** - Use `danger` prop for destructive actions like delete
8. **Don't override styles** - Use component props instead of custom CSS when possible

## Common Patterns

### Button Groups

```typescript
import { Button, Space } from 'antd';

<Space>
  <Button>Cancel</Button>
  <Button type="primary">Submit</Button>
</Space>
```

### Form Actions

```typescript
<Form onFinish={handleSubmit}>
  {/* Form fields */}
  <Form.Item>
    <Space>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button type="primary" htmlType="submit" loading={loading}>
        Submit
      </Button>
    </Space>
  </Form.Item>
</Form>
```

### Icon-Only Buttons

```typescript
<Button shape="circle" icon={<SearchOutlined />} aria-label="Search" />
```

## Accessibility

- Buttons are keyboard accessible by default
- Use `aria-label` for icon-only buttons
- Ensure sufficient color contrast
- Don't rely solely on color to convey meaning

## Styling

**IMPORTANT**: Do not override button styles with `className` unless absolutely necessary. Instead:

- Use `variant` and `color` props for styling
- Use `ConfigProvider` theme customization for global changes
- Use design tokens for custom styling

```typescript
// ✅ CORRECT - Using props
<Button variant="outlined" color="primary">Button</Button>

// ❌ WRONG - Overriding with className
<Button className="custom-button">Button</Button>
```
