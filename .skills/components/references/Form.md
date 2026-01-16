# Form — 表单

## 功能概述

高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。

## 应用场景

- 用于创建一个实体或收集信息。
- 需要对输入的数据类型进行校验时。

## 输入字段

### Form 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `colon`: boolean，配置 Form.Item 的 `colon` 的默认值。表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效)，默认 true。
- `disabled`: boolean，设置表单组件禁用，仅对 antd 组件有效，默认 false，版本 4.21.0。
- `component`: ComponentType | false，设置 Form 渲染元素，为 `false` 则不创建 DOM 节点，默认 form。
- `fields`: [FieldData](#fielddata)\[]，通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用。查看[示例](#form-demo-global-state)。
- `form`: [FormInstance](#forminstance)，经 `Form.useForm()` 创建的 form 控制实例，不提供时会自动创建。
- `feedbackIcons`: [FeedbackIcons](#feedbackicons)，当 `Form.Item` 有 `hasFeedback` 属性时可以自定义图标，版本 5.9.0。
- `initialValues`: object，表单默认值，只有初始化以及重置时生效。
- `labelAlign`: `left` | `right`，label 标签的文本对齐方式，默认 `right`。
- `labelWrap`: boolean，label 标签的文本换行方式，默认 false，版本 4.18.0。
- `labelCol`: [object](/components/grid-cn#col)，label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}`。
- `layout`: `horizontal` | `vertical` | `inline`，表单布局，默认 `horizontal`。
- `name`: string，表单名称，会作为表单字段 `id` 前缀使用。
- `preserve`: boolean，当字段被删除时保留字段值。你可以通过 `getFieldsValue(true)` 来获取保留字段值，默认 true，版本 4.4.0。
- `requiredMark`: boolean | `optional` | ((label: ReactNode, info: { required: boolean }) => ReactNode)，必选样式，可以切换为必选或者可选展示样式。此为 Form 配置，Form.Item 无法单独配置，默认 true，版本 `renderProps`: 5.9.0。
- `scrollToFirstError`: boolean | [Options](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options) | { focus: boolean }，提交失败自动滚动到第一个错误字段，默认 false，版本 focus: 5.24.0。
- `size`: `small` | `middle` | `large`，设置字段组件的尺寸（仅限 antd 组件）。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `validateMessages`: [ValidateMessages](https://github.com/ant-design/ant-design/blob/6234509d18bac1ac60fbb3f92a5b2c6a6361295a/components/locale/en_US.ts#L88-L134)，验证提示模板，说明[见下](#validatemessages)。
- `validateTrigger`: string | string\[]，统一设置字段触发验证的时机，默认 `onChange`，版本 4.3.0。
- `variant`: `outlined` | `borderless` | `filled` | `underlined`，表单内控件变体，默认 `outlined`，版本 5.13.0 | `underlined`: 5.24.0。
- `wrapperCol`: [object](/components/grid-cn#col)，需要为输入控件设置布局样式时，使用该属性，用法同 labelCol。
- `onFieldsChange`: function(changedFields, allFields)，字段更新时触发回调事件。
- `onFinish`: function(values)，提交表单且数据验证成功后回调事件。
- `onFinishFailed`: function({ values, errorFields, outOfDate })，提交表单且数据验证失败后回调事件。
- `onValuesChange`: function(changedValues, allValues)，字段值更新时触发回调事件。
- `clearOnDestroy`: boolean，当表单被卸载时清空表单值，默认 false，版本 5.18.0。

### Form.Item 属性

#### 必填

- 无必填属性。

#### 可选

- `colon`: boolean，配合 `label` 属性使用，表示是否显示 `label` 后面的冒号，默认 true。
- `dependencies`: [NamePath](#namepath)\[]，设置依赖字段，说明[见下](#dependencies)。
- `extra`: ReactNode，额外的提示信息，和 `help` 类似，当需要错误信息和提示文案同时出现时，可以使用这个。
- `getValueFromEvent`: (..args: any\[]) => any，设置如何将 event 的值转换成字段值。
- `getValueProps`: (value: any) => Record<string, any>，为子元素添加额外的属性 (不建议通过 `getValueProps` 生成动态函数 prop，请直接将其传递给子组件)，版本 4.2.0。
- `hasFeedback`: boolean | { icons: [FeedbackIcons](#feedbackicons) }，配合 `validateStatus` 属性使用，展示校验状态图标，建议只配合 Input 组件使用 此外，它还可以通过 Icons 属性获取反馈图标，默认 false，版本 icons: 5.9.0。
- `help`: ReactNode，提示信息，如不设置，则会根据校验规则自动生成。
- `hidden`: boolean，是否隐藏字段（依然会收集和校验字段），默认 false，版本 4.4.0。
- `htmlFor`: string，设置子元素 label `htmlFor` 属性。
- `initialValue`: string，设置子元素默认值，如果与 Form 的 `initialValues` 冲突则以 Form 为准，版本 4.2.0。
- `label`: ReactNode，`label` 标签的文本，当不需要 label 又需要与冒号对齐，可以设为 null，版本 null: 5.22.0。
- `labelAlign`: `left` | `right`，标签文本对齐方式，默认 `right`。
- `labelCol`: [object](/components/grid-cn#col)，`label` 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}`。你可以通过 Form 的 `labelCol` 进行统一设置，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准。
- `messageVariables`: Record<string, string>，默认验证字段的信息，查看[详情](#messagevariables)，版本 4.7.0。
- `name`: [NamePath](#namepath)，字段名，支持数组。
- `normalize`: (value, prevValue, prevValues) => any，组件获取值后进行转换，再放入 Form 中。不支持异步。
- `noStyle`: boolean，为 `true` 时不带样式，作为纯字段控件使用。当自身没有 `validateStatus` 而父元素存在有 `validateStatus` 的 Form.Item 会继承父元素的 `validateStatus`，默认 false。
- `preserve`: boolean，当字段被删除时保留字段值，默认 true，版本 4.4.0。
- `required`: boolean，必填样式设置。如不设置，则会根据校验规则自动生成，默认 false。
- `rules`: [Rule](#rule)\[]，校验规则，设置字段的校验逻辑。点击[此处](#form-demo-basic)查看示例。
- `shouldUpdate`: boolean | (prevValue, curValue) => boolean，自定义字段更新逻辑，说明[见下](#shouldupdate)，默认 false。
- `tooltip`: ReactNode | [TooltipProps & { icon: ReactNode }](/components/tooltip-cn#api)，配置提示信息，版本 4.7.0。
- `trigger`: string，设置收集字段值变更的时机。点击[此处](#form-demo-customized-form-controls)查看示例，默认 `onChange`。
- `validateFirst`: boolean | `parallel`，当某一规则校验不通过时，是否停止剩下的规则的校验。设置 `parallel` 时会并行校验，默认 false，版本 `parallel`: 4.5.0。
- `validateDebounce`: number，设置防抖，延迟毫秒数后进行校验，版本 5.9.0。
- `validateStatus`: string，校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating'。
- `validateTrigger`: string | string\[]，设置字段校验的时机，默认 `onChange`。
- `valuePropName`: string，子节点的值的属性。注意：Switch、Checkbox 的 valuePropName 应该是 `checked`，否则无法获取这个两个组件的值。该属性为 `getValueProps` 的封装，自定义 `getValueProps` 后会失效，默认 `value`。
- `wrapperCol`: [object](/components/grid-cn#col)，需要为输入控件设置布局样式时，使用该属性，用法同 `labelCol`。你可以通过 Form 的 `wrapperCol` 进行统一设置，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准。
- `layout`: `horizontal` | `vertical`，表单项布局，版本 5.18.0。

### Form.List 属性

#### 必填

- 无必填属性。

#### 可选

- `children`: (fields: Field\[], operation: { add, remove, move }, meta: { errors }) => React.ReactNode，渲染函数。
- `initialValue`: any\[]，设置子元素默认值，如果与 Form 的 `initialValues` 冲突则以 Form 为准，版本 4.9.0。
- `name`: [NamePath](#namepath)，字段名，支持数组。List 本身也是字段，因而 `getFieldsValue()` 默认会返回 List 下所有值，你可以通过[参数](#getfieldsvalue)改变这一行为。
- `rules`: { validator, message }\[]，校验规则，仅支持自定义规则。需要配合 [ErrorList](#formerrorlist) 一同使用，版本 4.7.0。

### operation 属性

#### 必填

- 无必填属性。

#### 可选

- `add`: (defaultValue?: any, insertIndex?: number) => void，新增表单项，默认 insertIndex，版本 4.6.0。
- `move`: (from: number, to: number) => void，移动表单项。
- `remove`: (index: number | number\[]) => void，删除表单项，默认 number\[]，版本 4.5.0。

### Form.ErrorList 属性

#### 必填

- 无必填属性。

#### 可选

- `errors`: ReactNode\[]，错误列表。

### name 属性

#### 必填

- 无必填属性。

#### 可选

- `onFormChange`: function(formName: string, info: { changedFields, forms })，子表单字段更新时触发。
- `onFormFinish`: function(formName: string, info: { values, forms })，子表单提交时触发。

### FormInstance 属性

#### 必填

- 无必填属性。

#### 可选

- `getFieldError`: (name: [NamePath](#namepath)) => string\[]，获取对应字段名的错误信息。
- `getFieldInstance`: (name: [NamePath](#namepath)) => any，获取对应字段实例，版本 4.4.0。
- `getFieldsError`: (nameList?: [NamePath](#namepath)\[]) => FieldError\[]，获取一组字段名对应的错误信息，返回为数组形式。
- `getFieldsValue`: [GetFieldsValue](#getfieldsvalue)，获取一组字段名对应的值，会按照对应结构返回。默认返回现存字段值，当调用 `getFieldsValue(true)` 时返回所有值。
- `getFieldValue`: (name: [NamePath](#namepath)) => any，获取对应字段名的值。
- `isFieldsTouched`: (nameList?: [NamePath](#namepath)\[], allTouched?: boolean) => boolean，检查一组字段是否被用户操作过，`allTouched` 为 `true` 时检查是否所有字段都被操作过。
- `isFieldTouched`: (name: [NamePath](#namepath)) => boolean，检查对应字段是否被用户操作过。
- `isFieldValidating`: (name: [NamePath](#namepath)) => boolean，检查对应字段是否正在校验。
- `resetFields`: (fields?: [NamePath](#namepath)\[]) => void，重置一组字段到 `initialValues`。
- `scrollToField`: (name: [NamePath](#namepath), options: [ScrollOptions](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options) | { focus: boolean }) => void，滚动到对应字段位置，版本 focus: 5.24.0。
- `setFields`: (fields: [FieldData](#fielddata)\[]) => void，设置一组字段状态。
- `setFieldValue`: (name: [NamePath](#namepath), value: any) => void，设置表单的值（该值将直接传入 form store 中并且**重置错误信息**。如果你不希望传入对象被修改，请克隆后传入），版本 4.22.0。
- `setFieldsValue`: (values) => void，设置表单的值（该值将直接传入 form store 中并且**重置错误信息**。如果你不希望传入对象被修改，请克隆后传入）。如果你只想修改 Form.List 中单项值，请通过 `setFieldValue` 进行指定。
- `submit`: () => void，提交表单，与点击 `submit` 按钮效果相同。
- `validateFields`: (nameList?: [NamePath](#namepath)\[], config?: [ValidateConfig](#validatefields)) => Promise，触发表单验证，设置 `recursive` 时会递归校验所有包含的路径。

### FieldData 属性

#### 必填

- 无必填属性。

#### 可选

- `errors`: string\[]，错误信息。
- `warnings`: string\[]，警告信息。
- `name`: [NamePath](#namepath)\[]，字段名称。
- `touched`: boolean，是否被用户操作过。
- `validating`: boolean，是否正在校验。
- `value`: any，字段对应值。

### Rule 属性

#### 必填

- 无必填属性。

#### 可选

- `defaultField`: [rule](#rule)，仅在 `type` 为 `array` 类型时有效，用于指定数组元素的校验规则。
- `enum`: any\[]，是否匹配枚举中的值（需要将 `type` 设置为 `enum`）。
- `fields`: Record<string, [rule](#rule)>，仅在 `type` 为 `array` 或 `object` 类型时有效，用于指定子元素的校验规则。
- `len`: number，string 类型时为字符串长度；number 类型时为确定数字； array 类型时为数组长度。
- `max`: number，必须设置 `type`：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度。
- `message`: string | ReactElement，错误信息，不设置时会通过[模板](#validatemessages)自动生成。
- `min`: number，必须设置 `type`：string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度。
- `pattern`: RegExp，正则表达式匹配。
- `required`: boolean，是否为必选字段。
- `transform`: (value) => any，将字段值转换成目标值后进行校验。
- `type`: string，类型，常见有 `string` |`number` |`boolean` |`url` | `email` | `tel`。更多请参考[此处](https://github.com/react-component/async-validator#type)。
- `validateTrigger`: string | string\[]，设置触发验证时机，必须是 Form.Item 的 `validateTrigger` 的子集。
- `validator`: ([rule](#rule), value) => Promise，自定义校验，接收 Promise 作为返回值。[示例](#form-demo-register)参考。
- `warningOnly`: boolean，仅警告，不阻塞表单提交，版本 4.17.0。
- `whitespace`: boolean，如果字段仅包含空格则校验不通过，只在 `type: 'string'` 时生效。

### WatchOptions 属性

#### 必填

- 无必填属性。

#### 可选

- `form`: FormInstance，指定 Form 实例，默认 当前 context 中的 Form，版本 5.4.0。
- `preserve`: boolean，是否监视没有对应的 `Form.Item` 的字段，默认 false，版本 5.4.0。

## 方法

无公开方法。

## 常见表单配置场景

### 布局配置

| 场景       | labelCol    | wrapperCol   | layout     |
| ---------- | ----------- | ------------ | ---------- |
| 表单对齐   | { span: 6 } | { span: 18 } | horizontal |
| 竖排表单   | -           | -            | vertical   |
| 行内表单   | -           | -            | inline     |
| 不显示标签 | { span: 0 } | { span: 24 } | horizontal |

### 校验触发时机

| 时机       | 说明           | validateTrigger          |
| ---------- | -------------- | ------------------------ |
| 输入时验证 | onChange 触发  | 'onChange'               |
| 失焦时验证 | onBlur 触发    | 'onBlur'                 |
| 提交时验证 | 提交时验证     | 'onSubmit'               |
| 自定义     | 组合多个触发器 | `['onChange', 'onBlur']` |

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
