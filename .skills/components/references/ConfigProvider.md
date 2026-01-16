# ConfigProvider — 全局化配置

## 功能概述

为组件提供统一的全局化配置。

## 应用场景

- 为组件提供统一的全局化配置。
- 需要在页面中以一致样式呈现全局化配置能力时。

## 输入字段

### ConfigProvider 属性

#### 必填

- 无必填属性。

#### 可选

- `componentDisabled`: boolean，设置 antd 组件禁用状态，版本 4.21.0。
- `componentSize`: `small` | `middle` | `large`，设置 antd 组件大小。
- `csp`: { nonce: string }，设置 [Content Security Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP) 配置。
- `direction`: `ltr` | `rtl`，设置文本展示方向。 [示例](#config-provider-demo-direction)，默认 `ltr`。
- `getPopupContainer`: `(trigger?: HTMLElement) => HTMLElement | ShadowRoot`，弹出框（Select, Tooltip, Menu 等等）渲染父节点，默认渲染到 body 上，默认 () => document.body。
- `getTargetContainer`: `() => HTMLElement | Window | ShadowRoot`，配置 Affix、Anchor 滚动监听容器，默认 () => window，版本 4.2.0。
- `iconPrefixCls`: string，设置图标统一样式前缀，默认 `anticon`，版本 4.11.0。
- `locale`: object，语言包配置，语言包可到 [antd/locale](http://unpkg.com/antd/locale/) 目录下寻找。
- `popupMatchSelectWidth`: boolean | number，下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。`false` 时会关闭虚拟滚动，版本 5.5.0。
- `popupOverflow`: 'viewport' | 'scroll' <InlinePopover previewURL="https://user-images.githubusercontent.com/5378891/230344474-5b9f7e09-0a5d-49e8-bae8-7d2abed6c837.png"></InlinePopover>，Select 类组件弹层展示逻辑，默认为可视区域滚动，可配置成滚动区域滚动，默认 'viewport'，版本 5.5.0。
- `prefixCls`: string，设置统一样式前缀，默认 `ant`。
- `renderEmpty`: function(componentName: string): ReactNode，自定义组件空状态。参考 [空状态](/components/empty-cn)。
- `theme`: [Theme](/docs/react/customize-theme-cn#theme)，设置主题，参考 [定制主题](/docs/react/customize-theme-cn)，版本 5.0.0。
- `variant`: `outlined` | `filled` | `borderless`，设置全局输入组件形态变体，版本 5.19.0。
- `virtual`: boolean，设置 `false` 时关闭虚拟滚动，版本 4.3.0。
- `warning`: { strict: boolean }，设置警告等级，`strict` 为 `false` 时会将废弃相关信息聚合为单条信息，版本 5.10.0。

### 组件配置 属性

#### 必填

- 无必填属性。

#### 可选

- `affix`: { className?: string, style?: React.CSSProperties }，设置 Affix 组件的通用属性，版本 6.0.0。
- `alert`: { className?: string, style?: React.CSSProperties, closeIcon?: React.ReactNode, successIcon?: React.ReactNode, infoIcon?: React.ReactNode, warningIcon?: React.ReactNode, errorIcon?: React.ReactNode }，设置 Alert 组件的通用属性，版本 5.7.0, `closeIcon`: 5.14.0, `successIcon`, `infoIcon`, `warningIcon` 和 `errorIcon`: 6.2.0。
- `anchor`: { className?: string, style?: React.CSSProperties, classNames?: [AnchorStyleConfig\["classNames"\]](/components/anchor-cn#semantic-dom), styles?: [AnchorStyleConfig\["styles"\]](/components/anchor-cn#semantic-dom) }，设置 Anchor 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 6.0.0。
- `avatar`: { className?: string, style?: React.CSSProperties }，设置 Avatar 组件的通用属性，版本 5.7.0。
- `badge`: { className?: string, style?: React.CSSProperties, classNames?: [BadgeProps\["classNames"\]](/components/badge-cn#semantic-dom), styles?: [BadgeProps\["styles"\]](/components/badge-cn#semantic-dom) }，设置 Badge 组件的通用属性，版本 5.7.0。
- `breadcrumb`: { className?: string, style?: React.CSSProperties, classNames?: [BreadcrumbConfig\["classNames"\]](/components/breadcrumb-cn#semantic-dom), styles?: [BreadcrumbConfig\["styles"\]](/components/breadcrumb-cn#semantic-dom), separator?: ReactNode, dropdownIcon?: ReactNode }，设置 Breadcrumb 组件的通用属性，版本 5.7.0, `classNames`, `separator` 和 `styles`: 6.0.0, `dropdownIcon`: 6.2.0。
- `button`: { className?: string, style?: React.CSSProperties, classNames?: [ButtonProps\["classNames"\]](/components/button-cn#semantic-dom), styles?: [ButtonProps\["styles"\]](/components/button-cn#semantic-dom), autoInsertSpace?: boolean, variant?: ButtonVariantType, color?: ButtonColorType, shape?: [ButtonProps\["shape"\]](/components/button#api) }，设置 Button 组件的通用属性，版本 5.6.0, `autoInsertSpace`: 5.17.0, `variant` 和 `color`: 5.25.0, `shape`: 5.27.0。
- `calendar`: { className?: string, style?: React.CSSProperties, classNames?: [CalendarConfig\["classNames"\]](/components/calendar-cn#semantic-dom), styles?: [CalendarConfig\["styles"\]](/components/calendar-cn#semantic-dom) }，设置 Calendar 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 6.0.0。
- `card`: { className?: string, style?: React.CSSProperties, classNames?: [CardProps\["classNames"\]](/components/card-cn#semantic-dom), styles?: [CardProps\["styles"\]](/components/card-cn#semantic-dom) }，设置 Card 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 5.14.0。
- `cardMeta`: { className?: string, style?: React.CSSProperties, classNames?: [CardMetaProps\["classNames"\]](/components/card-cn#semantic-dom), styles?: [CardMetaProps\["styles"\]](/components/card-cn#semantic-dom) }，设置 Card.Meta 组件的通用属性，版本 6.0.0。
- `carousel`: { className?: string, style?: React.CSSProperties }，设置 Carousel 组件的通用属性，版本 5.7.0。
- `cascader`: { className?: string, style?: React.CSSProperties }，设置 Cascader 组件的通用属性，版本 5.7.0。
- `checkbox`: { className?: string, style?: React.CSSProperties, classNames?: [CheckboxConfig\["classNames"\]](/components/checkbox-cn#semantic-dom), styles?: [CheckboxConfig\["styles"\]](/components/checkbox-cn#semantic-dom) }，设置 Checkbox 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 6.0.0。
- `collapse`: { className?: string, style?: React.CSSProperties, expandIcon?: (props) => ReactNode, classNames?: [CollapseProps\["classNames"\]](/components/collapse-cn#semantic-dom), styles?: [CollapseProps\["styles"\]](/components/collapse-cn#semantic-dom) }，设置 Collapse 组件的通用属性，版本 5.7.0, `expandIcon`: 5.15.0, `classNames` 和 `styles`: 6.0.0。
- `colorPicker`: { className?: string, style?: React.CSSProperties, classNames?: [ColorPickerConfig\["classNames"\]](/components/color-picker-cn#semantic-dom), styles?: [ColorPickerConfig\["styles"\]](/components/color-picker-cn#semantic-dom) }，设置 ColorPicker 组件的通用属性，版本 5.7.0。
- `datePicker`: { className?: string, style?: React.CSSProperties, classNames?: [DatePickerConfig\["classNames"\]](/components/date-picker-cn#semantic-dom), styles?: [DatePickerConfig\["styles"\]](/components/date-picker-cn#semantic-dom) }，设置 DatePicker 组件的通用属性，版本 5.7.0。
- `rangePicker`: { className?: string, style?: React.CSSProperties }，设置 RangePicker 组件的通用属性，版本 5.11.0。
- `descriptions`: { className?: string, style?: React.CSSProperties, classNames?: [DescriptionsProps\["classNames"\]](/components/descriptions-cn#semantic-dom), styles?: [DescriptionsProps\["styles"\]](/components/descriptions-cn#semantic-dom) }，设置 Descriptions 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 5.23.0。
- `divider`: { className?: string, style?: React.CSSProperties, classNames?: [DividerProps\["classNames"\]](/components/divider-cn#semantic-dom), styles?: [DividerProps\["styles"\]](/components/divider-cn#semantic-dom) }，设置 Divider 组件的通用属性。
- `drawer`: { className?: string, style?: React.CSSProperties, classNames?: [DrawerProps\["classNames"\]](/components/drawer-cn#semantic-dom), styles?: [DrawerProps\["styles"\]](/components/drawer-cn#semantic-dom), closeIcon?: ReactNode, closable?: [DrawerProps\["closable"\]](/components/drawer-cn#api)}，设置 Drawer 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 5.10.0, `closeIcon`: 5.14.0。
- `dropdown`: { className?: string, style?: React.CSSProperties, classNames?: [DropdownConfig\["classNames"\]](/components/dropdown-cn#semantic-dom), styles?: [DropdownConfig\["styles"\]](/components/dropdown-cn#semantic-dom) }，设置 Dropdown 组件的通用属性。
- `empty`: { className?: string, style?: React.CSSProperties, classNames?:[EmptyProps\["classNames"\]](/components/empty-cn#api), styles?: [EmptyProps\["styles"\]](/components/empty-cn#api), image?: ReactNode }，设置 Empty 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 5.23.0, `image`: 5.27.0。
- `flex`: { className?: string, style?: React.CSSProperties, vertical?: boolean }，设置 Flex 组件的通用属性，版本 5.10.0。
- `floatButton`: { className?: string, style?: React.CSSProperties, classNames?: [FloatButtonProps\["classNames"\]](/components/float-button-cn#semantic-dom), styles?: [FloatButtonProps\["styles"\]](/components/float-button-cn#semantic-dom), backTopIcon?: React.ReactNode }，设置 FloatButton 组件的通用属性。
- `floatButtonGroup`: { closeIcon?: React.ReactNode, className?: string, style?: React.CSSProperties, classNames?: [FloatButtonProps\["classNames"\]](/components/float-button-cn#semantic-dom), styles?: [FloatButtonProps\["styles"\]](/components/float-button-cn#semantic-dom) }，设置 FloatButton.Group 组件的通用属性。
- `form`: { className?: string, style?: React.CSSProperties, validateMessages?: [ValidateMessages](/components/form-cn#validatemessages), requiredMark?: boolean | `optional`, colon?: boolean, scrollToFirstError?: boolean | [Options](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options), classNames?:[FormConfig\["classNames"\]](/components/form-cn#semantic-dom), styles?: [FormConfig\["styles"\]](/components/form-cn#semantic-dom) }，设置 Form 组件的通用属性，版本 `requiredMark`: 4.8.0; `colon`: 4.18.0; `scrollToFirstError`: 5.2.0; `className` 和 `style`: 5.7.0。
- `image`: { className?: string, style?: React.CSSProperties, preview?: { closeIcon?: React.ReactNode, classNames?:[ImageConfig\["classNames"\]](/components/image-cn#semantic-dom), styles?: [ImageConfig\["styles"\]](/components/image-cn#semantic-dom) }, fallback?: string }，设置 Image 组件的通用属性，版本 5.7.0, `closeIcon`: 5.14.0, `classNames` 和 `styles`: 6.0.0。
- `input`: { autoComplete?: string, className?: string, style?: React.CSSProperties,classNames?:[InputConfig\["classNames"\]](/components/input-cn#semantic-input), styles?: [InputConfig\["styles"\]](/components/input-cn#semantic-input), allowClear?: boolean | { clearIcon?: ReactNode } }，设置 Input 组件的通用属性，版本 5.7.0, `allowClear`: 5.15.0。
- `inputNumber`: { className?: string, style?: React.CSSProperties, classNames?: [InputNumberConfig\["classNames"\]](/components/input-number-cn#semantic-dom), styles?: [InputNumberConfig\["styles"\]](/components/input-number-cn#semantic-dom) }，设置 Input 组件的通用属性。
- `otp`: { className?: string, style?: React.CSSProperties, classNames?: [OTPConfig\["classNames"\]](/components/input-cn#semantic-otp), styles?: [OTPConfig\["styles"\]](/components/input-cn#semantic-otp) }，设置 OTP 组件的通用属性。
- `inputSearch`: { className?: string, style?: React.CSSProperties, classNames?: [InputSearchConfig\["classNames"\]](/components/input-cn#semantic-search), styles?: [InputSearchConfig\["styles"\]](/components/input-cn#semantic-search) }，设置 Search 组件的通用属性。
- `textArea`: { autoComplete?: string, className?: string, style?: React.CSSProperties,classNames?:[TextAreaConfig\["classNames"\]](/components/input-cn#semantic-textarea), styles?: [TextAreaConfig\["styles"\]](/components/input-cn#semantic-textarea), allowClear?: boolean | { clearIcon?: ReactNode } }，设置 TextArea 组件的通用属性，版本 5.15.0。
- `layout`: { className?: string, style?: React.CSSProperties }，设置 Layout 组件的通用属性，版本 5.7.0。
- `list`: { className?: string, style?: React.CSSProperties, item?:{ classNames: [ListItemProps\["classNames"\]](/components/list-cn#listitem), styles: [ListItemProps\["styles"\]](/components/list-cn#listitem) } }，设置 List 组件的通用属性，版本 5.7.0。
- `masonry`: { className?: string, style?: React.CSSProperties, classNames?: [MasonryProps\["classNames"\]](/components/masonry#semantic-dom), styles?: [MasonryProps\["styles"\]](/components/masonry#semantic-dom) }，设置 Masonry 组件的通用属性。
- `menu`: { className?: string, style?: React.CSSProperties, expandIcon?: ReactNode | props => ReactNode }，设置 Menu 组件的通用属性，版本 5.7.0, `expandIcon`: 5.15.0。
- `mentions`: { className?: string, style?: React.CSSProperties, classNames?:[MentionsConfig\["classNames"\]](/components/mentions-cn#semantic-dom), styles?: [MentionsConfig\["styles"\]](/components/mentions-cn#semantic-dom) }，设置 Mentions 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 6.0.0。
- `message`: { className?: string, style?: React.CSSProperties, classNames?: [MessageConfig\["classNames"\]](/components/message-cn#semantic-dom), styles?: [MessageConfig\["styles"\]](/components/message-cn#semantic-dom) }，设置 Message 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 6.0.0。
- `modal`: { className?: string, style?: React.CSSProperties, classNames?: [ModalProps\["classNames"\]](/components/modal-cn#semantic-dom), styles?: [ModalProps\["styles"\]](/components/modal-cn#semantic-dom), closeIcon?: React.ReactNode }，设置 Modal 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 5.10.0, `closeIcon`: 5.14.0。
- `notification`: { className?: string, style?: React.CSSProperties, closeIcon?: React.ReactNode, classNames?: [NotificationConfig\["classNames"\]](/components/notification-cn#semantic-dom), styles?: [NotificationConfig\["styles"\]](/components/notification-cn#semantic-dom) }，设置 Notification 组件的通用属性，版本 5.7.0, `closeIcon`: 5.14.0, `classNames` 和 `styles`: 6.0.0。
- `pagination`: { showSizeChanger?: boolean, totalBoundaryShowSizeChanger?: number, className?: string, style?: React.CSSProperties,classNames?:[PaginationConfig\["classNames"\]](/components/pagination-cn#semantic-dom), styles?: [PaginationConfig\["styles"\]](/components/pagination-cn#semantic-dom) }，设置 Pagination 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 6.0.0。
- `progress`: { className?: string, style?: React.CSSProperties, classNames?: [ProgressConfig\["classNames"\]](/components/progress#semantic-dom), styles?: [ProgressConfig\["styles"\]](/components/progress#semantic-dom) }，设置 Progress 组件的通用属性。
- `radio`: { className?: string, style?: React.CSSProperties, classNames?: [RadioConfig\["classNames"\]](/components/radio-cn#semantic-dom), styles?: [RadioConfig\["styles"\]](/components/radio-cn#semantic-dom) }，设置 Radio 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 6.0.0。
- `rate`: { className?: string, style?: React.CSSProperties }，设置 Rate 组件的通用属性，版本 5.7.0。
- `result`: { className?: string, style?: React.CSSProperties, classNames?: [ResultProps\["classNames"\]](/components/result-cn#semantic-dom), styles?: [ResultProps\["styles"\]](/components/result-cn#semantic-dom) }，设置 Result 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 6.0.0。
- `ribbon`: { className?: string, style?: React.CSSProperties, , classNames?: [RibbonProps\["classNames"\]](/components/badge-cn#semantic-dom), styles?: [RibbonProps\["styles"\]](/components/badge-cn#semantic-dom) }，设置 Ribbon 组件的通用属性，版本 6.0.0。
- `skeleton`: { className?: string, style?: React.CSSProperties, classNames?: [SkeletonProps\["classNames"\]](/components/skeleton-cn#semantic-dom), styles?: [SkeletonProps\["styles"\]](/components/skeleton-cn#semantic-dom) }，设置 Skeleton 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 6.0.0。
- `segmented`: { className?: string, style?: React.CSSProperties, classNames?: [SegmentedProps\["classNames"\]](/components/segmented-cn#semantic-dom), styles?: [SegmentedProps\["styles"\]](/components/segmented-cn#semantic-dom) }，设置 Segmented 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 6.0.0。
- `select`: { className?: string, showSearch?: boolean, style?: React.CSSProperties, classNames?: [SelectConfig\["classNames"\]](/components/select-cn#semantic-dom), styles?: [SelectConfig\["styles"\]](/components/select-cn#semantic-dom) }，设置 Select 组件的通用属性，版本 5.7.0,`classNames` 和 `styles`: 6.0.0。
- `slider`: { className?: string, style?: React.CSSProperties, classNames?: [SliderProps\["classNames"\]](/components/slider-cn#semantic-dom), styles?: [SliderProps\["styles"\]](/components/slider-cn#semantic-dom) }，设置 Slider 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 5.23.0。
- `switch`: { className?: string, style?: React.CSSProperties, classNames?: [SwitchStyleConfig\["classNames"\]](/components/switch-cn#semantic-dom), styles?: [SwitchStyleConfig\["styles"\]](/components/switch-cn#semantic-dom) }，设置 Switch 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 6.0.0。
- `space`: { size: `small` | `middle` | `large` | `number`, className?: string, style?: React.CSSProperties, classNames?: [SpaceProps\["classNames"\]](/components/space-cn#semantic-dom), styles?: [SpaceProps\["styles"\]](/components/space-cn#semantic-dom) }，设置 Space 的通用属性，参考 [Space](/components/space-cn)，版本 5.6.0。
- `splitter`: { className?: string, style?: React.CSSProperties, classNames?:[Splitter\["classNames"\]](/components/splitter-cn#semantic-dom), styles?: [Splitter\["styles"\]](/components/splitter-cn#semantic-dom) }，设置 Splitter 组件的通用属性，版本 5.21.0。
- `spin`: { className?: string, style?: React.CSSProperties, indicator?: React.ReactElement, classNames?:[SpinConfig\["classNames"\]](/components/spin-cn#semantic-dom), styles?: [SpinConfig\["styles"\]](/components/spin-cn#semantic-dom) }，设置 Spin 组件的通用属性，版本 5.7.0, `indicator`: 5.20.0, `classNames` 和 `styles`: 6.0.0。
- `statistic`: { className?: string, style?: React.CSSProperties, classNames?: [StatisticProps\["classNames"\]](/components/statistic-cn#semantic-dom), styles?: [StatisticProps\["styles"\]](/components/statistic-cn#semantic-dom) }，设置 Statistic 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 6.0.0。
- `steps`: { className?: string, style?: React.CSSProperties, classNames?:[StepsConfig\["classNames"\]](/components/steps#semantic-dom), styles?: [StepsConfig\["styles"\]](/components/steps#semantic-dom) }，设置 Steps 组件的通用属性。
- `table`: { className?: string, style?: React.CSSProperties, expandable?: { expandIcon?: props => React.ReactNode }, classNames?: [TableProps\["classNames"\]](/components/table-cn#semantic-dom), styles?: [TableProps\["styles"\]](/components/table-cn#semantic-dom) }，设置 Table 组件的通用属性。
- `tabs`: { className?: string, style?: React.CSSProperties, indicator?: { size?: GetIndicatorSize, align?: `start` | `center` | `end` }, moreIcon?: ReactNode, addIcon?: ReactNode, removeIcon?: ReactNode, classNames?: [TabsConfig\["classNames"\]](/components/tabs-cn#semantic-dom), styles?: [TabsConfig\["styles"\]](/components/tabs-cn#semantic-dom) }，设置 Tabs 组件的通用属性，版本 5.7.0, `moreIcon` and `addIcon`: 5.14.0, `removeIcon`: 5.15.0, `classNames` 和 `styles`: 6.0.0。
- `tag`: { className?: string, style?: React.CSSProperties, closeIcon?: React.ReactNode, classNames?: [TagProps\["classNames"\]](/components/tag-cn#semantic-dom), styles?: [TagProps\["styles"\]](/components/tag-cn#semantic-dom) }，设置 Tag 组件的通用属性，版本 5.7.0, closeIcon: 5.14.0, `classNames` 和 `styles`: 6.0.0。
- `timeline`: { className?: string, style?: React.CSSProperties, classNames?: [TimelineConfig\["classNames"\]](/components/timeline-cn#semantic-dom), styles?: [TimelineConfig\["styles"\]](/components/timeline-cn#semantic-dom) }，设置 Timeline 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 6.0.0。
- `timePicker`: { className?: string, style?: React.CSSProperties, classNames?: [TimePickerConfig\["classNames"\]](/components/time-picker-cn#semantic-dom), styles?: [TimePickerConfig\["styles"\]](/components/time-picker-cn#semantic-dom) }，设置 TimePicker 组件的通用属性，版本 5.7.0。
- `tour`: { closeIcon?: React.ReactNode, className?: string, style?: React.CSSProperties, classNames?: [TourProps\["classNames"\]](/components/tour-cn#semantic-dom), styles?: [TourProps\["styles"\]](/components/tour-cn#semantic-dom) }，设置 Tour 组件的通用属性，版本 5.14.0, `classNames`、`styles`、`className`、`style`: 6.0.0。
- `tooltip`: { className?: string, style?: React.CSSProperties, classNames?:[Tooltip\["classNames"\]](/components/tooltip-cn#semantic-dom), styles?: [Tooltip\["styles"\]](/components/tooltip-cn#semantic-dom), arrow: boolean | { pointAtCenter: boolean }, unique?: boolean, trigger?: [Tooltip\["trigger"\]](/components/tooltip-cn#api)}，设置 Tooltip 组件的通用属性，版本 `trigger`: 6.1.0。
- `popover`: { className?: string, style?: React.CSSProperties, classNames?:[Popover\["classNames"\]](/components/popover-cn#semantic-dom), styles?: [Popover\["styles"\]](/components/popover-cn#semantic-dom), arrow: boolean | { pointAtCenter: boolean }, trigger?: [Popover\["trigger"\]](/components/popover-cn#api)}，设置 Popover 组件的通用属性，版本 5.23.0, `arrow`: 6.0.0, `trigger`: 6.1.0。
- `popconfirm`: { className?: string, style?: React.CSSProperties, classNames?:[Popconfirm\["classNames"\]](/components/popconfirm-cn#semantic-dom), styles?: [Popconfirm\["styles"\]](/components/popconfirm-cn#semantic-dom), arrow: boolean | { pointAtCenter: boolean }, trigger?: [Popconfirm\["trigger"\]](/components/popconfirm-cn#api)}，设置 Popconfirm 组件的通用属性，版本 5.23.0, `arrow`: 6.0.0, `trigger`: 6.1.0。
- `qrcode`: { className?: string, style?: React.CSSProperties, classNames?:[QRCode\["classNames"\]](/components/qr-code-cn#semantic-dom), styles?: [QRCode\["styles"\]](/components/qr-code-cn#semantic-dom) }，设置 QRCode 组件的通用属性。
- `transfer`: { className?: string, style?: React.CSSProperties, classNames?: [TransferConfig\["classNames"\]](/components/transfer-cn#semantic-dom), styles?: [TransferConfig\["styles"\]](/components/transfer-cn#semantic-dom), selectionsIcon?: React.ReactNode }，设置 Transfer 组件的通用属性。
- `tree`: { className?: string, style?: React.CSSProperties, classNames?: [TreeConfig\["classNames"\]](/components/tree-cn#semantic-dom), styles?: [TreeConfig\["styles"\]](/components/tree-cn#semantic-dom) }，设置 Tree 组件的通用属性，版本 5.7.0, `classNames` 和 `styles`: 6.0.0。
- `treeSelect`: { className?: string, style?: React.CSSProperties, classNames?: [TreeSelectConfig\["classNames"\]](/components/tree-select-cn#semantic-dom), styles?: [TreeSelectConfig\["styles"\]](/components/tree-select-cn#semantic-dom), switcherIcon?: [TreeSelect\["switcherIcon"\]](/components/tree-select-cn#api)}，设置 TreeSelect 组件的通用属性。
- `typography`: { className?: string, style?: React.CSSProperties }，设置 Typography 组件的通用属性，版本 5.7.0。
- `upload`: { className?: string, style?: React.CSSProperties, classNames?:[UploadConfig\["classNames"\]](/components/upload-cn#semantic-dom), styles?: [UploadConfig\["styles"\]](/components/upload-cn#semantic-dom), customRequest?: [Upload\["customRequest"\]](/components/upload#api) }，设置 Upload 组件的通用属性，版本 5.7.0, `customRequest`: 5.27.0, `classNames` 和 `styles`: 6.0.0。
- `wave`: { disabled?: boolean, showEffect?: (node: HTMLElement, info: { className, token, component }) => void }，设置水波纹特效，版本 5.8.0。

## 方法

无公开方法。

## 使用建议

应用根节点包裹 ConfigProvider；主题定制使用 theme 属性；多语言使用 locale 属性。

## 示例代码

```tsx
import { Button, ConfigProvider, DatePicker, Space, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

const App: React.FC = () => (
  <>
    <ConfigProvider locale={zhCN}>
      <Space>
        <DatePicker />
        <Button type="primary">按钮</Button>
      </Space>
    </ConfigProvider>

    <ConfigProvider locale={enUS}>
      <Space>
        <DatePicker />
        <Button type="primary">Button</Button>
      </Space>
    </ConfigProvider>

    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
          borderRadius: 8,
        },
      }}
    >
      <Button type="primary">Custom Theme</Button>
    </ConfigProvider>

    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div style={{ background: '#141414', padding: 24 }}>
        <Button type="primary">Dark Theme</Button>
      </div>
    </ConfigProvider>

    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
      }}
    >
      <Button type="primary">Compact Theme</Button>
    </ConfigProvider>

    <ConfigProvider componentSize="small">
      <Space>
        <Button type="primary">Small Button</Button>
        <DatePicker />
      </Space>
    </ConfigProvider>

    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: '#00b96b',
            algorithm: true,
          },
          Input: {
            colorPrimary: '#eb2f96',
          },
        },
      }}
    >
      <Space>
        <Button type="primary">Button</Button>
        <Input placeholder="Input" />
      </Space>
    </ConfigProvider>

    <ConfigProvider direction="rtl">
      <Button type="primary">RTL Button</Button>
    </ConfigProvider>
  </>
);
```

## 返回结果

提供全局化配置，影响所有子组件的行为和样式。
