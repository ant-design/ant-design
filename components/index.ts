import getReactMajorVersion from './_util/getReactMajorVersionCanDelMe';
import warning from './_util/warning';

export type { Breakpoint } from './_util/responsiveObserver';
export type { GetProp, GetProps, GetRef } from './_util/type';
export { default as Affix } from './affix';
export type { AffixProps, AffixRef } from './affix';
export { default as Alert } from './alert';
export type { AlertProps, AlertSemanticAllType, ErrorBoundaryProps } from './alert';
export { default as Anchor } from './anchor';
export type { AnchorLinkProps, AnchorProps, AnchorSemanticAllType } from './anchor';
export { default as App } from './app';
export type { AppProps } from './app';
export { default as AutoComplete } from './auto-complete';
export type { AutoCompleteProps, AutoCompleteSemanticAllType } from './auto-complete';
export { default as Avatar } from './avatar';
export type { AvatarProps } from './avatar';
export { default as BackTop } from './back-top';
export type { BackTopProps } from './back-top';
export { default as Badge } from './badge';
export type { BadgeProps, BadgeSemanticAllType, RibbonSemanticAllType } from './badge';
export { default as Breadcrumb } from './breadcrumb';
export type { BreadcrumbItemProps, BreadcrumbProps, BreadcrumbSemanticAllType } from './breadcrumb';
export { default as Button } from './button';
export type { ButtonProps, ButtonSemanticAllType } from './button';
export { default as Calendar } from './calendar';
export type { CalendarMode, CalendarProps, CalendarSemanticAllType } from './calendar';
export { default as Card } from './card';
export type { CardMetaSemanticAllType, CardProps, CardSemanticAllType } from './card';
export type { CardMetaProps } from './card/CardMeta';
export { default as Carousel } from './carousel';
export type { CarouselProps } from './carousel';
export { default as Cascader } from './cascader';
export type { CascaderAutoProps, CascaderProps, CascaderSemanticAllType } from './cascader';
export type { CascaderPanelAutoProps, CascaderPanelProps } from './cascader/Panel';
export { default as Checkbox } from './checkbox';
export type {
  CheckboxChangeEvent,
  CheckboxOptionType,
  CheckboxProps,
  CheckboxRef,
  CheckboxSemanticAllType,
} from './checkbox';
export { default as Col } from './col';
export type { ColProps } from './col';
export { default as Collapse } from './collapse';
export type { CollapsePanelProps, CollapseProps, CollapseSemanticAllType } from './collapse';
export { default as ColorPicker } from './color-picker';
export type { ColorPickerProps, ColorPickerSemanticAllType } from './color-picker';
export { default as ConfigProvider } from './config-provider';
export type { ConfigProviderProps, ThemeConfig } from './config-provider';
export { default as DatePicker } from './date-picker';
export type { DatePickerProps, DatePickerSemanticType } from './date-picker';
export { default as Descriptions } from './descriptions';
export type { DescriptionsProps, DescriptionsSemanticAllType } from './descriptions';
export { default as Divider } from './divider';
export type { DividerProps, DividerSemanticAllType } from './divider';
export { default as Drawer } from './drawer';
export type { DrawerProps, DrawerSemanticAllType } from './drawer';
export { default as Dropdown } from './dropdown';
export type {
  // typo, but we need to support it for backwards compatibility
  // https://github.com/ant-design/ant-design/pull/35161
  /** @deprecated Use `DropdownProps` instead. */
  DropdownProps as DropDownProps,
  DropdownProps,
  DropdownSemanticAllType,
} from './dropdown';
export { default as Empty } from './empty';
export type { EmptyProps, EmptySemanticAllType } from './empty';
export { default as Flex } from './flex';
export type { FlexProps } from './flex/interface';
export { default as FloatButton } from './float-button';
export type {
  FloatButtonGroupProps,
  FloatButtonGroupSemanticAllType,
  FloatButtonProps,
  FloatButtonRef,
  FloatButtonSemanticAllType,
} from './float-button';
export { default as Form } from './form';
export type {
  FormInstance,
  FormItemProps,
  FormListFieldData,
  FormListOperation,
  FormProps,
  Rule as FormRule,
  FormSemanticAllType,
} from './form';
export { default as Grid } from './grid';
export { default as Image } from './image';
export type { ImageProps, ImageSemanticAllType } from './image';
export { default as Input } from './input';
export type {
  InputProps,
  InputRef,
  InputSearchSemanticAllType,
  InputSemanticAllType,
  OTPSemanticAllType,
  TextAreaSemanticAllType,
} from './input';
export { default as InputNumber } from './input-number';
export type { InputNumberProps, InputNumberSemanticAllType } from './input-number';
export { default as Layout } from './layout';
export type { LayoutProps, SiderProps } from './layout';
export { default as List } from './list';
export type { ListProps } from './list';
export { default as Masonry } from './masonry';
export type { MasonryProps, MasonrySemanticAllType } from './masonry';
export { default as Mentions } from './mentions';
export type { MentionProps, MentionSemanticAllType, MentionsProps } from './mentions';
export { default as Menu } from './menu';

export type {
  MenuItemProps,
  MenuProps,
  MenuRef,
  MenuSemanticAllType,
  MenuTheme,
  SubMenuProps,
} from './menu';
export { default as message } from './message';
export type { ArgsProps as MessageArgsProps, MessageSemanticAllType } from './message';
export { default as Modal } from './modal';
export type { ModalFuncProps, ModalLocale, ModalProps, ModalSemanticAllType } from './modal';
export { default as notification } from './notification';
export type {
  ArgsProps as NotificationArgsProps,
  NotificationSemanticAllType,
} from './notification';
export { default as Pagination } from './pagination';
export type { PaginationProps, PaginationSemanticAllType } from './pagination';
export { default as Popconfirm } from './popconfirm';
export type { PopconfirmProps, PopconfirmSemanticAllType } from './popconfirm';
export { default as Popover } from './popover';
export type { PopoverProps, PopoverSemanticAllType } from './popover';
export { default as Progress } from './progress';
export type { ProgressProps, ProgressSemanticAllType } from './progress';
export { default as QRCode } from './qr-code';
export type {
  QRCodeProps,
  QRCodeSemanticAllType,
  QRPropsCanvas,
  QRPropsSvg,
} from './qr-code/interface';
export { default as Radio } from './radio';
export type { RadioChangeEvent, RadioGroupProps, RadioProps, RadioSemanticAllType } from './radio';
export { default as Rate } from './rate';
export type { RateProps } from './rate';
export { default as Result } from './result';
export type { ResultProps, ResultSemanticAllType } from './result';
export { default as Row } from './row';
export type { RowProps } from './row';
export { default as Segmented } from './segmented';
export type { SegmentedProps, SegmentedSemanticAllType } from './segmented';
export { default as Select } from './select';
export type { RefSelectProps, SelectProps, SelectSemanticAllType } from './select';
export { default as Skeleton } from './skeleton';
export type { SkeletonProps, SkeletonSemanticAllType } from './skeleton';
export { default as Slider } from './slider';
export type { SliderSemanticAllType, SliderSingleProps } from './slider';
export { default as Space } from './space';
export type { SpaceProps, SpaceSemanticAllType } from './space';
export { default as Spin } from './spin';
export type { SpinProps, SpinSemanticAllType } from './spin';
export { default as Splitter } from './splitter';
export type { SplitterProps, SplitterSemanticAllType } from './splitter';
export { default as Statistic } from './statistic';
export type {
  CountdownProps,
  StatisticProps,
  StatisticSemanticAllType,
  StatisticTimerProps,
} from './statistic';
export { default as Steps } from './steps';
export type { StepsProps, StepsSemanticAllType } from './steps';
export { default as Switch } from './switch';
export type { SwitchProps, SwitchSemanticAllType } from './switch';
export { default as Table } from './table';
export type {
  ColumnGroupType as TableColumnGroupType,
  ColumnProps as TableColumnProps,
  ColumnsType as TableColumnsType,
  ColumnType as TableColumnType,
  TablePaginationConfig,
  TableProps,
  TableSemanticAllType,
} from './table';
export { default as Tabs } from './tabs';
export type { TabPaneProps, TabsProps, TabsSemanticAllType } from './tabs';
export { default as Tag } from './tag';
export type {
  CheckableTagGroupSemanticAllType,
  TagProps,
  TagSemanticAllType,
  TagType,
} from './tag';
export { default as theme } from './theme';
export type { GlobalToken, MappingAlgorithm } from './theme';
export { default as TimePicker } from './time-picker';
export type {
  TimePickerProps,
  TimePickerSemanticAllType,
  TimeRangePickerProps,
} from './time-picker';
export { default as Timeline } from './timeline';
export type { TimelineItemProps, TimelineProps, TimelineSemanticAllType } from './timeline';
export { default as Tooltip } from './tooltip';
export type { TooltipProps, TooltipSemanticAllType } from './tooltip';
export { default as Tour } from './tour';
export type { TourProps, TourSemanticAllType, TourStepProps } from './tour/interface';
export { default as Transfer } from './transfer';
export type { TransferProps, TransferSemanticAllType } from './transfer';
export { default as Tree } from './tree';
export type {
  DataNode as TreeDataNode,
  AntTreeNodeProps as TreeNodeProps,
  TreeProps,
  TreeSemanticAllType,
} from './tree';
export { default as TreeSelect } from './tree-select';
export type { TreeSelectProps, TreeSelectSemanticAllType } from './tree-select';
export { default as Typography } from './typography';
export type { TypographyProps } from './typography';
export { default as Upload } from './upload';
export type { DraggerProps, UploadFile, UploadProps, UploadSemanticAllType } from './upload';
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
