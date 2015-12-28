# Form

- category: Components
- chinese: 表单
- type: 表单

---

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。


## 表单

我们为 `form` 提供了以下两种排列方式：

- 水平排列：可以实现 `label` 标签和表单控件的水平排列;
- 行内排列：使其表现为 `inline-block` 级别的控件。

## 表单域

表单一定会包含表单域，表单域可以是输入控件，标准表单域，标签，下拉菜单，文本域等。

这里我们分别封装了表单域 `<Form.Item />` 和输入控件 `<Input />`。

```html
<Form.Item {...props}>
  {children}
</Form.Item>
```

## Input 输入框

```html
<Input {...props} />
```

## API

### Form

| 参数      | 说明                                     | 类型       |  可选值 |默认值 |
|-----------|------------------------------------------|------------|-------|--------|
|  horizontal | 水平排列布局 | boolean  |   | false    |
|  inline | 行内排列布局 | boolean |  | false |
|  onSubmit | 数据验证成功后回调事件 | Function(e:Event) |  |   |
|  prefixCls | 样式类名，默认为 ant-form，通常您不需要设置 | string |  |  'ant-form' |

### Form.Item

| 参数      | 说明                                     | 类型       |  可选值 |默认值 |
|-----------|------------------------------------------|------------|-------|--------|
|  label | label 标签的文本 | string  |   |     |
|  labelCol | label 标签布局，通 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` | object |  |  |
|  wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | object |  |  |
|  help | 提示信息 | string |  |   |
|  required | 是否必填 | bool |  | false  |
|  validateStatus | 校验状态 | string | 'success' 'warning' 'error' 'validating'  |   |
|  hasFeedback | 配合 validateStatus 属性使用，是否展示校验状态图标 | bool |  | false  |
|  prefixCls | 样式类名，默认为 ant-form，通常您不需要设置 | string |  |  'ant-form' |

### Form.ValueMixin

Mixin：当表单控件的输入值改变时，更新 formData。

**你需要为每个输入控件声明 `name` 属性**

### Input

| 参数      | 说明                                     | 类型       |  可选值 |默认值 |
|-----------|------------------------------------------|------------|-------|--------|
|  type | 【必须】声明 input 类型，同原生 input 标签的 type 属性 | string  |   | 'text'    |
|  value | value 值 | any |  | |
|  id | id | number 或 string |  |   |
|  size | 控件大小，默认值为 default 。注：标准表单内的输入框大小限制为 large。 | string | {'large','default','small'} |  'default' |
|  defaultValue | 设置初始默认值 | any |  |  |
|  disabled | 是否禁用状态，默认为 false | bool |  |  false |
|  addonBefore | 带标签的 input，设置前置标签 | node |  |   |
|  addonAfter | 带标签的 input，设置后置标签 | node |  |   |
|  prefixCls | 样式类名前缀，默认是 ant，通常您不需要设置 | string |  |  'ant' |

#### Input.Group

```html
<Input.Group className={string}>      // 样式类名前缀，默认是 ant-input-group，通常您不需要设置。
  {children}
</Input.Group>
```

