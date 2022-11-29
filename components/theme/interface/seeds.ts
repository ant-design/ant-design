import type { PresetColorType } from './presetColors';
// ======================================================================
// ==                            Seed Token                            ==
// ======================================================================
// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥

export interface SeedToken extends PresetColorType {
  //  ----------   Color   ---------- //

  /**
   * @name 品牌主色
   * @desc 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义
   */
  colorPrimary: string;

  /**
   * @name 成功色
   * @desc 用于表示操作成功的视觉元素，如成功按钮、成功图标、成功文本等。
   */
  colorSuccess: string;

  /**
   * @name 警戒色
   */
  colorWarning: string;

  /**
   * @name 错误色
   */
  colorError: string;

  /**
   * @name 信息色
   */
  colorInfo: string;

  /**
   * @name 基础文本色
   */
  colorTextBase: string;

  /**
   * @name 基础背景色
   * @descEn Base component background color. Will derivative container background color with this
   */
  colorBgBase: string;

  //  ----------   Font   ---------- //

  /**
   * @name 字体
   */
  fontFamily: string;

  /**
   * @name 默认字号
   * @desc 设计系统中使用最广泛的字体大小。文本梯度也将基于该字号进行派生
   * @default 14
   */
  fontSize: number;

  //  ----------   Line   ---------- //

  /**
   * @name 基础线宽
   * @descEn Border width of base components
   */
  lineWidth: number;

  /**
   * @name 线条样式
   */
  lineType: string;

  //  ----------   BorderRadius   ---------- //

  /**
   * @name 基础圆角
   * @nameEn Base Border Radius
   */
  borderRadius: number;

  //  ----------   Size   ---------- //

  /**
   * @name 尺寸变化单位
   */
  sizeUnit: number;

  /**
   * @name 尺寸基础步长
   */
  sizeStep: number;

  /**
   * @name 组件箭头尺寸
   */
  sizePopupArrow: number;

  /**
   * @name 基础高度
   * @desc Ant Design 中按钮和输入框等基础控件的高度
   * @default 32
   */
  controlHeight: number;

  //  ----------   zIndex   ---------- //

  /**
   * @name 基础 zIndex
   * @descEn Base popup component zIndex
   *
   * @default 1000
   */
  zIndexBase: number;
  /**  */

  /**
   * @name 浮层基础 zIndex
   * @nameEn popup base zIndex
   * @descEn Base zIndex of component like FloatButton, Affix which can be cover by large popup
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
   */
  motionUnit: number;

  /**
   * @name 动画基础时长
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
