---
category: Components
group: Data Entry
title: Form
description: High-performance form component with data domain management. Includes data entry, validation, and corresponding styles.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-lcdS5Qm1bsAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*ylFATY6w-ygAAAAAAAAAAAAADrJ8AQ/original
---

## When to use

- When you need to create an instance or collect information.
- When you need to validate fields in certain rules.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic Usage</code>
<code src="./demo/control-hooks.tsx">Form methods</code>
<code src="./demo/layout.tsx">Form Layout</code>
<code src="./demo/layout-multiple.tsx">Form mix layout</code>
<code src="./demo/disabled.tsx">Form disabled</code>
<code src="./demo/variant.tsx" version="5.13.0">Form variants</code>
<code src="./demo/required-mark.tsx">Required style</code>
<code src="./demo/size.tsx">Form size</code>
<code src="./demo/layout-can-wrap.tsx">label can wrap</code>
<code src="./demo/warning-only.tsx">No block rule</code>
<code src="./demo/useWatch.tsx">Watch Hooks</code>
<code src="./demo/validate-trigger.tsx">Validate Trigger</code>
<code src="./demo/validate-only.tsx">Validate Only</code>
<code src="./demo/form-item-path.tsx">Path Prefix</code>
<code src="./demo/dynamic-form-item.tsx">Dynamic Form Item</code>
<code src="./demo/dynamic-form-items.tsx">Dynamic Form nest Items</code>
<code src="./demo/dynamic-form-items-no-style.tsx" debug>Dynamic Form nest pure Items</code>
<code src="./demo/dynamic-form-items-complex.tsx">Complex Dynamic Form Item</code>
<code src="./demo/nest-messages.tsx">Nest</code>
<code src="./demo/complex-form-control.tsx">complex form control</code>
<code src="./demo/customized-form-controls.tsx">Customized Form Controls</code>
<code src="./demo/global-state.tsx">Store Form Data into Upper Component</code>
<code src="./demo/form-context.tsx">Control between forms</code>
<code src="./demo/inline-login.tsx">Inline Login Form</code>
<code src="./demo/login.tsx">Login Form</code>
<code src="./demo/register.tsx">Registration</code>
<code src="./demo/advanced-search.tsx">Advanced search</code>
<code src="./demo/form-in-modal.tsx">Form in Modal to Create</code>
<code src="./demo/time-related-controls.tsx">Time-related Controls</code>
<code src="./demo/without-form-create.tsx">Handle Form Data Manually</code>
<code src="./demo/validate-static.tsx">Customized Validation</code>
<code src="./demo/dynamic-rule.tsx">Dynamic Rules</code>
<code src="./demo/form-dependencies.tsx">Dependencies</code>
<code src="./demo/getValueProps-normalize.tsx">getValueProps + normalize</code>
<code src="./demo/validate-scroll-to-field.tsx" iframe="360">Slide to error field</code>
<code src="./demo/validate-other.tsx">Other Form Controls</code>
<code src="./demo/disabled-input-debug.tsx" debug>Disabled Input Debug</code>
<code src="./demo/label-debug.tsx" debug>label ellipsis</code>
<code src="./demo/col-24-debug.tsx" debug>Test col 24 usage</code>
<code src="./demo/ref-item.tsx" debug>Ref item</code>
<code src="./demo/custom-feedback-icons.tsx" debug>Custom feedback icons</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Form

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| colon | Configure the default value of `colon` for Form.Item. Indicates whether the colon after the label is displayed (only effective when prop layout is horizontal) | boolean | true |  |
| disabled | Set form component disable, only available for antd components | boolean | false | 4.21.0 |
| component | Set the Form rendering element. Do not create a DOM node for `false` | ComponentType \| false | form |  |
| fields | Control of form fields through state management (such as redux). Not recommended for non-strong demand. View [example](#form-demo-global-state) | [FieldData](#fielddata)\[] | - |  |
| form | Form control instance created by `Form.useForm()`. Automatically created when not provided | [FormInstance](#forminstance) | - |  |
| feedbackIcons | Can be passed custom icons while `Form.Item` element has `hasFeedback` | [FeedbackIcons](#feedbackicons) | - | 5.9.0 |
| initialValues | Set value by Form initialization or reset | object | - |  |
| labelAlign | The text align of label of all items | `left` \| `right` | `right` |  |
| labelWrap | whether label can be wrap | boolean | false | 4.18.0 |
| labelCol | Label layout, like `<Col>` component. Set `span` `offset` value like `{span: 3, offset: 12}` or `sm: {span: 3, offset: 12}` | [object](/components/grid/#col) | - |  |
| layout | Form layout | `horizontal` \| `vertical` \| `inline` | `horizontal` |  |
| name | Form name. Will be the prefix of Field `id` | string | - |  |
| preserve | Keep field value even when field removed. You can get the preserve field value by `getFieldsValue(true)` | boolean | true | 4.4.0 |
| requiredMark | Required mark style. Can use required mark or optional mark. You can not config to single Form.Item since this is a Form level config | boolean \| `optional` \| ((label: ReactNode, info: { required: boolean }) => ReactNode) | true | `renderProps`: 5.9.0 |
| scrollToFirstError | Auto scroll to first failed field when submit | boolean \| [Options](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options) \| { focus: boolean } | false |  |
| size | Set field component size (antd components only) | `small` \| `middle` \| `large` | - |  |
| validateMessages | Validation prompt template, description [see below](#validatemessages) | [ValidateMessages](https://github.com/ant-design/ant-design/blob/6234509d18bac1ac60fbb3f92a5b2c6a6361295a/components/locale/en_US.ts#L88-L134) | - |  |
| validateTrigger | Config field validate trigger | string \| string\[] | `onChange` | 4.3.0 |
| variant | Variant of components inside form | `outlined` \| `borderless` \| `filled` | `outlined` | 5.13.0 |
| wrapperCol | The layout for input controls, same as `labelCol` | [object](/components/grid/#col) | - |  |
| onFieldsChange | Trigger when field updated | function(changedFields, allFields) | - |  |
| onFinish | Trigger after submitting the form and verifying data successfully | function(values) | - |  |
| onFinishFailed | Trigger after submitting the form and verifying data failed | function({ values, errorFields, outOfDate }) | - |  |
| onValuesChange | Trigger when value updated | function(changedValues, allValues) | - |  |
| clearOnDestroy | Clear form values when the form is uninstalled | boolean | false | 5.18.0 |

> It accepts all props which native forms support but `onSubmit`.

### validateMessages

Form provides [default verification error messages](https://github.com/ant-design/ant-design/blob/6234509d18bac1ac60fbb3f92a5b2c6a6361295a/components/locale/en_US.ts#L88-L134). You can modify the template by configuring `validateMessages` property. A common usage is to configure localization:

```jsx
const validateMessages = {
  required: "'${name}' is required!",
  // ...
};

<Form validateMessages={validateMessages} />;
```

Besides, [ConfigProvider](/components/config-provider/) also provides a global configuration scheme that allows for uniform configuration error notification templates:

```jsx
const validateMessages = {
  required: "'${name}' is Required!",
  // ...
};

<ConfigProvider form={{ validateMessages }}>
  <Form />
</ConfigProvider>;
```

## Form.Item

Form field component for data bidirectional binding, validation, layout, and so on.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| colon | Used with `label`, whether to display `:` after label text. | boolean | true |  |
| dependencies | Set the dependency field. See [below](#dependencies) | [NamePath](#namepath)\[] | - |  |
| extra | The extra prompt message. It is similar to help. Usage example: to display error message and prompt message at the same time | ReactNode | - |  |
| getValueFromEvent | Specify how to get value from event or other onChange arguments | (..args: any\[]) => any | - |  |
| getValueProps | Additional props with sub component (It's not recommended to generate dynamic function prop by `getValueProps`. Please pass it to child component directly) | (value: any) => Record<string, any> | - | 4.2.0 |
| hasFeedback | Used with `validateStatus`, this option specifies the validation status icon. Recommended to be used only with `Input`. Also, It can get feedback icons via icons prop. | boolean \| { icons: [FeedbackIcons](#feedbackicons) } | false | icons: 5.9.0 |
| help | The prompt message. If not provided, the prompt message will be generated by the validation rule. | ReactNode | - |  |
| hidden | Whether to hide Form.Item (still collect and validate value) | boolean | false | 4.4.0 |
| htmlFor | Set sub label `htmlFor` | string | - |  |
| initialValue | Config sub default value. Form `initialValues` get higher priority when conflict | string | - | 4.2.0 |
| label | Label text. When there is no need for a label but it needs to be aligned with a colon, it can be set to null | ReactNode | - | null: 5.22.0 |
| labelAlign | The text align of label, | `left` \| `right` | `right` |  |
| labelCol | The layout of label. You can set `span` `offset` to something like `{span: 3, offset: 12}` or `sm: {span: 3, offset: 12}` same as with `<Col>`. You can set `labelCol` on Form which will not affect nest Item. If both exists, use Item first | [object](/components/grid/#col) | - |  |
| messageVariables | The default validate field info, description [see below](#messagevariables) | Record&lt;string, string> | - | 4.7.0 |
| name | Field name, support array | [NamePath](#namepath) | - |  |
| normalize | Normalize value from component value before passing to Form instance. Do not support async | (value, prevValue, prevValues) => any | - |  |
| noStyle | No style for `true`, used as a pure field control. Will inherit parent Form.Item `validateStatus` if self `validateStatus` not configured | boolean | false |  |
| preserve | Keep field value even when field removed | boolean | true | 4.4.0 |
| required | Display required style. It will be generated by the validation rule | boolean | false |  |
| rules | Rules for field validation. Click [here](#form-demo-basic) to see an example | [Rule](#rule)\[] | - |  |
| shouldUpdate | Custom field update logic. See [below](#shouldupdate) | boolean \| (prevValue, curValue) => boolean | false |  |
| tooltip | Config tooltip info | ReactNode \| [TooltipProps & { icon: ReactNode }](/components/tooltip#api) | - | 4.7.0 |
| trigger | When to collect the value of children node. Click [here](#form-demo-customized-form-controls) to see an example | string | `onChange` |  |
| validateDebounce | Delay milliseconds to start validation | number | - | 5.9.0 |
| validateFirst | Whether stop validate on first rule of error for this field. Will parallel validate when `parallel` configured | boolean \| `parallel` | false | `parallel`: 4.5.0 |
| validateStatus | The validation status. If not provided, it will be generated by validation rule. options: `success` `warning` `error` `validating` | string | - |  |
| validateTrigger | When to validate the value of children node | string \| string\[] | `onChange` |  |
| valuePropName | Props of children node, for example, the prop of Switch or Checkbox is `checked`. This prop is an encapsulation of `getValueProps`, which will be invalid after customizing `getValueProps` | string | `value` |  |
| wrapperCol | The layout for input controls, same as `labelCol`. You can set `wrapperCol` on Form which will not affect nest Item. If both exists, use Item first | [object](/components/grid/#col) | - |  |
| layout | Form item layout | `horizontal` \| `vertical` | - | 5.18.0 |

After wrapped by `Form.Item` with `name` property, `value`(or other property defined by `valuePropName`) `onChange`(or other property defined by `trigger`) props will be added to form controls, the flow of form data will be handled by Form which will cause:

1. You shouldn't use `onChange` on each form control to **collect data**(use `onValuesChange` of Form), but you can still listen to `onChange`.
2. You cannot set value for each form control via `value` or `defaultValue` prop, you should set default value with `initialValues` of Form. Note that `initialValues` cannot be updated by `setState` dynamically, you should use `setFieldsValue` in that situation.
3. You shouldn't call `setState` manually, please use `form.setFieldsValue` to change value programmatically.

### dependencies

Used when there are dependencies between fields. If a field has the `dependencies` prop, this field will automatically trigger updates and validations when upstream is updated. A common scenario is a user registration form with "password" and "confirm password" fields. The "Confirm Password" validation depends on the "Password" field. After setting `dependencies`, the "Password" field update will re-trigger the validation of "Check Password". You can refer [examples](#form-demo-dependencies).

`dependencies` shouldn't be used together with `shouldUpdate`, since it may result in conflicting update logic.

### FeedbackIcons

`({ status: ValidateStatus, errors: ReactNode, warnings: ReactNode }) => Record<ValidateStatus, ReactNode>`

### shouldUpdate

Form updates only the modified field-related components for performance optimization purposes by incremental update. In most cases, you only need to write code or do validation with the [`dependencies`](#dependencies) property. In some specific cases, such as when a new field option appears with a field value changed, or you just want to keep some area updating by form update, you can modify the update logic of Form.Item via the `shouldUpdate`.

When `shouldUpdate` is `true`, any Form update will cause the Form.Item to be re-rendered. This is very helpful for custom rendering some areas. It should be noted that the child component should be returned in a function, otherwise `shouldUpdate` won't behave correctly:

related issue: [#34500](https://github.com/ant-design/ant-design/issues/34500)

```jsx
<Form.Item shouldUpdate>
  {() => {
    return <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>;
  }}
</Form.Item>
```

You can ref [example](#form-demo-inline-login) to see detail.

When `shouldUpdate` is a function, it will be called by form values update. Providing original values and current value to compare. This is very helpful for rendering additional fields based on values:

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

You can ref [example](#form-demo-control-hooks) to see detail.

### messageVariables

You can modify the default verification information of Form.Item through `messageVariables`.

```jsx
<Form>
  <Form.Item
    messageVariables={{ another: 'good' }}
    label="user"
    rules={[{ required: true, message: '${another} is required' }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    messageVariables={{ label: 'good' }}
    label={<span>user</span>}
    rules={[{ required: true, message: '${label} is required' }]}
  >
    <Input />
  </Form.Item>
</Form>
```

Since `5.20.2`, when you don't want to convert `${}`, you can use `\\${}` to skip:

```jsx
{ required: true, message: '${label} is convert, \\${label} is not convert' }

// good is convert, ${label} is not convert
```

## Form.List

Provides array management for fields.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| children | Render function | (fields: Field\[], operation: { add, remove, move }, meta: { errors }) => React.ReactNode | - |  |
| initialValue | Config sub default value. Form `initialValues` get higher priority when conflict | any\[] | - | 4.9.0 |
| name | Field name, support array. List is also a field, so it will return all the values by `getFieldsValue`. You can change this logic by [config](#getfieldsvalue) | [NamePath](#namepath) | - |  |
| rules | Validate rules, only support customize validator. Should work with [ErrorList](#formerrorlist) | { validator, message }\[] | - | 4.7.0 |

```tsx
<Form.List>
  {(fields) => (
    <div>
      {fields.map((field) => (
        <Form.Item {...field}>
          <Input />
        </Form.Item>
      ))}
    </div>
  )}
</Form.List>
```

Note: You should not configure Form.Item `initialValue` under Form.List. It always should be configured by Form.List `initialValue` or Form `initialValues`.

## operation

Some operator functions in render form of Form.List.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| add | add form item | (defaultValue?: any, insertIndex?: number) => void | insertIndex | 4.6.0 |
| move | move form item | (from: number, to: number) => void | - |  |
| remove | remove form item | (index: number \| number\[]) => void | number\[] | 4.5.0 |

## Form.ErrorList

New in 4.7.0. Show error messages, should only work with `rules` of Form.List. See [example](#form-demo-dynamic-form-item).

| Property | Description | Type         | Default |
| -------- | ----------- | ------------ | ------- |
| errors   | Error list  | ReactNode\[] | -       |

## Form.Provider

Provide linkage between forms. If a sub form with `name` prop update, it will auto trigger Provider related events. See [example](#form-demo-form-context).

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| onFormChange | Triggered when a sub form field updates | function(formName: string, info: { changedFields, forms }) | - |
| onFormFinish | Triggered when a sub form submits | function(formName: string, info: { values, forms }) | - |

```jsx
<Form.Provider
  onFormFinish={(name) => {
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

| Name | Description | Type | Version |
| --- | --- | --- | --- |
| getFieldError | Get the error messages by the field name | (name: [NamePath](#namepath)) => string\[] |  |
| getFieldInstance | Get field instance | (name: [NamePath](#namepath)) => any | 4.4.0 |
| getFieldsError | Get the error messages by the fields name. Return as an array | (nameList?: [NamePath](#namepath)\[]) => FieldError\[] |  |
| getFieldsValue | Get values by a set of field names. Return according to the corresponding structure. Default return mounted field value, but you can use `getFieldsValue(true)` to get all values | [GetFieldsValue](#getfieldsvalue) |  |
| getFieldValue | Get the value by the field name | (name: [NamePath](#namepath)) => any |  |
| isFieldsTouched | Check if fields have been operated. Check if all fields is touched when `allTouched` is `true` | (nameList?: [NamePath](#namepath)\[], allTouched?: boolean) => boolean |  |
| isFieldTouched | Check if a field has been operated | (name: [NamePath](#namepath)) => boolean |  |
| isFieldValidating | Check field if is in validating | (name: [NamePath](#namepath)) => boolean |  |
| resetFields | Reset fields to `initialValues` | (fields?: [NamePath](#namepath)\[]) => void |  |
| scrollToField | Scroll to field position | (name: [NamePath](#namepath), options: \[[ScrollOptions](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options)]) => void |  |
| setFields | Set fields status | (fields: [FieldData](#fielddata)\[]) => void |  |
| setFieldValue | Set fields value(Will directly pass to form store and **reset validation message**. If you do not want to modify passed object, please clone first) | (name: [NamePath](#namepath), value: any) => void | 4.22.0 |
| setFieldsValue | Set fields value(Will directly pass to form store and **reset validation message**. If you do not want to modify passed object, please clone first). Use `setFieldValue` instead if you want to only config single value in Form.List | (values) => void |  |
| submit | Submit the form. It's same as click `submit` button | () => void |  |
| validateFields | Validate fields. Use `recursive` to validate all the field in the path | (nameList?: [NamePath](#namepath)\[], config?: [ValidateConfig](#validatefields)) => Promise |  |

#### validateFields

```tsx
export interface ValidateConfig {
  // New in 5.5.0. Only validate content and not show error message on UI.
  validateOnly?: boolean;
  // New in 5.9.0. Recursively validate the provided `nameList` and its sub-paths.
  recursive?: boolean;
  // New in 5.11.0. Validate dirty fields (touched + validated).
  // It's useful to validate fields only when they are touched or validated.
  dirty?: boolean;
}
```

return sample:

```jsx
validateFields()
  .then((values) => {
    /*
  values:
    {
      username: 'username',
      password: 'password',
    }
  */
  })
  .catch((errorInfo) => {
    /*
    errorInfo:
      {
        values: {
          username: 'username',
          password: 'password',
        },
        errorFields: [
          { name: ['password'], errors: ['Please input your Password!'] },
        ],
        outOfDate: false,
      }
    */
  });
```

## Hooks

### Form.useForm

`type Form.useForm = (): [FormInstance]`

Create Form instance to maintain data store.

### Form.useFormInstance

`type Form.useFormInstance = (): FormInstance`

Added in `4.20.0`. Get current context form instance to avoid pass as props between components:

```tsx
const Sub = () => {
  const form = Form.useFormInstance();

  return <Button onClick={() => form.setFieldsValue({})} />;
};

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Sub />
    </Form>
  );
};
```

### Form.useWatch

`type Form.useWatch = (namePath: NamePath | (selector: (values: Store) => any), formInstance?: FormInstance | WatchOptions): Value`

`5.12.0` add `selector`

Watch the value of a field. You can use this to interact with other hooks like `useSWR` to reduce development costs:

```tsx
const Demo = () => {
  const [form] = Form.useForm();
  const userName = Form.useWatch('username', form);

  const { data: options } = useSWR(`/api/user/${userName}`, fetcher);

  return (
    <Form form={form}>
      <Form.Item name="username">
        <AutoComplete options={options} />
      </Form.Item>
    </Form>
  );
};
```

If your component is wrapped by `Form.Item`, you can omit the second argument, `Form.useWatch` will find the nearest `FormInstance` automatically.

By default `useWatch` only watches the registered field. If you want to watch the unregistered field, please use `preserve`:

```tsx
const Demo = () => {
  const [form] = Form.useForm();

  const age = Form.useWatch('age', { form, preserve: true });
  console.log(age);

  return (
    <div>
      <Button onClick={() => form.setFieldValue('age', 2)}>Update</Button>
      <Form form={form}>
        <Form.Item name="name">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};
```

### Form.Item.useStatus

`type Form.Item.useStatus = (): { status: ValidateStatus | undefined, errors: ReactNode[], warnings: ReactNode[] }`

Added in `4.22.0`. Could be used to get validate status of Form.Item. If this hook is not used under Form.Item, `status` would be `undefined`. Added `error` and `warnings` in `5.4.0`, Could be used to get error messages and warning messages of Form.Item:

```tsx
const CustomInput = ({ value, onChange }) => {
  const { status, errors } = Form.Item.useStatus();
  return (
    <input
      value={value}
      onChange={onChange}
      className={`custom-input-${status}`}
      placeholder={(errors.length && errors[0]) || ''}
    />
  );
};

export default () => (
  <Form>
    <Form.Item name="username">
      <CustomInput />
    </Form.Item>
  </Form>
);
```

#### Difference between other data fetching method

Form only update the Field which changed to avoid full refresh perf issue. Thus you can not get real time value with `getFieldsValue` in render. And `useWatch` will rerender current component to sync with latest value. You can also use Field renderProps to get better performance if only want to do conditional render. If component no need care field value change, you can use `onValuesChange` to give to parent component to avoid current one rerender.

## Interface

### NamePath

`string | number | (string | number)[]`

### GetFieldsValue

`getFieldsValue` provides overloaded methods:

#### getFieldsValue(nameList?: true | [NamePath](#namepath)\[], filterFunc?: FilterFunc)

When `nameList` is empty, return all registered fields, including values of List (even if List has no Item children).

When `nameList` is `true`, return all values in store, including unregistered fields. For example, if you set the value of an unregistered Item through `setFieldsValue`, you can also get all values through `true`.

When `nameList` is an array, return the value of the specified path. Note that `nameList` is a nested array. For example, you need the value of a certain path as follows:

```tsx
// Single path
form.getFieldsValue([['user', 'age']]);

// multiple path
form.getFieldsValue([
  ['user', 'age'],
  ['preset', 'account'],
]);
```

#### getFieldsValue({ strict?: boolean, filter?: FilterFunc })

New in `5.8.0`. Accept configuration parameters. When `strict` is `true`, only the value of Item will be matched. For example, in `{ list: [{ bamboo: 1, little: 2 }] }`, if List is only bound to the `bamboo` field, then `getFieldsValue({ strict: true })` will only get `{ list: [{ bamboo: 1 }] }`.

### FilterFunc

To filter certain field values, `meta` will provide information related to the fields. For example, it can be used to retrieve values that have only been modified by the user, and so on.

```tsx
type FilterFunc = (meta: { touched: boolean; validating: boolean }) => boolean;
```

### FieldData

| Name       | Description              | Type                     |
| ---------- | ------------------------ | ------------------------ |
| errors     | Error messages           | string\[]                |
| warnings   | Warning messages         | string\[]                |
| name       | Field name path          | [NamePath](#namepath)\[] |
| touched    | Whether is operated      | boolean                  |
| validating | Whether is in validating | boolean                  |
| value      | Field value              | any                      |

### Rule

Rule supports a config object, or a function returning config object:

```tsx
type Rule = RuleConfig | ((form: FormInstance) => RuleConfig);
```

| Name | Description | Type | Version |
| --- | --- | --- | --- |
| defaultField | Validate rule for all array elements, valid when `type` is `array` | [rule](#rule) |  |
| enum | Match enum value. You need to set `type` to `enum` to enable this | any\[] |  |
| fields | Validate rule for child elements, valid when `type` is `array` or `object` | Record&lt;string, [rule](#rule)> |  |
| len | Length of string, number, array | number |  |
| max | `type` required: max length of `string`, `number`, `array` | number |  |
| message | Error message. Will auto generate by [template](#validatemessages) if not provided | string \| ReactElement |  |
| min | `type` required: min length of `string`, `number`, `array` | number |  |
| pattern | Regex pattern | RegExp |  |
| required | Required field | boolean |  |
| transform | Transform value to the rule before validation | (value) => any |  |
| type | Normally `string` \|`number` \|`boolean` \|`url` \| `email`. More type to ref [here](https://github.com/react-component/async-validator#type) | string |  |
| validateTrigger | Set validate trigger event. Must be the sub set of `validateTrigger` in Form.Item | string \| string\[] |  |
| validator | Customize validation rule. Accept Promise as return. See [example](#form-demo-register) | ([rule](#rule), value) => Promise |  |
| warningOnly | Warning only. Not block form submit | boolean | 4.17.0 |
| whitespace | Failed if only has whitespace, only work with `type: 'string'` rule | boolean |  |

### WatchOptions

| Name | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| form | Form instance | FormInstance | Current form in context | 5.4.0 |
| preserve | Whether to watch the field which has no matched `Form.Item` | boolean | false | 5.4.0 |

## Design Token

<ComponentTokenTable component="Form"></ComponentTokenTable>

## FAQ

### Why can't Switch、Checkbox bind data?

Form.Item default bind value to `value` prop, but Switch or Checkbox value prop is `checked`. You can use `valuePropName` to change bind value prop.

```tsx | pure
<Form.Item name="fieldA" valuePropName="checked">
  <Switch />
</Form.Item>
```

### How does `name` fill value when it's an array?

`name` will fill value by array order. When there exists number in it and no related field in form store, it will auto convert field to array. If you want to keep it as object, use string like: `['1', 'name']`.

### Why is there a form warning when used in Modal?

> Warning: Instance created by `useForm` is not connect to any Form element. Forget to pass `form` prop?

Before Modal opens, children elements do not exist in the view. You can set `forceRender` on Modal to pre-render its children. Click [here](https://codesandbox.io/s/antd-reproduction-template-ibu5c) to view an example.

### Why is component `defaultValue` not working when inside Form.Item?

Components inside Form.Item with name property will turn into controlled mode, which makes `defaultValue` not work anymore. Please try `initialValues` of Form to set default value.

### Why can not call `ref` of Form at first time?

`ref` only receives the mounted instance. please ref React official doc: <https://reactjs.org/docs/refs-and-the-dom.html#accessing-refs>

### Why will `resetFields` re-mount component?

`resetFields` will re-mount component under Field to clean up customize component side effects (like async data, cached state, etc.). It's by design.

### Difference between Form initialValues and Item initialValue?

In most case, we always recommend to use Form `initialValues`. Use Item `initialValue` only with dynamic field usage. Priority follows the rules:

1. Form `initialValues` is the first priority
2. Field `initialValue` is secondary \*. Does not work when multiple Item with same `name` setting the `initialValue`

### Why can't `getFieldsValue` get value at first render?

`getFieldsValue` returns collected field data by default, but the Form.Item node is not ready at the first render. You can get all field data by `getFieldsValue(true)`.

### Why some component not response with `setFieldsValue` to `undefined`?

`value` change from certain one to `undefined` in React means from controlled mode to uncontrolled mode. Thus it will not change display value but modified FormStore in fact. You can HOC to handle this:

```jsx
const MyInput = ({
  // Force use controlled mode
  value = '',
  ...rest
}) => <input value={value} {...rest} />;

<Form.Item name="my">
  <MyInput />
</Form.Item>;
```

### Why does `onFieldsChange` trigger three times on change when field sets `rules`?

Validating is also part of the value updating. It pass follow steps:

1. Trigger value change
2. Rule validating
3. Rule validated

In each `onFieldsChange`, you will get `false` > `true` > `false` with `isFieldValidating`.

### Why doesn't Form.List support `label` and need ErrorList to show errors?

Form.List use renderProps which mean internal structure is flexible. Thus `label` and `error` can not have best place. If you want to use antd `label`, you can wrap with Form.Item instead.

### Why can't Form.Item `dependencies` work on Form.List field?

Your name path should also contain Form.List `name`:

```tsx
<Form.List name="users">
  {(fields) =>
    fields.map((field) => (
      <React.Fragment key={field.key}>
        <Form.Item name={[field.name, 'name']} {...someRest1} />
        <Form.Item name={[field.name, 'age']} {...someRest1} />
      </React.Fragment>
    ))
  }
</Form.List>
```

dependencies should be `['users', 0, 'name']`

### Why doesn't `normalize` support async?

React can not get correct interaction of controlled component with async value update. When user trigger `onChange`, component will do no response since `value` update is async. If you want to trigger value update async, you should use customize component to handle value state internal and pass sync value control to Form instead.

### `scrollToFirstError` and `scrollToField` not working?

1. use custom form control

See similar issues: [#28370](https://github.com/ant-design/ant-design/issues/28370) [#27994](https://github.com/ant-design/ant-design/issues/27994)

Starting from version `5.17.0`, the sliding operation will prioritize using the ref element forwarded by the form control elements. Therefore, when considering custom components to support verification scrolling, please consider forwarding it to the form control elements first.

`scrollToFirstError` and `scrollToField` deps on `id` attribute passed to form control, please make sure that it hasn't been ignored in your custom form control. Check [codesandbox](https://codesandbox.io/s/antd-reproduction-template-forked-25nul?file=/index.js) for solution.

2. multiple forms on same page

If there are multiple forms on the page, and there are duplicate same `name` form item, the form scroll probably may find the form item with the same name in another form. You need to set a different `name` for the `Form` component to distinguish it.

### Continue, why not use `ref` to bind element?

Form can not get real DOM node when customize component not support `ref`. It will get warning in React Strict Mode if wrap with Class Component and call `findDOMNode`. So we use `id` to locate element.

### `setFieldsValue` do not trigger `onFieldsChange` or `onValuesChange`?

It's by design. Only user interactive can trigger the change event. This design is aim to avoid call `setFieldsValue` in change event which may makes loop calling.

### Why Form.Item not update value when children is nest?

Form.Item will inject `value` and `onChange` to children when render. Once your field component is wrapped, props will not pass to the correct node. Follow code will not work as expect:

```jsx
<Form.Item name="input">
  <div>
    <h3>I am a wrapped Input</h3>
    <Input />
  </div>
</Form.Item>
```

You can use HOC to solve this problem, don't forget passing props to form control component:

```jsx
const MyInput = (props) => (
  <div>
    <h3>I am a wrapped Input</h3>
    <Input {...props} />
  </div>
);

<Form.Item name="input">
  <MyInput />
</Form.Item>;
```
