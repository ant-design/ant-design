# Color Design Tokens

Ant Design uses a comprehensive color token system based on **Seed Tokens**, **Map Tokens**, and **Alias Tokens**. This system ensures consistent colors across all components and supports theme customization.

## Token Hierarchy

1. **Seed Token**: Base color values (e.g., `colorPrimary`, `colorSuccess`)
2. **Map Token**: Derived colors from seed tokens (e.g., `colorPrimary-1` through `colorPrimary-10`)
3. **Alias Token**: Semantic color tokens used by components (e.g., `colorText`, `colorBgContainer`)

## Naming Pattern

Ant Design color tokens follow this pattern: `color{Category}{Role}{State}`

- **Category**: `Text`, `Bg`, `Border`, `Fill`, `Link`
- **Role**: `Primary`, `Success`, `Warning`, `Error`, `Info` (optional)
- **State**: `Hover`, `Active`, `Disabled` (optional)

## Quick Decision Tree

**Need a background color?** → Start with `colorBg` or `colorFill` → Add role if semantic meaning needed (e.g., `colorBgPrimary`) → Use `-hover` or `-active` for interactions

**Need text color?** → Start with `colorText` → Add role if semantic meaning needed (e.g., `colorTextPrimary`) → Use `-disabled` for disabled state

**Need a border color?** → Start with `colorBorder` → Add role if needed (e.g., `colorBorderPrimary`) → Use `-hover` for hover state

**Need a link color?** → Use `colorLink` → Use `colorLinkHover` for hover state → Use `colorLinkActive` for active state

## Seed Tokens (Base Colors)

These are the foundation colors that generate the entire color system:

### Brand Colors

- **`colorPrimary`**: Brand primary color (default: `#1677ff`)
  - Used for: Primary buttons, links, brand elements
  - Generates: `colorPrimary-1` through `colorPrimary-10` gradient

- **`colorSuccess`**: Success color (default: `#52c41a`)
  - Used for: Success messages, success states
  - Generates: `colorSuccess-1` through `colorSuccess-10` gradient

- **`colorWarning`**: Warning color (default: `#faad14`)
  - Used for: Warning messages, warning states
  - Generates: `colorWarning-1` through `colorWarning-10` gradient

- **`colorError`**: Error color (default: `#ff4d4f`)
  - Used for: Error messages, destructive actions
  - Generates: `colorError-1` through `colorError-10` gradient

- **`colorInfo`**: Info color (default: `#1677ff`)
  - Used for: Informational messages
  - Generates: `colorInfo-1` through `colorInfo-10` gradient

### Base Colors

- **`colorTextBase`**: Base text color (default: `rgba(0, 0, 0, 0.88)`)
  - **DO NOT use directly** - Use derived tokens instead

- **`colorBgBase`**: Base background color (default: `#ffffff`)
  - **DO NOT use directly** - Use derived tokens instead

- **`colorLink`**: Link color (default: `#1677ff`)

## Alias Tokens (Semantic Colors)

These are the tokens you should use in your code:

### Background Colors

#### Container Backgrounds

- **`colorBgContainer`**: Main container background (default: `#ffffff`)
  - Use for: Card backgrounds, modal backgrounds, drawer backgrounds

- **`colorBgElevated`**: Elevated surface background (default: `#ffffff`)
  - Use for: Popover backgrounds, dropdown menus, tooltips

- **`colorBgLayout`**: Layout background (default: `#f5f5f5`)
  - Use for: Page background, layout background

- **`colorBgSpotlight`**: Spotlight background (default: `rgba(0, 0, 0, 0.85)`)
  - Use for: Backdrop overlays, modal backdrops

#### Fill Colors

- **`colorFill`**: Default fill color (default: `rgba(0, 0, 0, 0.06)`)
  - Use for: Disabled states, subtle backgrounds

- **`colorFillSecondary`**: Secondary fill color (default: `rgba(0, 0, 0, 0.12)`)
  - Use for: Hover states, secondary backgrounds

- **`colorFillTertiary`**: Tertiary fill color (default: `rgba(0, 0, 0, 0.04)`)
  - Use for: Subtle backgrounds, disabled states

- **`colorFillQuaternary`**: Quaternary fill color (default: `rgba(0, 0, 0, 0.02)`)
  - Use for: Very subtle backgrounds

#### Semantic Background Colors

- **`colorBgPrimary`**: Primary background (light tint of primary color)
- **`colorBgSuccess`**: Success background (light tint of success color)
- **`colorBgWarning`**: Warning background (light tint of warning color)
- **`colorBgError`**: Error background (light tint of error color)
- **`colorBgInfo`**: Info background (light tint of info color)

### Text Colors

- **`colorText`**: Default text color (default: `rgba(0, 0, 0, 0.88)`)
  - Use for: Body text, default content

- **`colorTextSecondary`**: Secondary text color (default: `rgba(0, 0, 0, 0.65)`)
  - Use for: Secondary content, descriptions

- **`colorTextTertiary`**: Tertiary text color (default: `rgba(0, 0, 0, 0.45)`)
  - Use for: Placeholders, hints, disabled text

- **`colorTextQuaternary`**: Quaternary text color (default: `rgba(0, 0, 0, 0.25)`)
  - Use for: Very subtle text

- **`colorTextDisabled`**: Disabled text color (default: `rgba(0, 0, 0, 0.25)`)
  - Use for: Disabled form fields, disabled buttons

- **`colorTextHeading`**: Heading text color (default: `rgba(0, 0, 0, 0.88)`)
  - Use for: Page titles, section headings

- **`colorTextLabel`**: Label text color
- **`colorTextDescription`**: Description text color
- **`colorTextLightSolid`**: Text on solid backgrounds (default: `#ffffff`)
  - Use for: Text on primary buttons, text on colored backgrounds

#### Semantic Text Colors

- **`colorTextPrimary`**: Primary text color (uses primary color)
- **`colorTextSuccess`**: Success text color (uses success color)
- **`colorTextWarning`**: Warning text color (uses warning color)
- **`colorTextError`**: Error text color (uses error color)
- **`colorTextInfo`**: Info text color (uses info color)

### Border Colors

- **`colorBorder`**: Default border color (default: `#d9d9d9`)
  - Use for: Input borders, card borders, divider lines

- **`colorBorderSecondary`**: Secondary border color (default: `#f0f0f0`)
  - Use for: Subtle borders, inner dividers

- **`colorBorderPrimary`**: Primary border color (uses primary color)
- **`colorBorderSuccess`**: Success border color (uses success color)
- **`colorBorderWarning`**: Warning border color (uses warning color)
- **`colorBorderError`**: Error border color (uses error color)
- **`colorBorderInfo`**: Info border color (uses info color)

- **`colorSplit`**: Separator color (default: `rgba(5, 5, 5, 0.06)`)
  - Use for: Dividers, separators

### Link Colors

- **`colorLink`**: Link color (default: `#1677ff`)
- **`colorLinkHover`**: Link hover color
- **`colorLinkActive`**: Link active color

### Icon Colors

- **`colorIcon`**: Default icon color (default: `rgba(0, 0, 0, 0.45)`)
- **`colorIconHover`**: Icon hover color (default: `rgba(0, 0, 0, 0.88)`)
- **`colorIconActive`**: Icon active color

## Color Gradients

Each seed color generates a 10-step gradient:

- `colorPrimary-1` through `colorPrimary-10` (lightest to darkest)
- `colorSuccess-1` through `colorSuccess-10`
- `colorWarning-1` through `colorWarning-10`
- `colorError-1` through `colorError-10`
- `colorInfo-1` through `colorInfo-10`

**Usage**: These are typically used internally by components. Use alias tokens instead.

## Usage Examples

### Correct Usage

```typescript
import { theme } from 'antd';

const { token } = theme.useToken();

// ✅ CORRECT - Using semantic tokens
<div style={{
  backgroundColor: token.colorBgContainer,
  color: token.colorText,
  border: `1px solid ${token.colorBorder}`
}}>
  Content
</div>

// ✅ CORRECT - Using semantic tokens for states
<button style={{
  backgroundColor: token.colorPrimary,
  color: token.colorTextLightSolid
}}>
  Primary Button
</button>

// ✅ CORRECT - Using theme configuration
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1890ff',
    },
  }}
>
  {/* Your app */}
</ConfigProvider>
```

### Incorrect Usage

```typescript
// ❌ WRONG - Hardcoding colors
<div style={{ backgroundColor: '#ffffff', color: '#000000' }}>

// ❌ WRONG - Using seed tokens directly
<div style={{ backgroundColor: token.colorBgBase }}>

// ❌ WRONG - Using gradient tokens directly
<div style={{ backgroundColor: token.colorPrimary1 }}>
```

## Dark Theme Support

All color tokens automatically adapt to dark theme when using `darkAlgorithm`:

```typescript
import { ConfigProvider, theme } from 'antd';

<ConfigProvider
  theme={{
    algorithm: theme.darkAlgorithm,
  }}
>
  {/* Your app - all tokens automatically adapt */}
</ConfigProvider>
```

## Customizing Colors

### Global Theme Customization

```typescript
import { ConfigProvider } from 'antd';

<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#722ed1',      // Change primary color
      colorSuccess: '#52c41a',        // Change success color
      colorWarning: '#faad14',        // Change warning color
      colorError: '#f5222d',          // Change error color
      colorInfo: '#1890ff',           // Change info color
    },
  }}
>
  {/* Your app */}
</ConfigProvider>
```

### Component-Level Customization

```typescript
<ConfigProvider
  theme={{
    components: {
      Button: {
        colorPrimary: '#722ed1',     // Override for Button only
      },
    },
  }}
>
  {/* Your app */}
</ConfigProvider>
```

## Best Practices

1. **Always use alias tokens** - Never use seed tokens or gradient tokens directly
2. **Use semantic tokens** - Choose tokens that match the semantic meaning (e.g., `colorTextError` for error text)
3. **Respect the hierarchy** - Use `colorText`, `colorTextSecondary`, `colorTextTertiary` for text hierarchy
4. **Use theme configuration** - Customize colors via `ConfigProvider` theme, not hardcoded values
5. **Test in dark mode** - Ensure your colors work in both light and dark themes
6. **Maintain contrast** - Ensure sufficient contrast ratios for accessibility (WCAG AA)
