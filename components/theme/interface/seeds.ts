import type { PresetColorType } from './presetColors';

// ======================================================================
// ==                            Seed Token                            ==
// ======================================================================
// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥

export interface SeedToken extends PresetColorType {
  //  ----------   Color   ---------- //

  /**
   * @nameZH 品牌主色
   * @nameEN Brand Color
   * @desc 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义
   * @descEN Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics.
   */
  colorPrimary: string;

  /**
   * @nameZH 成功色
   * @nameEN Success Color
   * @desc 用于表示操作成功的 Token 序列，如 Result、Progress 等组件会使用该组梯度变量。
   * @descEN Used to represent the token sequence of operation success, such as Result, Progress and other components will use these map tokens.
   */
  colorSuccess: string;

  /**
   * @nameZH 警戒色
   * @nameEN Warning Color
   * @desc 用于表示操作警告的 Token 序列，如 Notification、 Alert等警告类组件或 Input 输入类等组件会使用该组梯度变量。
   * @descEN Used to represent the warning map token, such as Notification, Alert, etc. Alert or Control component(like Input) will use these map tokens.
   */
  colorWarning: string;

  /**
   * @nameZH 错误色
   * @nameEN Error Color
   * @desc 用于表示操作失败的 Token 序列，如失败按钮、错误状态提示（Result）组件等。
   * @descEN Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc.
   */
  colorError: string;

  /**
   * @nameZH 信息色
   * @nameEN Info Color
   * @desc 用于表示操作信息的 Token 序列，如 Alert 、Tag、 Progress 等组件都有用到该组梯度变量。
   * @descEN Used to represent the operation information of the Token sequence, such as Alert, Tag, Progress, and other components use these map tokens.
   */
  colorInfo: string;

  /**
   * @nameZH 基础文本色
   * @nameEN Seed Text Color
   * @desc 用于派生文本色梯度的基础变量，v5 中我们添加了一层文本色的派生算法可以产出梯度明确的文本色的梯度变量。但请不要在代码中直接使用该 Seed Token ！
   * @descEN Used to derive the base variable of the text color gradient. In v5, we added a layer of text color derivation algorithm to produce gradient variables of text color gradient. But please do not use this Seed Token directly in the code!
   */
  colorTextBase: string;

  /**
   * @nameZH 基础背景色
   * @nameEN Seed Background Color
   * @desc 用于派生背景色梯度的基础变量，v5 中我们添加了一层背景色的派生算法可以产出梯度明确的背景色的梯度变量。但请不要在代码中直接使用该 Seed Token ！
   * @descEN Used to derive the base variable of the background color gradient. In v5, we added a layer of background color derivation algorithm to produce map token of background color. But PLEASE DO NOT USE this Seed Token directly in the code!
   */
  colorBgBase: string;

  /**
   * @nameZH 超链接颜色
   * @nameEN Hyperlink color
   * @desc 控制超链接的颜色。
   * @descEN Control the color of hyperlink.
   */
  colorLink: string;

  //  ----------   Font   ---------- //

  /**
   * @nameZH 字体
   * @nameEN Font family for default text
   * @desc Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。
   * @descEN The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics.
   */
  fontFamily: string;

  /**
   * @nameZH 代码字体
   * @nameEN Font family for code text
   * @desc 代码字体，用于 Typography 内的 code、pre 和 kbd 类型的元素
   * @descEN Code font, used for code, pre and kbd elements in Typography
   */
  fontFamilyCode: string;

  /**
   * @nameZH 默认字号
   * @nameEN Default Font Size
   * @desc 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。
   * @descEN The most widely used font size in the design system, from which the text gradient will be derived.
   * @default 14
   */
  fontSize: number;

  //  ----------   Line   ---------- //

  /**
   * @nameZH 基础线宽
   * @nameEN Base Line Width
   * @desc 用于控制组件边框、分割线等的宽度
   * @descEN Border width of base components
   */
  lineWidth: number;

  /**
   * @nameZH 线条样式
   * @nameEN Line Style
   * @desc 用于控制组件边框、分割线等的样式，默认是实线
   * @descEN Border style of base components
   */
  lineType: string;

  //  ----------   BorderRadius   ---------- //

  /**
   * @nameZH 基础圆角
   * @nameEN Base Border Radius
   * @descEN Border radius of base components
   * @desc 基础组件的圆角大小，例如按钮、输入框、卡片等
   */
  borderRadius: number;

  //  ----------   Size   ---------- //

  /**
   * @nameZH 尺寸变化单位
   * @nameEN Size Change Unit
   * @desc 用于控制组件尺寸的变化单位，在 Ant Design 中我们的基础单位为 4 ，便于更加细致地控制尺寸梯度
   * @descEN The unit of size change, in Ant Design, our base unit is 4, which is more fine-grained control of the size step
   * @default 4
   */
  sizeUnit: number;

  /**
   * @nameZH 尺寸步长
   * @nameEN Size Base Step
   * @desc 用于控制组件尺寸的基础步长，尺寸步长结合尺寸变化单位，就可以派生各种尺寸梯度。通过调整步长即可得到不同的布局模式，例如 V5 紧凑模式下的尺寸步长为 2
   * @descEN The base step of size change, the size step combined with the size change unit, can derive various size steps. By adjusting the step, you can get different layout modes, such as the size step of the compact mode of V5 is 2
   * @default 4
   */
  sizeStep: number;

  /**
   * @nameZH 组件箭头尺寸
   * @desc 组件箭头的尺寸
   * @descEN The size of the component arrow
   */
  sizePopupArrow: number;

  /**
   * @nameZH 基础高度
   * @nameEN Base Control Height
   * @desc Ant Design 中按钮和输入框等基础控件的高度
   * @descEN The height of the basic controls such as buttons and input boxes in Ant Design
   * @default 32
   */
  controlHeight: number;

  //  ----------   zIndex   ---------- //

  /**
   * @nameZH 基础 zIndex
   * @nameEN Base zIndex
   * @desc 所有组件的基础 Z 轴值，用于一些悬浮类的组件的可以基于该值 Z 轴控制层级，例如 BackTop、 Affix 等
   * @descEN The base Z axis value of all components, which can be used to control the level of some floating components based on the Z axis value, such as BackTop, Affix, etc.
   *
   * @default 0
   */
  zIndexBase: number;

  /**
   * @nameZH 浮层基础 zIndex
   * @nameEN popup base zIndex
   * @desc 浮层类组件的基础 Z 轴值，用于一些悬浮类的组件的可以基于该值 Z 轴控制层级，例如 FloatButton、 Affix、Modal 等
   * @descEN Base zIndex of component like FloatButton, Affix which can be cover by large popup
   * @default 1000
   */
  zIndexPopupBase: number;

  //  ----------   Opacity   ---------- //

  /**
   * @nameZH 图片不透明度
   * @nameEN Define default Image opacity. Useful when in dark-like theme
   * @desc 控制图片不透明度
   * @descEN Control image opacity
   */
  opacityImage: number;

  //  ----------   motion   ---------- //
  // TODO: 缺一个懂 motion 的人来收敛 Motion 相关的 Token

  /**
   * @nameZH 动画时长变化单位
   * @nameEN Animation Duration Unit
   * @desc 用于控制动画时长的变化单位
   * @descEN The unit of animation duration change
   * @default 100ms
   */
  motionUnit: number;

  /**
   * @nameZH 动画基础时长。
   * @nameEN Animation Base Duration.
   * @desc 动画基础时长。
   * @descEN Animation Base Duration.
   */
  motionBase: number;

  /**
   * @desc 预设动效曲率
   * @descEN Preset motion curve.
   */
  motionEaseOutCirc: string;

  /**
   * @desc 预设动效曲率
   * @descEN Preset motion curve.
   */
  motionEaseInOutCirc: string;

  /**
   * @desc 预设动效曲率
   * @descEN Preset motion curve.
   */
  motionEaseInOut: string;

  /**
   * @desc 预设动效曲率
   * @descEN Preset motion curve.
   */
  motionEaseOutBack: string;

  /**
   * @desc 预设动效曲率
   * @descEN Preset motion curve.
   */
  motionEaseInBack: string;

  /**
   * @desc 预设动效曲率
   * @descEN Preset motion curve.
   */
  motionEaseInQuint: string;

  /**
   * @desc 预设动效曲率
   * @descEN Preset motion curve.
   */
  motionEaseOutQuint: string;

  /**
   * @desc 预设动效曲率
   * @descEN Preset motion curve.
   */
  motionEaseOut: string;

  //  ----------   Style   ---------- //

  /**
   * @nameZH 线框风格
   * @nameEN Wireframe Style
   * @desc 用于将组件的视觉效果变为线框化，如果需要使用 V4 的效果，需要开启配置项
   * @descEN Used to change the visual effect of the component to wireframe, if you need to use the V4 effect, you need to enable the configuration item
   * @default false
   */
  wireframe: boolean;

  /**
   * @nameZH 聚焦描边
   * @nameEN Focus Outline
   * @desc 用于配置组件聚焦时是否显示可见描边
   * @descEN Used to configure whether components show a visible outline when focused
   * @default true
   */
  focusOutline: boolean;

  /**
   * @nameZH 动画风格
   * @nameEN Motion Style
   * @desc 用于配置动画效果，为 `false` 时则关闭动画
   * @descEN Used to configure the motion effect, when it is `false`, the motion is turned off
   * @default true
   */
  motion: boolean;
}
