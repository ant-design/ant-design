import type { PresetColorType } from './presetColors';
// ======================================================================
// ==                            Seed Token                            ==
// ======================================================================
// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥

export interface SeedToken extends PresetColorType {
  //  ----------   Color   ---------- //

  /**
   * @name 品牌主色
   * @nameEn Brand Color
   * @desc 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义
   * @descEn Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics.
   */
  colorPrimary: string;

  /**
   * @name 成功色
   * @nameEn Success Color
   * @desc 用于表示操作成功的 Token 序列，如 Result、Progress 等组件会使用该组梯度变量。
   * @descEn Used to represent the token sequence of operation success, such as Result, Progress and other components will use these map tokens.
   */
  colorSuccess: string;

  /**
   * @name 警戒色
   * @nameEn Warning Color
   * @desc 用于表示操作警告的 Token 序列，如 Notification、 Alert等警告类组件或 Input 输入类等组件会使用该组梯度变量。
   * @descEn Used to represent the warning map token, such as Notification, Alert, etc. Alert or Control component(like Input) will use these map tokens.
   */
  colorWarning: string;

  /**
   * @name 错误色
   * @nameEn Error Color
   * @desc 用于表示操作失败的 Token 序列，如失败按钮、错误状态提示（Result）组件等。
   * @descEn Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc.
   */
  colorError: string;

  /**
   * @name 信息色
   * @desc 用于表示操作信息的 Token 序列，如 Alert 、Tag、 Progress 等组件都有用到该组梯度变量。
   * @descEn Used to represent the operation information of the Token sequence, such as Alert, Tag, Progress, and other components use these map tokens.
   */
  colorInfo: string;

  /**
   * @name 基础文本色
   * @nameEn Seed Text Color
   * @desc 用于派生文本色梯度的基础变量，v5 中我们添加了一层文本色的派生算法可以产出梯度明确的文本色的梯度变量。但**请不要在代码中直接使用该 Seed Token**！
   * @descEn Used to derive the base variable of the text color gradient. In v5, we added a layer of text color derivation algorithm to produce gradient variables of text color gradient. But please do not use this Seed Token directly in the code!
   */
  colorTextBase: string;

  /**
   * @name 基础背景色
   * @nameEn Seed Background Color
   * @desc 用于派生背景色梯度的基础变量，v5 中我们添加了一层背景色的派生算法可以产出梯度明确的背景色的梯度变量。但 **请不要在代码中直接使用该 Seed Token** ！
   * @descEn Used to derive the base variable of the background color gradient. In v5, we added a layer of background color derivation algorithm to produce map token of background color. But PLEASE DO NOT USE this Seed Token directly in the code!
   */
  colorBgBase: string;

  //  ----------   Font   ---------- //

  /**
   * @name 字体
   * @nameEn FontFamily
   * @desc Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。
   */
  fontFamily: string;

  /**
   * @name 默认字号
   * @desc 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。
   * @default 14
   */
  fontSize: number;

  //  ----------   Line   ---------- //

  /**
   * @name 基础线宽
   * @nameEn Base Line Width
   * @desc 用于控制组件边框、分割线等的宽度
   * @descEn Border width of base components
   */
  lineWidth: number;

  /**
   * @name 线条样式
   * @nameEn Line Style
   * @desc 用于控制组件边框、分割线等的样式，默认是实线
   * @descEn Border style of base components
   */
  lineType: string;

  //  ----------   BorderRadius   ---------- //

  /**
   * @name 基础圆角
   * @nameEn Base Border Radius
   * @descEn Border radius of base components
   * @desc 基础组件的圆角大小，例如按钮、输入框、卡片等
   */
  borderRadius: number;

  //  ----------   Size   ---------- //

  /**
   * @name 尺寸变化单位
   * @nameEn Size Change Unit
   * @desc 用于控制组件尺寸的变化单位，在 Ant Design 中我们的基础单位为 4 ，便于更加细致地控制尺寸梯度
   * @descEn The unit of size change, in Ant Design, our base unit is 4, which is more fine-grained control of the size step
   * @default 4
   */
  sizeUnit: number;

  /**
   * @name 尺寸步长
   * @nameEn Size Base Step
   * @desc 用于控制组件尺寸的基础步长，尺寸步长结合尺寸变化单位，就可以派生各种尺寸梯度。通过调整步长即可得到不同的布局模式，例如 V5 紧凑模式下的尺寸步长为 2
   * @descEn The base step of size change, the size step combined with the size change unit, can derive various size steps. By adjusting the step, you can get different layout modes, such as the size step of the compact mode of V5 is 2
   * @default 4
   */
  sizeStep: number;

  /**
   * @name 组件箭头尺寸
   * @internal
   */
  sizePopupArrow: number;

  /**
   * @name 基础高度
   * @nameEn Base Control Height
   * @desc Ant Design 中按钮和输入框等基础控件的高度
   * @descEn The height of the basic controls such as buttons and input boxes in Ant Design
   * @default 32
   */
  controlHeight: number;

  //  ----------   zIndex   ---------- //

  /**
   * @name 基础 zIndex
   * @nameEn Base zIndex
   * @desc 所有组件的基础 Z 轴值，用于一些悬浮类的组件的可以基于该值 Z 轴控制层级，例如 BackTop、 Affix 等
   * @descEn The base Z axis value of all components, which can be used to control the level of some floating components based on the Z axis value, such as BackTop, Affix, etc.
   *
   * @default 0
   */
  zIndexBase: number;
  /**  */

  /**
   * @name 浮层基础 zIndex
   * @nameEn popup base zIndex
   * @desc 浮层类组件的基础 Z 轴值，用于一些悬浮类的组件的可以基于该值 Z 轴控制层级，例如 FloatButton、 Affix、Modal 等
   * @descEn Base zIndex of component like FloatButton, Affix which can be cover by large popup
   * @default 1000
   */
  zIndexPopupBase: number;

  //  ----------   Opacity   ---------- //

  /**
   * @name 图片不透明度
   * @nameEn Define default Image opacity. Useful when in dark-like theme
   * @internal
   */
  opacityImage: number;

  //  ----------   motion   ---------- //
  // TODO: 缺一个懂 motion 的人来收敛 Motion 相关的 Token

  /**
   * @name 动画时长变化单位
   * @nameEn Animation Duration Unit
   * @desc 用于控制动画时长的变化单位
   * @descEn The unit of animation duration change
   * @default 100ms
   */
  motionUnit: number;

  /**
   * @name 动画基础时长
   * @internal
   */
  motionBase: number;

  /**
   * @name
   * @internal
   */
  motionEaseOutCirc: string;

  /**
   * @name
   * @internal
   */
  motionEaseInOutCirc: string;

  /**
   * @name
   * @internal
   */
  motionEaseInOut: string;

  /**
   * @name
   * @internal
   */
  motionEaseOutBack: string;

  /**
   * @name
   * @internal
   */
  motionEaseInBack: string;

  /**
   * @name
   * @internal
   */
  motionEaseInQuint: string;

  /**
   * @name
   * @internal
   */
  motionEaseOutQuint: string;

  /**
   * @name
   * @internal
   */
  motionEaseOut: string;

  //  ----------   Style   ---------- //

  /**
   * @name 线框化
   * @desc 用于将组件的视觉效果变为线框化，如果需要使用 V4 的效果，需要开启配置项
   * @default false
   */
  wireframe: boolean;
}
