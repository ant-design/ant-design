// TODO: 4.0 - codemod should help to change `filterOption` to support node props.

import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import RcSelect, { Option, OptGroup, SelectProps as RcSelectProps } from 'rc-select';
import { OptionProps } from 'rc-select/lib/Option';
import { ConfigContext } from '../config-provider';
import getIcons from './utils/iconUtil';
import SizeContext, { SizeType } from '../config-provider/SizeContext';

type RawValue = string | number;

export { OptionProps };

export type OptionType = typeof Option;

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[];

export interface InternalSelectProps<VT> extends Omit<RcSelectProps<VT>, 'mode'> {
  suffixIcon?: React.ReactNode;
  size?: SizeType;
  mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
  bordered?: boolean;
}

export interface SelectProps<VT>
  extends Omit<InternalSelectProps<VT>, 'inputIcon' | 'mode' | 'getInputElement' | 'backfill'> {
  mode?: 'multiple' | 'tags';
}

const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';

const InternalSelect = <VT extends SelectValue = SelectValue>(
  {
    prefixCls: customizePrefixCls,
    bordered = true,
    className,
    getPopupContainer,
    dropdownClassName,
    listHeight = 256,
    listItemHeight = 24,
    size: customizeSize,
    notFoundContent,
    ...props
  }: SelectProps<VT>,
  ref: React.Ref<RcSelect<VT>>,
) => {
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction,
    virtual,
    dropdownMatchSelectWidth,
  } = React.useContext(ConfigContext);
  const size = React.useContext(SizeContext);

  const getMode = () => {
    const { mode } = props as InternalSelectProps<VT>;

    if ((mode as any) === 'combobox') {
      return undefined;
    }

    if (mode === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox';
    }

    return mode;
  };

  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const mode = getMode();

  const isMultiple = mode === 'multiple' || mode === 'tags';

  // ===================== Empty =====================
  let mergedNotFound: React.ReactNode;
  if (notFoundContent !== undefined) {
    mergedNotFound = notFoundContent;
  } else if (mode === 'combobox') {
    mergedNotFound = null;
  } else {
    mergedNotFound = renderEmpty('Select');
  }

  // ===================== Icons =====================
  const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons({
    ...props,
    multiple: isMultiple,
    prefixCls,
  });

  const selectProps = omit(props, ['suffixIcon', 'itemIcon', 'removeIcon', 'clearIcon']);

  const rcSelectRtlDropDownClassName = classNames(dropdownClassName, {
    [`${prefixCls}-dropdown-${direction}`]: direction === 'rtl',
  });

  const mergedSize = customizeSize || size;
  const mergedClassName = classNames(
    {
      [`${prefixCls}-lg`]: mergedSize === 'large',
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-borderless`]: !bordered,
    },
    className,
  );

  return (
    <RcSelect<VT>
      ref={ref}
      virtual={virtual}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth}
      {...selectProps}
      listHeight={listHeight}
      listItemHeight={listItemHeight}
      mode={mode}
      prefixCls={prefixCls}
      direction={direction}
      inputIcon={suffixIcon}
      menuItemSelectedIcon={itemIcon}
      removeIcon={removeIcon}
      clearIcon={clearIcon}
      notFoundContent={mergedNotFound}
      className={mergedClassName}
      getPopupContainer={getPopupContainer || getContextPopupContainer}
      dropdownClassName={rcSelectRtlDropDownClassName}
    />
  );
};

const SelectRef = React.forwardRef(InternalSelect) as <VT extends SelectValue = SelectValue>(
  props: SelectProps<VT> & { ref?: React.Ref<RcSelect<VT>> },
) => React.ReactElement;

type InternalSelectType = typeof SelectRef;

interface SelectInterface extends InternalSelectType {
  SECRET_COMBOBOX_MODE_DO_NOT_USE: string;
  Option: typeof Option;
  OptGroup: typeof OptGroup;
}

const Select = SelectRef as SelectInterface;

Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = Option;
Select.OptGroup = OptGroup;

export default Select;
