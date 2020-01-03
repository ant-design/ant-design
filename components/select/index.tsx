// TODO: 4.0 - codemod should help to change `filterOption` to support node props.

import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import RcSelect, { Option, OptGroup, SelectProps as RcSelectProps } from 'rc-select';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import getIcons from './utils/iconUtil';

type RawValue = string | number;

export type Size = 'large' | 'default' | 'small';

export type OptionType = typeof Option;

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[];

export interface InternalSelectProps<VT> extends Omit<RcSelectProps<VT>, 'mode'> {
  suffixIcon?: React.ReactNode;
  size?: Size;
  mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
}

export interface SelectProps<VT>
  extends Omit<InternalSelectProps<VT>, 'inputIcon' | 'mode' | 'getInputElement' | 'backfill'> {
  mode?: 'multiple' | 'tags';
}

// We still use class here since `forwardRef` not support generic in typescript
class Select<ValueType extends SelectValue = SelectValue> extends React.Component<
  SelectProps<ValueType>
> {
  static Option = Option;

  static OptGroup = OptGroup;

  static SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';

  static defaultProps = {
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
  };

  selectRef = React.createRef<RcSelect<ValueType>>();

  public focus = () => {
    if (this.selectRef.current) {
      this.selectRef.current.focus();
    }
  };

  public blur = () => {
    if (this.selectRef.current) {
      this.selectRef.current.blur();
    }
  };

  getMode = () => {
    const { mode } = this.props as InternalSelectProps<ValueType>;

    if ((mode as any) === 'combobox') {
      return undefined;
    }

    if (mode === Select.SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox';
    }

    return mode;
  };

  renderSelect = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction,
  }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      notFoundContent,
      className,
      size,
      listHeight = 256,
      listItemHeight = 32,
      getPopupContainer,
      dropdownClassName,
    } = this.props as InternalSelectProps<ValueType>;

    const prefixCls = getPrefixCls('select', customizePrefixCls);
    const mode = this.getMode();

    const isMultiple = mode === 'multiple' || mode === 'tags';

    // ===================== Empty =====================
    let mergedNotFound;
    if (notFoundContent !== undefined) {
      mergedNotFound = notFoundContent;
    } else if (mode === 'combobox') {
      mergedNotFound = null;
    } else {
      mergedNotFound = renderEmpty('Select');
    }

    // ===================== Icons =====================
    const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons({
      ...this.props,
      multiple: isMultiple,
    });

    const selectProps = omit(this.props, [
      'prefixCls',
      'suffixIcon',
      'itemIcon',
      'removeIcon',
      'clearIcon',
      'size',
    ]);

    const mergedClassName = classNames(className, {
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-rtl`]: direction === 'rtl',
    });
    const rcSelectRtlDropDownClassName = classNames(dropdownClassName, {
      [`${prefixCls}-dropdown-${direction}`]: direction === 'rtl',
    });
    return (
      <RcSelect<ValueType>
        ref={this.selectRef}
        {...selectProps}
        listHeight={listHeight}
        listItemHeight={listItemHeight}
        mode={mode}
        prefixCls={prefixCls}
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

  render() {
    return <ConfigConsumer>{this.renderSelect}</ConfigConsumer>;
  }
}

export default Select;
