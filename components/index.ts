import getReactMajorVersion from './_util/getReactMajorVersionCanDelMe';
import warning from './_util/warning';

export type { Breakpoint } from './_util/responsiveObserver';
export type { GetProp, GetProps, GetRef } from './_util/type';
export { default as Affix } from './affix';
export type { AffixProps, AffixRef } from './affix';
export { default as Alert } from './alert';
export type {
  AlertProps,
  AlertSemanticClassNames,
  AlertSemanticName,
  AlertSemanticStyles,
  ErrorBoundaryProps,
} from './alert';
export { default as Anchor } from './anchor';
export type {
  AnchorLinkProps,
  AnchorProps,
  AnchorSemanticClassNames,
  AnchorSemanticName,
  AnchorSemanticStyles,
} from './anchor';
export { default as App } from './app';
export type { AppProps } from './app';
export { default as AutoComplete } from './auto-complete';
export type {
  AutoCompleteProps,
  AutoCompleteSemanticClassNames,
  AutoCompleteSemanticName,
  AutoCompleteSemanticStyles,
} from './auto-complete';
export { default as Avatar } from './avatar';
export type { AvatarProps } from './avatar';
export { default as BackTop } from './back-top';
export type { BackTopProps } from './back-top';
export { default as Badge } from './badge';
export type {
  BadgeProps,
  BadgeSemanticClassNames,
  BadgeSemanticName,
  BadgeSemanticStyles,
} from './badge';
export { default as Breadcrumb } from './breadcrumb';
export type {
  BreadcrumbItemProps,
  BreadcrumbProps,
  BreadcrumbSemanticClassNames,
  BreadcrumbSemanticName,
  BreadcrumbSemanticStyles,
} from './breadcrumb';
export { default as Button } from './button';
export type {
  ButtonProps,
  ButtonSemanticClassNames,
  ButtonSemanticName,
  ButtonSemanticStyles,
} from './button';
export { default as Calendar } from './calendar';
export type { CalendarMode, CalendarProps } from './calendar';
export { default as Card } from './card';
export type { CardProps } from './card';
export type { CardMetaProps } from './card/CardMeta';
export { default as Carousel } from './carousel';
export type { CarouselProps } from './carousel';
export { default as Cascader } from './cascader';
export type { CascaderAutoProps, CascaderProps } from './cascader';
export type { CascaderPanelAutoProps, CascaderPanelProps } from './cascader/Panel';
export { default as Checkbox } from './checkbox';
export type {
  CheckboxChangeEvent,
  CheckboxOptionType,
  CheckboxProps,
  CheckboxRef,
} from './checkbox';
export { default as Col } from './col';
export type { ColProps } from './col';
export { default as Collapse } from './collapse';
export type {
  CollapsePanelProps,
  CollapseProps,
  CollapseSemanticClassNames,
  CollapseSemanticName,
  CollapseSemanticStyles,
} from './collapse';
export { default as ColorPicker } from './color-picker';
export type {
  ColorPickerProps,
  ColorPickerSemanticClassNames,
  ColorPickerSemanticName,
  ColorPickerSemanticStyles,
} from './color-picker';
export { default as ConfigProvider } from './config-provider';
export type { ConfigProviderProps, ThemeConfig } from './config-provider';
export { default as DatePicker } from './date-picker';
export type {
  DatePickerPanelSemanticClassNames,
  DatePickerPanelSemanticName,
  DatePickerPanelSemanticStyles,
  DatePickerProps,
  DatePickerSemanticClassNames,
  DatePickerSemanticName,
  DatePickerSemanticStyles,
} from './date-picker';
export { default as Descriptions } from './descriptions';
export type {
  DescriptionsProps,
  DescriptionsSemanticClassNames,
  DescriptionsSemanticName,
  DescriptionsSemanticStyles,
} from './descriptions';
export { default as Divider } from './divider';
export type {
  DividerProps,
  DividerSemanticClassNames,
  DividerSemanticName,
  DividerSemanticStyles,
} from './divider';
export { default as Drawer } from './drawer';
export type {
  DrawerProps,
  DrawerSemanticClassNames,
  DrawerSemanticName,
  DrawerSemanticStyles,
} from './drawer';
export { default as Dropdown } from './dropdown';
export type {
  // typo, but we need to support it for backwards compatibility
  // https://github.com/ant-design/ant-design/pull/35161
  /** @deprecated Use `DropdownProps` instead. */
  DropdownProps as DropDownProps,
  DropdownProps,
  DropdownSemanticClassNames,
  DropdownSemanticName,
  DropdownSemanticStyles,
} from './dropdown';
export { default as Empty } from './empty';
export type {
  EmptyProps,
  EmptySemanticClassNames,
  EmptySemanticName,
  EmptySemanticStyles,
} from './empty';
export { default as Flex } from './flex';
export type { FlexProps } from './flex/interface';
export { default as FloatButton } from './float-button';
export type {
  FloatButtonGroupProps,
  FloatButtonGroupSemanticClassNames,
  FloatButtonGroupSemanticName,
  FloatButtonGroupSemanticStyles,
  FloatButtonProps,
  FloatButtonRef,
} from './float-button';
export { default as Form } from './form';
export type {
  FormInstance,
  FormItemProps,
  FormListFieldData,
  FormListOperation,
  FormProps,
  Rule as FormRule,
  FormSemanticClassNames,
  FormSemanticName,
  FormSemanticStyles,
} from './form';
export { default as Grid } from './grid';
export { default as Image } from './image';
export type {
  ImagePopupSemanticClassNames,
  ImagePopupSemanticName,
  ImagePopupSemanticStyles,
  ImageProps,
  ImageSemanticClassNames,
  ImageSemanticName,
  ImageSemanticStyles,
} from './image';
export { default as Input } from './input';
export type {
  InputProps,
  InputRef,
  InputSearchSemanticClassNames,
  InputSearchSemanticName,
  InputSearchSemanticStyles,
  InputSemanticClassNames,
  InputSemanticName,
  InputSemanticStyles,
  TextAreaSemanticClassNames,
  TextAreaSemanticName,
  TextAreaSemanticStyles,
} from './input';
export { default as InputNumber } from './input-number';
export type {
  InputNumberProps,
  InputNumberSemanticClassNames,
  InputNumberSemanticName,
  InputNumberSemanticStyles,
} from './input-number';
export { default as Layout } from './layout';
export type { LayoutProps, SiderProps } from './layout';
export { default as List } from './list';
export type {
  ListItemSemanticClassNames,
  ListItemSemanticName,
  ListItemSemanticStyles,
  ListProps,
} from './list';
export { default as Masonry } from './masonry';
export type {
  MasonryProps,
  MasonrySemanticClassNames,
  MasonrySemanticName,
  MasonrySemanticStyles,
} from './masonry';
export { default as Mentions } from './mentions';
export type {
  MentionProps,
  MentionSemanticClassNames,
  MentionSemanticName,
  MentionSemanticStyles,
  MentionsProps,
} from './mentions';
export { default as Menu } from './menu';
export type {
  MenuItemProps,
  MenuPopupSemanticClassNames,
  MenuPopupSemanticName,
  MenuPopupSemanticStyles,
  MenuProps,
  MenuRef,
  MenuSemanticClassNames,
  MenuSemanticName,
  MenuSemanticStyles,
  MenuTheme,
  SubMenuProps,
  SubMenuSemanticClassNames,
  SubMenuSemanticName,
  SubMenuSemanticStyles,
} from './menu';
export { default as message } from './message';
export type {
  ArgsProps as MessageArgsProps,
  MessageSemanticClassNames,
  MessageSemanticName,
  MessageSemanticStyles,
} from './message';
export { default as Modal } from './modal';
export type {
  ModalFuncProps,
  ModalLocale,
  ModalProps,
  ModalSemanticClassNames,
  ModalSemanticName,
  ModalSemanticStyles,
} from './modal';
export { default as notification } from './notification';
export type {
  ArgsProps as NotificationArgsProps,
  NotificationSemanticClassNames,
  NotificationSemanticName,
  NotificationSemanticStyles,
} from './notification';
export { default as Pagination } from './pagination';
export type {
  PaginationProps,
  PaginationSemanticClassNames,
  PaginationSemanticName,
  PaginationSemanticStyles,
} from './pagination';
export { default as Popconfirm } from './popconfirm';
export type {
  PopconfirmProps,
  PopconfirmSemanticClassNames,
  PopconfirmSemanticName,
  PopconfirmSemanticStyles,
} from './popconfirm';
export { default as Popover } from './popover';
export type {
  PopoverProps,
  PopoverSemanticClassNames,
  PopoverSemanticName,
  PopoverSemanticStyles,
} from './popover';
export { default as Progress } from './progress';
export type {
  ProgressProps,
  ProgressSemanticClassNames,
  ProgressSemanticName,
  ProgressSemanticStyles,
} from './progress';
export { default as QRCode } from './qr-code';
export type {
  QRCodeProps,
  QRCodeSemanticClassNames,
  QRCodeSemanticName,
  QRCodeSemanticStyles,
  QRPropsCanvas,
  QRPropsSvg,
} from './qr-code';
export { default as Radio } from './radio';
export type {
  RadioChangeEvent,
  RadioGroupProps,
  RadioProps,
  RadioSemanticClassNames,
  RadioSemanticName,
  RadioSemanticStyles,
} from './radio';
export { default as Rate } from './rate';
export type { RateProps } from './rate';
export { default as Result } from './result';
export type {
  ResultProps,
  ResultSemanticClassNames,
  ResultSemanticName,
  ResultSemanticStyles,
} from './result';
export { default as Row } from './row';
export type { RowProps } from './row';
export { default as Segmented } from './segmented';
export type {
  SegmentedProps,
  SegmentedSemanticClassNames,
  SegmentedSemanticName,
  SegmentedSemanticStyles,
} from './segmented';
export { default as Select } from './select';
export type {
  RefSelectProps,
  SelectPopupSemanticClassNames,
  SelectPopupSemanticName,
  SelectPopupSemanticStyles,
  SelectProps,
  SelectSemanticClassNames,
  SelectSemanticName,
  SelectSemanticStyles,
} from './select';
export { default as Skeleton } from './skeleton';
export type {
  SkeletonProps,
  SkeletonSemanticClassNames,
  SkeletonSemanticName,
  SkeletonSemanticStyles,
} from './skeleton';
export { default as Slider } from './slider';
export type {
  SliderSemanticClassNames,
  SliderSemanticName,
  SliderSemanticStyles,
  SliderSingleProps,
} from './slider';
export { default as Space } from './space';
export type {
  SpaceProps,
  SpaceSemanticClassNames,
  SpaceSemanticName,
  SpaceSemanticStyles,
} from './space';
export { default as Spin } from './spin';
export type {
  SpinProps,
  SpinSemanticClassNames,
  SpinSemanticName,
  SpinSemanticStyles,
} from './spin';
export { default as Splitter } from './splitter';
export type {
  SplitterProps,
  SplitterSemanticClassNames,
  SplitterSemanticName,
  SplitterSemanticStyles,
} from './splitter';
export { default as Statistic } from './statistic';
export type {
  CountdownProps,
  StatisticProps,
  StatisticSemanticClassNames,
  StatisticSemanticName,
  StatisticSemanticStyles,
  StatisticTimerProps,
} from './statistic';
export { default as Steps } from './steps';
export type {
  StepsProps,
  StepsSemanticClassNames,
  StepsSemanticName,
  StepsSemanticStyles,
} from './steps';
export { default as Switch } from './switch';
export type {
  SwitchProps,
  SwitchSemanticClassNames,
  SwitchSemanticName,
  SwitchSemanticStyles,
} from './switch';
export { default as Table } from './table';
export type {
  ComponentsSemantic,
  ComponentsSemanticClassNames,
  ComponentsSemanticStyles,
  ColumnGroupType as TableColumnGroupType,
  ColumnProps as TableColumnProps,
  ColumnsType as TableColumnsType,
  ColumnType as TableColumnType,
  TablePaginationConfig,
  TableProps,
  TableSemanticClassNames,
  TableSemanticName,
  TableSemanticStyles,
} from './table';
export { default as Tabs } from './tabs';
export type {
  TabPaneProps,
  TabsProps,
  TabsSemanticClassNames,
  TabsSemanticName,
  TabsSemanticStyles,
} from './tabs';
export { default as Tag } from './tag';
export type {
  TagProps,
  TagSemanticClassNames,
  TagSemanticName,
  TagSemanticStyles,
  TagType,
} from './tag';
export { default as theme } from './theme';
export type { GlobalToken, MappingAlgorithm } from './theme';
export { default as TimePicker } from './time-picker';
export type {
  TimePickerPanelSemanticClassNames,
  TimePickerPanelSemanticName,
  TimePickerPanelSemanticStyles,
  TimePickerProps,
  TimePickerSemanticClassNames,
  TimePickerSemanticName,
  TimePickerSemanticStyles,
  TimeRangePickerProps,
} from './time-picker';
export { default as Timeline } from './timeline';
export type {
  TimelineItemProps,
  TimelineProps,
  TimelineSemanticClassNames,
  TimelineSemanticName,
  TimelineSemanticStyles,
} from './timeline';
export { default as Tooltip } from './tooltip';
export type {
  TooltipProps,
  TooltipSemanticClassNames,
  TooltipSemanticName,
  TooltipSemanticStyles,
} from './tooltip';
export { default as Tour } from './tour';
export type {
  TourProps,
  TourSemanticClassNames,
  TourSemanticName,
  TourSemanticStyles,
  TourStepProps,
} from './tour';
export { default as Transfer } from './transfer';
export type {
  TransferProps,
  TransferSemanticClassNames,
  TransferSemanticName,
  TransferSemanticStyles,
} from './transfer';
export { default as Tree } from './tree';
export type {
  DataNode as TreeDataNode,
  AntTreeNodeProps as TreeNodeProps,
  TreeProps,
  TreeSemanticClassNames,
  TreeSemanticName,
  TreeSemanticStyles,
} from './tree';
export { default as TreeSelect } from './tree-select';
export type {
  TreeSelectPopupSemanticClassNames,
  TreeSelectPopupSemanticName,
  TreeSelectPopupSemanticStyles,
  TreeSelectProps,
  TreeSelectSemanticClassNames,
  TreeSelectSemanticName,
  TreeSelectSemanticStyles,
} from './tree-select';
export { default as Typography } from './typography';
export type { TypographyProps } from './typography';
export { default as Upload } from './upload';
export type {
  DraggerProps,
  UploadFile,
  UploadProps,
  UploadSemanticClassNames,
  UploadSemanticName,
  UploadSemanticStyles,
} from './upload';
export { default as version } from './version';
export { default as Watermark } from './watermark';
export type { WatermarkProps } from './watermark';

export const unstableSetRender: any = () => {
  warning(
    false,
    'compatible',
    "antd v6 support React 19 already, it's no need to call the compatible function or just remove `@ant-design/v5-patch-for-react-19`",
  );
};

// Warning if React is less than 18 (not include 18)
if (process.env.NODE_ENV !== 'production') {
  const majorVersion = getReactMajorVersion();
  warning(
    majorVersion >= 18,
    'version',
    `antd v6 no longer supports React versions below 18. Please upgrade to React 18 or higher.`,
  );
}
