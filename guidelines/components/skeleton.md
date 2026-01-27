# Skeleton Component

**Purpose**: Loading skeleton placeholder for content.

## When to Use

- Show loading placeholders
- Better UX than spinners for content loading
- Indicate content structure while loading

## Basic Usage

```typescript
import { Skeleton } from 'antd';

<Skeleton />
<Skeleton active />
<Skeleton avatar paragraph={{ rows: 4 }} />
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `active` | Show animation | boolean | false |
| `avatar` | Show avatar placeholder | boolean \| SkeletonAvatarProps | false |
| `paragraph` | Paragraph placeholder | boolean \| SkeletonParagraphProps | true |
| `title` | Show title placeholder | boolean \| SkeletonTitleProps | true |

## Best Practices

1. **Match content** - Match skeleton structure to actual content
2. **Active animation** - Use active for better visual feedback
3. **Appropriate rows** - Set appropriate paragraph rows
