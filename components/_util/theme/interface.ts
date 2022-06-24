import type * as React from 'react';
import type { ComponentToken as AlertComponentToken } from '../../alert/style';
import type { ComponentToken as AnchorComponentToken } from '../../anchor/style';
import type { ComponentToken as AvatarComponentToken } from '../../avatar/style';
import type { ComponentToken as BackTopComponentToken } from '../../back-top/style';
import type { ComponentToken as ButtonComponentToken } from '../../button/style';
import type { ComponentToken as CalendarComponentToken } from '../../calendar/style';
import type { ComponentToken as CarouselComponentToken } from '../../carousel/style';
import type { ComponentToken as CascaderComponentToken } from '../../cascader/style';
import type { ComponentToken as CheckboxComponentToken } from '../../checkbox/style';
import type { ComponentToken as DatePickerComponentToken } from '../../date-picker/style';
import type { ComponentToken as DividerComponentToken } from '../../divider/style';
import type { ComponentToken as DropdownComponentToken } from '../../dropdown/style';
import type { ComponentToken as EmptyComponentToken } from '../../empty/style';
import type { ComponentToken as ImageComponentToken } from '../../image/style';
import type { ComponentToken as InputNumberComponentToken } from '../../input-number/style';
import type { ComponentToken as LayoutComponentToken } from '../../layout/style';
import type { ComponentToken as ListComponentToken } from '../../list/style';
import type { ComponentToken as MentionsComponentToken } from '../../mentions/style';
import type { ComponentToken as MenuComponentToken } from '../../menu/style';
import type { ComponentToken as MessageComponentToken } from '../../message/style';
import type { ComponentToken as ModalComponentToken } from '../../modal/style';
import type { ComponentToken as NotificationComponentToken } from '../../notification/style';
import type { ComponentToken as PopconfirmComponentToken } from '../../popconfirm/style';
import type { ComponentToken as PopoverComponentToken } from '../../popover/style';
import type { ComponentToken as ProgressComponentToken } from '../../progress/style';
import type { ComponentToken as RadioComponentToken } from '../../radio/style';
import type { ComponentToken as RateComponentToken } from '../../rate/style';
import type { ComponentToken as ResultComponentToken } from '../../result/style';
import type { ComponentToken as SegmentedComponentToken } from '../../segmented/style';
import type { ComponentToken as SelectComponentToken } from '../../select/style';
import type { ComponentToken as SkeletonComponentToken } from '../../skeleton/style';
import type { ComponentToken as SliderComponentToken } from '../../slider/style';
import type { ComponentToken as SpaceComponentToken } from '../../space/style';
import type { ComponentToken as SpinComponentToken } from '../../spin/style';
import type { ComponentToken as StepsComponentToken } from '../../steps/style';
import type { ComponentToken as TableComponentToken } from '../../table/style';
import type { ComponentToken as TabsComponentToken } from '../../tabs/style';
import type { ComponentToken as TimelineComponentToken } from '../../timeline/style';
import type { ComponentToken as TooltipComponentToken } from '../../tooltip/style';
import type { ComponentToken as TransferComponentToken } from '../../transfer/style';
import type { ComponentToken as TypographyComponentToken } from '../../typography/style';
import type { ComponentToken as UploadComponentToken } from '../../upload/style';
import type { BgPalettes, TextAlphaPalettes } from './themes/IPalettes';

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

export interface OverrideToken {
  derivative?: Partial<DerivativeToken>;
  /** @private Internal Usage */
  alias?: Partial<AliasToken>;

  // Customize component
  Affix?: {};
  Alert?: AlertComponentToken;
  Anchor?: AnchorComponentToken;
  Avatar?: AvatarComponentToken;
  BackTop?: BackTopComponentToken;
  Badge?: {};
  Button?: ButtonComponentToken;
  Breadcrumb?: {};
  Carousel?: CarouselComponentToken;
  Cascader?: CascaderComponentToken;
  Checkbox?: CheckboxComponentToken;
  Collapse?: {};
  DatePicker?: DatePickerComponentToken;
  Descriptions?: {};
  Divider?: DividerComponentToken;
  Drawer?: {};
  Dropdown?: DropdownComponentToken;
  Empty?: EmptyComponentToken;
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
  Tag?: {};
  Tree?: {};
  TreeSelect?: {};
  Typography?: TypographyComponentToken;
  Timeline?: TimelineComponentToken;
  Transfer?: TransferComponentToken;
  Tabs?: TabsComponentToken;
  Calendar?: CalendarComponentToken;
  Card?: {};
  Steps?: StepsComponentToken;
  Menu?: MenuComponentToken;
  Modal?: ModalComponentToken;
  Message?: MessageComponentToken;
  Upload?: UploadComponentToken;
  Tooltip?: TooltipComponentToken;
  Table?: TableComponentToken;
  Space?: SpaceComponentToken;
  Progress?: ProgressComponentToken;
}

/** Final token which contains the components level override */
export type GlobalToken = AliasToken & Omit<OverrideToken, 'derivative' | 'alias'>;

// ======================================================================
// ==                            Seed Token                            ==
// ======================================================================
// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥
export interface SeedToken extends PresetColorType {
  // Color
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;
  colorError: string;
  colorInfo: string;
  colorText: string;
  colorTextLightSolid: string;
  /** Base component background color. Will derivative container background color with this */
  colorBg: string;

  // Font
  fontFamily: string;
  fontSizeBase: number;

  // Grid
  gridUnit: number;
  gridBaseStep: number;

  // Line
  /** Border width of base components */
  lineWidth: number;
  lineType: string;

  // Motion
  motionUnit: number;
  motionBase: number;
  motionEaseOutCirc: string;
  motionEaseInOutCirc: string;
  motionEaseInOut: string;
  motionEaseOutBack: string;
  motionEaseInQuint: string;
  motionEaseOutQuint: string;
  motionEaseOut: string;

  // Radius
  radiusBase: number;

  // Size
  sizeUnit: number;
  sizeBaseStep: number;
  sizePopupArrow: number;

  // Control Base
  controlHeight: number;

  // zIndex
  /** Base zIndex of component like BackTop, Affix which can be cover by large popup */
  zIndexBase: number;
  /** Base popup component zIndex */
  zIndexPopupBase: number;

  // Image
  /** Define default Image opacity. Useful when in dark-like theme */
  opacityImage: number;
}

// ======================================================================
// ==                         Derivative Token                         ==
// ======================================================================
// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥
export interface DerivativeToken extends SeedToken, ColorPalettes {
  // Color
  /** Used for DefaultButton, Switch which has default outline */
  colorDefaultOutline: string;

  colorPrimaryHover: string;
  colorPrimaryActive: string;
  colorPrimaryOutline: string;
  colorPrimarySecondary: string; // primary[2]
  colorPrimaryBorderHover: string;

  colorSuccessSecondary: string;
  colorSuccessBg: string; // success[0]

  colorWarningHover: string;
  colorWarningActive: string;
  colorWarningOutline: string;
  colorWarningSecondary: string;
  colorWarningBg: string;

  colorErrorHover: string;
  colorErrorActive: string;
  colorErrorOutline: string;
  colorErrorSecondary: string;
  colorErrorBg: string;

  colorInfoSecondary: string;
  colorInfoBg: string;

  colorHighlight: string;

  // Font
  fontSizes: number[];
  lineHeights: number[];

  // Size
  sizeSpace: number;
  sizeSpaceXS: number;
  sizeSpaceXXS: number;
  sizeSpaceSM: number;

  // Grid
  gridSpaceSM: number;
  gridSpaceBase: number;
  gridSpaceLG: number;
  gridSpaceXL: number;
  gridSpaceXXL: number;

  // Line
  lineWidthBold: number;

  // Motion
  motionDurationFast: string;
  motionDurationMid: string;
  motionDurationSlow: string;

  // Radius
  radiusSM: number;
  radiusLG: number;
  radiusXL: number;

  // Control
  /** @private Only Used for control inside component like Multiple Select inner selection item */
  controlHeightXS: number;
  controlHeightSM: number;
  controlHeightLG: number;

  // Map Token
  bgColors: BgPalettes;
  textColors: TextAlphaPalettes;
}

// ======================================================================
// ==                           Alias Token                            ==
// ======================================================================
// FIXME: DerivativeToken should part pick
// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥
export interface AliasToken extends DerivativeToken {
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
  controlLineWidth: number;
  controlLineType: string;
  controlRadius: number;
  controlOutlineWidth: number;
  controlItemBgHover: string; // Note. It also is a color
  controlItemBgActive: string; // Note. It also is a color
  controlItemBgActiveHover: string; // Note. It also is a color
  controlInteractiveSize: number;
  controlItemBgActiveDisabled: string; // Note. It also is a color

  // Color
  colorBorder: string;
  colorSplit: string;
  colorTextSecondary: string;
  colorTextDisabled: string;
  /** Placeholder text color */
  colorTextPlaceholder: string;
  colorTextHeading: string;

  /** Weak action. Such as `allowClear` or Alert close button */
  colorAction: string;
  /** Weak action hover color. Such as `allowClear` or Alert close button */
  colorActionHover: string;
  colorActionTmp: string;

  colorLink: string;
  colorLinkHover: string;
  colorLinkActive: string;

  colorBgContainer: string;
  colorBgContainerSecondary: string;
  colorBgComponent: string;
  colorBgComponentSecondary: string;
  colorBgComponentDisabled: string;
  colorBgElevated: string;
  colorBgComponentTmp: string;

  // =============== Legacy: should be remove ===============
  opacityLoading: number;

  padding: number;
  margin: number;

  boxShadow: string;

  linkDecoration: React.CSSProperties['textDecoration'];
  linkHoverDecoration: React.CSSProperties['textDecoration'];
  linkFocusDecoration: React.CSSProperties['textDecoration'];

  controlPaddingHorizontal: number;
  controlPaddingHorizontalSM: number;

  paddingSM: number;
  paddingXS: number;
  paddingXXS: number;
  paddingLG: number;
  paddingXL: number;
  marginXXS: number;
  marginXS: number;
  marginSM: number;
  marginLG: number;
  marginXL: number;
  marginXXL: number;

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

  controlMaskBg: string;
  colorBorderSecondary: string;

  // FIXME: component box-shadow, should be removed
  boxShadowPopoverArrow: string;
  boxShadowPopoverArrowBottom: string;
  boxShadowSegmentedSelectedItem: string;
  boxShadowCard: string;
  boxShadowDrawerRight: string;
  boxShadowDrawerLeft: string;
  boxShadowDrawerUp: string;
  boxShadowDrawerDown: string;
  boxShadowTabsOverflowLeft: string;
  boxShadowTabsOverflowRight: string;
  boxShadowTabsOverflowTop: string;
  boxShadowTabsOverflowBottom: string;
}
