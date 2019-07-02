---
category: Components
subtitle: 表单
type: 数据录入
cols: 1
title: Form
---

高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。

## 何时使用

- 用于创建一个实体或收集信息。
- 需要对输入的数据类型进行校验时。

## API

### Form

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 设置 Form 渲染元素，为 `false` 则不创建 DOM 节点 | ComponentType \| false | form |
| colon | 配置 Form.Item 的 `colon` 的默认值。表示是否显示 label 后面的冒号 | boolean | true |
| fields | 通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用。查看[示例](#components-form-demo-global-state) | [FieldData](#FieldData)\[] | - |
| form | 经 `Form.useForm()` 创建的 form 控制实例，不提供时会自动创建 | [FormInstance](#FormInstance) | - |
| hideRequiredMark | 隐藏所有表单项的必选标记 | boolean | false |
| initialValues | 表单默认值，只有初始化以及重置时生效 | object | - |
| labelAlign | label 标签的文本对齐方式 | 'left' \| 'right' | 'right' |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object](https://ant.design/components/grid/#Col) |  |
| layout | 表单布局 | 'horizontal'\|'vertical'\|'inline' | 'horizontal' |
| name | 表单名称，会作为表单字段 `id` 前缀使用 | string | - |
| validateMessages | 验证提示模板，说明[见下](#validateMessages) | [ValidateMessages](https://github.com/react-component/field-form/blob/master/src/utils/messages.ts) | - |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object](https://ant.design/components/grid/#Col) |  |
| onFinish | 提交表单且数据验证成功后回调事件 | Function(values) | - |
| onFieldsChange | 字段更新时触发回调事件 | Function(changedFields, allFields) | - |
| onValuesChange | 字段值更新时触发回调事件 | Function(changedValues, allValues) | - |

### validateMessages

Form 为验证提供了[默认的错误提示信息](https://github.com/react-component/field-form/blob/master/src/utils/messages.ts)，你可以通过配置 `validateMessages` 属性，修改对应的提示模板。一种常见的使用方式，是配置国际化提示信息：

```jsx
const validateMessages = {
  required: "'${name}' 是必选字段",
  // ...
};

<Form validateMessages={validateMessages} />;
```

此外，[ConfigProvider](/components/config-provider/) 也提供了全局化配置方案，允许统一配置错误提示模板：

```jsx
const validateMessages = {
  required: "'${name}' 是必选字段",
  // ...
};

<ConfigProvider form={{ validateMessages }}>
  <Form />
</ConfigProvider>;
```

## Form.Item

表单字段组件，用于数据双向绑定、校验、布局等。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colon | 配合 `label` 属性使用，表示是否显示 `label` 后面的冒号 | boolean | true |
| dependencies | 设置依赖字段，说明[见下](#dependencies) | [NamePath](#NamePath)[] | - |
| extra | 额外的提示信息，和 `help` 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 | string\|ReactNode | - |
| getValueFromEvent | 设置如何将 event 的值转换成字段值 | (..args: any[]) => any | - |
| hasFeedback | 配合 `validateStatus` 属性使用，展示校验状态图标，建议只配合 Input 组件使用 | boolean | false |
| help | 提示信息，如不设置，则会根据校验规则自动生成 | string\|ReactNode | - |
| htmlFor | 设置子元素 label `htmlFor` 属性 | string | - |
| inline | 为 `true` 时不带样式，作为纯字段控件使用 | boolean | false |
| label | `label` 标签的文本 | string\|ReactNode | - |
| labelCol | `label` 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}`。你可以通过 Form 的 `labelCol` 进行统一设置。当和 Form 同时设置时，以 Item 为准 | [object](/components/grid/#Col) | - |
| name | 字段名，支持数组 | [NamePath](#NamePath) | - |
| normalize | 转换字段值给控件 | (value, prevValue, prevValues) => any | - |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | false |
| rules | 校验规则，设置字段的校验逻辑。点击[此处](#components-form-demo-basic)查看示例 | [Rule](#Rule)[] | - |
| shouldUpdate | 自定义字段更新逻辑，说明[见下](#shouldUpdate) | boolean \| (prevValue, curValue) => boolean | false |
| trigger | 设置收集字段值变更的时机 | string | onChange |
| validateStatus | 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating' | string |  |
| validateTrigger | 设置字段校验的时机 | string \| string[] | onChange |
| valuePropName | 子节点的值的属性，如 Switch 的是 'checked' | string | value |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 `labelCol`。你可以通过 Form 的 `wrapperCol` 进行统一设置。当和 Form 同时设置时，以 Item 为准。 | [object](/components/grid/#Col) |  |

### dependencies

当字段间存在依赖关系时使用。如果一个字段设置了 `dependencies` 属性。那么它所依赖的字段更新时，该字段将自动触发更新与校验。一种常见的场景，就是注册用户表单的“密码”与“确认密码”字段。“确认密码”校验依赖于“密码”字段，设置 `dependencies` 后，“密码”字段更新会重新触发“校验密码”的校验逻辑。你可以参考[具体例子](#components-form-demo-register)。

### shouldUpdate

Form 通过增量更新方式，只更新被修改的字段相关组件以达到性能优化目的。大部分场景下，你只需要编写代码或者与 [`dependencies`](#dependencies) 属性配合校验即可。而在某些特定场景，例如修改某个字段值后出现新的字段选项、或者纯粹希望表单任意变化都对某一个区域进行渲染。你可以通过 `shouldUpdate` 修改 Form.Item 的更新逻辑。

当 `shouldUpdate` 为 `true` 时，Form 的任意变化都会使该 Form.Item 重新渲染。这对于自定义渲染一些区域十分有帮助：

```jsx
<Form.Item shouldUpdate>
  {() => {
    return <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>;
  }}
</Form.Item>
```

你可以参考[示例](#components-form-demo-horizontal-login)查看具体使用场景。

当 `shouldUpdate` 为方法时，表单的每次数值更新都会调用该方法，提供原先的值与当前的值以供你比较是否需要更新。这对于是否根据值来渲染额外字段十分有帮助：

```jsx
<Form.Item shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}>
  {() => {
    return (
      <Form.Item name="other">
        <Input />
      </Form.Item>
    );
  }}
</Form.Item>
```

你可以参考[示例](#components-form-demo-control-hooks)查看具体使用场景。

## Form.List

为字段提供数组化管理。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名，支持数组 | [NamePath](#NamePath) | - |
| children | 渲染函数 | (fields: Field[], operation: { add, remove }) => React.ReactNode | - |

```tsx
<Form.List>
  {fields => (
    <div>
      {fields.map(field => (
        <Form.Item {...field}>
          <Input />
        </Form.Item>
      ))}
    </div>
  )}
</Form.List>
```

## Form.Provider

提供表单间联动功能，其下设置 `name` 的 Form 更新时，会自动触发对应事件。查看[示例](#components-form-demo-form-context)。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onFormChange | 子表单字段更新时触发 | Function(formName: string, info: { changedFields, forms }) | - |
| onFormFinish | 子表单提交时触发 | Function(formName: string, info: { values, forms }) | - |

```jsx
<Form.Provider
  onFormFinish={name => {
    if (name === 'form1') {
      // Do something...
    }
  }}
>
  <Form name="form1">...</Form>
  <Form name="form2">...</Form>
</Form.Provider>
```

### FormInstance

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| getFieldValue | 获取对应字段名的值 | (name: [NamePath](#NamePath)) => any |
| getFieldsValue | 获取一组字段名对应的值，会按照对应结构返回 | (nameList?: [NamePath](#NamePath)[]) => any |
| getFieldError | 获取对应字段名的错误信息 | (name: [NamePath](#NamePath)) => string[] |
| getFieldsError | 获取一组字段名对应的错误信息，返回为数组形式 | (nameList?: [NamePath](#NamePath)[]) => FieldError[] |
| isFieldTouched | 检查对应字段是否被用户操作过 | (name: [NamePath](#NamePath)) => boolean |
| isFieldsTouched | 检查一组字段是否被用户操作过，`allTouched` 为 `true` 时检查是否所有字段都被操作过 | (nameList?: [NamePath](#NamePath)[], allTouched?: boolean) => boolean |
| isFieldValidating | 检查一组字段是否正在校验 | (name: [NamePath](#NamePath)) => boolean |
| resetFields | 重置一组字段到 `initialValues` | (fields?: [NamePath](#NamePath)[]) => void |
| setFields | 设置一组字段状态 | (fields: FieldData[]) => void |
| setFieldsValue | 设置表单的值 | (values) => void |
| submit | 提交表单，与点击 `submit` 按钮效果相同 | () => void |
| validateFields | 触发表单验证 | (nameList?: [NamePath](#NamePath)[]) => Promise |

#### validateFields 返回示例

```jsx
validateFields()
  .then(values => {
    /*
  values:
    {
      username: 'username',
      password: 'password',
    }
  */
  })
  .catch(errorInfo => {
    /*
    errorInfo:
      {
        values: {
          username: 'username',
          password: 'password',
        },
        errorFields: [
          { password: ['username'], errors: ['Please input your Password!'] },
        ],
        outOfDate: false,
      }
    */
  });
```

### Interface

#### NamePath

`string | number | (string | number)[]`

#### FieldData

| 名称       | 说明             | 类型                    |
| ---------- | ---------------- | ----------------------- |
| touched    | 是否被用户操作过 | boolean                 |
| validating | 是否正在校验     | boolean                 |
| errors     | 错误信息         | string[]                |
| name       | 字段名称         | [NamePath](#NamePath)[] |
| value      | 字段对应值       | any                     |

#### Rule

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| enum | 是否匹配枚举中的值 | any[] |
| len | string 类型时为字符串长度；number 类型时为确定数字； array 类型时为数组长度 | number |
| max | string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度 | number |
| message | 错误信息，不设置时会通过[模板](#validateMessages)自动生成 | string |
| min | string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度 | number |
| pattern | 正则表达式匹配 | RegExp |
| required | 是否为必选字段 | boolean |
| transform | 将字段值转换成目标值后进行校验 | (value) => any |
| type | 类型，常见有 `string` \|`number` \|`boolean` \|`url` \| `email`。更多请参考[此处](https://github.com/yiminghe/async-validator#type) | string |
| validator | 自定义校验，接收 Promise 作为返回值。[示例](#components-form-demo-register)参考 | ([rule](#Rule), value) => Promise |
| whitespace | 如果字段仅包含空格则校验不通过 | boolean |
| validateTrigger | 设置触发验证时机，必须是 Form.Item 的 `validateTrigger` 的子集 | string \| string[] |

## 从 v3 升级到 v4

### 去除 Form.create

v4 的 Form 不再需要通过 `Form.create()` 创建上下文。Form 组件现在自带数据域，因而 `getFieldDecorator` 也不再需要，直接写入 Form.Item 即可：

```jsx
// antd v3
const Demo = ({ form: { getFieldDecorator } }) => (
  <Form>
    <Form.Item>
      {getFieldDecorator('username', {
        rules: [{ required: true }],
      })(<Input />)}
    </Form.Item>
  </Form>
);

const WrappedDemo = Form.create()(Demo);
```

改成：

```jsx
// antd v4
const Demo = () => (
  <Form>
    <Form.Item name="username" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
  </Form>
);
```

由于移除了 `Form.create()`，原本的 `onFieldsChange` 等方法移入 Form 中，通过 `fields` 对 Form 进行控制。参考[示例](#components-form-demo-global-state)。

### 表单控制调整

Form 自带表单控制实体，如需要调用 form 方法，可以通过 `Form.useForm()` 创建 Form 实体进行操作：

```jsx
// antd v3
const Demo = ({ form: { setFieldsValue } }) => {
  React.useEffect(() => {
    setFieldsValue({
      username: 'Bamboo',
    });
  }, []);

  return (
    <Form>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true }],
        })(<Input />)}
      </Form.Item>
    </Form>
  );
};

const WrappedDemo = Form.create()(Demo);
```

改成：

```jsx
// antd v4
const Demo = () => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      username: 'Bamboo',
    });
  }, []);

  return (
    <Form form={form}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};
```

对于 class component，也可以通过 `ref` 获得实体：

```jsx
// antd v4
class Demo extends React.Component {
  formRef = React.createRef();

  componentDidMount() {
    this.formRef.setFieldsValue({
      username: 'Bamboo',
    });
  }

  render() {
    return (
      <Form ref={formRef}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    );
  }
}
```

由于 Form.Item 内置字段绑定，如果需要不带样式的表单绑定，可以使用 `inline` 属性移除额外样式：

```jsx
// antd v3
const Demo = ({ form: { setFieldsValue } }) => {
  return <Form>{getFieldDecorator('username')(<Input />)}</Form>;
};

const WrappedDemo = Form.create()(Demo);
```

改成：

```jsx
// antd v4
const Demo = () => {
  return (
    <Form>
      <Form.Item name="username" inline>
        <Input />
      </Form.Item>
    </Form>
  );
};
```

### 字段联动调整

新版 Form 采用增量更新方式，仅会更新需要更新的字段。因而如果有字段关联更新，或者跟随整个表单更新而更新。可以使用 [`dependencies`](#dependencies) 或 [`shouldUpdate`](#shouldUpdate)。

### onFinish 替代 onSubmit

对于表单校验，过去版本需要通过监听 `onSubmit` 事件手工触发 `validateFields`。新版直接使用 `onFinish` 事件，该事件仅当校验通过后才会执行：

```jsx
// antd v3
const Demo = ({ form: { getFieldDecorator, validateFields } }) => {
  const onSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true }],
        })(<Input />)}
      </Form.Item>
    </Form>
  );
};

const WrappedDemo = Form.create()(Demo);
```

改成：

```jsx
// antd v4
const Demo = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};
```

### 初始化调整

此外，我们将 `initialValue` 从字段中移到 Form 中。以避免同名字段设置 `initialValue` 的冲突问题：

```jsx
// antd v3
const Demo = ({ form: { getFieldDecorator } }) => (
  <Form>
    <Form.Item>
      {getFieldDecorator('username', {
        rules: [{ required: true }],
        initialValue: 'Bamboo',
      })(<Input />)}
    </Form.Item>
  </Form>
);

const WrappedDemo = Form.create()(Demo);
```

改成：

```jsx
// antd v4
const Demo = () => (
  <Form initialValues={{ username: 'Bamboo' }}>
    <Form.Item name="username" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
  </Form>
);
```

在 v3 版本中，修改未操作的字段 `initialValue` 会同步更新字段值，这是一个 BUG。但是由于被长期作为一个 feature 使用，因而我们一直没有修复。在 v4 中，该 BUG 已被修复。`initialValue` 只有在初始化以及重置表单时生效。

### 移除字段不再移除字段值

v3 版本中，我们会将移除的字段对应的值同步清理。但是在实践中，发现清除字段相比保留会造成更大的不便。例如一些切换操作，用户不得不通过隐藏的方式保留字段值。因而新版本的 Form 总是会保留字段值，而移除字段的校验规则会被忽略。也因此 `preserve` 不再需要。

### 嵌套字段路径使用数组

过去版本我们通过 `.` 代表嵌套路径（诸如 `user.name` 来代表 `{ user: { name: '' } }`）。然而在一些后台系统中，变量名中也会带上 `.`。这造成用户需要额外的代码进行转化，因而新版中，嵌套路径通过数组来表示以避免错误的处理行为（如 `['user', 'name']`）。

也因此，诸如 `getFieldsError` 等方法返回的路径总是数组形式以便于用户处理：

```jsx
form.getFieldsError();

/*
[
  { name: ['user', 'name'], errors: [] },
  { name: ['user', 'age'], errors: ['Some error message'] },
]
*/
```

### validateFields 不再支持 callback

`validateFields` 会返回 Promise 对象，因而你可以通过 `async/await` 或者 `then/catch` 来执行对应的错误处理。不再需要判断 `errors` 是否为空：

```jsx
// antd v3
validateFields((err, value) => {
  if (!err) {
    // Do something with value
  }
});
```

改成：

```jsx
// antd v4
validateFields().then(values => {
  // Do something with value
});
```

<style>
.code-box-demo .ant-form:not(.ant-form-inline):not(.ant-form-vertical) {
  max-width: 600px;
}
.markdown.api-container table td:last-child {
  white-space: nowrap;
  word-wrap: break-word;
}
</style>
