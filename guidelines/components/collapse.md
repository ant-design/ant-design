# Collapse Component

**Purpose**: Collapsible panels for showing and hiding content.

## When to Use

- Show/hide content sections
- Accordion-style content
- FAQ sections

## Basic Usage

```typescript
import { Collapse } from 'antd';

<Collapse
  items={[
    {
      key: '1',
      label: 'This is panel header 1',
      children: <p>Content</p>,
    },
  ]}
/>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `items` | Collapse items | CollapseItem[] | - |
| `activeKey` | Active panel keys | string \| string[] | - |
| `defaultActiveKey` | Default active keys | string \| string[] | - |
| `accordion` | Accordion mode (single open) | boolean | false |

## Best Practices

1. **Clear labels** - Provide clear panel labels
2. **Accordion mode** - Use accordion for single-open behavior
3. **Organized content** - Group related content in panels
