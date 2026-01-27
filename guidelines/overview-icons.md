# Icon System Overview

Ant Design uses the `@ant-design/icons` package for all icons. Icons are React components that render SVG graphics.

## Installation

Icons are provided by a separate package that must be installed:

```bash
npm install @ant-design/icons@5.x --save
# or
yarn add @ant-design/icons@5.x
# or
pnpm install @ant-design/icons@5.x --save
```

**IMPORTANT**: Always use `@ant-design/icons@5.x` with `antd@5.x` to avoid version mismatch issues.

## Icon Themes

Ant Design icons come in three themes:

1. **Outlined** (default) - Line icons with `Outlined` suffix
2. **Filled** - Solid icons with `Filled` suffix
3. **TwoTone** - Two-color icons with `TwoTone` suffix

## Usage Pattern

```typescript
import {
  SearchOutlined,      // Outlined theme
  SearchFilled,         // Filled theme
  SearchTwoTone         // TwoTone theme
} from '@ant-design/icons';

// Basic usage
<SearchOutlined />
<SearchFilled />
<SearchTwoTone twoToneColor="#eb2f96" />
```

## Icon Naming Convention

- Icon names are in **PascalCase**
- Outlined icons: `[Name]Outlined` (e.g., `UserOutlined`, `HomeOutlined`)
- Filled icons: `[Name]Filled` (e.g., `UserFilled`, `HomeFilled`)
- TwoTone icons: `[Name]TwoTone` (e.g., `HeartTwoTone`, `StarTwoTone`)

## Common Props

All icons accept these props:

| Property       | Description                               | Type          | Default |
| -------------- | ----------------------------------------- | ------------- | ------- |
| `className`    | CSS class name                            | string        | -       |
| `style`        | Inline styles (e.g., `fontSize`, `color`) | CSSProperties | -       |
| `rotate`       | Rotate icon by degrees                    | number        | -       |
| `spin`         | Rotate icon with animation                | boolean       | false   |
| `twoToneColor` | Primary color for TwoTone icons           | string (hex)  | -       |

## Using Icons with Components

### With Button

```typescript
import { Button } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';

<Button icon={<SearchOutlined />}>Search</Button>
<Button icon={<DownloadOutlined />} />
```

### With Input

```typescript
import { Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

<Input prefix={<UserOutlined />} placeholder="Username" />
<Input.Password prefix={<LockOutlined />} placeholder="Password" />
```

### With Menu

```typescript
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

<Menu
  items={[
    { key: '1', icon: <HomeOutlined />, label: 'Home' },
    { key: '2', icon: <UserOutlined />, label: 'Profile' },
    { key: '3', icon: <SettingOutlined />, label: 'Settings' },
  ]}
/>
```

### With Tabs

```typescript
import { Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';

<Tabs
  items={[
    { key: '1', label: <span><AppleOutlined />iOS</span>, children: 'iOS Content' },
    { key: '2', label: <span><AndroidOutlined />Android</span>, children: 'Android Content' },
  ]}
/>
```

## Icon Sizing

Icons inherit size from their container or can be styled directly:

```typescript
// Small icon
<SearchOutlined style={{ fontSize: '12px' }} />

// Medium icon (default)
<SearchOutlined style={{ fontSize: '16px' }} />

// Large icon
<SearchOutlined style={{ fontSize: '24px' }} />
```

## Icon Colors

Icons inherit color from their parent or can be styled:

```typescript
// Inherit color
<SearchOutlined style={{ color: 'inherit' }} />

// Custom color
<SearchOutlined style={{ color: '#1890ff' }} />

// Using design tokens (in styled components)
import { theme } from 'antd';
const { token } = theme.useToken();
<SearchOutlined style={{ color: token.colorPrimary }} />
```

## TwoTone Icons

TwoTone icons have a special `twoToneColor` prop:

```typescript
import { HeartTwoTone, StarTwoTone } from '@ant-design/icons';

<HeartTwoTone twoToneColor="#eb2f96" />
<StarTwoTone twoToneColor="#faad14" />
```

You can also set a global default two-tone color:

```typescript
import { getTwoToneColor, setTwoToneColor } from '@ant-design/icons';

// Set global default
setTwoToneColor('#1890ff');

// Get current default
const currentColor = getTwoToneColor();
```

## Icon Animation

Use the `spin` prop for rotating animation:

```typescript
import { LoadingOutlined } from '@ant-design/icons';

<LoadingOutlined spin />
```

## Finding Icons

- Browse icons on the [Ant Design website](https://ant.design/components/icon)
- Search by name in the icon picker
- Check the `@ant-design/icons` package in `node_modules/@ant-design/icons/es/icons/`

## Best Practices

1. **Always import icons explicitly** - Don't import the entire icon library
2. **Use appropriate theme** - Prefer `Outlined` for most cases, `Filled` for emphasis
3. **Match icon size to context** - Use 16px for small UI, 24px for buttons, larger for hero sections
4. **Use semantic icons** - Choose icons that clearly represent their function
5. **Maintain consistency** - Use the same icon theme throughout your application
6. **Accessibility** - Icons should have text labels or `aria-label` when used alone

## Common Icons

Here are some commonly used icons:

### Navigation

- `HomeOutlined`, `MenuOutlined`, `AppstoreOutlined`, `BarsOutlined`

### Actions

- `SearchOutlined`, `PlusOutlined`, `EditOutlined`, `DeleteOutlined`, `SaveOutlined`, `DownloadOutlined`, `UploadOutlined`

### User

- `UserOutlined`, `UserAddOutlined`, `TeamOutlined`, `SettingOutlined`

### Communication

- `MessageOutlined`, `MailOutlined`, `PhoneOutlined`, `NotificationOutlined`

### Status

- `CheckCircleOutlined`, `CloseCircleOutlined`, `ExclamationCircleOutlined`, `InfoCircleOutlined`

### Direction

- `ArrowLeftOutlined`, `ArrowRightOutlined`, `ArrowUpOutlined`, `ArrowDownOutlined`

### Media

- `PictureOutlined`, `VideoCameraOutlined`, `FileOutlined`, `FolderOutlined`

## Custom Icons

If you need a custom icon, you can create one:

```typescript
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

<IconFont type="icon-example" />
```

Or use a custom SVG component:

```typescript
import { Icon } from '@ant-design/icons';

const CustomIcon = (props) => (
  <Icon
    component={() => (
      <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
        {/* Your SVG path */}
      </svg>
    )}
    {...props}
  />
);
```
