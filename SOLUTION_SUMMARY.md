# Form.Item 复合输入修复总结

## 问题描述

`register.tsx` demo 中存在严重的设计缺陷：
1. Phone Number 字段使用 `prefixSelector` JSX 变量包含 Form.Item
2. Donation 字段使用 `suffixSelector` JSX 变量包含 Form.Item
3. 这些变量在主 Form.Item 的 Space.Compact 中使用
4. 导致 `setFieldsValue` 无法正常工作

## 尝试的解决方案

### 方案 1: Render Props（失败）

最初尝试使用 rc-field-form 的 render props 模式：
```tsx
<Form.Item name="phone">
  {(control) => (
    <Space.Compact>
      <Form.Item name="prefix" noStyle><Select /></Form.Item>
      <Input {...control} />
    </Space.Compact>
  )}
</Form.Item>
```

**失败原因**：
- antd 的 Form.Item 与 rc-field-form 的 Field 实现不同
- antd 不支持带 `name` 属性的 render props
- Form.Item 源码中有明确警告（FormItem/index.tsx:347-357）
- 会导致功能完全失效

### 方案 2: 自定义组件（成功）✅

使用自定义组件封装复合输入：

```tsx
interface PhoneValue {
  prefix?: string;
  phone?: string;
}

interface PhoneInputProps {
  id?: string;
  value?: PhoneValue;
  onChange?: (value: PhoneValue) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ id, value = {}, onChange }) => {
  const [prefix, setPrefix] = useState('86');
  const [phone, setPhone] = useState('');

  const triggerChange = (changedValue: PhoneValue) => {
    onChange?.({ ...value, ...changedValue });
  };

  const onPrefixChange = (newPrefix: string) => {
    if (!('prefix' in value)) {
      setPrefix(newPrefix);
    }
    triggerChange({ prefix: newPrefix });
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    if (!('phone' in value)) {
      setPhone(newPhone);
    }
    triggerChange({ phone: newPhone });
  };

  return (
    <span id={id}>
      <Space.Compact block>
        <Select
          value={value.prefix || prefix}
          onChange={onPrefixChange}
          style={{ width: 70 }}
          options={[
            { label: '+86', value: '86' },
            { label: '+87', value: '87' },
          ]}
        />
        <Input
          value={value.phone || phone}
          onChange={onPhoneChange}
          style={{ width: '100%' }}
        />
      </Space.Compact>
    </span>
  );
};

// 使用
<Form.Item name="phone" label="Phone Number">
  <PhoneInput />
</Form.Item>

// 初始值
initialValues={{
  phone: { prefix: '86' },
  donation: { currency: 'USD' },
}}
```

## 为什么自定义组件方案有效

1. **遵循受控组件模式**：组件接收 `value` 和 `onChange` props
2. **Form.Item 自动传递**：Form.Item 会将这些 props 传递给子组件
3. **支持复合值**：可以处理对象类型的值 `{ prefix, phone }`
4. **本地状态作为后备**：支持非受控模式（虽然在 Form 中总是受控的）
5. **setFieldsValue 正常工作**：`form.setFieldsValue({ phone: { prefix: '87', phone: '123' } })`

## 关键实现细节

### 1. triggerChange 函数
```tsx
const triggerChange = (changedValue: PhoneValue) => {
  onChange?.({ ...value, ...changedValue });
};
```
- 合并当前值和新值
- 确保只更新变化的字段
- 保持其他字段不变

### 2. 本地状态管理
```tsx
const [prefix, setPrefix] = useState('86');

const onPrefixChange = (newPrefix: string) => {
  if (!('prefix' in value)) {
    setPrefix(newPrefix);  // 非受控模式的后备
  }
  triggerChange({ prefix: newPrefix });
};
```
- 在受控模式下，本地状态不会被使用
- 在非受控模式下，本地状态提供后备值

### 3. 值的显示
```tsx
<Select value={value.prefix || prefix} ... />
```
- 优先使用受控值 `value.prefix`
- 后备使用本地状态 `prefix`

## 快照测试更新

由于实现方式改变，快照测试需要更新：

```bash
npm test -- components/form/__tests__/demo.test.tsx -u
```

详见 `SNAPSHOT_TEST_INFO.md`

## 验证方法

```tsx
const [form] = Form.useForm();

// 设置值
form.setFieldsValue({
  phone: { prefix: '87', phone: '13812345678' },
  donation: { amount: 100, currency: 'CNY' }
});

// 获取值
const values = form.getFieldsValue();
console.log(values.phone); // { prefix: '87', phone: '13812345678' }
console.log(values.donation); // { amount: 100, currency: 'CNY' }

// 提交
const onFinish = (values) => {
  console.log(values);
  // { phone: { prefix, phone }, donation: { amount, currency }, ... }
};
```

## 参考

- 相似实现：`components/form/demo/customized-form-controls.tsx`
- Form 文档：https://ant.design/components/form#components-form-demo-customized-form-controls
- 受控组件模式：https://react.dev/learn/sharing-state-between-components

## 总结

**不要使用** render props 模式（antd 不支持带 name 的 render props）

**应该使用** 自定义组件模式封装复合输入控件

这是 Ant Design 推荐的处理复合表单控件的标准方法。
