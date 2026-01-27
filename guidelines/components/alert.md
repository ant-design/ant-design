# Alert Component

**Purpose**: Display warning messages that require attention. Used for inline important messages.

## When to Use

- Show alert messages to users
- Display persistent static containers that are closable
- Show important information, warnings, or errors
- Display banner messages at the top of pages

## Basic Usage

```typescript
import { Alert } from 'antd';

<Alert message="Success Text" type="success" />
```

## Common Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `message` | Alert content | ReactNode | - |
| `description` | Additional content | ReactNode | - |
| `type` | Alert type | `'success'` \| `'info'` \| `'warning'` \| `'error'` | `'info'` |
| `closable` | Show close button | boolean | false |
| `showIcon` | Show icon | boolean | false |
| `icon` | Custom icon | ReactNode | - |
| `banner` | Show as banner | boolean | false |
| `action` | Custom action | ReactNode | - |
| `onClose` | Close handler | (e: MouseEvent) => void | - |

## Examples

### Different Types

```typescript
<Alert message="Success" type="success" />
<Alert message="Info" type="info" />
<Alert message="Warning" type="warning" />
<Alert message="Error" type="error" />
```

### With Description

```typescript
<Alert
  message="Success"
  description="Detailed description and advice about successful copywriting."
  type="success"
  showIcon
/>
```

### Closable

```typescript
<Alert
  message="Alert"
  type="info"
  closable
  onClose={() => console.log('Closed')}
/>
```

### Banner

```typescript
<Alert
  message="Banner Alert"
  type="warning"
  banner
  closable
/>
```

## Best Practices

1. **Appropriate type** - Use correct type for message severity
2. **Clear messages** - Provide clear, actionable messages
3. **Descriptions** - Use description for additional context
4. **Closable for dismissible** - Make alerts closable when users can dismiss them
5. **Banner for important** - Use banner mode for important page-level messages
