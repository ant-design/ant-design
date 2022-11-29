import type { PresetColorType } from './presetColors';
// ======================================================================
// ==                            Seed Token                            ==
// ======================================================================
// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥

export interface SeedToken extends PresetColorType {
  /**
   * @name 品牌主色
   * @desc 品牌色是体现产品特性和传播理念最直观的视觉元素之一，用于产品的主色调、主按钮、主图标、主文本等
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
   * Base component background color. Will derivative container background color with this
   * @name 基础背景色
   */
  colorBgBase: string;

  // Font
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

  /**
   * Border width of base components
   * @name 基础线宽
   */
  lineWidth: number;

  /**
   * @name 线条样式
   */
  lineType: string;

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
   */
  motionEaseOutCirc: string;

  /**
   * @name
   */
  motionEaseInOutCirc: string;

  /**
   * @name
   */
  motionEaseInOut: string;

  /**
   * @name
   */
  motionEaseOutBack: string;

  /**
   * @name
   */
  motionEaseInBack: string;

  /**
   * @name
   */
  motionEaseInQuint: string;

  /**
   * @name
   */
  motionEaseOutQuint: string;

  /**
   * @name
   */
  motionEaseOut: string;

  // Radius
  /**
   * @name 基础圆角
   * @nameEn Base Border Radius
   */
  borderRadius: number;

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

  // Control Base

  /**
   * @name
   */
  controlHeight: number;

  /**
   * @name 基础 zIndex
   * @nameEn Base popup component zIndex
   */
  zIndexBase: number;
  /**  */

  /**
   * @name 浮层基础 zIndex
   * @nameEn Base zIndex of component like FloatButton, Affix which can be cover by large popup
   */
  zIndexPopupBase: number;

  /**
   * @name 图片不透明度
   * @nameEn Define default Image opacity. Useful when in dark-like theme
   * @internal
   */
  opacityImage: number;

  /**
   * @name 线框化
   * @desc 用于将组件的视觉效果变为线框化，如果需要使用 V4 的效果，需要开启配置项
   * @default false
   */
  wireframe: boolean;
}
