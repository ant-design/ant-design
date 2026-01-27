# Avatar Component

**Purpose**: Avatar display for users or entities.

## When to Use

- Display user avatars
- Show entity images
- Fallback to initials or icons

## Basic Usage

```typescript
import { Avatar } from 'antd';

<Avatar src="image.jpg" />
<Avatar>U</Avatar>
<Avatar icon={<UserOutlined />} />
```

## Common Props

| Property | Description  | Type                                            | Default     |
| -------- | ------------ | ----------------------------------------------- | ----------- |
| `src`    | Image source | string                                          | -           |
| `icon`   | Icon         | ReactNode                                       | -           |
| `size`   | Avatar size  | number \| `'large'` \| `'small'` \| `'default'` | `'default'` |
| `shape`  | Avatar shape | `'circle'` \| `'square'`                        | `'circle'`  |

## Best Practices

1. **Fallback** - Provide fallback (initials or icon)
2. **Consistent sizing** - Use consistent sizes
3. **Accessible** - Include alt text or aria-label
