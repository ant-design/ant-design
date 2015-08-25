# Validation

- category: Components
- chinese: 表单校验
- type: 表单

---

表单校验。

## 何时使用

同表单结合使用，对表单域进行校验，提供前台校验和后台实时反馈校验，并对表单错误提供有效信息提示。

## API

```html
<Validation>
  <Validator>
    <CustomComponent>
      <input />
    </CustomComponent>
  </Validator>
</Validation>
```


### Validation

| 属性       | 类型           |       说明       |
|-----------|---------------|--------------------|
| onValidate | func | 当内部 Validator 开始校验时被调用。 |

| 方法       |     说明       |
|------------|----------------|
| validate(callback) | 对所有表单域进行校验。 |
| reset()            | 将表单域的值恢复为初始值。 |
| forceValidate(fields, callback) | 对指定的表单域进行校验，fields 对应每个 Validator 包裹的表单域的 name 属性值。|

### Validation.Validator

一个 Validator 对应一个表单域，校验的表单域需要声明 `name` 属性作为校验标识，如 `<input name="username"  />`。

| 属性       | 类型      | 默认值      |    说明       |
|-----------|---------------|--------------------|
| rules | array 或者 object | | 支持多规则校验，默认提供的规则详见 [async-validator](https://github.com/yiminghe/async-validator)，同时支持用户自定义校验规则。|
| trigger | String | onChange | 设定如何触发校验动作。 |

### rules 说明（[async-validator](https://github.com/yiminghe/async-validator)）

示例： `{type: "string", required: true, min: 5, message: "请至少填写 5 个字符。" }`

- `type` : 声明校验的值类型（如 string email），这样就会使用默认提供的规则进行校验，更多详见 [type](https://github.com/yiminghe/async-validator#user-content-type)；
- `required`: 是否必填；
- `pattern`: 声明校验正则表达式；
- `min` / `max`: 最小值、最大值声明（对于 string 和 array 来说，针对的是其长度 length。）；
- `len`: 字符长度；
- `enum`: 枚举值，对应 type 值为 `enum`，例如 `role: {type: "enum", enum: ['A', 'B', 'C']}`；
- `whitespace`: 是否允许空格， `true` 为允许；
- `fields`: 当你需要对类型为 object 或者 array 的每个值做校验时使用，详见 [fields](https://github.com/yiminghe/async-validator#deep-rules)；
- `transform`: 当你需要在校验前对值做一些处理的时候；
- `message`: 自定义提示信息，[更多](https://github.com/yiminghe/async-validator#messages)；
- `validator`: 自定义校验规则。
