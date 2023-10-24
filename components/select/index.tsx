// TODO: 4.0 - codemod should help to change `filterOption` to support node props.
import * as React from 'react';
import classNames from 'classnames';
import type { BaseSelectRef, SelectProps as RcSelectProps } from 'rc-select';
import RcSelect, { OptGroup, Option } from 'rc-select';
import type { OptionProps } from 'rc-select/lib/Option';
import type { BaseOptionType, DefaultOptionType } from 'rc-select/lib/Select';
import omit from 'rc-util/lib/omit';

import { useZIndex } from '../_util/hooks/useZIndex';
import type { SelectCommonPlacement } from '../_util/motion';
import { getTransitionName } from '../_util/motion';
import genPurePanel from '../_util/PurePanel';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import DefaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import DisabledContext from '../config-provider/DisabledContext';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import { FormItemInputContext } from '../form/context';
import { useCompactItemContext } from '../space/Compact';
import useStyle from './style';
import useBuiltinPlacements from './useBuiltinPlacements';
import useIcons from './useIcons';
import useShowArrow from './useShowArrow';

type RawValue = string | number;

export type { BaseOptionType, DefaultOptionType, OptionProps, BaseSelectRef as RefSelectProps };

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined;

export interface InternalSelectProps<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends Omit<RcSelectProps<ValueType, OptionType>, 'mode'> {
  rootClassName?: string;
  suffixIcon?: React.ReactNode;
  size?: SizeType;
  disabled?: boolean;
  mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE' | 'combobox';
  bordered?: boolean;
  /**
   * @deprecated `showArrow` is deprecated which will be removed in next major version. It will be a
   *   default behavior, you can hide it by setting `suffixIcon` to null.
   */
  showArrow?: boolean;
}

export interface SelectProps<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends Omit<
    InternalSelectProps<ValueType, OptionType>,
    'mode' | 'getInputElement' | 'getRawInputElement' | 'backfill' | 'placement'
  > {
  placement?: SelectCommonPlacement;
  mode?: 'multiple' | 'tags';
  status?: InputStatus;
  popupClassName?: string;
  /** @deprecated Please use `popupClassName` instead */
  dropdownClassName?: string;
  /** @deprecated Please use `popupMatchSelectWidth` instead */
  dropdownMatchSelectWidth?: boolean | number;
  popupMatchSelectWidth?: boolean | number;
}

const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';

const InternalSelect = <
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
  {
    prefixCls: customizePrefixCls,
    bordered = true,
    className,
    rootClassName,
    getPopupContainer,
    popupClassName,
    dropdownClassName,
    listHeight = 256,
    placement,
    listItemHeight = 24,
    size: customizeSize,
    disabled: customDisabled,
    notFoundContent,
    status: customStatus,
    builtinPlacements,
    dropdownMatchSelectWidth,
    popupMatchSelectWidth,
    direction: propDirection,
    style,
    allowClear,
    ...props
  }: SelectProps<ValueType, OptionType>,
  ref: React.Ref<BaseSelectRef>,
) => {
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction: contextDirection,
    virtual,
    popupMatchSelectWidth: contextPopupMatchSelectWidth,
    popupOverflow,
    select,
  } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const direction = propDirection ?? contextDirection;

  const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);

  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mode = React.useMemo(() => {
    const { mode: m } = props as InternalSelectProps<OptionType>;

    if (m === 'combobox') {
      return undefined;
    }

    if (m === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox';
    }

    return m;
  }, [props.mode]);

  const isMultiple = mode === 'multiple' || mode === 'tags';
  const showSuffixIcon = useShowArrow(props.suffixIcon, props.showArrow);

  const mergedPopupMatchSelectWidth =
    popupMatchSelectWidth ?? dropdownMatchSelectWidth ?? contextPopupMatchSelectWidth;

  // ===================== Form Status =====================
  const {
    status: contextStatus,
    hasFeedback,
    isFormItemInput,
    feedbackIcon,
  } = React.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  // ===================== Empty =====================
  let mergedNotFound: React.ReactNode;
  if (notFoundContent !== undefined) {
    mergedNotFound = notFoundContent;
  } else if (mode === 'combobox') {
    mergedNotFound = null;
  } else {
    mergedNotFound = renderEmpty?.('Select') || <DefaultRenderEmpty componentName="Select" />;
  }

  // ===================== Icons =====================
  const { suffixIcon, itemIcon, removeIcon, clearIcon } = useIcons({
    ...props,
    multiple: isMultiple,
    hasFeedback,
    feedbackIcon,
    showSuffixIcon,
    prefixCls,
    showArrow: props.showArrow,
    componentName: 'Select',
  });

  const mergedAllowClear = allowClear === true ? { clearIcon } : allowClear;

  const selectProps = omit(props as typeof props & { itemIcon: React.ReactNode }, [
    'suffixIcon',
    'itemIcon',
  ]);

  const rcSelectRtlDropdownClassName = classNames(
    popupClassName || dropdownClassName,
    {
      [`${prefixCls}-dropdown-${direction}`]: direction === 'rtl',
    },
    rootClassName,
    hashId,
  );

  const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  const mergedClassName = classNames(
    {
      [`${prefixCls}-lg`]: mergedSize === 'large',
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-borderless`]: !bordered,
      [`${prefixCls}-in-form-item`]: isFormItemInput,
    },
    getStatusClassNames(prefixCls, mergedStatus, hasFeedback),
    compactItemClassnames,
    select?.className,
    className,
    rootClassName,
    hashId,
  );

  // ===================== Placement =====================
  const memoPlacement = React.useMemo<SelectCommonPlacement>(() => {
    if (placement !== undefined) {
      return placement;
    }
    return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
  }, [placement, direction]);

  const mergedBuiltinPlacements = useBuiltinPlacements(builtinPlacements, popupOverflow);

  // ====================== Warning ======================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Select');

    warning.deprecated(!dropdownClassName, 'dropdownClassName', 'popupClassName');

    warning.deprecated(
      dropdownMatchSelectWidth === undefined,
      'dropdownMatchSelectWidth',
      'popupMatchSelectWidth',
    );

    warning(
      !('showArrow' in props),
      'deprecated',
      '`showArrow` is deprecated which will be removed in next major version. It will be a default behavior, you can hide it by setting `suffixIcon` to null.',
    );
  }

  // ====================== zIndex =========================
  const [zIndex] = useZIndex('SelectLike', props.dropdownStyle?.zIndex as number);

  // ====================== Render =======================
  return wrapSSR(
    <RcSelect<ValueType, OptionType>
      ref={ref}
      virtual={virtual}
      showSearch={select?.showSearch}
      {...selectProps}
      style={{ ...select?.style, ...style }}
      dropdownMatchSelectWidth={mergedPopupMatchSelectWidth}
      builtinPlacements={mergedBuiltinPlacements}
      transitionName={getTransitionName(rootPrefixCls, 'slide-up', props.transitionName)}
      listHeight={listHeight}
      listItemHeight={listItemHeight}
      mode={mode}
      prefixCls={prefixCls}
      placement={memoPlacement}
      direction={direction}
      suffixIcon={suffixIcon}
      menuItemSelectedIcon={itemIcon}
      removeIcon={removeIcon}
      allowClear={mergedAllowClear}
      notFoundContent={mergedNotFound}
      className={mergedClassName}
      getPopupContainer={getPopupContainer || getContextPopupContainer}
      dropdownClassName={rcSelectRtlDropdownClassName}
      disabled={mergedDisabled}
      dropdownStyle={{
        ...props?.dropdownStyle,
        zIndex,
      }}
    />,
  );
};

if (process.env.NODE_ENV !== 'production') {
  InternalSelect.displayName = 'Select';
}

const Select = React.forwardRef(InternalSelect) as unknown as (<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
  props: React.PropsWithChildren<SelectProps<ValueType, OptionType>> & {
    ref?: React.Ref<BaseSelectRef>;
  },
) => React.ReactElement) & {
  displayName?: string;
  SECRET_COMBOBOX_MODE_DO_NOT_USE: string;
  Option: typeof Option;
  OptGroup: typeof OptGroup;
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

// We don't care debug panel
/* istanbul ignore next */
const PurePanel = genPurePanel(Select);

Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = Option;
Select.OptGroup = OptGroup;
Select._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

if (process.env.NODE_ENV !== 'production') {
  Select.displayName = 'Select';
}

export default Select;
