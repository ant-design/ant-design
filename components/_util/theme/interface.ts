import type * as React from 'react';
import type { ComponentToken as ButtonComponentToken } from '../../button/style';
import type { ComponentToken as DividerComponentToken } from '../../divider/style';
import type { ComponentToken as DropdownComponentToken } from '../../dropdown/style';
import type { ComponentToken as EmptyComponentToken } from '../../empty/style';
import type { ComponentToken as CascaderComponentToken } from '../../cascader/style';
import type { ComponentToken as InputNumberComponentToken } from '../../input-number/style';
import type { ComponentToken as MentionsComponentToken } from '../../mentions/style';
import type { ComponentToken as SelectComponentToken } from '../../select/style';
import type { ComponentToken as SliderComponentToken } from '../../slider/style';
import type { ComponentToken as TypographyComponentToken } from '../../typography/style';
import type { ComponentToken as BackTopComponentToken } from '../../back-top/style';
import type { ComponentToken as DatePickerComponentToken } from '../../date-picker/style';
import type { ComponentToken as TimelineComponentToken } from '../../timeline/style';
import type { ComponentToken as MenuComponentToken } from '../../menu/style';
import type { ComponentToken as CarouselComponentToken } from '../../carousel/style';

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
  derivative?: Partial<DerivativeToken & AliasToken>;

  // Customize component
  Affix?: {};
  Alert?: {};
  Avatar?: {};
  BackTop?: BackTopComponentToken;
  Badge?: {};
  Button?: ButtonComponentToken;
  Carousel?: CarouselComponentToken;
  Cascader?: CascaderComponentToken;
  Checkbox?: {};
  DatePicker?: DatePickerComponentToken;
  Descriptions?: {};
  Divider?: DividerComponentToken;
  Drawer?: {};
  Dropdown?: DropdownComponentToken;
  Empty?: EmptyComponentToken;
  Form?: {};
  Grid?: {};
  Image?: {};
  Input?: {};
  InputNumber?: InputNumberComponentToken;
  List?: {};
  Mentions?: MentionsComponentToken;
  Pagination?: {};
  Popover?: {};
  Rate?: {};
  Result?: {};
  Select?: SelectComponentToken;
  Skeleton?: {};
  Slider?: SliderComponentToken;
  Spin?: {};
  Statistic?: {};
  Switch?: {};
  Tag?: {};
  Tree?: {};
  TreeSelect?: {};
  Typography?: TypographyComponentToken;
  Timeline?: TimelineComponentToken;
  Tabs?: {};
  Card?: {};
  Steps?: {};
  Menu?: MenuComponentToken;
  Layout?: {};
}

/** Final token which contains the components level override */
export type GlobalToken = AliasToken & Omit<OverrideToken, 'derivative'>;

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

  // Motion
  motionUnit: number;
  motionBase: number;
  motionEaseInOutCirc: string;
  motionEaseInOut: string;
  motionEaseOutBack: string;
  motionEaseInQuint: string;
  motionEaseOutQuint: string;

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
  zIndexPopup: number;
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

  colorSuccessSecondary: string;
  colorBgSuccess: string; // success[0]

  colorWarningHover: string;
  colorWarningActive: string;
  colorWarningOutline: string;
  colorWarningSecondary: string;
  colorBgWarning: string;

  colorErrorHover: string;
  colorErrorActive: string;
  colorErrorOutline: string;
  colorErrorSecondary: string;
  colorBgError: string;

  colorInfoSecondary: string;
  colorBgInfo: string;

  colorText2: string;
  colorTextBelow: string;
  colorTextBelow2: string;
  colorTextBelow3: string;

  colorBg2: string;
  colorBg3: string;
  colorBgBelow: string;
  colorBgBelow2: string;

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
}

// ======================================================================
// ==                           Alias Token                            ==
// ======================================================================
// FIXME: DerivativeToken should part pick
type OmitDerivativeKey =
  | 'colorText2'
  | 'colorTextBelow'
  | 'colorTextBelow2'
  | 'colorTextBelow3'
  | 'colorBg2'
  | 'colorBgBelow'
  | 'colorBgBelow2';

// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥
export interface AliasToken extends Omit<DerivativeToken, OmitDerivativeKey> {
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

  // Color
  colorBorder: string;
  colorSplit: string;
  colorTextSecondary: string;
  colorTextDisabled: string;
  /** Placeholder text color */
  colorPlaceholder: string;
  colorTextHeading: string;

  /** Weak action. Such as `allowClear` or Alert close button */
  colorAction: string;
  /** Weak action hover color. Such as `allowClear` or Alert close button */
  colorActionHover: string;

  colorLink: string;
  colorLinkHover: string;
  colorLinkActive: string;

  colorBgContainer: string;
  colorBgContainerSecondary: string;
  colorBgComponent: string;
  colorBgComponentSecondary: string;
  colorBgComponentDisabled: string;

  // =============== Legacy: should be remove ===============
  colorLoadingOpacity: number;

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
  marginXS: number;
  marginSM: number;
  marginLG: number;
  marginXXS: number;

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

  motionEaseOut: string;
}
