# Divider Component

**Purpose**: Content divider for separating sections.

## When to Use

- Separate content sections
- Divide different types of content
- Create visual separation between elements

## Basic Usage

```typescript
import { Divider } from 'antd';

<Divider />
```

## Common Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `type` | Divider type | `'horizontal'` \| `'vertical'` | `'horizontal'` |
| `orientation` | Text orientation | `'left'` \| `'right'` \| `'center'` | `'center'` |
| `orientationMargin` | Margin for text | number \| string | - |
| `dashed` | Dashed line | boolean | false |
| `plain` | Plain text (no border) | boolean | false |

## Examples

### With Text

```typescript
<Divider>Text</Divider>
<Divider orientation="left">Left Text</Divider>
<Divider orientation="right">Right Text</Divider>
```

### Dashed

```typescript
<Divider dashed>Dashed</Divider>
```

### Vertical

```typescript
<Space>
  <span>Text</span>
  <Divider type="vertical" />
  <span>Text</span>
  <Divider type="vertical" />
  <span>Text</span>
</Space>
```

## Best Practices

1. **Use for separation** - Use dividers to separate distinct content sections
2. **Avoid overuse** - Don't use too many dividers, use spacing instead when possible
3. **Text orientation** - Use appropriate text orientation for context
4. **Vertical dividers** - Use vertical dividers in inline contexts (Space, etc.)
