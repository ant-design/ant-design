---
name: antd-components
description: This skill should be used when the user wants to build React UI interfaces using Ant Design (antd). It intelligently selects the most suitable component from 60+ available options, extracts props based on detailed specifications, and generates correct component code.
---

# Ant Design Components Skill

This skill provides a comprehensive workflow for building React UI interfaces using Ant Design. It handles component selection, props configuration, and code generation.

## Workflow

To build UI with Ant Design, follow these steps:

### 1. Intelligent Component Selection

Analyze the user's UI requirements to determine the most appropriate component(s). Use the following guidelines (and consult `references/` for detailed specs):

- **General**:
  - `Button`: Trigger operations and actions
  - `Icon`: Display icons
  - `Typography`: Text content with various styles

- **Layout**:
  - `Layout`: Page-level layout structure
  - `Grid` / `Row` / `Col`: 24-column grid system
  - `Space`: Spacing between elements
  - `Flex`: Flexbox container
  - `Divider`: Content separator
  - `Splitter`: Resizable split panels

- **Navigation**:
  - `Menu`: Site navigation menu
  - `Tabs`: Tab-based navigation
  - `Breadcrumb`: Breadcrumb navigation
  - `Pagination`: Page navigation
  - `Steps`: Step-by-step wizard
  - `Dropdown`: Dropdown menu
  - `Anchor`: Anchor links
  - `Affix`: Sticky positioning
  - `BackTop`: Back to top button

- **Data Entry**:
  - `Form`: Form container with validation
  - `Input`: Text input field
  - `InputNumber`: Numeric input
  - `Select`: Dropdown selection
  - `Cascader`: Cascading selection
  - `TreeSelect`: Tree structure selection
  - `Checkbox`: Multiple choice
  - `Radio`: Single choice
  - `Switch`: Toggle switch
  - `Slider`: Slider input
  - `DatePicker` / `TimePicker`: Date/time selection
  - `Upload`: File upload
  - `Transfer`: Transfer items between lists
  - `AutoComplete`: Auto-complete input
  - `Mentions`: @mention input
  - `Rate`: Star rating
  - `ColorPicker`: Color selection
  - `Segmented`: Segmented control

- **Data Display**:
  - `Table`: Data table with sorting, filtering, pagination
  - `List`: List display
  - `Tree`: Tree structure display
  - `Card`: Content container card
  - `Collapse`: Collapsible panels
  - `Descriptions`: Descriptive list
  - `Carousel`: Image carousel
  - `Calendar`: Calendar display
  - `Avatar`: User avatar
  - `Badge`: Badge indicator
  - `Tag`: Tag label
  - `Tooltip`: Tooltip hint
  - `Popover`: Popover card
  - `Timeline`: Timeline display
  - `Statistic`: Statistic display
  - `Image`: Image preview
  - `Empty`: Empty state
  - `QRCode`: QR code generator
  - `Tour`: Feature tour

- **Feedback**:
  - `Alert`: Alert messages
  - `Modal`: Modal dialog
  - `Drawer`: Drawer panel
  - `Message`: Global message
  - `Notification`: Notification prompts
  - `Popconfirm`: Confirmation popover
  - `Progress`: Progress indicator
  - `Spin`: Loading spinner
  - `Skeleton`: Loading skeleton
  - `Result`: Result page

- **Other**:
  - `ConfigProvider`: Global configuration
  - `App`: Application container
  - `FloatButton`: Floating action button
  - `Watermark`: Watermark

### 2. Props Configuration

Once a component is selected, read the corresponding file in the `references/` directory (e.g., `references/Button.md`) to identify the required and optional props. Extract the requirements from the user's input and map them to the correct props format.

### 3. Code Generation

Generate React component code following these patterns:

**Import Format:**

```tsx
// or for multiple components
import { Button, ComponentName, Form, Input } from 'antd';
```

**TypeScript Props:**

```tsx
import type { ComponentNameProps } from 'antd';
```

**Basic Component Usage:**

```tsx
import React from 'react';
import { Button } from 'antd';

const App: React.FC = () => (
  <Button type="primary" onClick={() => console.log('clicked')}>
    Click me
  </Button>
);

export default App;
```

### 4. Best Practices

Follow these guidelines when generating antd code:

- **Use TypeScript**: Always provide type annotations
- **Use functional components**: Prefer `React.FC` with hooks
- **Import optimization**: Only import needed components
- **Props naming**: Follow antd conventions (`onChange`, `onSelect`, etc.)
- **Controlled vs Uncontrolled**: Use `value`/`onChange` for controlled, `defaultValue` for uncontrolled
- **Form integration**: Wrap inputs in `Form.Item` with proper `name` prop
- **Responsive design**: Use Grid system for layout
- **Theme customization**: Use `ConfigProvider` for theming

## Reference Material

Detailed specifications for each component are located in the `references/` directory. Consult these files to ensure the props passed to components match the expected schema.
