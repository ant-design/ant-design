# Components Overview

Ant Design provides a comprehensive set of React components for building enterprise-class applications. Always prefer components from the `antd` package (imported from `antd`) if they are available. Each component has detailed documentation and examples.

## Component Categories

### General Components

| Component  | Purpose                        | Guidelines File                            |
| ---------- | ------------------------------ | ------------------------------------------ |
| Button     | Trigger operations and actions | [button.md](components/button.md)          |
| Icon       | Semantic vector graphics       | See [overview-icons.md](overview-icons.md) |
| Typography | Text display and formatting    | [typography.md](components/typography.md)  |

### Layout Components

| Component | Purpose                    | Guidelines File                     |
| --------- | -------------------------- | ----------------------------------- |
| Layout    | Page layout container      | [layout.md](components/layout.md)   |
| Grid      | 24-column grid system      | [grid.md](components/grid.md)       |
| Space     | Spacing between components | [space.md](components/space.md)     |
| Divider   | Content divider            | [divider.md](components/divider.md) |
| Flex      | Flexbox layout             | [flex.md](components/flex.md)       |

### Navigation Components

| Component  | Purpose                  | Guidelines File                           |
| ---------- | ------------------------ | ----------------------------------------- |
| Menu       | Navigation menu          | [menu.md](components/menu.md)             |
| Tabs       | Tab panels with selector | [tabs.md](components/tabs.md)             |
| Breadcrumb | Breadcrumb navigation    | [breadcrumb.md](components/breadcrumb.md) |
| Pagination | Pagination controls      | [pagination.md](components/pagination.md) |
| Steps      | Step-by-step process     | [steps.md](components/steps.md)           |
| Anchor     | Anchor navigation        | [anchor.md](components/anchor.md)         |

### Data Entry Components

| Component   | Purpose                        | Guidelines File                               |
| ----------- | ------------------------------ | --------------------------------------------- |
| Form        | Form container with validation | [form.md](components/form.md)                 |
| Input       | Text input field               | [input.md](components/input.md)               |
| InputNumber | Number input field             | [input-number.md](components/input-number.md) |
| TextArea    | Multiline text input           | [textarea.md](components/textarea.md)         |
| Select      | Dropdown selector              | [select.md](components/select.md)             |
| Cascader    | Cascading selector             | [cascader.md](components/cascader.md)         |
| TreeSelect  | Tree selector                  | [tree-select.md](components/tree-select.md)   |
| Checkbox    | Checkbox input                 | [checkbox.md](components/checkbox.md)         |
| Radio       | Radio button group             | [radio.md](components/radio.md)               |
| Switch      | Toggle switch                  | [switch.md](components/switch.md)             |
| Slider      | Range slider                   | [slider.md](components/slider.md)             |
| Rate        | Rating component               | [rate.md](components/rate.md)                 |
| Upload      | File upload                    | [upload.md](components/upload.md)             |
| DatePicker  | Date picker                    | [date-picker.md](components/date-picker.md)   |
| TimePicker  | Time picker                    | [time-picker.md](components/time-picker.md)   |
| ColorPicker | Color picker                   | [color-picker.md](components/color-picker.md) |
| Transfer    | Transfer list                  | [transfer.md](components/transfer.md)         |

### Data Display Components

| Component    | Purpose                           | Guidelines File                               |
| ------------ | --------------------------------- | --------------------------------------------- |
| Table        | Data table with sorting/filtering | [table.md](components/table.md)               |
| List         | List display                      | [list.md](components/list.md)                 |
| Card         | Card container                    | [card.md](components/card.md)                 |
| Descriptions | Description list                  | [descriptions.md](components/descriptions.md) |
| Empty        | Empty state                       | [empty.md](components/empty.md)               |
| Badge        | Badge/notification count          | [badge.md](components/badge.md)               |
| Tag          | Tag/label                         | [tag.md](components/tag.md)                   |
| Avatar       | Avatar display                    | [avatar.md](components/avatar.md)             |
| Image        | Image display                     | [image.md](components/image.md)               |
| Carousel     | Carousel/slider                   | [carousel.md](components/carousel.md)         |
| Timeline     | Timeline display                  | [timeline.md](components/timeline.md)         |
| Tree         | Tree structure                    | [tree.md](components/tree.md)                 |
| Collapse     | Collapsible panels                | [collapse.md](components/collapse.md)         |
| Statistic    | Statistic display                 | [statistic.md](components/statistic.md)       |
| QRCode       | QR code display                   | [qrcode.md](components/qrcode.md)             |

### Feedback Components

| Component    | Purpose            | Guidelines File                               |
| ------------ | ------------------ | --------------------------------------------- |
| Alert        | Alert message      | [alert.md](components/alert.md)               |
| Modal        | Modal dialog       | [modal.md](components/modal.md)               |
| Drawer       | Drawer panel       | [drawer.md](components/drawer.md)             |
| Message      | Global message     | [message.md](components/message.md)           |
| Notification | Notification       | [notification.md](components/notification.md) |
| Popconfirm   | Popup confirmation | [popconfirm.md](components/popconfirm.md)     |
| Progress     | Progress indicator | [progress.md](components/progress.md)         |
| Skeleton     | Loading skeleton   | [skeleton.md](components/skeleton.md)         |
| Spin         | Loading spinner    | [spin.md](components/spin.md)                 |
| Result       | Result page        | [result.md](components/result.md)             |
| Tooltip      | Tooltip            | [tooltip.md](components/tooltip.md)           |
| Popover      | Popover            | [popover.md](components/popover.md)           |

### Other Components

| Component      | Purpose                | Guidelines File                                     |
| -------------- | ---------------------- | --------------------------------------------------- |
| ConfigProvider | Global configuration   | [config-provider.md](components/config-provider.md) |
| App            | App-level container    | [app.md](components/app.md)                         |
| FloatButton    | Floating action button | [float-button.md](components/float-button.md)       |
| BackTop        | Back to top button     | [back-top.md](components/back-top.md)               |
| Affix          | Affix/sticky element   | [affix.md](components/affix.md)                     |
| Watermark      | Watermark overlay      | [watermark.md](components/watermark.md)             |
| Tour           | Tour guide             | [tour.md](components/tour.md)                       |

## General Component Usage and Best Practices

### Common Props

Most Ant Design components accept these common props:

- `className`: String for additional CSS classes
- `style`: CSSProperties for inline styles
- `disabled`: Boolean to disable the component
- `size`: `'small'` | `'middle'` | `'large'` (default: `'middle'`)
- `loading`: Boolean to show loading state
- `prefixCls`: String for custom CSS class prefix (rarely needed)

### Controlled vs Uncontrolled

- **Controlled**: Component receives `value` and `onChange` props, parent manages state
- **Uncontrolled**: Component manages own state, use `defaultValue` for initial value
- Prefer controlled for most cases in modern React applications

### Sizing

Most components support `size` prop:

- `'small'`: Compact size (24px height for controls)
- `'middle'`: Default size (32px height for controls)
- `'large'`: Large size (40px height for controls)

### Form Components

- Always use `Form` component to wrap form controls
- Use `Form.Item` to wrap individual form fields
- Use `name` prop on `Form.Item` for form field identification
- Use `rules` prop for validation
- Access form values via `Form.useForm()` hook or `onFinish` callback

### Data Display Components

- Use `Table` for tabular data with sorting, filtering, pagination
- Use `List` for simple list displays
- Use `Card` for grouped content sections
- Use `Descriptions` for key-value pairs

### Feedback Components

- Use `message` for short, non-blocking notifications
- Use `notification` for longer, more detailed notifications
- Use `Modal` for important confirmations or forms
- Use `Alert` for inline important messages
- Use `Spin` or `Skeleton` for loading states

### Styling

**IMPORTANT**: Do not override component styles with `className` unless absolutely necessary. Instead:

- Use design tokens via theme configuration
- Use component-specific props for styling (e.g., `variant`, `color` for Button)
- Use `styles` prop (semantic DOM styling) when available
- Use `ConfigProvider` theme customization for global changes

### Accessibility

- All components follow WCAG 2.1 AA standards
- Components include proper ARIA attributes
- Keyboard navigation is supported
- Focus management is handled automatically
- Screen reader support is built-in

### Internationalization

- Use `ConfigProvider` with `locale` prop for internationalization
- Locale files are in `components/locale/`
- Format: `locale_COUNTRY.ts` (e.g., `zh_CN.ts`, `en_US.ts`)

## Component Import Pattern

```typescript
// Import components

// Import icons
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Table } from 'antd';
// Import types
import type { ButtonProps, FormProps } from 'antd';
```

## Getting Help

If a component guideline file doesn't exist:

1. Check the component's documentation in `components/[component-name]/index.en-US.md`
2. Check the component's demo files in `components/[component-name]/demo/`
3. Check the component's source code in `components/[component-name]/`
