# Flex Component

**Purpose**: Flexbox layout component for flexible layouts.

## When to Use

- Need flexible box layout
- Align items in rows or columns
- Distribute space between elements
- More control than Space component

## Basic Usage

```typescript
import { Flex } from 'antd';

<Flex>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>
```

## Common Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `vertical` | Vertical layout | boolean | false |
| `wrap` | Wrap items | boolean | false |
| `gap` | Gap between items | number \| string \| [number, number] | - |
| `justify` | Justify content | `'start'` \| `'end'` \| `'center'` \| `'space-between'` \| `'space-around'` \| `'space-evenly'` | `'start'` |
| `align` | Align items | `'start'` \| `'end'` \| `'center'` \| `'baseline'` \| `'stretch'` | `'start'` |

## Examples

### Vertical Layout

```typescript
<Flex vertical gap="middle">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>
```

### Justify Content

```typescript
<Flex justify="space-between">
  <div>Left</div>
  <div>Right</div>
</Flex>
```

### With Gap

```typescript
<Flex gap={16}>
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>
```

## Best Practices

1. **Use for block layouts** - Use Flex for block-level element layouts
2. **More control than Space** - Use Flex when you need more layout control
3. **Gap for spacing** - Use gap prop for consistent spacing
4. **Responsive** - Combine with responsive utilities for mobile layouts
