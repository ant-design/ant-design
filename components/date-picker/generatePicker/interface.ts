import type {
  PickerRef,
  PickerProps as RcPickerProps,
  RangePickerProps as RcRangePickerProps,
} from '@rc-component/picker';
import type {
  PanelSemanticName as PopupSemantic,
  Locale as RcPickerLocale,
  SemanticName,
} from '@rc-component/picker/lib/interface';

import type {
  SemanticClassNamesType,
  SemanticStylesType,
} from '../../_util/hooks/useMergeSemantic';
import type { InputStatus } from '../../_util/statusUtils';
import type { AnyObject } from '../../_util/type';
import type { Variant } from '../../config-provider';
import type { SizeType } from '../../config-provider/SizeContext';
import type { TimePickerLocale } from '../../time-picker';

const _DataPickerPlacements = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'] as const;

type DataPickerPlacement = (typeof _DataPickerPlacements)[number];

export type DatePickerClassNamesType<P> = SemanticClassNamesType<
  InjectDefaultProps<P>,
  SemanticName,
  {
    popup?: string | Partial<Record<PopupSemantic, string>>;
  }
>;
export type DatePickerStylesType<P> = SemanticStylesType<
  InjectDefaultProps<P>,
  SemanticName,
  {
    popup?: Partial<Record<PopupSemantic, React.CSSProperties>>;
  }
>;

export type PickerLocale = {
  lang: RcPickerLocale & AdditionalPickerLocaleLangProps;
  timePickerLocale: TimePickerLocale;
} & AdditionalPickerLocaleProps;

/** @deprecated **Useless**. */
export type AdditionalPickerLocaleProps = {
  /**
   * @deprecated **Invalid**, Please use `lang.fieldDateFormat` instead.
   * @see [Migration Guide](https://github.com/ant-design/ant-design/discussions/53011)
   */
  dateFormat?: string;
  /**
   * @deprecated **Invalid**, Please use `lang.fieldDateTimeFormat` instead,
   * @see [Migration Guide](https://github.com/ant-design/ant-design/discussions/53011)
   */
  dateTimeFormat?: string;
  /**
   * @deprecated **Invalid**, Please use `lang.fieldWeekFormat` instead,
   * @see [Migration Guide](https://github.com/ant-design/ant-design/discussions/53011)
   */
  weekFormat?: string;
  /**
   * @deprecated **Invalid**, Please use `lang.fieldWeekFormat` instead,
   * @see [Migration Guide](https://github.com/ant-design/ant-design/discussions/53011)
   */
  monthFormat?: string;
};

export type AdditionalPickerLocaleLangProps = {
  placeholder: string;
  yearPlaceholder?: string;
  quarterPlaceholder?: string;
  monthPlaceholder?: string;
  weekPlaceholder?: string;
  rangeYearPlaceholder?: [string, string];
  rangeQuarterPlaceholder?: [string, string];
  rangeMonthPlaceholder?: [string, string];
  rangeWeekPlaceholder?: [string, string];
  rangePlaceholder?: [string, string];
};

export type PickerClassNames = Omit<NonNullable<RcPickerProps['classNames']>, 'popup'> & {
  popup?: string | NonNullable<RcPickerProps['classNames']>['popup'];
};

export type DatePickerPickerClassNames<T> = DatePickerClassNamesType<T>;

export type RequiredSemanticPicker = readonly [
  classNames: Required<Record<SemanticName, string>> & {
    popup: Required<Record<PopupSemantic, string>>;
  },
  styles: Required<Record<SemanticName, React.CSSProperties>> & {
    popup: Required<Record<PopupSemantic, React.CSSProperties>>;
  },
];

export type InjectDefaultProps<Props> = Omit<
  Props,
  'locale' | 'generateConfig' | 'hideHeader' | 'classNames' | 'styles'
> & {
  locale?: PickerLocale;
  size?: SizeType;
  placement?: DataPickerPlacement;
  /** @deprecated Use `variant` instead */
  bordered?: boolean;
  status?: InputStatus;
  /**
   * @since 5.13.0
   * @default "outlined"
   */
  variant?: Variant;
  /**
   * @deprecated `dropdownClassName` is deprecated which will be removed in next major
   *   version.Please use `classNames.popup.root` instead.
   */
  dropdownClassName?: string;
  /**
   * @deprecated please use `classNames.popup.root` instead
   */
  popupClassName?: string;
  rootClassName?: string;
  /**
   * @deprecated please use `styles.popup.root` instead
   */
  popupStyle?: React.CSSProperties;
  classNames?: DatePickerPickerClassNames<Props>;
  styles?: DatePickerStylesType<Props>;
};

/** Base Single Picker props */
export type PickerProps<DateType extends AnyObject = any> = InjectDefaultProps<
  RcPickerProps<DateType>
>;

/** Base Range Picker props */
export type RangePickerProps<DateType extends AnyObject = any> = InjectDefaultProps<
  RcRangePickerProps<DateType>
>;

export type GenericTimePickerProps<DateType extends AnyObject = any> = Omit<
  PickerProps<DateType>,
  'picker' | 'showTime'
> & {
  /** @deprecated Please use `onCalendarChange` instead */
  onSelect?: (value: DateType) => void;
};

/**
 * Single Picker has the `multiple` prop,
 * which will make the `value` be `DateType[]` type.
 * Here to be a generic which accept the `ValueType` for developer usage.
 */
export type PickerPropsWithMultiple<
  DateType extends AnyObject = any,
  InnerPickerProps extends PickerProps<DateType> = PickerProps<DateType>,
  ValueType = DateType,
> = Omit<InnerPickerProps, 'defaultValue' | 'value' | 'onChange' | 'onOk'> &
  React.RefAttributes<PickerRef> & {
    defaultValue?: ValueType | null;
    value?: ValueType | null;
    onChange?: (date: ValueType, dateString: string | string[]) => void;
    onOk?: (date: ValueType) => void;
  };
