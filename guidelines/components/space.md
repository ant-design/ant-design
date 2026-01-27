# Space Component

**Purpose**: Set components spacing. Provides consistent spacing between inline elements.

## When to Use

- Avoid components clinging together and set unified space
- Need equidistant arrangement of multiple child elements
- Use Space.Compact for form components with collapsed borders

## Basic Usage

```typescript
import { Space } from 'antd';

<Space>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
</Space>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `direction` | Space direction | `'vertical'` \| `'horizontal'` | `'horizontal'` |
| `size` | Space size | `'small'` \| `'middle'` \| `'large'` \| number \| [number, number] | `'small'` |
| `align` | Align items | `'start'` \| `'end'` \| `'center'` \| `'baseline'` | - |
| `wrap` | Auto wrap line | boolean | false |
| `split` | Set split element | ReactNode | - |

## Examples

### Vertical Space

```typescript
<Space direction="vertical" size="middle">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
</Space>
```

### Different Sizes

```typescript
<Space size="small">
  <Button>Small</Button>
  <Button>Small</Button>
</Space>

<Space size="middle">
  <Button>Middle</Button>
  <Button>Middle</Button>
</Space>

<Space size="large">
  <Button>Large</Button>
  <Button>Large</Button>
</Space>
```

### With Split

```typescript
<Space split={<Divider type="vertical" />}>
  <Link>Link 1</Link>
  <Link>Link 2</Link>
  <Link>Link 3</Link>
</Space>
```

### Compact Mode

```typescript
<Space.Compact>
  <Input placeholder="Input" />
  <Button type="primary">Submit</Button>
</Space.Compact>
```

## Best Practices

1. **Use for inline spacing** - Use Space for spacing between inline elements
2. **Prefer over manual margins** - Use Space instead of manual margin styling
3. **Consistent sizing** - Use standard sizes (small, middle, large)
4. **Compact for forms** - Use Space.Compact for connected form components
5. **Wrap when needed** - Enable wrap for responsive layouts
