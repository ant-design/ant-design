# Input Component

**Purpose**: Text input field for single-line text entry.

## When to Use

- Use `Input` for single-line text input
- Use `Input.Password` for password fields
- Use `Input.Search` for search inputs with search button
- Use `Input.TextArea` for multiline text input (or use `TextArea` component)
- Use `Input.Group` for input groups with addons

## Basic Usage

```typescript
import { Input } from 'antd';

// Basic input
<Input placeholder="Enter text" />

// Controlled input
const [value, setValue] = useState('');
<Input value={value} onChange={(e) => setValue(e.target.value)} />

// Uncontrolled input
<Input defaultValue="Initial value" />
```

## Input Variants

### Password Input

```typescript
import { Input } from 'antd';

<Input.Password placeholder="Enter password" />
```

### Search Input

```typescript
<Input.Search
  placeholder="Search"
  onSearch={(value) => console.log(value)}
  enterButton
/>
```

### TextArea

```typescript
<Input.TextArea
  rows={4}
  placeholder="Enter multiline text"
/>
```

Or use the dedicated `TextArea` component:

```typescript
import { Input } from 'antd';
const { TextArea } = Input;

<TextArea rows={4} placeholder="Enter text" />
```

## Common Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Input value (controlled) | string | - |
| `defaultValue` | Default value (uncontrolled) | string | - |
| `placeholder` | Placeholder text | string | - |
| `size` | Input size | `'small'` \| `'middle'` \| `'large'` | `'middle'` |
| `prefix` | Prefix icon or element | ReactNode | - |
| `suffix` | Suffix icon or element | ReactNode | - |
| `addonBefore` | Addon before input | ReactNode | - |
| `addonAfter` | Addon after input | ReactNode | - |
| `allowClear` | Show clear button | boolean | false |
| `disabled` | Disabled state | boolean | false |
| `readOnly` | Read-only state | boolean | false |
| `maxLength` | Maximum length | number | - |
| `showCount` | Show character count | boolean | false |
| `onChange` | Change handler | (e: ChangeEvent) => void | - |
| `onPressEnter` | Enter key handler | (e: KeyboardEvent) => void | - |

## Examples

### With Icons

```typescript
import { Input } from 'antd';
import { UserOutlined, LockOutlined, SearchOutlined } from '@ant-design/icons';

<Input prefix={<UserOutlined />} placeholder="Username" />
<Input.Password prefix={<LockOutlined />} placeholder="Password" />
<Input suffix={<SearchOutlined />} placeholder="Search" />
```

### Sizes

```typescript
<Input size="small" placeholder="Small" />
<Input size="middle" placeholder="Middle" />
<Input size="large" placeholder="Large" />
```

### With Addons

```typescript
<Input.Group compact>
  <Input style={{ width: '20%' }} defaultValue="0571" />
  <Input style={{ width: '30%' }} defaultValue="26888888" />
</Input.Group>

<Input
  addonBefore="https://"
  addonAfter=".com"
  defaultValue="mysite"
/>
```

### Clearable Input

```typescript
<Input allowClear placeholder="Clearable input" />
```

### With Character Count

```typescript
<Input showCount maxLength={20} placeholder="Max 20 characters" />
<Input.TextArea showCount maxLength={100} rows={4} />
```

### Disabled and ReadOnly

```typescript
<Input disabled value="Disabled input" />
<Input readOnly value="Read-only input" />
```

## Form Integration

Always use `Input` within `Form.Item` for proper validation and form handling:

```typescript
import { Form, Input } from 'antd';

<Form onFinish={handleSubmit}>
  <Form.Item
    name="username"
    rules={[{ required: true, message: 'Please input username!' }]}
  >
    <Input prefix={<UserOutlined />} placeholder="Username" />
  </Form.Item>

  <Form.Item
    name="password"
    rules={[{ required: true, message: 'Please input password!' }]}
  >
    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
  </Form.Item>
</Form>
```

## Status States

Inputs can have different status states when used in Forms:

```typescript
<Form.Item
  name="email"
  validateStatus="error"
  help="Please enter a valid email"
>
  <Input placeholder="Email" />
</Form.Item>
```

Status values: `'error'`, `'warning'`, `'success'`, `'validating'`

## Best Practices

1. **Always use in Forms** - Wrap inputs in `Form.Item` for proper validation
2. **Use appropriate input type** - Use `Input.Password` for passwords, `Input.Search` for search
3. **Provide placeholders** - Always include helpful placeholder text
4. **Show validation feedback** - Use Form validation for user feedback
5. **Use icons appropriately** - Prefix icons for context (user, lock, etc.)
6. **Character limits** - Use `maxLength` and `showCount` for text limits
7. **Clearable inputs** - Use `allowClear` for inputs where users might want to clear
8. **Accessible labels** - Always provide labels (via Form.Item or aria-label)

## Common Patterns

### Search Input

```typescript
<Input.Search
  placeholder="Search..."
  onSearch={(value) => handleSearch(value)}
  enterButton
  allowClear
/>
```

### Password with Strength Indicator

```typescript
<Form.Item
  name="password"
  rules={[
    { required: true },
    { min: 8, message: 'Password must be at least 8 characters' },
  ]}
>
  <Input.Password
    prefix={<LockOutlined />}
    placeholder="Password"
  />
</Form.Item>
```

### Input with Validation

```typescript
<Form.Item
  name="email"
  rules={[
    { required: true, message: 'Email is required' },
    { type: 'email', message: 'Invalid email format' },
  ]}
>
  <Input prefix={<MailOutlined />} placeholder="Email" />
</Form.Item>
```

## Accessibility

- Inputs are keyboard accessible by default
- Use `Form.Item` with `label` for proper labeling
- Use `aria-label` for icon-only inputs
- Ensure sufficient color contrast for validation states

## Styling

**IMPORTANT**: Do not override input styles with `className` unless absolutely necessary. Instead:

- Use `size` prop for sizing
- Use `prefix`/`suffix` for icons
- Use `ConfigProvider` theme customization for global changes
- Use design tokens for custom styling
