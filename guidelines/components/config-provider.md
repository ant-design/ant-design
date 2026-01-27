# ConfigProvider Component

**Purpose**: Global configuration for Ant Design components. Provides theme, locale, and other global settings.

## When to Use

- Configure global theme
- Set locale for internationalization
- Customize design tokens globally
- Configure component defaults

## Basic Usage

```typescript
import { ConfigProvider } from 'antd';

<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#00b96b',
    },
  }}
  locale={zhCN}
>
  <App />
</ConfigProvider>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `theme` | Theme configuration | ThemeConfig | - |
| `locale` | Locale configuration | Locale | - |
| `direction` | Text direction | `'ltr'` \| `'rtl'` | `'ltr'` |
| `componentSize` | Component size | `'small'` \| `'middle'` \| `'large'` | - |

## Best Practices

1. **Wrap app** - Wrap your entire app with ConfigProvider
2. **Theme customization** - Use theme prop for global customization
3. **Locale** - Set locale for internationalization
4. **Nested providers** - Can nest providers for different sections
