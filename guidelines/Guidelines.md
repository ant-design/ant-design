# Ant Design Guidelines for Figma Make

This project uses **Ant Design (antd)**, a comprehensive React UI component library and design system. Files in the `guidelines` directory show how to use Ant Design components and design tokens correctly.

## Always Read First

Before writing any code, you MUST read these files in order:

1. **All files with names starting with `overview-`** in the guidelines directory:
   - `overview-components.md` - Component overview and usage patterns
   - `overview-icons.md` - Icon system and usage

2. **All files in the `design-tokens/` folder**:
   - `design-tokens/colors.md` - Color token system
   - `design-tokens/typography.md` - Typography tokens
   - `design-tokens/spacing.md` - Spacing and size tokens

## Component Usage Guidelines - READ THIS FIRST

**IMPORTANT**: Always prefer to use components from Ant Design if they exist. For example, prefer to use a `Button` component from `antd`, rather than regular HTML button elements.

**IMPORTANT**: Follow these steps IN ORDER before writing any code:

### Step 1: Read Overview Files (REQUIRED)

Read ALL files with a name that starts with "overview-" in the guidelines directory:

- `overview-components.md`
- `overview-icons.md` (And any other `overview-*.md` files)

### Step 2: Read Design Tokens (REQUIRED)

Read ALL files in the `design-tokens/` folder. Do NOT skip this step. Design tokens are essential for creating consistent, themeable UI.

### Step 3: Plan What Components You Need to Use (REQUIRED)

Before using ANY component, check if Ant Design provides it. Common components include:

- Form controls: Button, Input, Select, Checkbox, Radio, Switch, etc.
- Data display: Table, List, Card, Tag, Badge, etc.
- Feedback: Modal, Message, Notification, Alert, etc.
- Navigation: Menu, Tabs, Breadcrumb, Pagination, etc.
- Layout: Layout, Grid, Space, Divider, etc.

### Step 4: Read Component Guidelines BEFORE Using Components (REQUIRED)

BEFORE using ANY component, you MUST read its guidelines file first:

- Using Button? → Read `guidelines/components/button.md` FIRST
- Using Input? → Read `guidelines/components/input.md` FIRST
- Using Form? → Read `guidelines/components/form.md` FIRST
- Using Table? → Read `guidelines/components/table.md` FIRST

If a component guideline file doesn't exist, check the component's documentation in `components/[component-name]/index.en-US.md` or `components/[component-name]/index.zh-CN.md`.

### Step 5: Plan What Icons You Need to Use (REQUIRED)

Before using ANY icon, you must check if that icon exists in the `@ant-design/icons` package. If it doesn't, pick a different icon and verify the new icon exists.

**DO NOT write code using a component until you have read its specific guidelines.**

## Import Pattern

Always import components from `antd`:

```typescript
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Table } from 'antd';
```

## Design Token Usage

**NEVER hardcode colors, sizes, spacing, or typography values.** Always use design tokens from Ant Design's theme system. Access tokens through:

1. **Theme configuration** via `ConfigProvider`:

```typescript
import { ConfigProvider } from 'antd';

<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 6,
    },
  }}
>
  {/* Your app */}
</ConfigProvider>
```

2. **CSS Variables** (when enabled):

```css
.my-component {
  color: var(--ant-color-primary);
  padding: var(--ant-padding-md);
}
```

3. **useToken hook** in component styles:

```typescript
import { theme } from 'antd';

const { token } = theme.useToken();
// Use token.colorPrimary, token.paddingMD, etc.
```

## Additional Resources

- Component source code: `components/[component-name]/`
- Component documentation: `components/[component-name]/index.en-US.md`
- Design tokens interface: `components/theme/interface/`
- Design specifications: `docs/spec/`
