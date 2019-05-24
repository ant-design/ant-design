# 表单实现原理

---

antd 中的 [Form](https://github.com/ant-design/ant-design/blob/master/components/form/index.zh-CN.md) 组件基于 [rc-form](https://github.com/react-component/form) 实现。本文第一部分将介绍 rc-form 库；第二部分再介绍 antd 中的 Form 组件；第三部分将结合表单组件的使用，回顾前两部分的内容。

---

### rc-form

常规收集表单数据并作校验，只需以 store 实时记录表单数据，校验后重绘表单。这样的思路以业务代码为例，就是，以数据模型 model 集成数据处理操作，再通过 setState 将 model 中的实时数据注入组件中，并驱动组件重绘（除了 setState 方法以外，也可以使用 forceUpdate 方法重绘组件，并在 render 阶段重新访问 model 中的实时数据）。

#### FieldsStore

在 rc-form 中，上述数据模型的具体实现为 FieldsStore 类。如前所述，FieldsStore 实例与视图层的交互逻辑为，在用户行为驱动字段变更时，即时存储字段的值及校验信息（本文以校验信息代指校验文案和校验状态），继而调用表单组件实例的 forceUpdate 方法强制重绘；在绘制过程中，再从 FieldsStore 实例读取实时数据和校验信息。

建模方面，FieldsStore 实例以 fields 属性存储表单的实时数据，即由用户行为或开发者显式更新的数据。本文把实时数据已存入 fields 中的字段称为已收集字段；反之，称为未收集字段。以下是 fields\[name\] 中成员属性的意义（name 为字段名，下同）。

- value 字段的值。
- errors 校验文案，数组形式。
- validating 校验状态。
- dirty 脏值标识。真值时意味着字段的值已作变更，但未作校验。
- touched 用户行为标识。通常情况下，真值时意味着用户行为已促使字段的值发生了变更。

FieldsStore 实例又以 fieldsMeta 属性存储字段的元数据。元数据作为配置项，通常是指定后不再变更的数据，用于操控表单数据转换等行为。元数据通过下文中 getFieldProps, getFieldDecorator 方法的次参 fieldOption 配置。以下是 fieldsMeta\[name\] 中部分成员属性的意义（如不作特殊说明，该成员属性即 fieldOption 中的同名属性）。

- validate 校验规则和触发事件，用于约定在何种事件下以何种方式校验字段的值，\[{ rules, trigger }\] 形式。通过 fieldOption.validate, fieldOption.rules, fieldOption.validateTrigger 配置。
- hidden 设置为 true 时，validateFields 将不会校验该字段，需要开发者手动校验，并且，getFieldsValue, getFieldsError 等方法也将无法获取该字段的数据及校验信息等实时数据。适用场景如勾选协议复选框，当其已勾选时，提交按钮才可点击，该复选框的值不会出现在全量表单数据中。本文假定配置了 hidden 为 true 的字段为虚拟隐藏项。
- getValueFromEvent(event) 用于从 event 对象中获取字段的值，适用场景如处理 input, radio 等原生组件。特别的，当字段组件输出的首参不是 event 对象时，getValueFromEvent 将对首参进行数据转化，以满足特定的场景，比如由开发者指定具体首参内容的自定义字段组件。
- initialValue 字段的初始值。当字段的值未作收集时，初始值用于作为字段的值。
- valuePropName 约定字段的值以何种 props 属性注入字段组件中，适用场景如将字段的值以 props.checked 属性注入 radio 组件中。注入字段组件的值数据 props 由 getFieldValuePropValue 方法生成，下同。
- getValueProps(value) 用于转化字段的值，输出 props 以注入字段组件中。适用场景如当 get, post 请求的数据结构不同时，且字段组件以 post 请求的数据结构输出字段的值、以 get 请求的数据结构接受字段的值，那就可以使用 getValueProps 将 post 请求的数据结构转换为 get 请求的数据结构。
- normalize(newValue, oldValue, values) 用于转化存入 FieldsStore 实例的字段的值。使用案例如[全选按钮](https://codepen.io/afc163/pen/JJVXzG?editors=001)。

在此基础上，FieldsStore 提供了一些便捷的访问器操作。需要说明的是，rc-form 借助 [lodash](https://github.com/lodash/lodash)，支持以嵌套结构定义字段名，即使用 '.', '\[|\]' 作为分割符，如 'a.b' 意味着 a 对象下的 b 属性；'c\[0\]' 意味着 c 数组的首项。本文约定匹配字段指，所有以指定字符串起始或等值的字段列表。为此，FieldsStore 提供 isValidNestedFieldName 用于校验字段名不能作为表单中另一个字段名的成员；flattenRegisteredFields 用于传参数据作扁平化处理；getValidFieldsFullName 用于获取匹配字段列表，但不包含虚拟隐藏项。除此以外，FieldsStore 提供了对实时数据和元数据的读取操作，特别的，部分 api 可用于获取匹配字段的实时数据，参见[文档](https://ant.design/components/form-cn/)。

#### BaseForm

与业务 model 不同的是，FieldsStore 仅作为表单实时数据和元数据的存储器，校验数据等方法由 BaseForm 提供。BaseForm 既作为 HOC 容器，能为开发者自定义表单组件（下文用自定义表单替代）注入表单操作函数集，通常是 props.form；又用于装饰字段组件或其 props，以收集字段的元数据、通过绑定函数收集或校验字段的实时数据。因此，可以部分认为，BaseForm 即 FieldsStore 和视图层桥接的控制器。其机制为：

首先，通过 createBaseForm(option, mixins) 创建装饰函数。装饰函数可以为自定义表单包裹上 BaseForm 容器。参数 option 用于配置表单层面的绑定函数、校验文案以及部分字段组件的 props 属性名；mixins 将作为实例方法混入 BaseForm，特别的，createDOMForm 函数即通过这一机制混入了 validateFieldsAndScroll 方法。

其次，在 BaseForm 的 getInitialState 阶段，将创建 FieldsStore 实例，并初始化 clearedFieldMetaCache 等缓存。这些缓存的意义包含缓存字段组件实例，缓存内置的 ref 引用及绑定函数，缓存渲染状态等。特别的，clearedFieldMetaCache 用于在 ref 引用函数执行时缓存字段的实时数据和元数据，以便于在字段重绘过程中的第两次执行 ref 引用时，恢复 FieldsStore 存储的实时数据和元数据（参见[源码](https://github.com/react-component/form/blob/master/src/createBaseForm.js)中的 saveRef 方法）。不然，元数据的丢失将导致数据校验无法正常工作。

其次，执行 render 方法，将表单操作函数集通过 props 注入自定义表单。介于此，在自定义表单中，开发者可以获取到表单的实时数据，或者更新表单数据，或者校验表单，以完成特定的处理逻辑。

其次，由 BaseForm 提供的 getFieldProps 或 getFieldDecorator 实例方法完成字段组件的渲染。以下是 getFieldProps, getFieldDecorator 的意义。

- getFieldProps(name, fieldOption) 用于为 FieldsStore 实例收集字段的元数据，如经转化后的校验规则等；指定字段组件的 ref 引用函数；为字段组件绑定 onCollect, onCollectValidate 实例方法，以在指定事件触发时收集或校验字段的值；最终将输出注入字段组件的 props，包含全量的元数据和实时数据、以及字段的值。
- getFieldDecorator(name, fieldOption) 基于 getFieldProps 方法，直接装饰字段组件，这样就可以操控添加在字段组件上的 ref 引用函数及 props.onChange 等绑定函数。

其次，当用户行为促使字段的值发生变更时，将执行 BaseForm 实例的 onCollect, onCollectValidate 方法，以收集或校验该字段的实时数据，并重绘表单。其中，rc-form 中的数据校验通过 [async-validate](https://github.com/yiminghe/async-validator) 库实现，具体实现为 BaseForm 实例的 validateFieldsInternal 方法。校验字段时，默认将沿用上一次的校验信息；当设置 force 为 true 时，将强制重新校验。

详细的工作流程参见下方的时序图： <img class="preview-img no-padding" src="http://xzfyu.com/2018/11/04/ant%20design/antd-Form%20%E7%BB%84%E4%BB%B6/rc-form%E6%97%B6%E5%BA%8F%E5%9B%BE.png">

### Form 表单

#### 表单

Form 组件本身并不承载逻辑，而是通过 props.className, props.prefixCls, props.layout, props.hideRequiredMark, props.onSubmit 设定注入 form 原生节点的样式类及绑定函数，以影响表单内部节点渲染时的样式。同时，Form 组件将为子组件传入 context.vertical 以区分是水平布局，还是垂直布局。

#### 表单域

FormItem 组件用于设定表单项的布局。如同受控组件和非受控组件，FormItem 组件提供两种使用方式：其一，当未设定校验信息相关的 props 属性时，FormItem 组件将自动根据内部字段组件实例的状况渲染校验文案及校验状态；其二，当设定校验信息相关的 props 属性时，FormItem 组件将根据开发者传入的 props 渲染校验文案及校验状态。在第一种使用方式下，FormItem 组件只可以包含一个字段组件；在第二种使用方式下，FormItem 组件中可以包含多个字段组件，布局也更为灵活。这里说的相关 props 属性包含：校验文案 help, 校验状态 validateStatus（用于绘制反馈图标）, 必填标识 required, 字段名 id（影响点击 label 时聚焦哪个字段元素）。

那么，FormItem 又是怎样自动收集字段组件的校验数据呢？因为在 BaseForm 组件提供的 getFieldProp 方法，字段名、元数据和实时数据都将作为特殊的 props 属性传入到字段组件中，所以作为字段组件容器的 FormItem，就可以通过这些特殊的 props 属性判断子组件实例是不是一个字段组件实例。当其为字段组件实例时，进一步收集实时的校验信息，从校验规则中获取是否必填标识，以完成表单域的渲染。

此外，FormItem 可以使用 props.labelCol, props.wrapperCol 属性栅格化布局标签组件和字段组件，其实现借助于 antd 提供的 [Row, Col 组件](https://ant.design/components/grid-cn/)。当点击标签 label 时，FormItem 提供的绑定函数也能自动为字段组件获得焦点。这里不再多加介绍。

### 使用与回顾

#### 创建 HOC 容器

结合上文，antd 使用 Form.create(options)(CustomizedForm) 形式为用户自定义表单包裹上 BaseForm 高阶组件，以此植入 props.form 表单操作函数集。

高阶组件影响对自定义表单设置 ref 引用。默认可使用 BaseForm 实例的 refs.wrappedComponent 属性访问 CustomizedForm 实例，其次也可以通过 props.wrappedComponentRef 为 CustomizedForm 实例配置 ref 引用（参考案例 —— 弹出层中的新建表单）。当自定义表单可切换或者需要对外交互时，设置 ref 引用通常是不可避免的。

高阶组件影响 props 传递。antd 既支持使用 options.mapPropsToFields 将 BaseForm 实例获得的 props 转化成表单的实时数据（需要结合 Form.createFormField 方法），又支持在 CustomizedForm 实例中调用 props.form.setFields 方法更新实时数据。当 options.mapPropsToFields, options.onFieldsChange 方法结合使用时，可用于完成自定义表单和上层组件、或者 view 层和 store 层的交互（参考案例 —— 表单数据存储于上层组件）。

一般认为，对整张表单的控制，需要借助于 Form.create 方法的首参 options 配置实现。

#### 操作函数集

通常情况下，CustomizedForm 实例可通过 props.form 获取到表单操作函数集。当然，开发者也可以通过 options.formPropName 指定操作函数集的 props 属性名。

操作函数集包含 getFieldProps, getFieldDecorator, getFieldInstance, setFields, setFieldsValue, setFieldsInitialValue, resetFields, validateFields, getFieldsValue, getFieldValue, getFieldsError, getFieldError, isFieldsValidating, isFieldValidating, isFieldsTouched, isFieldTouched 方法，即用于装饰字段组件（或其 props）、获取字段组件实例、设置或获取实时数据、重置或校验字段。

如上文所说，getFieldProps, getFieldDecorator 方法即用于自动为字段组件绑定监听函数，这样就可以在指定事件触发时，收集和校验字段的值。同时，可以通过这两个方法将视图中未加显示的字段存入 FieldsStore 中（这时，可以将 FieldsStore 视为一个内置于表单组件的状态管理器）。比如在包含其他选项的单选框场景中，就可以使用 getFieldDecorator 创建虚拟字段，通过绑定函数将单选框和输入框的值赋值到该虚拟字段中，并使用该虚拟字段的校验信息绘制 FormItem。参考案例 —— 动态增减表单项。

上述单选框场景，也可以使用自定义字段组件 CustomizedField 实现。参考案例 —— 自定义字段组件。当使用自定义字段组件时，通过 getFieldInstance 获取 CustomizedField 的实例可能是必不可少的，这样可以把略显复杂的数据校验方法集成在 CustomizedField 中。此外，在字段组件中，既可以通过 props.value 属性获得字段的值，也可以通过 props\['data-**meta'\], props\['data-**field'\] 获得字段的全量元数据和实时数据。

在 CustomizedForm 中，使用 getFieldValue 可以取得字段的实时更新值，这样就能根据指定字段的值控制另一个字段的显隐。此外，通过在字段组件的 onChange 绑定函数中调用 setFieldValue，也能对另一个字段组件加以赋值，这样就可以实现表单的联动效果，参考案例 —— 表单联动。若在字段组件的 onChange 绑定函数中调用 validateFields 方法，就可以实现关联字段的校验，比如表单中存在设置最大最小值的两个输入框，参考案例 —— 动态校验规则。

使用 getFieldError, isFieldValidating 获取到的校验信息可用于直接绘制 FormItem，这样就能更加细微地操控 FormItem 下字段组件的布局，比如放置多个字段组件。当然，对于多个字段组件公用校验信息的场景，也可以使用包含多个字段的 CustomizedField 实现。isFieldTouched 可判断用户是否对字段组件有触发数据收集和校验的行为，参考案例 —— 水平登录栏。介于 BaseForm 默认在 onChange 事件中收集并校验字段的值，在这种情形下，也可以通过 isFieldTouched 判断字段的值是否已作更新，而不需要在 CustomizedForm 中设置特殊的更新标识。

#### 其他

当不使用 Form.create 为字段组件自动绑定校验方法时，可以使用 Form, FormItem 组件设定表单的布局、校验信息的绘制，参考案例 —— 表单布局、自行处理表单数据、自定义校验。
