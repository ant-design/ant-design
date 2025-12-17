import * as React from 'react';

import type { MaskType } from '../_util/hooks';
import type { AnyObject } from '../_util/type';
import type { WarningContextProps } from '../_util/warning';
import type { ShowWaveEffect } from '../_util/wave/interface';
import type { AlertProps } from '../alert';
import type { AnchorProps } from '../anchor';
import type { BadgeProps } from '../badge';
import type { RibbonProps } from '../badge/Ribbon';
import type { BreadcrumbProps } from '../breadcrumb';
import type { ButtonProps } from '../button';
import type { CalendarProps } from '../calendar';
import type { CardMetaProps, CardProps } from '../card';
import type { CascaderProps } from '../cascader';
import type { CheckboxProps } from '../checkbox';
import type { CollapseProps } from '../collapse';
import type { ColorPickerProps } from '../color-picker';
import type { DatePickerProps, RangePickerProps } from '../date-picker';
import type { DescriptionsProps } from '../descriptions';
import type { DividerProps } from '../divider';
import type { DrawerProps } from '../drawer';
import type { DropdownProps } from '../dropdown';
import type { EmptyProps } from '../empty';
import type { FlexProps } from '../flex/interface';
import type { FloatButtonGroupProps, FloatButtonProps } from '../float-button';
import type { FormProps } from '../form';
import type { ImageProps } from '../image';
import type { InputProps, SearchProps, TextAreaProps } from '../input';
import type { InputNumberProps } from '../input-number';
import type { OTPProps } from '../input/OTP';
import type { ListItemProps } from '../list';
import type { Locale } from '../locale';
import type { MasonryProps } from '../masonry';
import type { MentionsProps } from '../mentions';
import type { MenuProps } from '../menu';
import type { ArgsProps as MessageProps } from '../message';
import type { ModalProps } from '../modal';
import type { ArgsProps as NotificationProps } from '../notification';
import type { PaginationProps } from '../pagination';
import type { PopconfirmProps } from '../popconfirm';
import type { PopoverProps } from '../popover';
import type { ProgressProps } from '../progress';
import type { QRCodeProps } from '../qr-code';
import type { RadioProps } from '../radio';
import type { ResultProps } from '../result';
import type { SegmentedProps } from '../segmented';
import type { SelectProps } from '../select';
import type { SkeletonProps } from '../skeleton';
import type { SliderProps } from '../slider';
import type { SpaceProps } from '../space';
import type { SpinProps } from '../spin';
import type { SplitterProps } from '../splitter';
import type { StatisticProps } from '../statistic';
import type { StepsProps } from '../steps';
import type { SwitchProps } from '../switch';
import type { TableProps } from '../table';
import type { TabsProps } from '../tabs';
import type { TagProps } from '../tag';
import type { AliasToken, MappingAlgorithm, OverrideToken } from '../theme/interface';
import type { TimePickerProps } from '../time-picker';
import type { TimelineProps } from '../timeline';
import type { TooltipProps } from '../tooltip';
import type { TourProps } from '../tour/interface';
import type { TransferProps } from '../transfer';
import type { TreeProps } from '../tree';
import type { TreeSelectProps } from '../tree-select';
import type { UploadProps } from '../upload';
import type { RenderEmptyHandler } from './defaultRenderEmpty';

export const defaultPrefixCls = 'ant';

export const defaultIconPrefixCls = 'anticon';

export interface Theme {
  primaryColor?: string;
  infoColor?: string;
  successColor?: string;
  processingColor?: string;
  errorColor?: string;
  warningColor?: string;
}

export interface CSPConfig {
  nonce?: string;
}

export type DirectionType = 'ltr' | 'rtl' | undefined;

type ComponentsConfig = {
  [key in keyof OverrideToken]?: OverrideToken[key] & {
    algorithm?: boolean | MappingAlgorithm | MappingAlgorithm[];
  };
};

export interface ThemeConfig {
  /**
   * @descCN 用于修改 Design Token。
   * @descEN Modify Design Token.
   */
  token?: Partial<AliasToken>;
  /**
   * @descCN 用于修改各个组件的 Component Token 以及覆盖该组件消费的 Alias Token。
   * @descEN Modify Component Token and Alias Token applied to components.
   */
  components?: ComponentsConfig;
  /**
   * @descCN 用于修改 Seed Token 到 Map Token 的算法。
   * @descEN Modify the algorithms of theme.
   * @default defaultAlgorithm
   */
  algorithm?: MappingAlgorithm | MappingAlgorithm[];
  /**
   * @descCN 是否继承外层 `ConfigProvider` 中配置的主题。
   * @descEN Whether to inherit the theme configured in the outer layer `ConfigProvider`.
   * @default true
   */
  inherit?: boolean;
  /**
   * @descCN 是否开启 `hashed` 属性。如果你的应用中只存在一个版本的 antd，你可以设置为 `false` 来进一步减小样式体积。
   * @descEN Whether to enable the `hashed` attribute. If there is only one version of antd in your application, you can set `false` to reduce the bundle size.
   * @default true
   * @since 5.0.0
   */
  hashed?: boolean;
  /**
   * @descCN 通过 `cssVar` 配置来开启 CSS 变量模式，这个配置会被继承。
   * @descEN Enable CSS variable mode through `cssVar` configuration, This configuration will be inherited.
   * @default false
   * @since 5.12.0
   */
  cssVar?: {
    /**
     * @descCN css 变量的前缀
     * @descEN Prefix for css variable.
     * @default ant
     */
    prefix?: string;
    /**
     * @descCN 主题的唯一 key，版本低于 react@18 时需要手动设置。
     * @descEN Unique key for theme, should be set manually < react@18.
     */
    key?: string;
  };
  /**
   * @descCN 开启零运行时模式，不会在运行时产生样式，需要手动引入 CSS 文件。
   * @descEN Enable zero-runtime mode, which will not generate style at runtime, need to import additional CSS file.
   * @default true
   * @since 6.0.0
   * @example
   * ```tsx
   * import { ConfigProvider } from 'antd';
   * import 'antd/dist/antd.css';
   *
   * const Demo = () => (
   *   <ConfigProvider theme={{ zeroRuntime: true }}>
   *     <App />
   *   </ConfigProvider>
   *);
   * ```
   */
  zeroRuntime?: boolean;
}

export interface ComponentStyleConfig {
  className?: string;
  style?: React.CSSProperties;
}

export interface TableConfig<RecordType extends AnyObject = AnyObject>
  extends ComponentStyleConfig {
  expandable?: {
    expandIcon?: NonNullable<TableProps['expandable']>['expandIcon'];
  };
  rowKey?: TableProps<RecordType>['rowKey'];
  classNames?: TableProps['classNames'];
  styles?: TableProps['styles'];
}

export type ImageConfig = ComponentStyleConfig &
  Pick<ImageProps, 'classNames' | 'styles'> & {
    preview?: Partial<Record<'closeIcon', React.ReactNode>> &
      Pick<ImageProps, 'classNames' | 'styles'> & { mask?: MaskType };
    fallback?: string;
  };

export type CollapseConfig = ComponentStyleConfig &
  Pick<CollapseProps, 'expandIcon' | 'classNames' | 'styles'>;

export type CheckboxConfig = ComponentStyleConfig & Pick<CheckboxProps, 'classNames' | 'styles'>;

export type MasonryConfig = ComponentStyleConfig & Pick<MasonryProps, 'classNames' | 'styles'>;

export type MenuConfig = ComponentStyleConfig &
  Pick<MenuProps, 'expandIcon' | 'classNames' | 'styles'>;

export type TourConfig = ComponentStyleConfig &
  Pick<TourProps, 'closeIcon' | 'classNames' | 'styles'>;

export type DescriptionsConfig = ComponentStyleConfig &
  Pick<DescriptionsProps, 'classNames' | 'styles'>;

export type EmptyConfig = ComponentStyleConfig &
  Pick<EmptyProps, 'classNames' | 'styles' | 'image'>;

export type ModalConfig = ComponentStyleConfig &
  Pick<
    ModalProps,
    | 'classNames'
    | 'styles'
    | 'closeIcon'
    | 'closable'
    | 'centered'
    | 'okButtonProps'
    | 'cancelButtonProps'
    | 'mask'
  >;

export type TabsConfig = ComponentStyleConfig &
  Pick<
    TabsProps,
    | 'indicator'
    | 'indicatorSize'
    | 'more'
    | 'moreIcon'
    | 'addIcon'
    | 'removeIcon'
    | 'classNames'
    | 'styles'
  >;

export type AnchorStyleConfig = ComponentStyleConfig & Pick<AnchorProps, 'classNames' | 'styles'>;

export type AlertConfig = ComponentStyleConfig &
  Pick<AlertProps, 'closable' | 'closeIcon' | 'classNames' | 'styles'>;

export type BadgeConfig = ComponentStyleConfig & Pick<BadgeProps, 'classNames' | 'styles'>;

export type BreadcrumbConfig = ComponentStyleConfig &
  Pick<BreadcrumbProps, 'classNames' | 'styles' | 'separator' | 'dropdownIcon'>;

export type InputConfig = ComponentStyleConfig &
  Pick<InputProps, 'autoComplete' | 'classNames' | 'styles' | 'allowClear' | 'variant'>;

export type InputSearchConfig = ComponentStyleConfig & Pick<SearchProps, 'classNames' | 'styles'>;

export type TextAreaConfig = ComponentStyleConfig &
  Pick<TextAreaProps, 'autoComplete' | 'classNames' | 'styles' | 'allowClear' | 'variant'>;

export type OTPConfig = ComponentStyleConfig & Pick<OTPProps, 'classNames' | 'styles'>;

export type ButtonConfig = ComponentStyleConfig &
  Pick<ButtonProps, 'classNames' | 'styles' | 'autoInsertSpace' | 'variant' | 'color' | 'shape'>;

export type MessageConfig = ComponentStyleConfig & Pick<MessageProps, 'classNames' | 'styles'>;

export type NotificationConfig = ComponentStyleConfig &
  Pick<NotificationProps, 'closeIcon' | 'classNames' | 'styles'>;

export type TagConfig = ComponentStyleConfig &
  Pick<TagProps, 'variant' | 'closeIcon' | 'closable' | 'classNames' | 'styles'>;

export type CardConfig = ComponentStyleConfig &
  Pick<CardProps, 'classNames' | 'styles' | 'variant'>;

export type ColorPickerConfig = ComponentStyleConfig &
  Pick<ColorPickerProps, 'classNames' | 'styles'>;

export type CalendarConfig = ComponentStyleConfig &
  Pick<CalendarProps<AnyObject>, 'classNames' | 'styles'>;

export type CardMetaConfig = ComponentStyleConfig & Pick<CardMetaProps, 'classNames' | 'styles'>;

export type DrawerConfig = ComponentStyleConfig &
  Pick<DrawerProps, 'classNames' | 'styles' | 'closeIcon' | 'closable' | 'mask'>;

export type DividerConfig = ComponentStyleConfig & Pick<DividerProps, 'classNames' | 'styles'>;

export type DropdownConfig = ComponentStyleConfig & Pick<DropdownProps, 'classNames' | 'styles'>;

export type FlexConfig = ComponentStyleConfig & Pick<FlexProps, 'vertical'>;

export type TransferConfig = ComponentStyleConfig &
  Pick<TransferProps, 'selectionsIcon' | 'classNames' | 'styles'>;

export type FormConfig = ComponentStyleConfig &
  Pick<
    FormProps,
    | 'requiredMark'
    | 'colon'
    | 'scrollToFirstError'
    | 'validateMessages'
    | 'variant'
    | 'classNames'
    | 'styles'
  >;

export type FloatButtonConfig = ComponentStyleConfig &
  Pick<FloatButtonProps, 'classNames' | 'styles'> & {
    backTopIcon?: React.ReactNode;
  };

export type FloatButtonGroupConfig = ComponentStyleConfig &
  Pick<FloatButtonGroupProps, 'closeIcon' | 'classNames' | 'styles'>;

export type PaginationConfig = ComponentStyleConfig &
  Pick<PaginationProps, 'showSizeChanger' | 'classNames' | 'styles'>;

export type ProgressConfig = ComponentStyleConfig & Pick<ProgressProps, 'classNames' | 'styles'>;

export type SelectConfig = ComponentStyleConfig &
  Pick<SelectProps, 'showSearch' | 'variant' | 'classNames' | 'styles'>;

export type SpaceConfig = ComponentStyleConfig & Pick<SpaceProps, 'size' | 'classNames' | 'styles'>;

export type TooltipConfig = Pick<
  TooltipProps,
  'className' | 'style' | 'styles' | 'classNames' | 'arrow' | 'trigger'
> & {
  /**
   * @descCN 是否开启 Tooltip 流畅过渡动画
   * @descEN Whether to enable smooth transition for tooltips
   * @default false
   */
  unique?: boolean;
};

export type PopoverConfig = Pick<
  PopoverProps,
  'className' | 'style' | 'styles' | 'classNames' | 'arrow' | 'trigger'
>;

export type PopconfirmConfig = Pick<
  PopconfirmProps,
  'className' | 'style' | 'styles' | 'classNames' | 'arrow' | 'trigger'
>;

export type QRcodeConfig = ComponentStyleConfig & Pick<QRCodeProps, 'classNames' | 'styles'>;

export type SliderConfig = ComponentStyleConfig & Pick<SliderProps, 'styles' | 'classNames'>;

export type SkeletonConfig = ComponentStyleConfig & Pick<SkeletonProps, 'styles' | 'classNames'>;

export type SegmentedConfig = ComponentStyleConfig & Pick<SegmentedProps, 'classNames' | 'styles'>;

export type StepsConfig = ComponentStyleConfig & Pick<StepsProps, 'classNames' | 'styles'>;

export type SpinConfig = ComponentStyleConfig &
  Pick<SpinProps, 'indicator' | 'classNames' | 'styles'>;

export type StatisticConfig = ComponentStyleConfig & Pick<StatisticProps, 'classNames' | 'styles'>;

export type SwitchStyleConfig = ComponentStyleConfig & Pick<SwitchProps, 'classNames' | 'styles'>;

export type ResultConfig = ComponentStyleConfig & Pick<ResultProps, 'classNames' | 'styles'>;

export type RadioConfig = ComponentStyleConfig & Pick<RadioProps, 'classNames' | 'styles'>;

export type InputNumberConfig = ComponentStyleConfig &
  Pick<InputNumberProps, 'variant' | 'classNames' | 'styles'>;

export type CascaderConfig = ComponentStyleConfig &
  Pick<CascaderProps, 'variant' | 'styles' | 'classNames'>;

export type TreeSelectConfig = ComponentStyleConfig &
  Pick<TreeSelectProps, 'variant' | 'classNames' | 'styles' | 'switcherIcon'>;

export type TreeConfig = ComponentStyleConfig & Pick<TreeProps, 'classNames' | 'styles'>;

export type DatePickerConfig = ComponentStyleConfig &
  Pick<DatePickerProps, 'variant' | 'classNames' | 'styles'>;

export type RangePickerConfig = ComponentStyleConfig & Pick<RangePickerProps, 'variant'>;

export type TimePickerConfig = ComponentStyleConfig &
  Pick<TimePickerProps, 'variant' | 'classNames' | 'styles'>;

export type TimelineConfig = ComponentStyleConfig & Pick<TimelineProps, 'classNames' | 'styles'>;

export type MentionsConfig = ComponentStyleConfig &
  Pick<MentionsProps, 'variant' | 'classNames' | 'styles'>;

export type UploadConfig = ComponentStyleConfig &
  Pick<UploadProps, 'classNames' | 'styles' | 'customRequest'>;

export type RibbonConfig = ComponentStyleConfig & Pick<RibbonProps, 'classNames' | 'styles'>;

export type PopupOverflow = 'viewport' | 'scroll';

export interface ListConfig extends ComponentStyleConfig {
  item?: Pick<ListItemProps, 'classNames' | 'styles'>;
}

export const Variants = ['outlined', 'borderless', 'filled', 'underlined'] as const;

export type Variant = (typeof Variants)[number];

export interface WaveConfig {
  /**
   * @descCN 是否禁用水波纹效果。
   * @descEN Whether to disable wave effect.
   * @default false
   */
  disabled?: boolean;
  /**
   * @descCN 自定义水波纹效果。
   * @descEN Customized wave effect.
   */
  showEffect?: ShowWaveEffect;
}

export interface ConfigComponentProps {
  input?: InputConfig;
  inputSearch?: InputSearchConfig;
  textArea?: TextAreaConfig;
  otp?: OTPConfig;
  inputNumber?: InputNumberConfig;
  pagination?: PaginationConfig;
  space?: SpaceConfig;
  splitter?: ComponentStyleConfig & Pick<SplitterProps, 'classNames' | 'styles'>;
  form?: FormConfig;
  select?: SelectConfig;
  alert?: AlertConfig;
  affix?: ComponentStyleConfig;
  anchor?: AnchorStyleConfig;
  button?: ButtonConfig;
  divider?: DividerConfig;
  drawer?: DrawerConfig;
  calendar?: CalendarConfig;
  carousel?: ComponentStyleConfig;
  cascader?: CascaderConfig;
  treeSelect?: TreeSelectConfig;
  collapse?: CollapseConfig;
  floatButton?: FloatButtonConfig;
  floatButtonGroup?: FloatButtonGroupConfig;
  typography?: ComponentStyleConfig;
  skeleton?: SkeletonConfig;
  spin?: SpinConfig;
  segmented?: SegmentedConfig;
  steps?: StepsConfig;
  statistic?: StatisticConfig;
  image?: ImageConfig;
  layout?: ComponentStyleConfig;
  list?: ListConfig;
  mentions?: MentionsConfig;
  modal?: ModalConfig;
  progress?: ProgressConfig;
  result?: ResultConfig;
  slider?: SliderConfig;
  breadcrumb?: BreadcrumbConfig;
  masonry?: MasonryConfig;
  menu?: MenuConfig;
  checkbox?: CheckboxConfig;
  descriptions?: DescriptionsConfig;
  empty?: EmptyConfig;
  badge?: BadgeConfig;
  radio?: RadioConfig;
  rate?: ComponentStyleConfig;
  switch?: SwitchStyleConfig;
  transfer?: TransferConfig;
  avatar?: ComponentStyleConfig;
  message?: MessageConfig;
  tag?: TagConfig;
  table?: TableConfig;
  card?: CardConfig;
  cardMeta?: CardMetaConfig;
  tabs?: TabsConfig;
  timeline?: TimelineConfig;
  timePicker?: TimePickerConfig;
  tour?: TourConfig;
  tooltip?: TooltipConfig;
  popover?: PopoverConfig;
  popconfirm?: PopconfirmConfig;
  upload?: UploadConfig;
  notification?: NotificationConfig;
  tree?: TreeConfig;
  colorPicker?: ColorPickerConfig;
  datePicker?: DatePickerConfig;
  rangePicker?: RangePickerConfig;
  ribbon?: RibbonConfig;
  dropdown?: DropdownConfig;
  flex?: FlexConfig;
  wave?: WaveConfig;
  qrcode?: QRcodeConfig;
  watermark?: ComponentStyleConfig;
}

export interface ConfigConsumerProps extends ConfigComponentProps {
  getTargetContainer?: () => HTMLElement | Window;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  rootPrefixCls?: string;
  iconPrefixCls: string;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  renderEmpty?: RenderEmptyHandler;
  /**
   * @descCN 设置 [Content Security Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP) 配置。
   * @descEN Set the [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) config.
   */
  csp?: CSPConfig;
  /** @deprecated Please use `{ button: { autoInsertSpace: boolean }}` instead */
  autoInsertSpaceInButton?: boolean;
  variant?: Variant;
  virtual?: boolean;
  locale?: Locale;
  direction?: DirectionType;
  popupMatchSelectWidth?: boolean;
  popupOverflow?: PopupOverflow;
  theme?: ThemeConfig;
  warning?: WarningContextProps;
}

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) {
    return customizePrefixCls;
  }
  return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls;
};

// zombieJ: 🚨 Do not pass `defaultRenderEmpty` here since it will cause circular dependency.
export const ConfigContext = React.createContext<ConfigConsumerProps>({
  // We provide a default function for Context without provider
  getPrefixCls: defaultGetPrefixCls,
  iconPrefixCls: defaultIconPrefixCls,
});

export const { Consumer: ConfigConsumer } = ConfigContext;

const EMPTY_OBJECT = {};

type GetClassNamesOrEmptyObject<Config extends { classNames?: any }> = Config extends {
  classNames?: infer ClassNames;
}
  ? ClassNames
  : object;

type GetStylesOrEmptyObject<Config extends { styles?: any }> = Config extends {
  styles?: infer Styles;
}
  ? Styles
  : object;

type ComponentReturnType<T extends keyof ConfigComponentProps> = Omit<
  NonNullable<ConfigComponentProps[T]>,
  'classNames' | 'styles'
> & {
  classNames: GetClassNamesOrEmptyObject<NonNullable<ConfigComponentProps[T]>>;
  styles: GetStylesOrEmptyObject<NonNullable<ConfigComponentProps[T]>>;
  getPrefixCls: ConfigConsumerProps['getPrefixCls'];
  direction: ConfigConsumerProps['direction'];
  getPopupContainer: ConfigConsumerProps['getPopupContainer'];
  renderEmpty: ConfigConsumerProps['renderEmpty'];
};

/**
 * Get ConfigProvider configured component props.
 * This help to reduce bundle size for saving `?.` operator.
 * Do not use as `useMemo` deps since we do not cache the object here.
 *
 * NOTE: not refactor this with `useMemo` since memo will cost another memory space,
 * which will waste both compare calculation & memory.
 */
export function useComponentConfig<T extends keyof ConfigComponentProps>(propName: T) {
  const context = React.useContext(ConfigContext);
  const { getPrefixCls, direction, getPopupContainer, renderEmpty } = context;

  const propValue = context[propName];
  return {
    classNames: EMPTY_OBJECT,
    styles: EMPTY_OBJECT,
    ...propValue,
    getPrefixCls,
    direction,
    getPopupContainer,
    renderEmpty,
  } as ComponentReturnType<T>;
}
