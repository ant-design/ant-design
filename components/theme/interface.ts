import type * as React from 'react';
import type { ComponentToken as AlertComponentToken } from '../alert/style';
import type { ComponentToken as AnchorComponentToken } from '../anchor/style';
import type { ComponentToken as AvatarComponentToken } from '../avatar/style';
import type { ComponentToken as BackTopComponentToken } from '../back-top/style';
import type { ComponentToken as ButtonComponentToken } from '../button/style';
import type { ComponentToken as FloatButtonComponentToken } from '../float-button/style';
import type { ComponentToken as CalendarComponentToken } from '../calendar/style';
import type { ComponentToken as CardComponentToken } from '../card/style';
import type { ComponentToken as CarouselComponentToken } from '../carousel/style';
import type { ComponentToken as CascaderComponentToken } from '../cascader/style';
import type { ComponentToken as CheckboxComponentToken } from '../checkbox/style';
import type { ComponentToken as CollapseComponentToken } from '../collapse/style';
import type { ComponentToken as DatePickerComponentToken } from '../date-picker/style';
import type { ComponentToken as DividerComponentToken } from '../divider/style';
import type { ComponentToken as DropdownComponentToken } from '../dropdown/style';
import type { ComponentToken as DrawerComponentToken } from '../drawer/style';
import type { ComponentToken as EmptyComponentToken } from '../empty/style';
import type { ComponentToken as ImageComponentToken } from '../image/style';
import type { ComponentToken as InputNumberComponentToken } from '../input-number/style';
import type { ComponentToken as LayoutComponentToken } from '../layout/style';
import type { ComponentToken as ListComponentToken } from '../list/style';
import type { ComponentToken as MentionsComponentToken } from '../mentions/style';
import type { ComponentToken as MenuComponentToken } from '../menu/style';
import type { ComponentToken as MessageComponentToken } from '../message/style';
import type { ComponentToken as ModalComponentToken } from '../modal/style';
import type { ComponentToken as NotificationComponentToken } from '../notification/style';
import type { ComponentToken as PopconfirmComponentToken } from '../popconfirm/style';
import type { ComponentToken as PopoverComponentToken } from '../popover/style';
import type { ComponentToken as ProgressComponentToken } from '../progress/style';
import type { ComponentToken as RadioComponentToken } from '../radio/style';
import type { ComponentToken as RateComponentToken } from '../rate/style';
import type { ComponentToken as ResultComponentToken } from '../result/style';
import type { ComponentToken as SegmentedComponentToken } from '../segmented/style';
import type { ComponentToken as SelectComponentToken } from '../select/style';
import type { ComponentToken as SkeletonComponentToken } from '../skeleton/style';
import type { ComponentToken as SliderComponentToken } from '../slider/style';
import type { ComponentToken as SpaceComponentToken } from '../space/style';
import type { ComponentToken as SpinComponentToken } from '../spin/style';
import type { ComponentToken as StepsComponentToken } from '../steps/style';
import type { ComponentToken as TableComponentToken } from '../table/style';
import type { ComponentToken as TabsComponentToken } from '../tabs/style';
import type { ComponentToken as TagComponentToken } from '../tag/style';
import type { ComponentToken as TimelineComponentToken } from '../timeline/style';
import type { ComponentToken as TooltipComponentToken } from '../tooltip/style';
import type { ComponentToken as TransferComponentToken } from '../transfer/style';
import type { ComponentToken as TypographyComponentToken } from '../typography/style';
import type { ComponentToken as UploadComponentToken } from '../upload/style';
import type { ComponentToken as TourComponentToken } from '../tour/style';

export const PresetColors = [
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'lime',
  'gold',
] as const;

type PresetColorKey = typeof PresetColors[number];

export type PresetColorType = Record<PresetColorKey, string>;

type ColorPaletteKeyIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type ColorPalettes = {
  [key in `${keyof PresetColorType}-${ColorPaletteKeyIndex}`]: string;
};

export interface ComponentTokenMap {
  Affix?: {};
  Alert?: AlertComponentToken;
  Anchor?: AnchorComponentToken;
  Avatar?: AvatarComponentToken;
  BackTop?: BackTopComponentToken;
  Badge?: {};
  Button?: ButtonComponentToken;
  Breadcrumb?: {};
  Card?: CardComponentToken;
  Carousel?: CarouselComponentToken;
  Cascader?: CascaderComponentToken;
  Checkbox?: CheckboxComponentToken;
  Collapse?: CollapseComponentToken;
  DatePicker?: DatePickerComponentToken;
  Descriptions?: {};
  Divider?: DividerComponentToken;
  Drawer?: DrawerComponentToken;
  Dropdown?: DropdownComponentToken;
  Empty?: EmptyComponentToken;
  FloatButton?: FloatButtonComponentToken;
  Form?: {};
  Grid?: {};
  Image?: ImageComponentToken;
  Input?: {};
  InputNumber?: InputNumberComponentToken;
  Layout?: LayoutComponentToken;
  List?: ListComponentToken;
  Mentions?: MentionsComponentToken;
  Notification?: NotificationComponentToken;
  Pagination?: {};
  Popover?: PopoverComponentToken;
  Popconfirm?: PopconfirmComponentToken;
  Rate?: RateComponentToken;
  Radio?: RadioComponentToken;
  Result?: ResultComponentToken;
  Segmented?: SegmentedComponentToken;
  Select?: SelectComponentToken;
  Skeleton?: SkeletonComponentToken;
  Slider?: SliderComponentToken;
  Spin?: SpinComponentToken;
  Statistic?: {};
  Switch?: {};
  Tag?: TagComponentToken;
  Tree?: {};
  TreeSelect?: {};
  Typography?: TypographyComponentToken;
  Timeline?: TimelineComponentToken;
  Transfer?: TransferComponentToken;
  Tabs?: TabsComponentToken;
  Calendar?: CalendarComponentToken;
  Steps?: StepsComponentToken;
  Menu?: MenuComponentToken;
  Modal?: ModalComponentToken;
  Message?: MessageComponentToken;
  Upload?: UploadComponentToken;
  Tooltip?: TooltipComponentToken;
  Table?: TableComponentToken;
  Space?: SpaceComponentToken;
  Progress?: ProgressComponentToken;
  Tour?: TourComponentToken;
}

export type OverrideToken = {
  [key in keyof ComponentTokenMap]: Partial<ComponentTokenMap[key]> & Partial<AliasToken>;
};

/** Final token which contains the components level override */
export type GlobalToken = AliasToken & ComponentTokenMap;

// ======================================================================
// ==                            Seed Token                            ==
// ======================================================================
// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥
export interface SeedToken extends PresetColorType {
  /**
   * @desc 品牌主色
   */
  colorPrimary: string;

  /**
   * @desc 成功色
   */
  colorSuccess: string;

  /**
   * @desc 警戒色
   */
  colorWarning: string;

  /**
   * @desc 错误色
   */
  colorError: string;

  /**
   * @desc 信息色
   */
  colorInfo: string;

  /**
   * @desc 基础文本色
   */
  colorTextBase: string;

  /**
   * Base component background color. Will derivative container background color with this
   * @desc 基础背景色
   */
  colorBgBase: string;

  // Font
  /**
   * @desc 字体
   */
  fontFamily: string;

  /**
   * @desc 基础字号
   */
  fontSize: number;

  /**
   * Border width of base components
   * @desc 基础线宽
   */
  lineWidth: number;

  /**
   * @desc 线条样式
   */
  lineType: string;

  /**
   * @desc 动画时长变化单位
   */
  motionUnit: number;

  /**
   * @desc 动画基础时长
   */
  motionBase: number;

  /**
   * @desc
   */
  motionEaseOutCirc: string;

  /**
   * @desc
   */
  motionEaseInOutCirc: string;

  /**
   * @desc
   */
  motionEaseInOut: string;

  /**
   * @desc
   */
  motionEaseOutBack: string;

  /**
   * @desc
   */
  motionEaseInBack: string;

  /**
   * @desc
   */
  motionEaseInQuint: string;

  /**
   * @desc
   */
  motionEaseOutQuint: string;

  /**
   * @desc
   */
  motionEaseOut: string;

  // Radius
  /**
   * @desc 基础圆角
   * @descEn Base border radius
   */
  borderRadius: number;

  /**
   * @desc 尺寸变化单位
   */
  sizeUnit: number;

  /**
   * @desc 尺寸基础大小
   */
  sizeStep: number;

  /**
   * @desc 组件箭头尺寸
   */
  sizePopupArrow: number;

  // Control Base

  /**
   * @desc
   */
  controlHeight: number;

  /**
   * @desc 基础 zIndex
   * @descEn Base popup component zIndex
   */
  zIndexBase: number;
  /**  */

  /**
   * @desc 浮层基础 zIndex
   * @descEn Base zIndex of component like FloatButton, Affix which can be cover by large popup
   */
  zIndexPopupBase: number;

  /**
   * @desc 成功色
   * @descEn Define default Image opacity. Useful when in dark-like theme
   */
  opacityImage: number;

  /**
   * @desc 线框化
   */
  wireframe: boolean;
}

export interface NeutralColorMapToken {
  /**
   * @internal
   */
  colorTextBase: string;

  /**
   * @internal
   */
  colorBgBase: string;

  /**
   * @desc 一级文本色
   */
  colorText: string;

  /**
   * @desc 二级文本色
   */
  colorTextSecondary: string;

  /**
   * @desc 三级文本色
   */
  colorTextTertiary: string;

  /**
   * @desc 四级文本色
   */
  colorTextQuaternary: string;

  /**
   * @desc 一级填充色
   */
  colorFill: string;

  /**
   * @desc 二级填充色
   */
  colorFillSecondary: string;

  /**
   * @desc 三级填充色
   */
  colorFillTertiary: string;

  /**
   * @desc 四级填充色
   */
  colorFillQuaternary: string;

  /**
   * @desc 组件容器背景色
   */
  colorBgContainer: string;

  /**
   * @desc 浮层容器背景色
   */
  colorBgElevated: string;

  /**
   * @desc 布局背景色
   */
  colorBgLayout: string;

  /**
   * @desc
   */
  colorBgSpotlight: string;

  /**
   * @desc 一级边框色
   */
  colorBorder: string;

  /**
   * @desc 二级边框色
   */
  colorBorderSecondary: string;
}

export interface ColorMapToken extends NeutralColorMapToken {
  // Primary
  /**
   * @desc 主色的浅色背景颜色
   */
  colorPrimaryBg: string; // 1

  /**
   * @desc 主色的浅色背景色悬浮态
   */
  colorPrimaryBgHover: string; // 2

  /**
   * @desc 主色的描边色
   */
  colorPrimaryBorder: string; // 3

  /**
   * @desc 主色的描边色悬浮态
   */
  colorPrimaryBorderHover: string; // 4

  /**
   * @desc 主色的深色悬浮态
   */
  colorPrimaryHover: string; // 5

  /**
   * @desc 品牌主色
   */
  colorPrimary: string; // 6

  /**
   * @desc 主色的深色激活态
   */
  colorPrimaryActive: string; // 7

  /**
   * @desc 主色的文本悬浮态
   */
  colorPrimaryTextHover: string; // 8

  /**
   * @desc 主色的文本默认态
   */
  colorPrimaryText: string; // 9

  /**
   * @desc 主色的文本激活态
   */
  colorPrimaryTextActive: string; // 10

  /**
   * @desc 成功色的浅色背景颜色
   */
  colorSuccessBg: string; // 1

  /**
   * @desc 成功色的浅色背景色悬浮态
   */
  colorSuccessBgHover: string; // 2

  /**
   * @desc 成功色的描边色
   */
  colorSuccessBorder: string; // 3

  /**
   * @desc 成功色的描边色悬浮态
   */
  colorSuccessBorderHover: string; // 4

  /**
   * @desc 成功色的深色悬浮态
   */
  colorSuccessHover: string; // 5

  /**
   * @desc 成功色
   */
  colorSuccess: string; // 6

  /**
   * @desc 成功色的深色激活态
   */
  colorSuccessActive: string; // 7

  /**
   * @desc 成功色的文本悬浮态
   */
  colorSuccessTextHover: string; // 8

  /**
   * @desc 成功色的文本默认态
   */
  colorSuccessText: string; // 9

  /**
   * @desc 成功色的文本激活态
   */
  colorSuccessTextActive: string; // 10

  /**
   * @desc 警戒色的浅色背景颜色
   */
  colorWarningBg: string; // 1

  /**
   * @desc 警戒色的浅色背景色悬浮态
   */
  colorWarningBgHover: string; // 2

  /**
   * @desc 警戒色的描边色
   */
  colorWarningBorder: string; // 3

  /**
   * @desc 警戒色的描边色悬浮态
   */
  colorWarningBorderHover: string; // 4

  /**
   * @desc 警戒色的深色悬浮态
   */
  colorWarningHover: string; // 5

  /**
   * @desc 警戒色
   */
  colorWarning: string; // 6

  /**
   * @desc 警戒色的深色激活态
   */
  colorWarningActive: string; // 7

  /**
   * @desc 警戒色的文本悬浮态
   */
  colorWarningTextHover: string; // 8

  /**
   * @desc 警戒色的文本默认态
   */
  colorWarningText: string; // 9

  /**
   * @desc 警戒色的文本激活态
   */
  colorWarningTextActive: string; // 10

  /**
   * @desc 错误色的浅色背景颜色
   */
  colorErrorBg: string; // 1

  /**
   * @desc 错误色的浅色背景色悬浮态
   */
  colorErrorBgHover: string; // 2

  /**
   * @desc 错误色的描边色
   */
  colorErrorBorder: string; // 3

  /**
   * @desc 错误色的描边色悬浮态
   */
  colorErrorBorderHover: string; // 4

  /**
   * @desc 错误色的深色悬浮态
   */
  colorErrorHover: string; // 5

  /**
   * @desc 错误色
   */
  colorError: string; // 6

  /**
   * @desc 错误色的深色激活态
   */
  colorErrorActive: string; // 7

  /**
   * @desc 错误色的文本悬浮态
   */
  colorErrorTextHover: string; // 8

  /**
   * @desc 错误色的文本默认态
   */
  colorErrorText: string; // 9

  /**
   * @desc 错误色的文本激活态
   */
  colorErrorTextActive: string; // 10

  /**
   * @desc 信息色的浅色背景颜色
   */
  colorInfoBg: string; // 1

  /**
   * @desc 信息色的浅色背景色悬浮态
   */
  colorInfoBgHover: string; // 2

  /**
   * @desc 信息色的描边色
   */
  colorInfoBorder: string; // 3

  /**
   * @desc 信息色的描边色悬浮态
   */
  colorInfoBorderHover: string; // 4

  /**
   * @desc 信息色的深色悬浮态
   */
  colorInfoHover: string; // 5

  /**
   * @desc 信息色
   */
  colorInfo: string; // 6

  /**
   * @desc 信息色的深色激活态
   */
  colorInfoActive: string; // 7

  /**
   * @desc 信息色的文本悬浮态
   */
  colorInfoTextHover: string; // 8

  /**
   * @desc 信息色的文本默认态
   */
  colorInfoText: string; // 9

  /**
   * @desc 信息色的文本激活态
   */
  colorInfoTextActive: string; // 10

  /**
   * @desc 浮层的背景蒙层颜色
   */
  colorBgMask: string;
  colorWhite: string;
}

export interface SizeMapToken {
  // Size
  sizeXXL: number;
  sizeXL: number;
  sizeLG: number;
  sizeMD: number;
  /** Same as size by default, but could be larger in compact mode */
  sizeMS: number;
  size: number;
  sizeSM: number;
  sizeXS: number;
  sizeXXS: number;
}

export interface HeightMapToken {
  // Control
  /** @private Only Used for control inside component like Multiple Select inner selection item */
  controlHeightXS: number;
  controlHeightSM: number;
  controlHeightLG: number;
}

export interface CommonMapToken {
  // Font
  /**
   * @internal
   */
  fontSizes: number[];
  /**
   * @internal
   */
  lineHeights: number[];

  // Line
  lineWidthBold: number;

  // Motion
  motionDurationFast: string;
  motionDurationMid: string;
  motionDurationSlow: string;

  // Radius
  borderRadiusXS: number;
  borderRadiusSM: number;
  borderRadiusLG: number;
  borderRadiusOuter: number;
}

// ======================================================================
// ==                         Map Token                         ==
// ======================================================================
// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥
export interface MapToken
  extends SeedToken,
    ColorPalettes,
    ColorMapToken,
    SizeMapToken,
    HeightMapToken,
    CommonMapToken {}

// ======================================================================
// ==                           Alias Token                            ==
// ======================================================================
// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥
export interface AliasToken extends MapToken {
  // Background
  colorFillContentHover: string;
  colorFillAlter: string;
  colorBgContainerDisabled: string;
  colorFillContent: string;

  // Border
  colorBorderBg: string;
  colorSplit: string;

  // Text
  colorTextPlaceholder: string;
  colorTextDisabled: string;
  colorTextHeading: string;
  colorTextLabel: string;
  colorTextDescription: string;
  colorTextLightSolid: string;
  colorBgTextHover: string;
  colorBgTextActive: string;

  /** Weak action. Such as `allowClear` or Alert close button */
  colorIcon: string;
  /** Weak action hover color. Such as `allowClear` or Alert close button */
  colorIconHover: string;

  colorLink: string;
  colorLinkHover: string;
  colorLinkActive: string;

  colorHighlight: string;

  controlOutline: string;
  colorWarningOutline: string;
  colorErrorOutline: string;

  // Font
  fontSizeSM: number;
  fontSize: number;
  fontSizeLG: number;
  fontSizeXL: number;
  /** Operation icon in Select, Cascader, etc. icon fontSize. Normal is same as fontSizeSM */
  fontSizeIcon: number;

  fontSizeHeading1: number;
  fontSizeHeading2: number;
  fontSizeHeading3: number;
  fontSizeHeading4: number;
  fontSizeHeading5: number;

  /** For heading like h1, h2, h3 or option selected item */
  fontWeightStrong: number;

  // LineHeight
  lineHeight: number;
  lineHeightLG: number;
  lineHeightSM: number;

  lineHeightHeading1: number;
  lineHeightHeading2: number;
  lineHeightHeading3: number;
  lineHeightHeading4: number;
  lineHeightHeading5: number;

  // Control
  controlOutlineWidth: number;
  controlItemBgHover: string; // Note. It also is a color
  controlItemBgActive: string; // Note. It also is a color
  controlItemBgActiveHover: string; // Note. It also is a color
  controlInteractiveSize: number;
  controlItemBgActiveDisabled: string; // Note. It also is a color

  // Padding
  paddingXXS: number;
  paddingXS: number;
  paddingSM: number;
  padding: number;
  paddingMD: number;
  paddingLG: number;
  paddingXL: number;

  // Padding Content
  paddingContentHorizontalLG: number;
  paddingContentHorizontal: number;
  paddingContentHorizontalSM: number;
  paddingContentVerticalLG: number;
  paddingContentVertical: number;
  paddingContentVerticalSM: number;

  // Margin
  marginXXS: number;
  marginXS: number;
  marginSM: number;
  margin: number;
  marginMD: number;
  marginLG: number;
  marginXL: number;
  marginXXL: number;

  // =============== Legacy: should be remove ===============
  opacityLoading: number;

  boxShadow: string;
  boxShadowSecondary: string;

  linkDecoration: React.CSSProperties['textDecoration'];
  linkHoverDecoration: React.CSSProperties['textDecoration'];
  linkFocusDecoration: React.CSSProperties['textDecoration'];

  controlPaddingHorizontal: number;
  controlPaddingHorizontalSM: number;

  // Media queries breakpoints
  screenXS: number;
  screenXSMin: number;
  screenXSMax: number;
  screenSM: number;
  screenSMMin: number;
  screenSMMax: number;
  screenMD: number;
  screenMDMin: number;
  screenMDMax: number;
  screenLG: number;
  screenLGMin: number;
  screenLGMax: number;
  screenXL: number;
  screenXLMin: number;
  screenXLMax: number;
  screenXXL: number;
  screenXXLMin: number;
  screenXXLMax: number;

  /** Used for DefaultButton, Switch which has default outline */
  controlTmpOutline: string;

  // FIXME: component box-shadow, should be removed
  /** @internal */
  boxShadowPopoverArrow: string;
  /** @internal */
  boxShadowCard: string;
  /** @internal */
  boxShadowDrawerRight: string;
  /** @internal */
  boxShadowDrawerLeft: string;
  /** @internal */
  boxShadowDrawerUp: string;
  /** @internal */
  boxShadowDrawerDown: string;
  /** @internal */
  boxShadowTabsOverflowLeft: string;
  /** @internal */
  boxShadowTabsOverflowRight: string;
  /** @internal */
  boxShadowTabsOverflowTop: string;
  /** @internal */
  boxShadowTabsOverflowBottom: string;
}
