# QRCode Component

**Purpose**: QR code display component.

## When to Use

- Display QR codes
- Share links or information
- Mobile scanning

## Basic Usage

```typescript
import { QRCode } from 'antd';

<QRCode value="https://ant.design/" />
```

## Common Props

| Property     | Description            | Type                             | Default |
| ------------ | ---------------------- | -------------------------------- | ------- |
| `value`      | QR code value          | string                           | -       |
| `size`       | QR code size           | number                           | 160     |
| `errorLevel` | Error correction level | `'L'` \| `'M'` \| `'Q'` \| `'H'` | `'M'`   |
| `icon`       | Icon in center         | string                           | -       |

## Best Practices

1. **Clear value** - Provide valid QR code value
2. **Appropriate size** - Set size based on display context
3. **Error level** - Use higher error level for important codes
