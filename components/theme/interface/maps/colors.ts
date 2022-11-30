export interface ColorNeutralMapToken {
  /**
   * @internal
   */
  colorTextBase: string;

  /**
   * @internal
   */
  colorBgBase: string;

  // ----------   Text   ---------- //

  /**
   * @nameZH 一级文本色
   * @desc 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。
   */
  colorText: string;

  /**
   * @nameZH 二级文本色
   * @desc 作为第二梯度的文本色，一般用在不那么需要强化文本颜色的场景，例如 Label 文本、Menu 的文本选中态等场景。
   */
  colorTextSecondary: string;

  /**
   * @nameZH 三级文本色
   * @desc 第三级文本色一般用于描述性文本，例如表单的中的补充说明文本、列表的描述性文本等场景。
   */
  colorTextTertiary: string;

  /**
   * @nameZH 四级文本色
   * @desc 第四级文本色是最浅的文本色，例如表单的输入提示文本、禁用色文本等。
   */
  colorTextQuaternary: string;

  // ----------   Border   ---------- //

  /**
   * @nameZH 一级边框色
   * @nameEN Default Border Color
   * @desc 默认使用的边框颜色, 用于分割不同的元素，例如：表单的分割线、卡片的分割线等。
   * @descEN Default border color, used to separate different elements, such as: form separator, card separator, etc.
   */
  colorBorder: string;

  /**
   * @nameZH 二级边框色
   * @nameEN Secondary Border Color
   * @desc 比默认使用的边框色要浅一级，此颜色和 colorSplit 的颜色一致。使用的是实色。
   * @descEN Slightly lighter than the default border color, this color is the same as `colorSplit`. Solid color is used.
   */
  colorBorderSecondary: string;

  // ----------   Fill   ---------- //

  /**
   * @nameZH 一级填充色
   * @desc 最深的填充色，用于拉开与二、三级填充色的区分度，目前只用在 Slider 的 hover 效果。
   */
  colorFill: string;

  /**
   * @nameZH 二级填充色
   * @desc 二级填充色可以较为明显地勾勒出元素形体，如 Rate、Skeleton 等。也可以作为三级填充色的 Hover 状态，如 Table 等。
   */
  colorFillSecondary: string;

  /**
   * @nameZH 三级填充色
   * @desc 三级填充色用于勾勒出元素形体的场景，如 Slider、Segmented 等。如无强调需求的情况下，建议使用三级填色作为默认填色。
   */
  colorFillTertiary: string;

  /**
   * @nameZH 四级填充色
   * @desc 最弱一级的填充色，适用于不易引起注意的色块，例如斑马纹、区分边界的色块等。
   */
  colorFillQuaternary: string;

  // ----------   Surface   ---------- //

  /**
   * @nameZH 布局背景色
   * @desc 该色用于页面整体布局的背景色，只有需要在页面中处于 B1 的视觉层级时才会使用该 token，其他用法都是错误的
   */
  colorBgLayout: string;

  /**
   * @nameZH 组件容器背景色
   * @desc 组件的容器背景色，例如：默认按钮、输入框等。务必不要将其与 `colorBgElevated` 混淆。
   */
  colorBgContainer: string;

  /**
   * @nameZH 浮层容器背景色
   * @desc 浮层容器背景色，在暗色模式下该 token 的色值会比 `colorBgContainer` 要亮一些。例如：模态框、弹出框、菜单等。
   */
  colorBgElevated: string;

  /**
   * @nameZH 引起注意的背景色
   * @desc 该色用于引起用户强烈关注注意的背景色，目前只用在 Tooltip 的背景色上。
   */
  colorBgSpotlight: string;
}

/**
 * 品牌色梯度变量
 */
interface ColorPrimaryMapToken {
  /**
   * @nameZH 品牌主色
   * @desc 品牌色是体现产品特性和传播理念最直观的视觉元素之一，用于产品的主色调、主按钮、主图标、主文本等   */
  colorPrimary: string; // 6

  /**
   * @nameZH 主色浅色背景色
   * @nameEN Light Background Color of Primary Color
   * @desc 主色浅色背景颜色，一般用于视觉层级较弱的选中状态。
   * @descEN Light background color of primary color, usually used for weak visual level selection state.
   */
  colorPrimaryBg: string; // 1

  /**
   * @nameZH 主色浅色背景悬浮态
   * @desc 与主色浅色背景颜色相对应的悬浮态颜色。
   */
  colorPrimaryBgHover: string; // 2

  /**
   * @nameZH 主色描边色
   * @desc 主色梯度下的描边用色，用在 Slider 组件的描边上
   */
  colorPrimaryBorder: string; // 3

  /**
   * @nameZH 主色描边色悬浮态
   * @desc 主色梯度下的描边用色的悬浮态，Slider 、Button 等组件的描边 Hover 时会使用
   */
  colorPrimaryBorderHover: string; // 4

  /**
   * @nameZH 主色悬浮态
   * @desc 主色梯度下的悬浮态，使用频率很高
   */
  colorPrimaryHover: string; // 5

  /**
   * @nameZH 主色激活态
   * @desc 主色梯度下的深色激活态
   */
  colorPrimaryActive: string; // 7

  /**
   * @nameZH 主色文本悬浮态
   * @desc 主色梯度下的文本悬浮态
   */
  colorPrimaryTextHover: string; // 8

  /**
   * @nameZH 主色文本
   * @desc 主色梯度下的文本颜色
   */
  colorPrimaryText: string; // 9

  /**
   * @nameZH 主色文本
   * @desc 主色梯度下的文本激活态
   */
  colorPrimaryTextActive: string; // 10
}

interface ColorSuccessMapToken {
  /**
   * @nameZH 成功色的浅色背景颜色
   * @nameEN Light Background Color of Success Color
   * @desc 成功色的浅色背景颜色，用于 Tag 和 Alert 的成功态背景色
   * @descEN Light background color of success color, used for Tag and Alert success state background color
   */
  colorSuccessBg: string; // 1

  /**
   * @nameZH 成功色的浅色背景色悬浮态
   * @nameEN Hover State Color of Light Success Background
   * @desc 成功色浅色背景颜色，一般用于视觉层级较弱的选中状态，不过 antd 目前没有使用到该 token
   * @descEN Light background color of success color, but antd does not use this token currently
   */
  colorSuccessBgHover: string; // 2

  /**
   * @nameZH 成功色的描边色
   * @desc 成功色的描边色，用于 Tag 和 Alert 的成功态描边色
   */
  colorSuccessBorder: string; // 3

  /**
   * @nameZH 成功色的描边色悬浮态
   * @desc 成功色的描边色悬浮态
   */
  colorSuccessBorderHover: string; // 4

  /**
   * @nameZH 成功色的深色悬浮态
   * @desc 成功色的深色悬浮态
   */
  colorSuccessHover: string; // 5

  /**
   * @nameZH 成功色
   * @desc 默认的成功色，如 Result、Progress 等组件中都有使用该颜色
   */
  colorSuccess: string; // 6

  /**
   * @nameZH 成功色的深色激活态
   * @desc 成功色的深色激活态
   */
  colorSuccessActive: string; // 7

  /**
   * @nameZH 成功色的文本悬浮态
   * @desc 成功色的文本悬浮态
   */
  colorSuccessTextHover: string; // 8

  /**
   * @nameZH 成功色的文本默认态
   * @desc 成功色的文本默认态
   */
  colorSuccessText: string; // 9

  /**
   * @nameZH 成功色的文本激活态
   * @desc 成功色的文本激活态
   */
  colorSuccessTextActive: string; // 10
}

interface ColorWarningMapToken {
  /**
   * @nameZH 警戒色的浅色背景颜色
   */
  colorWarningBg: string; // 1

  /**
   * @nameZH 警戒色的浅色背景色悬浮态
   * @desc 警戒色的浅色背景色悬浮态
   */
  colorWarningBgHover: string; // 2

  /**
   * @nameZH 警戒色的描边色
   * @desc 警戒色的描边色
   */
  colorWarningBorder: string; // 3

  /**
   * @nameZH 警戒色的描边色悬浮态
   * @desc 警戒色的描边色悬浮态
   */
  colorWarningBorderHover: string; // 4

  /**
   * @nameZH 警戒色的深色悬浮态
   * @desc 警戒色的深色悬浮态
   */
  colorWarningHover: string; // 5

  /**
   * @nameZH 警戒色
   * @desc 最常用的警戒色，例如 Notification、 Alert等警告类组件或 Input 输入类等组件会使用该颜色
   */
  colorWarning: string; // 6

  /**
   * @nameZH 警戒色的深色激活态
   * @desc 警戒色的深色激活态
   */
  colorWarningActive: string; // 7

  /**
   * @nameZH 警戒色的文本悬浮态
   * @desc 警戒色的文本悬浮态
   */
  colorWarningTextHover: string; // 8

  /**
   * @nameZH 警戒色的文本默认态
   * @desc 警戒色的文本默认态
   */
  colorWarningText: string; // 9

  /**
   * @nameZH 警戒色的文本激活态
   * @desc 警戒色的文本激活态
   */
  colorWarningTextActive: string; // 10
}

interface ColorInfoMapToken {
  /**
   * @nameZH 信息色的浅色背景颜色
   * @desc 信息色的浅色背景颜色
   */
  colorInfoBg: string; // 1

  /**
   * @nameZH 信息色的浅色背景色悬浮态
   * @desc 信息色的浅色背景色悬浮态
   */
  colorInfoBgHover: string; // 2

  /**
   * @nameZH 信息色的描边色
   */
  colorInfoBorder: string; // 3

  /**
   * @nameZH 信息色的描边色悬浮态
   */
  colorInfoBorderHover: string; // 4

  /**
   * @nameZH 信息色的深色悬浮态
   */
  colorInfoHover: string; // 5

  /**
   * @nameZH 信息色
   */
  colorInfo: string; // 6

  /**
   * @nameZH 信息色的深色激活态
   */
  colorInfoActive: string; // 7

  /**
   * @nameZH 信息色的文本悬浮态
   */
  colorInfoTextHover: string; // 8

  /**
   * @nameZH 信息色的文本默认态
   */
  colorInfoText: string; // 9

  /**
   * @nameZH 信息色的文本激活态
   */
  colorInfoTextActive: string; // 10
}

interface ColorErrorMapToken {
  /**
   * @nameZH 错误色的浅色背景颜色
   */
  colorErrorBg: string; // 1

  /**
   * @nameZH 错误色的浅色背景色悬浮态
   */
  colorErrorBgHover: string; // 2

  /**
   * @nameZH 错误色的描边色
   */
  colorErrorBorder: string; // 3

  /**
   * @nameZH 错误色的描边色悬浮态
   */
  colorErrorBorderHover: string; // 4

  /**
   * @nameZH 错误色的深色悬浮态
   */
  colorErrorHover: string; // 5

  /**
   * @nameZH 错误色
   */
  colorError: string; // 6

  /**
   * @nameZH 错误色的深色激活态
   */
  colorErrorActive: string; // 7

  /**
   * @nameZH 错误色的文本悬浮态
   */
  colorErrorTextHover: string; // 8

  /**
   * @nameZH 错误色的文本默认态
   */
  colorErrorText: string; // 9

  /**
   * @nameZH 错误色的文本激活态
   */
  colorErrorTextActive: string; // 10
}

export interface ColorMapToken
  extends ColorNeutralMapToken,
    ColorPrimaryMapToken,
    ColorSuccessMapToken,
    ColorWarningMapToken,
    ColorErrorMapToken,
    ColorInfoMapToken {
  /**
   * @nameZH 纯白色
   * @desc 不随主题变化的纯白色
   * @descEN Pure white color don't changed by theme
   * @default #FFFFFF
   */
  colorWhite: string;

  /**
   * @nameZH 浮层的背景蒙层颜色
   * @nameEN Background color of the mask
   * @desc 浮层的背景蒙层颜色，用于遮罩浮层下面的内容，Modal、Drawer 等组件的蒙层使用的是该 token
   * @descEN The background color of the mask, used to cover the content below the mask, Modal, Drawer and other components use this token
   */
  colorBgMask: string;

  /**
   * @nameZH 纯黑色
   * @desc 不随主题变化的纯黑色
   * @default #0000
   */
  // colorBlack: string;
}
