/* @remove-on-es-build-begin */
// this file is not used if use https://github.com/ant-design/babel-plugin-import
const ENV = process.env.NODE_ENV;
if (
  ENV !== 'production' &&
  ENV !== 'test' &&
  typeof console !== 'undefined' &&
  console.warn && // eslint-disable-line no-console
  typeof window !== 'undefined'
) {
  // eslint-disable-next-line no-console
  console.warn(
    'You are using a whole package of antd, ' +
      'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
  );
}
/* @remove-on-es-build-end */

export type { AffixProps } from './affix';
export { default as Affix } from './affix';

export type { AnchorProps, AnchorLinkProps } from './anchor';
export { default as Anchor } from './anchor';

export type { AutoCompleteProps } from './auto-complete';
export { default as AutoComplete } from './auto-complete';

export type { AlertProps } from './alert';
export { default as Alert } from './alert';

export type { AvatarProps } from './avatar';
export { default as Avatar } from './avatar';

export type { BackTopProps } from './back-top';
export { default as BackTop } from './back-top';

export type { BadgeProps } from './badge';
export { default as Badge } from './badge';

export type { BreadcrumbProps, BreadcrumbItemProps } from './breadcrumb';
export { default as Breadcrumb } from './breadcrumb';

export type { ButtonProps } from './button';
export { default as Button } from './button';

export type { CalendarProps } from './calendar';
export { default as Calendar } from './calendar';

export type { CardProps } from './card';
export { default as Card } from './card';

export type { CollapseProps, CollapsePanelProps } from './collapse';
export { default as Collapse } from './collapse';

export type { CarouselProps } from './carousel';
export { default as Carousel } from './carousel';

export type { CascaderProps } from './cascader';
export { default as Cascader } from './cascader';

export type { CheckboxProps, CheckboxOptionType } from './checkbox';
export { default as Checkbox } from './checkbox';

export type { ColProps } from './col';
export { default as Col } from './col';

export type { CommentProps } from './comment';
export { default as Comment } from './comment';

export { default as ConfigProvider } from './config-provider';

export type { DatePickerProps } from './date-picker';
export { default as DatePicker } from './date-picker';

export type { DescriptionsProps } from './descriptions';
export { default as Descriptions } from './descriptions';

export type { DividerProps } from './divider';
export { default as Divider } from './divider';

export type { DropDownProps } from './dropdown';
export { default as Dropdown } from './dropdown';

export type { DrawerProps } from './drawer';
export { default as Drawer } from './drawer';

export type { EmptyProps } from './empty';
export { default as Empty } from './empty';

export type { FormInstance, FormProps, FormItemProps } from './form';
export { default as Form } from './form';

export { default as Grid } from './grid';

export type { InputProps } from './input';
export { default as Input } from './input';

export type { ImageProps } from './image';
export { default as Image } from './image';

export type { InputNumberProps } from './input-number';
export { default as InputNumber } from './input-number';

export type { LayoutProps } from './layout';
export { default as Layout } from './layout';

export type { ListProps } from './list';
export { default as List } from './list';

export type { ArgsProps as MessageArgsProps } from './message';
export { default as message } from './message';

export type { MenuProps, MenuTheme, SubMenuProps, MenuItemProps } from './menu';
export { default as Menu } from './menu';

export type { MentionProps } from './mentions';
export { default as Mentions } from './mentions';

export type { ModalProps, ModalFuncProps } from './modal';
export { default as Modal } from './modal';

export type { StatisticProps } from './statistic';
export { default as Statistic } from './statistic';

export { default as notification } from './notification';

export type { PageHeaderProps } from './page-header';
export { default as PageHeader } from './page-header';

export type { PaginationProps } from './pagination';
export { default as Pagination } from './pagination';

export type { PopconfirmProps } from './popconfirm';
export { default as Popconfirm } from './popconfirm';

export type { PopoverProps } from './popover';
export { default as Popover } from './popover';

export type { ProgressProps } from './progress';
export { default as Progress } from './progress';

export type { RadioProps, RadioChangeEvent, RadioGroupProps } from './radio';
export { default as Radio } from './radio';

export type { RateProps } from './rate';
export { default as Rate } from './rate';

export type { ResultProps } from './result';
export { default as Result } from './result';

export type { RowProps } from './row';
export { default as Row } from './row';

export type { SelectProps } from './select';
export { default as Select } from './select';

export type { SkeletonProps } from './skeleton';
export { default as Skeleton } from './skeleton';

export type { SliderSingleProps } from './slider';
export { default as Slider } from './slider';

export type { SpaceProps } from './space';
export { default as Space } from './space';

export type { SpinProps } from './spin';
export { default as Spin } from './spin';

export type { StepProps, StepsProps } from './steps';
export { default as Steps } from './steps';

export type { SwitchProps } from './switch';
export { default as Switch } from './switch';

export type {
  TableProps,
  TablePaginationConfig,
  ColumnGroupType as TableColumnGroupType,
  ColumnType as TableColumnType,
  ColumnProps as TableColumnProps,
} from './table';
export { default as Table } from './table';

export type { TransferProps } from './transfer';
export { default as Transfer } from './transfer';

export type { TreeProps, AntTreeNodeProps as TreeNodeProps } from './tree';
export { default as Tree } from './tree';

export type { TreeSelectProps } from './tree-select';
export { default as TreeSelect } from './tree-select';

export type { TabsProps, TabPaneProps } from './tabs';
export { default as Tabs } from './tabs';

export type { TagProps, TagType } from './tag';
export { default as Tag } from './tag';

export type { TimePickerProps, TimeRangePickerProps } from './time-picker';
export { default as TimePicker } from './time-picker';

export type { TimelineProps, TimelineItemProps } from './timeline';
export { default as Timeline } from './timeline';

export type { TooltipProps } from './tooltip';
export { default as Tooltip } from './tooltip';

export type { TypographyProps } from './typography';
export { default as Typography } from './typography';

export type { UploadProps } from './upload';

export { default as Upload } from './upload';

export { default as version } from './version';
