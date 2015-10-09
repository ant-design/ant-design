# Form

- category: Components
- chinese: 表单
- type: 表单

---

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。


## 表单

我们为 `form` 提供了以下两种排列方式：

- 水平排列：可以实现 `label` 标签和表单控件的水平排列;
- 行内排列：使其表现为 inline-block 级别的控件。



## 表单域

表单一定会包含表单域，表单域可以是输入控件，标准表单域，标签，下拉菜单，文本域等。

这里我们分别为表单域和输入控件封装了 
- `<Form.Item></Form.Item>`；
- `<Form.Input></Form.Input>`。

## API 

### Form
``` html
<Form
  prefixCls={string}    // 样式类名，默认为 ant-form，通常您不需要设置。
  horizontal={bool}     // 水平排列布局。
  inline={bool}         // 行内排列布局。
  onSubmit={function}   // 数据验证成功后回调事件。
>  
  {children}
</Form>
```

### Form.Item

``` html
<FormItem
  prefixCls={string}        // 样式类名，默认为 ant-form，通常您不需要设置。
  label={string|element}    // label 标签的文本。
  labelClassName={string}   // label 标签样式，比如设置布局样式 'col-4'。
  wrapperClassName={string} // 需要为输入控件设置布局样式时，使用该属性。
  help={string}             // 提示信息。
  required={bool}           // 是否必填，默认为 false。
  isCompact={bool}          // 样式设置，是否开启紧凑模式，即缩小上下留白，默认为 false。
  hasFeedback={bool}        // 配合 validateStatus 属性使用，是否展示校验状态图标，默认 false。
  validateStatus={'success'|'warning'|'error'|'validating'}     // 校验状态，必须为 'success', 'warning', 'error', 'validating'中的一个值。
>
  [<Input /> | <CheckBox> | <Select> | ...]
</FormItem>
```

### Form.Input

```html 
<Form.Input 
  prefixCls={string}      // 样式类名前缀，默认是 ant，通常您不需要设置。
  type={string}           // input 类型，保留原生 input 标签的 type 属性值，新增 static，详见例子。 
  value={any}             // value 值 。
  id={number|string}      // id。
  size={'large'|'small'}  // 控件大小。
  defaultValue={any}      // 设置初始默认值。
  disabled={bool}         // 是否禁用状态，默认为 false。
  addonBefore={node}      // 带标签的 input，设置前置标签。
  addonAfter={node}       // 带标签的 input，设置后置标签。
/>
```

设置 input group:

```html 
<Form.Input.Group 
  className={string}      // 样式类名前缀，默认是 ant-input-group，通常您不需要设置。
>
  {children}
</Form.Input.Group>
```
