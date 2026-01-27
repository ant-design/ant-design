# Form Component

**Purpose**: Form container with validation, layout, and data management. The Form component is essential for all data entry in Ant Design applications.

## When to Use

- Use `Form` for any data collection (user input, settings, search filters, etc.)
- Always wrap form controls (Input, Select, etc.) in `Form.Item`
- Use `Form` for validation, error handling, and form state management

## Basic Usage

```typescript
import { Form, Input, Button } from 'antd';

const App = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
```

## Form Hook

Use `Form.useForm()` to access form instance for programmatic control:

```typescript
import { Form, Input, Button } from 'antd';

const App = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      username: 'hello',
      password: 'world',
    });
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
        <Button htmlType="button" onClick={onReset}>Reset</Button>
        <Button type="link" onClick={onFill}>Fill form</Button>
      </Form.Item>
    </Form>
  );
};
```

## Common Props

### Form Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `form` | Form instance from `Form.useForm()` | FormInstance | - |
| `name` | Form name | string | - |
| `layout` | Form layout | `'horizontal'` \| `'vertical'` \| `'inline'` | `'horizontal'` |
| `labelCol` | Label column layout | ColProps | - |
| `wrapperCol` | Wrapper column layout | ColProps | - |
| `colon` | Show colon after label | boolean | true |
| `requiredMark` | Required mark style | boolean \| `'optional'` | true |
| `onFinish` | Submit handler | (values) => void | - |
| `onFinishFailed` | Failed submit handler | (errorInfo) => void | - |
| `onValuesChange` | Values change handler | (changedValues, allValues) => void | - |
| `initialValues` | Initial form values | object | - |
| `preserve` | Preserve field values when removed | boolean | true |
| `validateMessages` | Custom validation messages | object | - |

### Form.Item Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `name` | Field name (required for form data) | string \| number \| (string \| number)[] | - |
| `label` | Label text | ReactNode | - |
| `rules` | Validation rules | Rule[] | - |
| `required` | Required field | boolean | false |
| `hasFeedback` | Show validation feedback icon | boolean | false |
| `validateStatus` | Validation status | `'success'` \| `'warning'` \| `'error'` \| `'validating'` | - |
| `help` | Help text | ReactNode | - |
| `extra` | Extra information | ReactNode | - |
| `tooltip` | Tooltip for label | ReactNode | - |
| `dependencies` | Dependencies for field updates | NamePath[] | - |
| `noStyle` | No style wrapper | boolean | false |
| `shouldUpdate` | Should update when values change | boolean \| (prevValues, curValues) => boolean | false |

## Validation Rules

### Built-in Rules

```typescript
<Form.Item
  name="email"
  rules={[
    { required: true, message: 'Email is required' },
    { type: 'email', message: 'Invalid email format' },
    { min: 6, message: 'Minimum 6 characters' },
    { max: 20, message: 'Maximum 20 characters' },
    { pattern: /^[A-Z]/, message: 'Must start with uppercase' },
  ]}
>
  <Input />
</Form.Item>
```

### Custom Validator

```typescript
<Form.Item
  name="password"
  rules={[
    { required: true },
    {
      validator: (_, value) => {
        if (!value || value.length >= 8) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Password must be at least 8 characters'));
      },
    },
  ]}
>
  <Input.Password />
</Form.Item>
```

### Async Validator

```typescript
<Form.Item
  name="username"
  rules={[
    { required: true },
    {
      validator: async (_, value) => {
        const exists = await checkUsernameExists(value);
        if (exists) {
          return Promise.reject(new Error('Username already exists'));
        }
      },
    },
  ]}
>
  <Input />
</Form.Item>
```

## Form Layouts

### Horizontal Layout (Default)

```typescript
<Form layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
  <Form.Item label="Username" name="username">
    <Input />
  </Form.Item>
</Form>
```

### Vertical Layout

```typescript
<Form layout="vertical">
  <Form.Item label="Username" name="username">
    <Input />
  </Form.Item>
</Form>
```

### Inline Layout

```typescript
<Form layout="inline">
  <Form.Item name="username">
    <Input placeholder="Username" />
  </Form.Item>
  <Form.Item name="password">
    <Input.Password placeholder="Password" />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">Submit</Button>
  </Form.Item>
</Form>
```

## Dependent Fields

### Basic Dependency

```typescript
<Form.Item
  name="password"
  rules={[{ required: true }]}
>
  <Input.Password />
</Form.Item>

<Form.Item
  name="confirmPassword"
  dependencies={['password']}
  rules={[
    { required: true },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Passwords do not match'));
      },
    }),
  ]}
>
  <Input.Password />
</Form.Item>
```

### Conditional Fields

```typescript
<Form.Item name="type">
  <Select>
    <Select.Option value="email">Email</Select.Option>
    <Select.Option value="phone">Phone</Select.Option>
  </Select>
</Form.Item>

<Form.Item
  noStyle
  shouldUpdate={(prevValues, currentValues) =>
    prevValues.type !== currentValues.type
  }
>
  {({ getFieldValue }) =>
    getFieldValue('type') === 'email' ? (
      <Form.Item name="email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
    ) : (
      <Form.Item name="phone" rules={[{ pattern: /^\d+$/ }]}>
        <Input />
      </Form.Item>
    )
  }
</Form.Item>
```

## Form Methods

Access form methods via `Form.useForm()`:

```typescript
const [form] = Form.useForm();

// Get field value
const username = form.getFieldValue('username');

// Get all values
const values = form.getFieldsValue();

// Set field value
form.setFieldsValue({ username: 'new value' });

// Set single field
form.setFieldValue('username', 'new value');

// Reset fields
form.resetFields();

// Reset specific field
form.resetFields(['username']);

// Validate fields
form.validateFields().then((values) => {
  console.log('Valid:', values);
});

// Validate specific field
form.validateFields(['username']);

// Get field error
const error = form.getFieldError('username');

// Check if field is touched
const touched = form.isFieldTouched('username');

// Check if field is dirty (changed)
const dirty = form.isFieldsTouched(['username'], true);
```

## Best Practices

1. **Always use Form.Item** - Wrap all form controls in `Form.Item` with `name` prop
2. **Use validation rules** - Always provide validation rules for required fields
3. **Provide helpful messages** - Use clear, actionable error messages
4. **Use form instance** - Use `Form.useForm()` for programmatic control
5. **Handle submit properly** - Use `htmlType="submit"` on submit button
6. **Use appropriate layout** - Choose layout based on form complexity
7. **Show feedback** - Use `hasFeedback` for visual validation feedback
8. **Dependent fields** - Use `dependencies` and `shouldUpdate` for dependent fields
9. **Initial values** - Use `initialValues` for default values, not `defaultValue` on controls
10. **Preserve values** - Use `preserve={false}` if you want to clear removed fields

## Common Patterns

### Login Form

```typescript
<Form onFinish={handleLogin}>
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
  <Form.Item>
    <Button type="primary" htmlType="submit" block>
      Login
    </Button>
  </Form.Item>
</Form>
```

### Form with Reset

```typescript
const [form] = Form.useForm();

<Form form={form} onFinish={handleSubmit}>
  {/* Form fields */}
  <Form.Item>
    <Space>
      <Button type="primary" htmlType="submit">Submit</Button>
      <Button onClick={() => form.resetFields()}>Reset</Button>
    </Space>
  </Form.Item>
</Form>
```

### Dynamic Form Fields

```typescript
<Form.List name="items">
  {(fields, { add, remove }) => (
    <>
      {fields.map((field) => (
        <Space key={field.key}>
          <Form.Item {...field} name={[field.name, 'name']}>
            <Input placeholder="Item name" />
          </Form.Item>
          <Form.Item {...field} name={[field.name, 'value']}>
            <Input placeholder="Item value" />
          </Form.Item>
          <Button onClick={() => remove(field.name)}>Remove</Button>
        </Space>
      ))}
      <Form.Item>
        <Button type="dashed" onClick={() => add()}>Add Item</Button>
      </Form.Item>
    </>
  )}
</Form.List>
```

## Accessibility

- Forms are keyboard accessible by default
- Labels are properly associated with inputs
- Error messages are announced to screen readers
- Required fields are clearly marked
