# Form — 表单

## 功能概述

高性能表单控件，自带数据域管理，包含数据录入、校验以及对应样式。支持复杂表单布局、动态表单、多表单联动等。

## 核心概念

### 表单数据流模式

```
用户输入/Change事件
     ↓
 Form.Item 收集值
     ↓
 Form 实例存储
     ↓
 onValuesChange 回调触发
     ↓
 提交时验证
     ↓
 onFinish/onFinishFailed 回调
```

### 关键数据结构

```tsx
// 校验规则类型
interface Rule {
  required?: boolean; // 必填
  message?: string; // 错误信息
  type?:
    | 'email'
    | 'url'
    | 'number'
    | 'integer'
    | 'boolean'
    | 'array'
    | 'object'
    | 'enum'
    | 'date'
    | 'datetime'
    | 'time'
    | 'url';
  min?: number; // 最小长度/值
  max?: number; // 最大长度/值
  len?: number; // 精确长度
  pattern?: RegExp; // 正则验证
  validator?: (rule: Rule, value: any, callback: (error?: Error) => void) => Promise<void> | void;
  warningOnly?: boolean; // 仅警告
  whitespace?: boolean; // 忽略空格
  transform?: (value: any) => any; // 值转换
}

// Form.Item 名称路径
type NamePath = string | number | (string | number)[]; // 支持嵌套如 ['user', 'info', 'name']

// FormInstance 接口
interface FormInstance {
  getFieldValue: (name: NamePath) => any;
  getFieldsValue: (nameList?: NamePath[]) => Record<string, any>;
  setFieldValue: (name: NamePath, value: any) => void;
  setFieldsValue: (values: Record<string, any>) => void;
  setFields: (fields: FieldData[]) => void;
  getFieldError: (name: NamePath) => string[];
  getFieldsError: (nameList?: NamePath[]) => FieldError[];
  isFieldTouched: (name: NamePath) => boolean;
  isFieldsTouched: (nameList?: NamePath[], allTouched?: boolean) => boolean;
  isFieldValidating: (name: NamePath) => boolean;
  isFieldsValidating: (nameList?: NamePath[]) => boolean;
  resetFields: (fields?: NamePath[]) => void;
  validateFields: (nameList?: NamePath[]) => Promise<Record<string, any>>;
  validateTrigger: (name: NamePath, trigger: string) => Promise<void>;
  submit: () => Promise<void>;
  scrollToField: (name: NamePath, options?: ScrollToFieldOptions) => void;
}
```

## 输入字段

### Form 属性

#### 必填

无必填属性，但通常需要包含 `Form.Item` 子组件。

#### 可选

- `form`: FormInstance，表单实例，通过 `Form.useForm()` 创建。
- `initialValues`: object，表单初始值。
- `layout`: string，布局方式，可选 `horizontal` | `vertical` | `inline`，默认 `horizontal`。
- `labelCol`: object，label 布局配置，如 `{ span: 8 }`。
- `wrapperCol`: object，控件布局配置，如 `{ span: 16 }`。
- `size`: string，控件尺寸，可选 `small` | `middle` | `large`。
- `variant`: string，控件形态（5.13.0+），可选 `outlined` | `borderless` | `filled` | `underlined`。
- `disabled`: boolean，禁用所有控件。
- `requiredMark`: boolean | `optional` | (label, info) => ReactNode，必选标记显示。
- `colon`: boolean，显示 label 后的冒号，默认 `true`。
- `validateTrigger`: string | string[]，校验时机，默认 `onChange`。
- `validateMessages`: object，校验提示模板。
- `preserve`: boolean，保留已移除字段值，默认 `true`。
- `scrollToFirstError`: boolean | object，提交失败滚动到第一个错误。
- `onFinish`: (values) => void，提交成功回调。
- `onFinishFailed`: (errorInfo) => void，提交失败回调。
- `onValuesChange`: (changedValues, allValues) => void，值变化回调。
- `onFieldsChange`: (changedFields, allFields) => void，字段变化回调。

### Form.Item 属性

- `name`: NamePath，字段名，支持数组路径如 `['user', 'name']`。
- `label`: ReactNode，标签文本。
- `rules`: Rule[]，校验规则数组。
  - `required`: boolean，是否必填。
  - `message`: string，错误提示。
  - `type`: string，类型校验，如 `email` | `url` | `number`。
  - `min` / `max`: number，长度或数值范围。
  - `pattern`: RegExp，正则校验。
  - `validator`: (rule, value) => Promise，自定义校验。
  - `warningOnly`: boolean，仅警告不阻止提交。
- `required`: boolean，必填标记（仅样式）。
- `dependencies`: NamePath[]，依赖字段，用于联动校验。
- `shouldUpdate`: boolean | (prevValues, curValues) => boolean，是否更新。
- `valuePropName`: string，子组件值属性名，默认 `value`。
- `trigger`: string，收集值的时机，默认 `onChange`。
- `validateTrigger`: string | string[]，校验时机。
- `getValueFromEvent`: (...args) => any，从事件中获取值。
- `normalize`: (value, prevValue, allValues) => any，值转换函数。
- `tooltip`: ReactNode | TooltipProps，标签提示信息。
- `extra`: ReactNode，额外提示信息。
- `help`: ReactNode，帮助信息（覆盖校验错误）。
- `validateStatus`: string，校验状态，可选 `success` | `warning` | `error` | `validating`。
- `hasFeedback`: boolean | { icons }，显示校验状态图标。

## 常见表单配置场景

### 布局配置

| 场景       | labelCol    | wrapperCol   | layout     |
| ---------- | ----------- | ------------ | ---------- |
| 表单对齐   | { span: 6 } | { span: 18 } | horizontal |
| 竖排表单   | -           | -            | vertical   |
| 行内表单   | -           | -            | inline     |
| 不显示标签 | { span: 0 } | { span: 24 } | horizontal |

### 校验触发时机

| 时机       | 说明           | validateTrigger        |
| ---------- | -------------- | ---------------------- |
| 输入时验证 | onChange 触发  | 'onChange'             |
| 失焦时验证 | onBlur 触发    | 'onBlur'               |
| 提交时验证 | 提交时验证     | 'onSubmit'             |
| 自定义     | 组合多个触发器 | ['onChange', 'onBlur'] |

### 动态表单字段

| 功能              | 使用方法                                |
| ----------------- | --------------------------------------- |
| 动态添加/删除字段 | 使用 `Form.List` + `useFieldArray`      |
| 字段联动          | 使用 `Form.Item` 的 `dependencies` 属性 |
| 条件显示          | 使用 `Form.Item` 的 `shouldUpdate` 属性 |
| 外部控制          | 使用 `form` 实例方法                    |

## 常见场景示例

### 场景 1: 基础登录表单

```tsx
import { Button, Form, Input, Space } from 'antd';

interface LoginFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [form] = Form.useForm<LoginFormData>();

  return (
    <Form form={form} layout="vertical" onFinish={(values) => console.log('Login:', values)}>
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" block htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
```

### 场景 2: 复杂验证规则

```tsx
import { Form, Input, Button } from 'antd';

const ComplexValidationForm: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" onFinish={console.log}>
      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          { required: true, message: '邮箱必填' },
          { type: 'email', message: '邮箱格式不正确' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="年龄"
        name="age"
        rules={[
          { required: true, message: '年龄必填' },
          { type: 'number', message: '年龄必须是数字' },
          { min: 18, message: '年龄不能小于 18' },
          { max: 120, message: '年龄不能大于 120' },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="确认密码"
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: '请确认密码' },
          ({ getFieldValue }) => ({\n            validator: async (_, value) => {\n              if (!value || getFieldValue('password') === value) {\n                return Promise.resolve();\n              }\n              return Promise.reject(new Error('两次输入不一致'));\n            },\n          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">提交</Button>
    </Form>
  );
};
```

### 场景 3: 动态字段表单

```tsx
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

const DynamicFieldsForm: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" onFinish={console.log}>
      <Form.List name="members">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space key={field.key} style={{ width: '100%' }} align="baseline">
                <Form.Item
                  {...field}
                  name={[field.name, 'name']}
                  rules={[{ required: true, message: '名字必填' }]}
                >
                  <Input placeholder="姓名" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'email']}
                  rules={[{ required: true, type: 'email', message: '邮箱必填' }]}
                >
                  <Input placeholder="邮箱" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              添加成员
            </Button>
          </>
        )}
      </Form.List>
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  );
};
```

### 场景 4: 字段联动

```tsx
import { Button, Form, Input, Select } from 'antd';

const DependentFieldsForm: React.FC = () => {
  const [form] = Form.useForm();
  const userType = Form.useWatch('userType', form);

  return (
    <Form form={form} layout="vertical" onFinish={console.log}>
      <Form.Item label="用户类型" name="userType" rules={[{ required: true, message: '必选' }]}>
        <Select
          options={[
            { value: 'individual', label: '个人' },
            { value: 'company', label: '企业' },
          ]}
        />
      </Form.Item>

      {userType === 'individual' && (
        <Form.Item
          label="身份证号"
          name="idCard"
          rules={[{ required: true, message: '身份证必填' }]}
        >
          <Input />
        </Form.Item>
      )}

      {userType === 'company' && (
        <Form.Item
          label="营业执照"
          name="businessLicense"
          rules={[{ required: true, message: '营业执照必填' }]}
        >
          <Input />
        </Form.Item>
      )}

      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  );
};
```

### 场景 5: 外部表单控制

```tsx
import { useState } from 'react';
import { Button, Form, Input, Space } from 'antd';

const ExternalControlForm: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<any>(null);

  const handleReset = () => form.resetFields();
  const handleFill = () => form.setFieldsValue({ username: 'admin', password: '123456' });
  const handleGet = async () => {
    try {
      const values = await form.validateFields();
      setData(values);
    } catch (e) {
      console.error('验证失败');
    }
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={setData}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
      </Form>
      <Space>
        <Button onClick={handleReset}>重置</Button>
        <Button onClick={handleFill}>填充</Button>
        <Button onClick={handleGet}>获取值</Button>
      </Space>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
};
```

## AI 生成指引

### 场景判断表

| 用户需求          | 选择方案                     | 关键属性                           |
| ----------------- | ---------------------------- | ---------------------------------- |
| 简单登录/注册表单 | 基础 Form + Input            | layout, onFinish, rules            |
| 复杂多字段表单    | Form + Form.Item 组合        | dependencies, shouldUpdate, name   |
| 动态增删字段      | Form.List + useFieldArray    | name={[field.name, 'xxx']}         |
| 表单级联/联动     | Form.useWatch + dependencies | dependencies, shouldUpdate         |
| 服务器数据初始化  | initialValues + useEffect    | initialValues, form.setFieldsValue |
| 表单步骤提交      | 分步 Form                    | 多个 Form 实例或 Form.List         |

### 类型导入

```tsx
import type {
  FieldData, // 字段数据类型
  FieldError, // 字段错误类型
  FormInstance, // 表单实例类型
  FormItemProps, // Form.Item props 类型
  FormProps, // Form props 类型
  Rule, // 校验规则类型
  ValidateStatus, // 校验状态类型
} from 'antd';
```

## 使用建议

使用 `Form.useForm()` 获取表单实例；复杂布局使用 `labelCol` 和 `wrapperCol`；动态表单使用 `Form.List`；跨组件使用 `Form.useFormInstance()`；校验规则优先使用声明式配置。

## 示例代码

```tsx
import { Button, Form, Input } from 'antd';

interface FieldType {
  username: string;
  password: string;
}

const App: React.FC = () => {
  const [form] = Form.useForm<FieldType>();

  return (
    <Form
      form={form}
      name="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={(values) => console.log('Success:', values)}
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
```

## 返回结果

渲染一个完整的表单容器，管理表单数据状态和校验逻辑。
