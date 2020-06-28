---
category: Components
subtitle: 表单
type: 数据录入
cols: 1
title: Form
cover: https://gw.alipayobjects.com/zos/alicdn/ORmcdeaoO/Form.svg
---

高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。

## 何时使用

- 用于创建一个实体或收集信息。
- 需要对输入的数据类型进行校验时。

## API

### Form

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| component | 设置 Form 渲染元素，为 `false` 则不创建 DOM 节点 | ComponentType \| false | form |  |
| colon | 配置 Form.Item 的 `colon` 的默认值。表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效) | boolean | true |  |
| fields | 通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用。查看[示例](#components-form-demo-global-state) | [FieldData](#FieldData)\[] | - |  |
| form | 经 `Form.useForm()` 创建的 form 控制实例，不提供时会自动创建 | [FormInstance](#FormInstance) | - |  |
| hideRequiredMark | 隐藏所有表单项的必选标记 | boolean | false |  |
| initialValues | 表单默认值，只有初始化以及重置时生效 | object | - |  |
| labelAlign | label 标签的文本对齐方式 | `left` \| `right` | `right` |  |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object](/components/grid/#Col) | - |  |
| layout | 表单布局 | `horizontal` \| `vertical` \| `inline` | `horizontal` |  |
| name | 表单名称，会作为表单字段 `id` 前缀使用 | string | - |  |
| preserve | 当字段被删除时保留字段值 | boolean | true | 4.4.0 |
| scrollToFirstError | 提交失败自动滚动到第一个错误字段 | boolean | false |  |
| size | 设置字段组件的尺寸（仅限 antd 组件） | `small` \| `middle` \| `large` | - |  |
| validateMessages | 验证提示模板，说明[见下](#validateMessages) | [ValidateMessages](https://github.com/react-component/field-form/blob/master/src/utils/messages.ts) | - |  |
| validateTrigger | 统一设置字段校验规则 | string \| string[] | `onChange` | 4.3.0 |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object](/components/grid/#Col) | - |  |
| onFinish | 提交表单且数据验证成功后回调事件 | Function(values) | - |  |
| onFinishFailed | 提交表单且数据验证失败后回调事件 | Function({ values, errorFields, outOfDate }) | - |  |
| onFieldsChange | 字段更新时触发回调事件 | Function(changedFields, allFields) | - |  |
| onValuesChange | 字段值更新时触发回调事件 | Function(changedValues, allValues) | - |  |

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

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| colon | 配合 `label` 属性使用，表示是否显示 `label` 后面的冒号 | boolean | true |  |
| dependencies | 设置依赖字段，说明[见下](#dependencies) | [NamePath](#NamePath)[] | - |  |
| extra | 额外的提示信息，和 `help` 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 | string\|ReactNode | - |  |
| getValueFromEvent | 设置如何将 event 的值转换成字段值 | (..args: any[]) => any | - |  |
| getValueProps | 为子元素添加额外的属性 | (value: any) => any | - | 4.2.0 |
| hasFeedback | 配合 `validateStatus` 属性使用，展示校验状态图标，建议只配合 Input 组件使用 | boolean | false |  |
| help | 提示信息，如不设置，则会根据校验规则自动生成 | string\|ReactNode | - |  |
| htmlFor | 设置子元素 label `htmlFor` 属性 | string | - |  |
| initialValue | 设置子元素默认值，如果与 Form 的 `initialValues` 冲突则以 Form 为准 | string | - | 4.2.0 |
| noStyle | 为 `true` 时不带样式，作为纯字段控件使用 | boolean | false |  |
| label | `label` 标签的文本 | string\|ReactNode | - |  |
| labelAlign | 标签文本对齐方式 | `left` \| `right` | `right` |  |
| labelCol | `label` 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}`。你可以通过 Form 的 `labelCol` 进行统一设置。当和 Form 同时设置时，以 Item 为准 | [object](/components/grid/#Col) | - |  |
| name | 字段名，支持数组 | [NamePath](#NamePath) | - |  |
| preserve | 当字段被删除时保留字段值 | boolean | true | 4.4.0 |
| normalize | 组件获取值后进行转换，再放入 Form 中 | (value, prevValue, prevValues) => any | - |  |
| required | 必填样式设置。如不设置，则会根据校验规则自动生成 | boolean | false |  |
| rules | 校验规则，设置字段的校验逻辑。点击[此处](#components-form-demo-basic)查看示例 | [Rule](#Rule)[] | - |  |
| shouldUpdate | 自定义字段更新逻辑，说明[见下](#shouldUpdate) | boolean \| (prevValue, curValue) => boolean | false |  |
| trigger | 设置收集字段值变更的时机 | string | `onChange` |  |
| validateFirst | 当某一规则校验不通过时，是否停止剩下的规则的校验 | boolean | false |  |
| validateStatus | 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating' | string | - |  |
| validateTrigger | 设置字段校验的时机 | string \| string[] | `onChange` |  |
| valuePropName | 子节点的值的属性，如 Switch 的是 'checked'。该属性为 `getValueProps` 的封装，自定义 `getValueProps` 后会失效 | string | `value` |  |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 `labelCol`。你可以通过 Form 的 `wrapperCol` 进行统一设置。当和 Form 同时设置时，以 Item 为准。 | [object](/components/grid/#Col) | - |  |
| hidden | 是否隐藏字段（依然会收集和校验字段） | boolean | false |  |

被设置了 `name` 属性的 `Form.Item` 包装的控件，表单控件会自动添加 `value`（或 `valuePropName` 指定的其他属性） `onChange`（或 `trigger` 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

1. 你**不再需要也不应该**用 `onChange` 来做数据收集同步（你可以使用 Form 的 `onValuesChange`），但还是可以继续监听 `onChange` 事件。
2. 你不能用控件的 `value` 或 `defaultValue` 等属性来设置表单域的值，默认值可以用 Form 里的 `initialValues` 来设置。注意 `initialValues` 不能被 `setState` 动态更新，你需要用 `setFieldsValue` 来更新。
3. 你不应该用 `setState`，可以使用 `form.setFieldsValue` 来动态改变表单值。

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
| children | 渲染函数 | (fields: Field[], operation: { add, remove, move }) => React.ReactNode | - |

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

| 名称 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| getFieldInstance | 获取对应字段示例 | (name: [NamePath](#NamePath)) => any | 4.4.0 |
| getFieldValue | 获取对应字段名的值 | (name: [NamePath](#NamePath)) => any |  |
| getFieldsValue | 获取一组字段名对应的值，会按照对应结构返回 | (nameList?: [NamePath](#NamePath)[], filterFunc?: (meta: { touched: boolean, validating: boolean }) => boolean) => any |  |
| getFieldError | 获取对应字段名的错误信息 | (name: [NamePath](#NamePath)) => string[] |  |
| getFieldsError | 获取一组字段名对应的错误信息，返回为数组形式 | (nameList?: [NamePath](#NamePath)[]) => FieldError[] |  |
| isFieldTouched | 检查对应字段是否被用户操作过 | (name: [NamePath](#NamePath)) => boolean |  |
| isFieldsTouched | 检查一组字段是否被用户操作过，`allTouched` 为 `true` 时检查是否所有字段都被操作过 | (nameList?: [NamePath](#NamePath)[], allTouched?: boolean) => boolean |  |
| isFieldValidating | 检查一组字段是否正在校验 | (name: [NamePath](#NamePath)) => boolean |  |
| resetFields | 重置一组字段到 `initialValues` | (fields?: [NamePath](#NamePath)[]) => void |  |
| scrollToField | 滚动到对应字段位置 | (name: [NamePath](#NamePath), options: [[ScrollOptions](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options)]) => void |  |
| setFields | 设置一组字段状态 | (fields: [FieldData](#FieldData)[]) => void |  |
| setFieldsValue | 设置表单的值 | (values) => void |  |
| submit | 提交表单，与点击 `submit` 按钮效果相同 | () => void |  |
| validateFields | 触发表单验证 | (nameList?: [NamePath](#NamePath)[]) => Promise |  |

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

Rule 支持接收 object 进行配置，也支持 function 来动态获取 form 的数据：

```tsx
type Rule = RuleConfig | ((form: FormInstance) => RuleConfig);
```

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| enum | 是否匹配枚举中的值 | any[] |
| len | string 类型时为字符串长度；number 类型时为确定数字； array 类型时为数组长度 | number |
| max | 必须设置 `type`：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度 | number |
| message | 错误信息，不设置时会通过[模板](#validateMessages)自动生成 | string |
| min | 必须设置 `type`：string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度 | number |
| pattern | 正则表达式匹配 | RegExp |
| required | 是否为必选字段 | boolean |
| transform | 将字段值转换成目标值后进行校验 | (value) => any |
| type | 类型，常见有 `string` \|`number` \|`boolean` \|`url` \| `email`。更多请参考[此处](https://github.com/yiminghe/async-validator#type) | string |
| validator | 自定义校验，接收 Promise 作为返回值。[示例](#components-form-demo-register)参考 | ([rule](#Rule), value) => Promise |
| whitespace | 如果字段仅包含空格则校验不通过 | boolean |
| validateTrigger | 设置触发验证时机，必须是 Form.Item 的 `validateTrigger` 的子集 | string \| string[] |

## 从 v3 升级到 v4

如果你是 antd v3 的用户，你可以参考[迁移示例](/components/form/v3)。

<style>
.code-box-demo .ant-form:not(.ant-form-inline):not(.ant-form-vertical) {
  max-width: 600px;
}
.markdown.api-container table td:nth-of-type(4) {
  white-space: nowrap;
  word-wrap: break-word;
}
</style>

## FAQ

### 自定义 validator 没有效果

这是由于你的 `validator` 有错误导致 `callback` 没有执行到。你可以选择通过 `async` 返回一个 promise 或者使用 `try...catch` 进行错误捕获：

```jsx
validator: async (rule, value) => {
  throw new Error('Something wrong!');
}

// or

validator(rule, value, callback) => {
  try {
    throw new Error('Something wrong!');
  } catch (err) {
    callback(err);
  }
}
```

### 为何在 Modal 中调用 form 控制台会报错？

> Warning: Instance created by `useForm` is not connect to any Form element. Forget to pass `form` prop?

这是因为你在调用 form 方法时，Modal 还未初始化导致 form 没有关联任何 Form 组件。你可以通过给 Modal 设置 `forceRender` 将其预渲染。示例点击[此处](https://codesandbox.io/s/antd-reproduction-template-ibu5c)。

### 为什么 Form.Item 下的子组件 `defaultValue` 不生效？

当你为 Form.Item 设置 `name` 属性后，子组件会转为受控模式。因而 `defaultValue` 不会生效。你需要在 Form 上通过 `initialValues` 设置默认值。

### 为什么 `resetFields` 会重新 mount 组件？

`resetFields` 会重置整个 Field，因而其子组件也会重新 mount 从而消除自定义组件可能存在的副作用（例如异步数据、状态等等）。

### Form 的 initialValues 与 Item 的 initialValue 区别？

在大部分场景下，我们总是推荐优先使用 Form 的 `initialValues`。只有存在动态字段时你才应该使用 Item 的 `initialValue`。默认值遵循以下规则：

1. Form 的 `initialValues` 拥有最高优先级
2. Field 的 `initialValue` 次之 \*. 多个同 `name` Item 都设置 `initialValue` 时，则 Item 的 `initialValue` 不生效

### 为什么字段设置 `rules` 后更改值 `onFieldsChange` 会触发三次？

字段除了本身的值变化外，校验也是其状态之一。因而在触发字段变化会经历以下几个阶段：

1. Trigger value change
2. Rule validating
3. Rule validated

在触发过程中，调用 `isFieldValidating` 会经历 `false` > `true` > `false` 的变化过程。

<style>
  .site-form-item-icon {
    color: rgba(0, 0, 0, 0.25);
  }
  [data-theme="dark"] .site-form-item-icon {
    color: rgba(255,255,255,.3);
  }
</style>
