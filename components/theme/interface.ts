import type * as React from 'react';
import type { ComponentToken as AlertComponentToken } from '../alert/style';
import type { ComponentToken as AnchorComponentToken } from '../anchor/style';
import type { ComponentToken as AvatarComponentToken } from '../avatar/style';
import type { ComponentToken as BackTopComponentToken } from '../back-top/style';
import type { ComponentToken as ButtonComponentToken } from '../button/style';
import type { ComponentToken as CalendarComponentToken } from '../calendar/style';
import type { ComponentToken as CarouselComponentToken } from '../carousel/style';
import type { ComponentToken as CascaderComponentToken } from '../cascader/style';
import type { ComponentToken as CheckboxComponentToken } from '../checkbox/style';
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
import type { ComponentToken as TimelineComponentToken } from '../timeline/style';
import type { ComponentToken as TooltipComponentToken } from '../tooltip/style';
import type { ComponentToken as TransferComponentToken } from '../transfer/style';
import type { ComponentToken as TypographyComponentToken } from '../typography/style';
import type { ComponentToken as UploadComponentToken } from '../upload/style';

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
  Carousel?: CarouselComponentToken;
  Cascader?: CascaderComponentToken;
  Checkbox?: CheckboxComponentToken;
  Collapse?: {};
  DatePicker?: DatePickerComponentToken;
  Descriptions?: {};
  Divider?: DividerComponentToken;
  Drawer?: DrawerComponentToken;
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
  // Color
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;
  colorError: string;
  colorInfo: string;
  colorTextBase: string;
  colorTextLightSolid: string;
  /** Base component background color. Will derivative container background color with this */
  colorBgBase: string;

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

  // Wireframe
  wireframe: boolean;
}

export interface NeutralColorMapToken {
  // Base
  colorTextBase: string;
  colorBgBase: string;

  // Text
  colorText: string;
  colorTextSecondary: string;
  colorTextTertiary: string;
  colorTextQuaternary: string;

  // Fill
  colorFill: string;
  colorFillSecondary: string;
  colorFillTertiary: string;
  colorFillQuaternary: string;

  // Background
  colorBgContainer: string;
  colorBgElevated: string;
  colorBgLayout: string;
  colorBgSpotlight: string;

  // Border
  colorBorder: string;
  colorBorderSecondary: string;
}

export interface ColorMapToken extends NeutralColorMapToken {
  // Primary
  colorPrimaryBg: string; // 1
  colorPrimaryBgHover: string; // 2
  colorPrimaryBorder: string; // 3
  colorPrimaryBorderHover: string; // 4
  colorPrimaryHover: string; // 5
  colorPrimary: string; // 6
  colorPrimaryActive: string; // 7
  colorPrimaryTextHover: string; // 8
  colorPrimaryText: string; // 9
  colorPrimaryTextActive: string; // 10

  // Success
  colorSuccessBg: string; // 1
  colorSuccessBgHover: string; // 2
  colorSuccessBorder: string; // 3
  colorSuccessBorderHover: string; // 4
  colorSuccessHover: string; // 5
  colorSuccess: string; // 6
  colorSuccessActive: string; // 7
  colorSuccessTextHover: string; // 8
  colorSuccessText: string; // 9
  colorSuccessTextActive: string; // 10

  // Warning
  colorWarningBg: string; // 1
  colorWarningBgHover: string; // 2
  colorWarningBorder: string; // 3
  colorWarningBorderHover: string; // 4
  colorWarningHover: string; // 5
  colorWarning: string; // 6
  colorWarningActive: string; // 7
  colorWarningTextHover: string; // 8
  colorWarningText: string; // 9
  colorWarningTextActive: string; // 10

  // Error
  colorErrorBg: string; // 1
  colorErrorBgHover: string; // 2
  colorErrorBorder: string; // 3
  colorErrorBorderHover: string; // 4
  colorErrorHover: string; // 5
  colorError: string; // 6
  colorErrorActive: string; // 7
  colorErrorTextHover: string; // 8
  colorErrorText: string; // 9
  colorErrorTextActive: string; // 10

  // Info
  colorInfoBg: string; // 1
  colorInfoBgHover: string; // 2
  colorInfoBorder: string; // 3
  colorInfoBorderHover: string; // 4
  colorInfoHover: string; // 5
  colorInfo: string; // 6
  colorInfoActive: string; // 7
  colorInfoTextHover: string; // 8
  colorInfoText: string; // 9
  colorInfoTextActive: string; // 10

  colorBgMask: string;
}

export interface CommonMapToken {
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
  radiusXS: number;
  radiusSM: number;
  radiusLG: number;
  radiusOuter: number;

  // Control
  /** @private Only Used for control inside component like Multiple Select inner selection item */
  controlHeightXS: number;
  controlHeightSM: number;
  controlHeightLG: number;
}

// ======================================================================
// ==                         Map Token                         ==
// ======================================================================
// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥
export interface MapToken extends SeedToken, ColorPalettes, ColorMapToken, CommonMapToken {}

// ======================================================================
// ==                           Alias Token                            ==
// ======================================================================
// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥
export interface AliasToken extends MapToken {
  // Background
  colorFillSecondary: string;
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
  controlLineWidth: number;
  controlLineType: string;
  controlRadius: number;
  controlRadiusXS: number;
  controlRadiusSM: number;
  controlRadiusLG: number;
  controlOutlineWidth: number;
  controlItemBgHover: string; // Note. It also is a color
  controlItemBgActive: string; // Note. It also is a color
  controlItemBgActiveHover: string; // Note. It also is a color
  controlInteractiveSize: number;
  controlItemBgActiveDisabled: string; // Note. It also is a color

  // =============== Legacy: should be remove ===============
  opacityLoading: number;

  padding: number;
  margin: number;

  boxShadow: string;
  boxShadowSecondary: string;

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
  paddingTmp: number;
  marginXXS: number;
  marginXS: number;
  marginSM: number;
  marginLG: number;
  marginXL: number;
  marginXXL: number;
  marginTmp: number;

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
  boxShadowPopoverArrow: string;
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
