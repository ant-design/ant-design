// originated by: bang88 <https://github.com/bang88>, Bruce Mitchener <https://github.com/waywardmonkeys/>

import * as React from 'react'


// Affix
interface AffixProps {
  /**
   * 距离窗口顶部达到指定偏移量后触发
   */
  offsetTop?:number,
  offsetBottom?:number,
  style?:React.CSSProperties
}
/**
 * # Affix
 * 将页面元素钉在可视范围。
 * ## 何时使用
 * 当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。
 * 页面可视范围过小时，慎用此功能以免遮挡页面内容。
 */
export class Affix extends React.Component<AffixProps, {}> {
}

type AlertType = 'success' | 'info' | 'warning' | 'error'

// Alert
interface AlertProps {
  /**
   * 必选参数，指定警告提示的样式，有四种选择`success`、`info`、`warn`、`error`
   */
    type:AlertType,
  /**可选参数，默认不显示关闭按钮 */
  closable?:boolean,
  /**可选参数，自定义关闭按钮 */
  closeText?:React.ReactNode,
  /**必选参数，警告提示内容 */
  message:React.ReactNode,
  /**可选参数，警告提示的辅助性文字介绍 */
  description?:React.ReactNode,
  /** 固定状态改变时触发的回调函数 */
  onChange?:(affixed: boolean) => void,
  /**可选参数，关闭时触发的回调函数 */
  onClose?:Function,
  /**可选参数，是否显示辅助图标 */
  showIcon?:boolean,

  style?:React.CSSProperties
}

/**
 *  # Alert
 *  警告提示，展现需要关注的信息。

 * ## 何时使用

 * - 当某个页面需要向用户显示警告的信息时。
 * - 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。
 * */
export class Alert extends React.Component<AlertProps, {}> {
}


interface BadgeProps {
  /** 展示的数字，大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏*/
  count:number,
  /** 展示封顶的数字值*/
  overflowCount?:number,
  /** 不展示数字，只有一个小红点*/
  dot?:boolean,

  style?:React.CSSProperties
}
// Badge
/**
 * #Badge
 *
 * 图标右上角的圆形徽标数字。

 * ## 何时使用

 * 一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。
 *
 */
export class Badge extends React.Component<BadgeProps, {}> {
}

type ButtonType = 'primary' | 'ghost' | 'dashed'
type ButtonShape = 'circle' | 'circle-outline'
type ButtonSize = 'small' | 'large'
// Button
interface ButtonProps {
  /** 设置按钮类型，可选值为 `primary` `ghost` 或者不设 */
  type?:ButtonType,
  /** 设置 `button` 原生的 `type` 值，可选值请参考 HTML标准*/
  htmlType?:string,

  icon?:string,
  /** 设置按钮形状，可选值为 `circle` `circle-outline` 或者不设*/
  shape?:ButtonShape,
  /** 设置按钮大小，可选值为 `small` `large` 或者不设*/
  size?:ButtonSize,
  /** `click` 事件的 handler*/
  onClick?:React.FormEventHandler,
  /** 设置按钮载入状态*/
  loading?:boolean,

  disabled?:boolean,

  style?:React.CSSProperties
}


interface ButtonGroupProps {
  /** 设置按钮大小，可选值为 `small` `large` 或者不设*/
  size?:ButtonSize,

  style?:React.CSSProperties
}

/**
 可以将多个 `Button` 放入 `Button.Group` 的容器中。

 通过设置 `size` 为 `large` `small` 分别把按钮组合设为大、小尺寸。若不设置 `size`，则尺寸为中。*/
declare class ButtonGroup extends React.Component<ButtonGroupProps, {}> {
}

/**
 * #Button
 按钮用于开始一个即时操作。

 ## 何时使用

 标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。*/
export class Button extends React.Component<ButtonProps, {}> {
  static Group:typeof ButtonGroup
}

// Breadcrumb

interface BreadcrumbItemProps {
  /** 链接，如不传则不可点击   */
  href?:string
}
export class BreadcrumbItem extends React.Component<BreadcrumbItemProps, {}> {
}

interface BreadcrumbProps {
  prefixCls?:string,
  /** router 的路由栈信息 */
  routes?:Array<React.ReactNode>,
  /** 路由的参数*/
  params?:Object,
  /** 分隔符自定义*/
  separator?:string | React.ReactNode,
  linkRender?:(path:string, name:string) => React.ReactNode,
  nameRender?:(name:string) => React.ReactNode

  style?:React.CSSProperties
}
/**
 * #Breadcrumb
 显示当前页面在系统层级结构中的位置，并能向上返回。

 ## 何时使用

 - 当系统拥有超过两级以上的层级结构时；
 - 当需要告知用户“你在哪里”时；
 - 当需要向上导航的功能时。*/
export class Breadcrumb extends React.Component<BreadcrumbProps, {}> {
  static Item:typeof BreadcrumbItem
}

export interface GregorianCalendar {
  getMonth():number,
  getYear():number,
  getDayOfMonth():string,
  getHourOfDay():string,
  getMinutes():number,
  getSeconds():number,
  getMilliSeconds():number,
  getWeekOfYear():number,
  getWeekOfMonth():number,
  getDayOfYear():number,
  getDayOfWeek():number,
  getDayOfWeekInMonth():number,
  getWeekYear():number,
  getWeeksInWeekYear():number
}

type CalendarMode = 'month' | 'year';

// Calendar
interface CalendarProps {
  /** 自定义渲染月单元格*/
  monthCellRender?:(value:GregorianCalendar, locale:any) => React.ReactNode,
  /** 自定义渲染日期单元格*/
  dateCellRender?:(value:GregorianCalendar) => React.ReactNode,
  /** 是否全屏显示*/
  fullscreen?:boolean,
  /** 国际化配置*/
  locale?:Object,
  prefixCls?:string,
  className?:string,
  /** 日期面板变化回调*/
  onPanelChange?:(value:GregorianCalendar, mode:CalendarMode) => void,
  /** 展示日期*/
  value?:Date,
  /** 默认展示日期*/
  defaultValue?:Date,
  /** 初始模式，`month/year`*/
  mode?:CalendarMode,

  style?:React.CSSProperties
}
/**
 * #Calendar
 按照日历形式展示数据的容器。

 ## 何时使用

 当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持年/月切换。
 */
export class Calendar extends React.Component<CalendarProps, {}> {
}

type CarouselEffect = 'scrollx' | 'fade'
// Carousel
interface CarouselProps {
  /** 动画效果函数，可取 scrollx, fade*/
  effect?:CarouselEffect,
  /** 是否显示面板指示点*/
  dots?:boolean,
  /** 垂直显示*/
  vertical?:boolean,
  /** 是否自动切换*/
  autoplay?:boolean,
  /** 动画效果*/
  easing?:string,
  /** 切换面板的回调*/
  beforeChange?:(from:number, to:number) => void,
  /** 切换面板的回调*/
  afterChange?:(current:number) => void,

  style?:React.CSSProperties
}
/**
 * #Carousel
 旋转木马，一组轮播的区域。

 ## 何时使用

 - 当有一组平级的内容。
 - 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
 - 常用于一组图片或卡片轮播。
 */
export class Carousel extends React.Component<CarouselProps, {}> {
}

export interface CascaderOptionType {
  value:string,
  label:string,
  disabled?:boolean,
  children?:Array<CascaderOptionType>
}

type CascaderExpandTrigger = 'click' | 'hover'
// Cascader
interface CascaderProps {
  /** 可选项数据源*/
  options:Array<CascaderOptionType>,
  /** 默认的选中项*/
  defaultValue?:Array<CascaderOptionType>,
  /** 指定选中项*/
  value?:Array<CascaderOptionType>,
  /** 选择完成后的回调*/
  onChange?:(value:string, selectedOptions:CascaderOptionType) => void,
  /** 选择后展示的渲染函数*/
  displayRender?:(label:Array<string>) => React.ReactNode,
  /** 自定义样式*/
  style?:React.CSSProperties,
  /** 自定义类名*/
  className?:string,
  /** 自定义浮层类名*/
  popupClassName?:string,
  /** 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` */
  popupPlacement?:string,
  /** 输入框占位文本*/
  placeholder?:string,
  /** 输入框大小，可选 `large` `default` `small` */
  size?:string,
  /** 禁用*/
  disabled?:boolean,
  /** 是否支持清除*/
  allowClear?:boolean,

  expandTrigger?:CascaderExpandTrigger,

  changeOnSelect?:boolean
}
/**
 * #Cascader
 级联选择框。


 ## 何时使用

 - 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
 - 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
 - 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。*/
export class Cascader extends React.Component<CascaderProps, {}> {
}

// Checkbox
interface CheckboxProps {
  /** 指定当前是否选中*/
  checked?:boolean,
  /** 初始是否选中*/
  defaultChecked?:boolean,
  /** 变化时回调函数*/
  onChange?:React.FormEventHandler,

  style?:React.CSSProperties
}

export interface CheckboxOptionType {
  label:string,
  value:string,
  disabled?:boolean
}

interface CheckboxGroupProps {
  /** 默认选中的选项*/
  defaultValue?:Array<string>,
  /** 指定选中的选项*/
  value?:Array<string>,
  /** 指定可选项*/
  options?:Array<CheckboxOptionType> | Array<string>,
  /** 变化时回调函数*/
  onChange?:(checkedValue:Array<string>) => void,

  disabled?:boolean,

  style?:React.CSSProperties
}
/** Checkbox 组*/
declare class CheckboxGroup extends React.Component<CheckboxGroupProps, {}> {
}
/**
 * #Checkbox
 多选框。

 ## 何时使用

 - 在一组可选项中进行多项选择时；
 - 单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。
 */
export class Checkbox extends React.Component<CheckboxProps, {}> {
  static Group:typeof CheckboxGroup
}

// Collapse

interface CollapseProps {
  /** 当前激活 tab 面板的 key*/
  activeKey?:Array<string> | string,
  /** 初始化选中面板的key */
  defaultActiveKey?:Array<string>,
  /** accordion 为 true 的时候，一次只可以打开一个面板 */
  accordion?:boolean,
  /** 切换面板的回调*/
  onChange?:(key:string) => void,

  style?:React.CSSProperties
}

interface CollapsePanelProps {
  /** 对应 activeKey */
  key:string,
  /** 面板头内容*/
  header:React.ReactNode,

  style?:React.CSSProperties
}

declare class CollapsePanel extends React.Component<CollapsePanelProps, {}> {
}
/**
 * #Collapse
 可以折叠/展开的内容区域。

 ## 何时使用

 - 对复杂区域进行分组和隐藏，保持页面的整洁。
 - `手风琴` 是一种特殊的折叠面板，只允许单个内容区域展开。*/
export class Collapse extends React.Component<CollapseProps, {}> {
  static Panel:typeof CollapsePanel
}

type DatePickerDateType = string | Date;

// DatePicker
interface DatePickerProps {

  value?:DatePickerDateType,
  defaultValue?:DatePickerDateType,
  /** 展示的日期格式，配置参考 [GregorianCalendarFormat](https://github.com/yiminghe/gregorian-calendar-format)*/
  format?:string,
  /** 不可选择的日期*/
  disabledDate?:Function,
  /** 时间发生变化的回调，发生在用户选择时间时*/
  onChange?:(date:Date, dateString:string) => void,
  /** 禁用*/
  disabled?:boolean,
  style?:React.CSSProperties,
  /** 格外的弹出日历样式*/
  popupStyle?:React.CSSProperties,
  /** 输入框大小，`large` 高度为 32px，`small` 为 22px，默认是 28px*/
  size?:'large' | 'small',
  /** 国际化配置*/
  locale?:Object,
  /** 增加时间选择功能*/
  showTime?:boolean,
  /** 点击确定按钮的回调*/
  onOk?:(value:Date) => void,
  /** 定义浮层的容器，默认为 body 上新建 div*/
  getCalendarContainer?:Function

}

interface RangePickProps {
  value?:Array<DatePickerDateType>,
  defaultValue?:Array<DatePickerDateType>,
  format?:string,
  onChange?:(date:Array<Date>, dateString:Array<string>) => void,
  style:React.CSSProperties,
  showTime:boolean | Object

}
declare class RangePicker extends React.Component<RangePickProps, {}> {
}

interface MonthPickProps {
  value?:DatePickerDateType,
  defaultValue?:DatePickerDateType,
  /** 展示的日期格式，配置参考 [GregorianCalendarFormat](https://github.com/yiminghe/gregorian-calendar-format)*/
  format?:string,
  /** 时间发生变化的回调，发生在用户选择时间时*/
  onChange?:(date:Date) => void,
  /** 禁用*/
  disabled?:boolean,
  style?:React.CSSProperties,
  /** 格外的弹出日历样式*/
  popupStyle?:React.CSSProperties,
  /** 输入框大小，`large` 高度为 32px，`small` 为 22px，默认是 28px*/
  size?:'large' | 'small',
  /** 国际化配置*/
  locale?:Object,
  /** 定义浮层的容器，默认为 body 上新建 div*/
  getCalendarContainer?:Function
}
declare class MonthPicker extends React.Component<MonthPickProps, {}> {
}
/**
 * #DatePicker
 输入或选择日期的控件。

 ## 何时使用

 当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。*/
export class DatePicker extends React.Component<DatePickerProps, {}> {
  static RangePicker:typeof RangePicker
  static MonthPicker:typeof MonthPicker
}

// Dropdown

interface DropdownProps {
  /** 触发下拉的行为  ['click'] or ['hover']*/
  trigger?:Array<string>,
  /** 菜单节点*/
  overlay:React.ReactNode,

  style?:React.CSSProperties
}

interface DropdownButtonProps {
  /**  按钮类型*/
    type?:'primary' | 'ghost' | 'dash',
  /** 点击左侧按钮的回调*/
  onClick?:React.FormEventHandler,
  /** 触发下拉的行为*/
  trigger?:'click' | 'hover',
  /** 菜单节点*/
  overlay:React.ReactNode,

  visible?:boolean,

  onVisibleChange?:(visible:boolean) => void,

  style?:React.CSSProperties
}

declare class DropdownButton extends React.Component<DropdownButtonProps, {}> {
}
/**
 * #Dropdown
 向下弹出的列表。

 ## 何时使用

 当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。
 */
export class Dropdown extends React.Component<DropdownProps, {}> {
  static Button:typeof DropdownButton
}

export interface FormItemLabelColOption {
  span:number,
  offset:number
}

// Form
interface FormItemProps {
  prefixCls?:string,
  /**  label 标签的文本*/
  label?:string,
  /** label 标签布局，通 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}`*/
  labelCol?:FormItemLabelColOption,
  /** 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol*/
  wrapperCol?:FormItemLabelColOption,
  /** 提示信息，如不设置，则会根据校验规则自动生成 */
  help?:string,
  /** 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。*/
  extra?:string,
  /** 是否必填，如不设置，则会根据校验规则自动生成 */
  validateStatus?:'success' | 'warning' | 'error' | 'validating',
  /** 配合 validateStatus 属性使用，是否展示校验状态图标 */
  hasFeedback?:boolean,

  className?:string,

  required?:boolean,

  style?:React.CSSProperties
}
/**
 表单一定会包含表单域，表单域可以是输入控件，标准表单域，标签，下拉菜单，文本域等。

 这里我们分别封装了表单域 `<Form.Item />` 和输入控件 `<Input />`。*/
export class FormItem extends React.Component<FormItemProps, {}> {
}

interface FormComponentProps {
  form?:CreateFormOptions
}
export class FormComponent extends React.Component<FormComponentProps, {}> {
}

// function  create
type CreateFormOptions = {
  /** 获取一组输入控件的值，如不传入参数，则获取全部组件的值*/
  getFieldsValue:(fieldNames?:Array<string>) => any
  /** 获取一个输入控件的值*/
  getFieldValue:(fieldName:string) => any
  /** 设置一组输入控件的值*/
  setFieldsValue:(obj:Object) => void
  /** 设置一组输入控件的值*/
  setFields:(obj:Object) => void
  /** 校验并获取一组输入域的值与 Error*/
  validateFields:(fieldNames?:Array<string>, options?:Object, callback?:(erros:any, values:any) => void) => any
  /** 与 `validateFields` 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围 */
  validateFieldsAndScroll:(fieldNames?:Array<string>, options?:Object, callback?:(erros:any, values:any) => void) => any
  /** 获取某个输入控件的 Error */
  getFieldError:(name:string) => Object
  /** 判断一个输入控件是否在校验状态*/
  isFieldValidating:(name:string) => Object
  /**重置一组输入控件的值与状态，如不传入参数，则重置所有组件*/
  resetFields:(names?:Array<string>) => void

  getFieldProps:(id:string, options:{
    /** 子节点的值的属性，如 Checkbox 的是 'checked'*/
    valuePropName?:string,
    /** 子节点的初始值，类型、可选值均由子节点决定*/
    initialValue?:any,
    /** 收集子节点的值的时机*/
    trigger?:string,
    /** 可以把 onChange 的参数转化为控件的值，例如 DatePicker 可设为：(date, dateString) => dateString */
    getValueFromEvent: (...args:any[]) => any,
    /** 校验子节点值的时机*/
    validateTrigger?:string,
    /** 校验规则，参见 [async-validator](https://github.com/yiminghe/async-validator) */
    rules?:Array<any>,
    /** 必填输入控件唯一标志*/
    id?:string,
    /** 是否和其他控件互斥，特别用于 Radio 单选控件 */
    exclusive: boolean
  }) => Array<any>
}

interface ComponentDecorator {
  <T extends (typeof FormComponent)>(component:T):T;
}
interface FormProps {
  prefixCls?:string,
  /** 水平排列布局*/
  horizontal?:boolean,
  /** 行内排列布局*/
  inline?:boolean,
  /** 经 `Form.create()` 包装过的组件会自带 `this.props.form` 属性，直接传给 Form 即可。1.7.0 之后无需设置*/
  form?:Object,
  /** 数据验证成功后回调事件*/
  onSubmit?:React.FormEventHandler,

  style?:React.CSSProperties
}

interface FormCreateOption {
  /**
   *   当 `Form.Item` 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
   */
  onFieldsChange?:(props:any, fields:Array<any>) => void,
  /**  把 props 转为对应的值，可用于把 Redux store 中的值读出 */
  mapPropsToFields?:(props:any) => void
}
/**
 * #Form
 具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

 ## 表单

 我们为 `form` 提供了以下两种排列方式：

 - 水平排列：可以实现 `label` 标签和表单控件的水平排列;
 - 行内排列：使其表现为 `inline-block` 级别的控件。
 */
export class Form extends React.Component<FormProps, {}> {
  static Item:typeof FormItem

  static create(options?:FormCreateOption):ComponentDecorator
}


// Icon
interface IconProps {
  /** 图标类型*/
    type:string,

  style?:React.CSSProperties
}
/**
 * #Icon
 有含义的矢量图形，每一个图标打倒一个敌人。

 ## 图标的命名规范

 我们为每个图标赋予了语义化的命名，命名规则如下:

 - 实心和描线图标保持同名，用 `-o` 来区分，比如 `question-circle`(实心) 和 `question-circle-o`(描线)；

 - 命名顺序：`[icon名]-[形状可选]-[描线与否]-[方向可选]`。

 ## 如何使用

 使用 `<Icon />` 标签声明组件，指定图标对应的 type 属性，示例代码如下:

 ```html
 <Icon type="link" />
 ```

 最终会渲染为：

 ```html
 <i class="anticon anticon-${type}"></i>
 ```*/
export class Icon extends React.Component<IconProps, {}> {
}

// Input
interface InputProps {
  /**  【必须】声明 input 类型，同原生 input 标签的 type 属性*/
    type?:string,
  id?:string,
  /** 控件大小，默认值为 default 。注：标准表单内的输入框大小限制为 large。 {'large','default','small'}*/
  size?:string,
  /** 是否禁用状态，默认为 false*/
  disabled?:boolean,
  value?:any,
  /** 设置初始默认值*/
  defaultValue?:any,
  className?:string,
  /** 带标签的 input，设置前置标签*/
  addonBefore?:React.ReactNode,
  /** 带标签的 input，设置后置标签*/
  addonAfter?:React.ReactNode,
  prefixCls?:string,
  placeholder?:string,
  onChange?:React.FormEventHandler,
  style:React.CSSProperties
}
export class Input extends React.Component<InputProps, {}> {
}

// InputNumber
interface InputNumberProps {
  /** 最小值*/
  min:number,
  /** 最大值*/
  max:number,
  /** 当前值*/
  value?:number,
  /** 每次改变步数*/
  step?:number,
  /** 初始值*/
  defaultValue?:number,
  /** 变化回调*/
  onChange?:React.FormEventHandler,
  /** 禁用*/
  disabled?:boolean,
  /** 输入框大小*/
  size?:string,

  style?:React.CSSProperties

}
/**
 * #InputNumber
 通过鼠标或键盘，输入范围内的数值。

 ## 何时使用

 当需要获取标准数值时。*/
export class InputNumber extends React.Component<InputNumberProps, {}> {
}


// Layout
// Row
interface RowProps {
  gutter?:number,
  type?:'flex',
  align?:'top' | 'middle' | 'bottom',
  justify?:'start' | 'end' | 'center' | 'space-around' | 'space-between',
  style?:React.CSSProperties,
  className?:string,
}
export class Row extends React.Component<RowProps, {}> {
}

// Col
interface ColProps {
  span?:number,
  lg?: number,
  md?:number,
  sm?:number,
  xs?:number,
  order?:number,
  offset?:string,
  push?:string,
  pull?:string,
  className?:string,
  style?:React.CSSProperties
}
/**
 在多数业务情况下，Ant Design需要在设计区域内解决大量信息收纳的问题，因此在12栅格系统的基础上，我们将整个设计建议区域按照24等分的原则进行划分。

 划分之后的信息区块我们称之为“盒子”。建议横向排列的盒子数量最多四个，最少一个。“盒子”在整个屏幕上占比见上图。设计部分基于盒子的单位定制盒子内部的排版规则，以保证视觉层面的舒适感。

 ## 概述

 布局的栅格化系统，我们是基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。下面简单介绍一下它的工作原理：

 * 通过`row`在水平方向建立一组`column`（简写col）
 * 你的内容应当放置于`col`内，并且，只有`col`可以作为`row`的直接元素
 * 栅格系统中的列是指1到24的值来表示其跨越的范围。例如，三个等宽的列可以使用`.col-8`来创建
 * 如果一个`row`中的`col`总和超过24，那么多余的`col`会作为一个整体另起一行排列

 ## Flex 布局

 我们的栅格化系统支持 Flex 布局，允许子元素在父节点内的水平对齐方式 - 居左、居中、居右、等宽排列、分散排列。子元素与子元素之间，支持顶部对齐、垂直居中对齐、底部对齐的方式。同时，支持使用 order 来定义元素的排列顺序。

 Flex 布局是基于 24 栅格来定义每一个“盒子”的宽度，但排版则不拘泥于栅格。*/
export class Col extends React.Component<ColProps, {}> {
}

// Menu
interface MenuItemProps {
  /**
   * (是否禁用)
   *
   * @type {boolean}
   */
  disabled?:boolean,
  key?:string,
  style?:React.CSSProperties

}
export class MenuItem extends React.Component<MenuItemProps, {}> {
}

interface MenuSubMenuProps {
  disabled?:boolean,
  key?:string,
  /**
   * (子菜单项值)
   *
   * @type {(string | React.ReactNode)}
   */
  title:string | React.ReactNode,
  /**
   * (子菜单的菜单项)
   *
   * @type {(MenuItem | MenuSubMenu)}
   */
  children?:Array<MenuItem | MenuSubMenu>,

  onTitleClick?:Function,

  style?:React.CSSProperties
}
export class MenuSubMenu extends React.Component<MenuSubMenuProps, {}> {
}

interface MenuItemGroupProps {
  /**
   * (分组标题)
   *
   * @type {(string | React.ReactNode)}
   */
  title:string | React.ReactNode,
  /**
   * (分组的菜单项)
   *
   * @type {MenuItem}
   */
  children?:Array<MenuItem | MenuSubMenu>,

  style?:React.CSSProperties
}
export class MenuItemGroup extends React.Component<MenuItemGroupProps, {}> {
}

interface MenuProps {
  id?: string,
  /** 主题颜色*/
  theme?:'light' | 'dark',
  /** 菜单类型  enum: `vertical` `horizontal` `inline`*/
  mode?:'vertical' | 'horizontal' | 'inline',
  /** 当前选中的菜单项 key 数组*/
  selectedKeys?:Array<string>,
  /** 初始选中的菜单项 key 数组*/
  defaultSelectedKeys?:Array<string>,
  /** 当前展开的菜单项 key 数组*/
  openKeys?:Array<string>,
  /** 初始展开的菜单项 key 数组*/
  defaultOpenKeys?:Array<string>,

  onOpen?:Function,

  onClose?:Function,

  /**
   * 被选中时调用
   *
   * @type {(item: any, key: string, selectedKeys: Array<string>) => void}
   */
  onSelect?:(item:any, key:string, selectedKeys:Array<string>) => void,
  /** 取消选中时调用*/
  onDeselect?:(item:any, key:string, selectedKeys:Array<string>) => void,
  /** 点击 menuitem 调用此函数*/
  onClick?:(item:any, key:string) => void,
  /** 根节点样式*/
  style?:React.CSSProperties
}
/**
 # Menu
 为页面和功能提供导航的菜单列表。

 ## 何时使用

 导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

 更多布局和导航的范例可以参考：[常用布局](/spec/layout)。*/
export class Menu extends React.Component<MenuProps, {}> {
  static Item:typeof MenuItem
  static SubMenu:typeof MenuSubMenu
  static ItemGroup:typeof MenuItemGroup
  static Divider:typeof React.Component
}

// Message
type MessageFunc = (/** 提示内容*/
                    content:string,
                    /** 自动关闭的延时*/
                    duration?:number) => void
/**
 * #Message
 全局展示操作反馈信息。

 ## 何时使用

 - 可提供成功、警告和错误等反馈信息。
 - 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。*/
export const message:{

  success:MessageFunc
  error:MessageFunc
  info:MessageFunc
  loading:MessageFunc
  config:(options:{
    /**
     * 消息距离顶部的位置
     *
     * @type {number}
     */
    top:number,
    duration?:number
  }) => void
  destroy:() => void
}

// Modal
type ModalFunc = (options:{
  visible?:boolean,
  title?:React.ReactNode | string,
  content?:React.ReactNode | string,
  onOk?:Function,
  onCancel?:Function,
  width?:string | number,
  iconClassName?:string,
  okText?:string,
  cancelText?:string
}) => void

interface ModalProps {
  /** 对话框是否可见*/
  visible?:boolean,
  /** 确定按钮 loading*/
  confirmLoading?:boolean,
  /** 标题*/
  title?:React.ReactNode | string,
  /** 是否显示右上角的关闭按钮*/
  closable?:boolean,
  /** 点击确定回调*/
  onOk?:Function,
  /** 点击遮罩层或右上角叉或取消按钮的回调*/
  onCancel?:Function,
  /** 宽度*/
  width?:string | number,
  /** 底部内容*/
  footer?:React.ReactNode | string,
  /** 确认按钮文字*/
  okText?:string,
  /** 取消按钮文字*/
  cancelText?:string,
  /** 点击蒙层是否允许关闭*/
  maskClosable?:boolean,

  style?:React.CSSProperties,

  wrapClassName?:string
}

/**
 # Modal
 模态对话框。

 ## 何时使用

 需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

 另外当需要一个简洁的确认框询问用户时，可以使用精心封装好的 `ant.Modal.confirm()` 等方法。*/
export class Modal extends React.Component<ModalProps, {}> {
  static info:ModalFunc
  static success:ModalFunc
  static error:ModalFunc
  static confirm:ModalFunc
}

// Notification
type NotificationFunc = (config:{
  /** 通知提醒标题，必选 */
  message:React.ReactNode | string,
  /** 通知提醒内容，必选*/
  description:React.ReactNode | string,
  /** 自定义关闭按钮*/
  btn?:React.ReactNode | string,
  /** 当前通知唯一标志*/
  key?:string,
  /** 点击默认关闭按钮时触发的回调函数*/
  onClose?:Function,
  /** 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭*/
  duration?:number
}) => void
/**
 * #notification
 全局展示通知提醒信息。

 ## 何时使用

 在系统右上角显示通知提醒信息。经常用于以下情况：

 - 较为复杂的通知内容。
 - 带有交互的通知，给出用户下一步的行动点。
 - 系统主动推送。*/
export const notification:{
  success:NotificationFunc
  error:NotificationFunc
  info:NotificationFunc
  warn:NotificationFunc
  close:(key:string) => void
  destroy:() => void
  open:NotificationFunc
  config:(options:{
    /** 消息距离顶部的位置*/
    top:number
    /** 默认自动关闭延时，单位秒 */
    duration:number
  }) => void

}


// Pagination
interface PaginationProps {
  /** 当前页数*/
  current?:number,
  /** 默认的当前页数*/
  defaultCurrent?:number,
  /** 数据总数*/
  total:number,
  /** 初始的每页条数*/
  defaultPageSize?:number,
  /** 每页条数*/
  pageSize?:number,
  /** 页码改变的回调，参数是改变后的页码*/
  onChange?:Function,
  /** 是否可以改变 pageSize */
  showSizeChanger?:boolean,
  /** 指定每页可以显示多少条*/
  pageSizeOptions?:Array<number>
  /** pageSize 变化的回调  */
  onShowSizeChange?:Function,
  /** 是否可以快速跳转至某页*/
  showQuickJumper?:boolean,
  /** 当为「small」时，是小尺寸分页 */
  size?:string,
  /** 当添加该属性时，显示为简单分页*/
  simple?:Object,
  /** 用于显示总共有多少条数据*/
  showTotal?:Function,

  style?:React.CSSProperties
}
/**
 * #Pagination
 采用分页的形式分隔长列表，每次只加载一个页面。

 ## 何时使用

 - 当加载/渲染所有数据将花费很多时间时；
 - 可切换页码浏览数据。*/
export class Pagination extends React.Component<PaginationProps, {}> {
}


interface PopconfirmProps {
  /**
   * 气泡框位置，可选 `top/left/right/bottom`
   *
   * @type {(Placement | string)}
   */
  placement?:'top' | 'left' | 'right' | 'bottom',
  /** 确认框的描述*/
  title?:string,
  /** 点击确认的回调*/
  onConfirm?:Function,
  onCancel?:Function,
  /** 显示隐藏的回调*/
  onVisibleChange?:(visible:boolean) => void,
  /** 确认按钮文字*/
  okText?:string,
  /** 取消按钮文字*/
  cancelText?:string,

  style?:React.CSSProperties
}
/**
 * #Popconfirm
 点击元素，弹出气泡式的确认框。

 ## 何时使用

 目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。

 和 `confirm` 弹出的全屏居中模态对话框相比，交互形式更轻量。
 */
export class Popconfirm extends React.Component<PopconfirmProps, {}> {
}

type PopoverPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
type PropverTrigger = 'hover' | 'focus' | 'click'

interface PopoverProps {
  /** 触发行为，可选 `hover/focus/click` */
  trigger?:PropverTrigger,
  /** 气泡框位置，可选 `top/left/right/bottom` `topLeft/topRight/bottomLeft/bottomRight` `leftTop/leftBottom/rightTop/rightBottom`*/
  placement?:PopoverPlacement
  /** 卡片标题*/
  title?:React.ReactNode | string,
  /** 卡片内容*/
  overlayClassName?:string,

  overlayStyle?:React.CSSProperties,

  prefixCls?:string,
  /** 用于手动控制浮层显隐*/
  visible?:boolean,
  /** 显示隐藏改变的回调*/
  onVisibleChange?:Function,

  getTooltipContainer?:Function,

  content?:React.ReactNode,

  style?:React.CSSProperties
}
/**
 * #Popover
 点击/鼠标移入元素，弹出气泡式的卡片浮层。

 ## 何时使用

 当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

 和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。
 */
export class Popover extends React.Component<PopoverProps, {}> {
}

// Progress
type ProgressStatus = 'success' | 'active' | 'exception'
type ProgressType = 'line' | 'circle'

interface ProgressProps {
  type?:ProgressType,
  percent?:number,
  format?:(percent:number) => string,
  status?:ProgressStatus,
  showInfo?:boolean,
  strokeWidth?:number,
  width?:number,
  style?:React.CSSProperties
}
/**
 * #Progress
 展示操作的当前进度。

 ## 何时使用

 在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

 * 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过2秒时；
 * 当需要显示一个操作完成的百分比时。*/
export class Progress extends React.Component<ProgressProps, {}> {

}

// Radio
type RadioGroupSize = 'large' | 'default' | 'small'

interface RadioGroupProps {
  /** 选项变化时的回调函数*/
  onChange?:React.FormEventHandler,
  /** 用于设置当前选中的值*/
  value?:string,
  /** 默认选中的值*/
  defaultValue?:string,
  /**  大小，只对按钮样式生效*/
  size?:RadioGroupSize,

  style?:React.CSSProperties
}
export class RadioGroup extends React.Component<RadioGroupProps, {}> {
}

interface RadioProps {
  /** 指定当前是否选中*/
  checked?:boolean,
  /** 初始是否选中*/
  defaultChecked?:boolean,
  /** 根据 value 进行比较，判断是否选中  */
  value?:any,

  style?:React.CSSProperties
}
/**
 * #Radio
 单选框。

 ## 何时使用

 - 用于在多个备选项中选中单个状态。
 - 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。
 */
export class Radio extends React.Component<RadioProps, {}> {
  static Group:typeof RadioGroup
  static Button:typeof RadioButton
}

interface RadioButtonProps {
  value:string,
  style?:React.CSSProperties
}

export class RadioButton extends React.Component<RadioButtonProps, {}> {
}


// Select
interface SelectOptionProps {
  /** 是否禁用*/
  disabled?:boolean,
  /** 如果 react 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置*/
  key?:string,
  /** 默认根据此属性值进行筛选*/
  value:string
}
export class SelectOption extends React.Component<SelectOptionProps, {}> {
}

interface SelectOptGroupProps {
  /** 组名*/
  label:string | React.ReactNode,
  key?:string
}
export class SelectOptGroup extends React.Component<SelectOptGroupProps, {}> {
}

interface SelectProps {
  /** 指定当前选中的条目*/
  value?:string | Array<any>,
  /** 指定默认选中的条目*/
  defaultValue?:string | Array<any>,
  /** 支持多选*/
  multiple?:boolean,
  /** 支持清除, 单选模式有效*/
  allowClear?:boolean,
  /** 是否根据输入项进行筛选，可为一个函数，返回满足要求的 option 即可*/
  filterOption?:boolean | Function,
  /** 可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配*/
  tags?:boolean,
  /** 被选中时调用，参数为选中项的 value 值 */
  onSelect?:(value:any, option:any) => void,
  /** 取消选中时调用，参数为选中项的 option value 值，仅在 multiple 或 tags 模式下生效*/
  onDeselect?:(value:any, option:any) => void,
  /** 选中option，或input的value变化(combobox 模式下)时，调用此函数*/
  onChange?:(value:any, label:any) => void,
  /** 文本框值变化时回调*/
  onSearch?:(value:string) => void,
  /** 选择框默认文字*/
  placeholder?:string,
  /** 搜索框默认文字*/
  searchPlaceholder?:string,
  /** 当下拉列表为空时显示的内容*/
  notFoundContent?:string,
  /** 下拉菜单和选择器同宽*/
  dropdownMatchSelectWidth?:boolean,
  /** 搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索*/
  optionFilterProp?:string,
  /** 输入框自动提示模式*/
  combobox?:SVGSymbolElement,
  /** 选择框大小，可选 `large` `small` */
  size?:string,
  /** 在下拉中显示搜索框*/
  showSearch?:boolean,
  /** 是否禁用*/
  disabled?:boolean,
  style?:React.CSSProperties
}
/**
 * #Select
 类似 Select2 的选择器。

 ## 何时使用

 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。*/
export class Select extends React.Component<SelectProps, {}> {
  static Option:typeof SelectOption
  static OptGroup:typeof SelectOptGroup
}

interface SliderMark {
  [key:string]:any
}

// Slider
interface SliderProps {
  /** 最小值*/
  min?:number,
  /** 最大值*/
  max?:number,
  /** 步长，取值必须大于 0，并且可被 (max - min) 整除。当 `marks` 不为空对象时，可以设置 `step` 为 `null`，此时 Slider 的可选值仅有 marks 标出来的部分。*/
  step?:number,
  /** 分段标记，key 的类型必须为 `Number` 且取值在闭区间 [min, max] 内*/
  marks?:SliderMark,
  /**  设置当前取值。当 `range` 为 `false` 时，使用 `Number`，否则用 `[Number, Number]`*/
  value?:number | Array<number>,
  /**  设置当前取值。当 `range` 为 `false` 时，使用 `Number`，否则用 `[Number, Number]`*/
  defaultValue?:number | Array<number>,
  /** `marks` 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列*/
  included?:boolean,
  /** 值为 `true` 时，滑块为禁用状态*/
  disabled?:boolean,
  /** 当 `range` 为 `true` 时，该属性可以设置是否允许两个滑块交换位置。*/
  allowCross?:boolean,
  /** 当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入。*/
  onChange?:Function,
  /** 与 `onmouseup` 触发时机一致，把当前值作为参数传入。*/
  onAfterChange?:Function,
  /** Slider 会把当前值传给 `tipFormatter`，并在 Tooltip 中显示 `tipFormatter` 的返回值，若为 null，则隐藏 Tooltip。*/
  tipFormatter?:Function | any,
  range?:boolean,

  style?:React.CSSProperties
}
/**
 * #Slider
 滑动型输入器，展示当前值和可选范围。

 ## 何时使用

 当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。*/
export class Slider extends React.Component<SliderProps, {}> {
}

// Spin
interface SpinProps {
  /** spin组件中点的大小，可选值为 small default large*/
  size?:'small' | 'default' | 'large',
  /** 用于内嵌其他组件的模式，可以关闭 loading 效果*/
  spinning?:boolean,

  tip?:string,

  style?:React.CSSProperties
}
/**
 * #Spin
 用于页面和区块的加载中状态。

 ## 何时使用

 页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。
 */
export class Spin extends React.Component<SpinProps, {}> {
}

// Steps
type StepStatus = 'wait' | 'process' | 'finish' | 'error'

interface StepProps {
  /** 可选参数，指定状态。当不配置该属性时，会使用父Steps元素的current来自动指定状态。*/
  status?:StepStatus,
  /** 必要参数，标题。*/
  title:string | React.ReactNode,
  /**  可选参数，步骤的详情描述。*/
  description?:string | React.ReactNode,
  /** 可选参数，步骤的Icon。如果不指定，则使用默认的样式。*/
  icon?:string | React.ReactNode,

  style?:React.CSSProperties
}
export class Step extends React.Component<StepProps, {}> {
}

interface StepsProps {
  status?:StepStatus,
  /** 可选参数，指定当前处理正在执行状态的步骤，从0开始记数。在子Step元素中，可以通过status属性覆盖状态。*/
  current?:number,
  /** 可选参数，指定大小（目前只支持普通和迷你两种大小）。 small, default */
  size?:'default' | 'small',
  /** 可选参数，指定步骤条方向（目前支持水平和竖直两种方向，默认水平方向）。*/
  direction?:string,
  /** 可选参数，指定步骤的详细描述文字的最大宽度。*/
  maxDescriptionWidth?:number,

  style?:React.CSSProperties

}
/**
 * #Steps
 引导用户按照流程完成任务的导航条。

 ## 何时使用

 当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。*/
export class Steps extends React.Component<StepsProps, {}> {
  static Step:typeof Step
}

// Switch
interface SwitchProps {
  /** 指定当前是否选中*/
  checked?:boolean,
  /** 初始是否选中*/
  defaultChecked?:boolean,
  /** 变化时回调函数*/
  onChange?:(checked:boolean) => void,
  /** 选中时的内容*/
  checkedChildren?:React.ReactNode,
  /** 非选中时的内容*/
  unCheckedChildren?:React.ReactNode,
  /** 开关大小*/
  size?:string,

  style?:React.CSSProperties
}
/**
 * #Switch
 开关选择器。

 ## 何时使用

 - 需要表示开关状态/两种状态之间的切换时；
 - 和 `checkbox `的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。
 */
export class Switch extends React.Component<SwitchProps, {}> {
}

// Table
type RowSelectionType = 'checkbox' | 'radio'

type SelectedRowKeys = Array<any>

interface RowSelection {
  type?:RowSelectionType,
  selectedRowKeys?:SelectedRowKeys,
  onChange?:(selectedRowKeys:SelectedRowKeys, selectedRows:any) => void,
  getCheckboxProps?:(record:any) => void,
  onSelect?:(record:any, selected:any, selectedRows:any) => void,
  onSelectAll?:(rselectedecord:any, selectedRows:any, changeRows:any) => void,
  style?:React.CSSProperties
}

type Columns = Array<Column>
interface Column {
  /** React 需要的 key，建议设置*/
  key:string | number,
  /** 列头显示文字*/
  title?:string | React.ReactNode,
  /** 列数据在数据项中对应的 key*/
  dataIndex?:string,
  /** 生成复杂数据的渲染函数，参数分别为当前列的值，当前列数据，列索引，@return里面可以设置表格[行/列合并](#demo-colspan-rowspan)*/
  render?:(text?:any, record?:any, index?:number) => React.ReactNode,
  /** 表头的筛选菜单项*/
  filters?:Array<any>,
  /** 本地模式下，确定筛选的运行函数*/
  onFilter?:Function,
  /** 是否多选*/
  filterMultiple?:boolean,
  /** 排序函数，本地排序使用一个函数，需要服务端排序可设为 true */
  sorter?:boolean | Function,
  /** 表头列合并,设置为 0 时，不渲染*/
  colSpan?:number,
  /** 列宽度*/
  width?:string | number,
  /** 列的 className*/
  className?:string,

  fixed?:boolean | 'left' | 'right',

  filteredValue?:Array<any>,

  sortOrder?:boolean | 'ascend' | 'descend'
}

interface TableProps {
  /** 列表项是否可选择*/
  rowSelection?:RowSelection,
  /** 分页器*/
  pagination?:Object,
  /** 正常或迷你类型 : `default` or `small` */
  size?:string,
  /** 数据数组*/
  dataSource:Array<any>,
  /** 表格列的配置描述*/
  columns:Columns,
  /** 表格行 key 的取值*/
  rowKey?:(record:any, index:number) => string,
  /** 表格行的类名 */
  rowClassName?:(record:any, index) => string,
  /** 额外的展开行*/
  expandedRowRender?:Function,
  /** 默认展开的行*/
  defaultExpandedRowKeys?:Array<string>,
  /** 展开的行，控制属性 */
  expandedRowKeys?:Array<string>,
  /** 分页、排序、筛选变化时触发*/
  onChange?:(pagination:Object, filters:any, sorter:any) => void,
  /** 页面是否加载中*/
  loading?:boolean,
  /** 默认文案设置，目前包括排序、过滤、空数据文案: `{ filterConfirm: '确定', filterReset: '重置', emptyText: '暂无数据' }` */
  locale?:Object,
  /** 展示树形数据时，每层缩进的宽度，以 px 为单位*/
  indentSize?:number,
  /** 处理行点击事件*/
  onRowClick?:(record:any, index:number) => void,
  /** 是否固定表头*/
  useFixedHeader?:boolean,
  /** 是否展示外边框和列边框*/
  bordered?:boolean,
  /** 是否显示表头*/
  showHeader?:boolean,
  /** 表格底部自定义渲染函数*/
  footer?:(currentPageData:Object) => void,
  /** 表格头部自定义渲染函数  */
  title?:(currentPageData:Object) => void,
  /** 横向或纵向支持滚动，也可用于指定滚动区域的宽高度：{{ x: true, y: 300 }} */
  scroll?:Object,
  /** 表格body的样式 */
  bodyStyle?:React.CSSProperties,
  style?:React.CSSProperties,
}
/**
 * #Table
 展示行列数据。

 ## 何时使用

 - 当有大量结构化的数据需要展现时；
 - 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。*/
export class Table extends React.Component<TableProps, {}> {
}

// Tabs
interface TabPaneProps {
  /** 选项卡头显示文字*/
  tab:React.ReactNode | string,

  style?:React.CSSProperties
}
export class TabPane extends React.Component<TabPaneProps, {}> {
}

type TabsType = 'line' | 'card' | 'editable-card'
type TabsPosition = 'top' | 'right' | 'bottom' | 'left';

interface TabsProps extends React.Props<Tabs> {
  /** 当前激活 tab 面板的 key    */
  activeKey?:string,
  /** 初始化选中面板的 key，如果没有设置 activeKey*/
  defaultActiveKey?:string,
  /** 是否隐藏加号图标，在 `type="editable-card"` 时有效 */
  hideAdd?: boolean,
  /** 切换面板的回调*/
  onChange?:(activeKey:string) => void,
  /** tab 被点击的回调 */
  onTabClick?:Function,
  /** tab bar 上额外的元素  */
  tabBarExtraContent?:React.ReactNode,
  /** 页签的基本样式，可选 `line`、`card` `editable-card` 类型*/
    type?:TabsType,
  /** 页签位置，可选值有 `top` `right` `bottom` `left`*/
  tabPosition?:TabsPosition,
  /** 新增和删除页签的回调，在 `type="editable-card"` 时有效*/
  onEdit?:(targetKey:string, action:any) => void,
  /** 大小，提供 default 和 small 两种大小    */
  size?:string,

  style?:React.CSSProperties
}
/**
 * #Tabs
 选项卡切换组件。

 ## 何时使用

 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

 Ant Design 依次提供了三级选项卡，分别用于不同的场景。

 - 卡片式的页签，提供可关闭的样式，常用于容器顶部。
 - 标准线条式页签，用于容器内部的主功能切换，这是最常用的 Tabs。
 - [RadioButton](/components/radio/#demo-radiobutton) 可作为更次级的页签来使用。*/
export class Tabs extends React.Component<TabsProps, {}> {
  static TabPane:typeof TabPane
}

// Tag
interface TagProps {
  /** 标签是否可以关闭*/
  closable?:boolean,
  /** 关闭时的回调*/
  onClose?:Function,
  /** 动画关闭后的回调*/
  afterClose?:Function,
  /** 标签的色彩*/
  color?:string,

  style?:React.CSSProperties
}
/**
 * #Tag
 进行标记和分类的小标签。

 ## 何时使用

 - 用于标记事物的属性和维度。
 - 进行分类。*/
export class Tag extends React.Component<TagProps, {}> {
}

// TimePicker
interface TimePickerProps {
  /** 默认时间*/
  value?:string | Date,
  /** 初始默认时间*/
  defaultValue?:string | Date,
  /** 展示的时间格式 : "HH:mm:ss"、"HH:mm"、"mm:ss" */
  format?:string,
  /** 时间发生变化的回调*/
  onChange?:(Date:Date) => void,
  /** 禁用全部操作*/
  disabled?:boolean,
  /** 没有值的时候显示的内容*/
  placeholder?:string,
  /** 国际化配置*/
  locale?:Object,
  /** 隐藏禁止选择的选项*/
  hideDisabledOptions?:boolean,
  /** 禁止选择部分小时选项*/
  disabledHours?:Function,
  /** 禁止选择部分分钟选项*/
  disabledMinutes?:Function,
  /** 禁止选择部分秒选项*/
  disabledSeconds?:Function,

  style?:React.CSSProperties
}
/**
 * #TimePicker
 输入或选择时间的控件。

 何时使用
 --------

 当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。
 */
export class TimePicker extends React.Component<TimePickerProps, {}> {
}

// Timeline
interface TimeLineItemProps {
  /** 指定圆圈颜色。*/
  color?:string,
  dot?:React.ReactNode,
  style?:React.CSSProperties
}
export class TimeLineItem extends React.Component<TimeLineItemProps, {}> {
}

interface TimelineProps {
  /** 指定最后一个幽灵节点是否存在或内容*/
  pending?:boolean | React.ReactNode,

  style?:React.CSSProperties
}
/**
 * #Timeline
 垂直展示的时间流信息。

 ## 何时使用

 - 当有一系列信息需要从上至下按时间排列时；
 - 需要有一条时间轴进行视觉上的串联时；*/
export class Timeline extends React.Component<TimelineProps, {}> {
  static Item:typeof TimeLineItem
}

// Tooltip
interface TooltipProps {
  /** 气泡框位置，可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom`*/
  placement?:PopoverPlacement,
  /** 提示文字*/
  title?:string | React.ReactNode,

  style?:React.CSSProperties
}
/**
 * #Tooltip
 简单的文字提示气泡框。

 ## 何时使用

 鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。

 可用来代替系统默认的 `title` 提示，提供一个`按钮/文字/操作`的文案解释。*/
export class Tooltip extends React.Component<TooltipProps, {}> {
}

interface TransferItem {
  key:number | string,
  title:string,
  description?:string,
  chosen:boolean,
}

// Transfer
interface TransferProps {
  /** 数据源*/
  dataSource:Array<TransferItem>,
  /** 每行数据渲染函数*/
  render?:(record:TransferItem) => any,
  /** 显示在右侧框数据的key集合*/
  targetKeys:Array<string>,
  /** 变化时回调函数*/
  onChange?:(targetKeys:Array<TransferItem>, direction:string, moveKeys:any) => void,
  /** 两个穿梭框的自定义样式*/
  listStyle?:React.CSSProperties,
  /** 自定义类*/
  className?:string,
  /** 标题集合,顺序从左至右*/
  titles?:Array<string>,
  /** 操作文案集合,顺序从上至下*/
  operations?:Array<string>,
  /** 是否显示搜索框*/
  showSearch?:boolean,
  /** 搜索框的默认值*/
  searchPlaceholder?:string,
  /** 当列表为空时显示的内容*/
  notFoundContent?:React.ReactNode | string
  /** 底部渲染函数*/
  footer?:(props:any) => any,

  style?:React.CSSProperties
}
/**
 * #Transfer
 双栏穿梭选择框。

 ## 何时使用

 用直观的方式在两栏中移动元素，完成选择行为。
 */
export class Transfer extends React.Component<TransferProps, {}> {
}


// Tree
interface TreeNodeProps {
  disabled?:boolean,
  disableCheckbox?:boolean,
  title?:string | React.ReactNode,
  key?:string,
  isLeaf?:boolean
}
export class TreeNode extends React.Component<TreeNodeProps, {}> {
}

interface TreeNodeEvent {
  event:'check' | 'select',
  node:TreeNode,

  checked?:boolean,
  checkedNodes?:Array<TreeNode>,

  selected?:boolean,
  selectedNodes?:Array<TreeNode>,
}

interface TreeNodeMouseEvent {
  node:TreeNode,
  event:React.MouseEventHandler,
}

interface TreeProps {
  showLine?:boolean,
  className?:string,
  /** 是否支持多选*/
  multiple?:boolean,
  /**是否自动展开父节点 */
  autoExpandParent?:boolean,
  /**checkable状态下节点选择完全受控（父子节点选中状态不再关联）*/
  checkStrictly?:boolean,
  /** 是否支持选中*/
  checkable?:boolean,
  /** 默认展开所有树节点*/
  defaultExpandAll?:boolean,
  /** 默认展开指定的树节点*/
  defaultExpandedKeys?:Array<string>,
  /** （受控）展开指定的树节点*/
  expandedKeys?:Array<string>,
  /** （受控）选中复选框的树节点*/
  checkedKeys?:Array<string>,
  /** 默认选中复选框的树节点*/
  defaultCheckedKeys?:Array<string>,
  /** （受控）设置选中的树节点*/
  selectedKeys?:Array<string>,
  /** 默认选中的树节点*/
  defaultSelectedKeys?:Array<string>,
  /** 展开/收起节点时触发 */
  onExpand?:(expandedKeys:Array<string>, {node: TreeNode, expanded: boolean}) => void | PromiseLike<any>,
  /** 点击复选框触发*/
  onCheck?:(checkedKeys:Array<string>, e:TreeNodeEvent) => void,
  /** 点击树节点触发*/
  onSelect?:(selectedKeys:Array<string>, e:TreeNodeEvent) => void,
  /** filter some treeNodes as you need. it should return true */
  filterTreeNode?:(node:TreeNode) => boolean,
  /** 异步加载数据*/
  loadData?:(node:TreeNode) => PromiseLike<any>,
  /** 响应右键点击*/
  onRightClick?:(options:TreeNodeMouseEvent) => void,
  /** 设置节点可拖拽（IE>8）*/
  draggable?:boolean,
  /** 开始拖拽时调用*/
  onDragStart?:(options:TreeNodeMouseEvent) => void,
  /** dragenter 触发时调用*/
  onDragEnter?:(options:TreeNodeMouseEvent) => void,
  /** dragover 触发时调用 */
  onDragOver?:(options:TreeNodeMouseEvent) => void,
  /** dragleave 触发时调用*/
  onDragLeave?:(options:TreeNodeMouseEvent) => void,
  /** drop 触发时调用*/
  onDrop?:(options:TreeNodeMouseEvent) => void,

  style?:React.CSSProperties
}
/**
 * #Tree
 * 文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用`树控件`可以完整展现其中的层级关系，并具有展开收起选择等交互功能。
 */
export class Tree extends React.Component<TreeProps, {}> {
  static TreeNode:typeof TreeNode
}


// TreeSelect
interface TreeSelectTreeNodeProps {
  disabled?:boolean,
  /** 此项必须设置（其值在整个树范围内唯一）*/
  key:string,
  /** 默认根据此属性值进行筛选*/
  value?:string,
  /** 树节点显示的内容*/
  title?:React.ReactNode | string,
  /** 是否是叶子节点*/
  isLeaf?:boolean
}
export class TreeSelectTreeNode extends React.Component<TreeSelectTreeNodeProps, {}> {
}

interface TreeData {
  key:string
  value:string,
  label:React.ReactNode,
  children?:Array<TreeData>
}

interface TreeSelectProps {
  style?:React.CSSProperties,
  /** 指定当前选中的条目*/
  value?:string | Array<any>,
  /** 指定默认选中的条目*/
  defaultValue?:string | Array<any>,
  /** 支持多选*/
  multiple?:boolean,
  /** 可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配*/
  tags?:boolean,
  /** 被选中时调用，参数为选中项的 value 值*/
  onSelect?:(value:any) => void,
  /** 选中option，或input的value变化(combobox 模式下)时，调用此函数*/
  onChange?:(value:any, label:any) => void,
  /** 显示清除按钮*/
  allowClear?:boolean,
  /** 文本框值变化时回调*/
  onSearch?:(value:any) => void,
  /** 选择框默认文字*/
  placeholder?:string,
  /** 搜索框默认文字*/
  searchPlaceholder?:string,
  /** 下拉菜单的样式*/
  dropdownStyle?:React.CSSProperties,
  /** 下拉菜单和选择器同宽*/
  dropdownMatchSelectWidth?:boolean,
  /** 输入框自动提示模式*/
  combobox?:boolean,
  /** 选择框大小，可选 `large` `small`*/
  size?:'large' | 'small',
  /** 在下拉中显示搜索框*/
  showSearch?:boolean,
  /** 是否禁用*/
  disabled?:boolean,
  /** 默认展开所有树节点*/
  treeDefaultExpandAll?:boolean,
  /** 显示checkbox*/
  treeCheckable?:boolean,
  /** 是否根据输入项进行筛选，返回值true*/
  filterTreeNode?:(treeNode:any) => boolean,
  /**  输入项过滤对应的 treeNode 属性*/
  treeNodeFilterProp?:string,
  /** 作为显示的prop设置*/
  treeNodeLabelProp?:string,
  /** treeNodes数据，如果设置则不需要手动构造TreeNode节点（如果value在整个树范围内不唯一，需要设置`key`其值为整个树范围内的唯一id*/
  treeData?:Array<TreeData>,

  treeDataSimpleMode?:boolean,
  /** 异步加载数据*/
  loadData?:(node:any) => void,

  showCheckedStrategy?:'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD'

}
/**
 * #TreeSelect
 树型选择控件。

 ## 何时使用

 类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。
 */
export class TreeSelect extends React.Component<TreeSelectProps, {}> {
  static TreeNode:typeof TreeSelectTreeNode
}


type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed'

export interface HttpRequestHeader {
  [key:string]:string;
}

interface File {
  uid:number,
  size:number,
  name:string,
  lastModifiedDate?:Date,
  url?:string,
  status?:UploadFileStatus,
  percent?:number,
}

interface UploadChangeParam {
  file:File,
  fileList:Array<File>,
  event?:{ percent:number },
}

// Upload
interface UploadProps {
  /** 可选参数, 上传的文件  */
  name?:string,

  defaultFileList?:Array<File>,

  fileList?:Array<File>,
  /** 必选参数, 上传的地址   */
  action:string,
  /** 可选参数, 上传所需参数    */
  data?:Object,
  /** 可选参数, 设置上传的请求头部，IE10 以上有效*/
  headers?:HttpRequestHeader,
  /** 可选参数, 是否展示 uploadList, 默认开启     */
  showUploadList?:boolean,
  /** 可选参数, 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件。*/
  multiple?:boolean,
  /** 可选参数, 接受上传的文件类型, 详见 input accept Attribute */
  accept?:string,
  /** 可选参数, 上传文件之前的钩子，参数为上传的文件，若返回 `false` 或者 Promise 则停止上传。**注意：该方法不支持老 IE**。*/
  beforeUpload?:(file:File) => boolean | PromiseLike<any>,
  /** 可选参数, 上传文件改变时的状态，详见 onChange   */
  onChange?:(info:UploadChangeParam) => void,
  /** 上传列表的内建样式，支持两种基本样式 `text` or `picture`   */
  listType?:'text' | 'picture',
  /** 自定义类名*/
  className?:string,

  onPreview?:(file:File) => void,

  onRemove?:(file:File) => void,

  supportServerRender?:boolean,

  style?:React.CSSProperties
}
/**
 * #Upload
 文件选择上传和拖拽上传控件。

 ## 何时使用

 上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

 - 当需要上传一个或一些文件时。
 - 当需要展现上传的进度时。
 - 当需要使用拖拽交互时。*/
export class Upload extends React.Component<UploadProps, {}> {
}

interface RateProps {
  count?:number,
  value?:number,
  defaultValue?:number,
  onChange?:(value:number) => void,
  allowHalf?:boolean,
  disabled?:boolean,
  style?:React.CSSProperties
}
export class Rate extends React.Component<RateProps, {}> {
}

interface CardProps {
  title?:React.ReactNode,
  extra?:React.ReactNode,
  bordered?:boolean,
  bodyStyle?:React.CSSProperties,
  style?:React.CSSProperties,
  loading?:boolean
}
export class Card extends React.Component<CardProps, {}> {
}

interface LocaleProviderProps {
  locale?:any
}
export class LocaleProvider extends React.Component<LocaleProviderProps, {}> {
}
