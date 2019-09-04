// TODO: 4.0 - codemod should help to change `filterOption` to support node props.

import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import RcSelect, { Option, OptGroup, SelectProps as RcSelectProps } from 'rc-select';
import { Down, Loading, Check, Close } from '@ant-design/icons';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

type RawValue = string | number;

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[];

interface InternalSelectProps<VT> extends Omit<RcSelectProps<VT>, 'mode'> {
  suffixIcon: React.ReactNode;
  size?: 'large' | 'default' | 'small';
  mode?: 'multiple' | 'tags' | 'INTERNAL_COMBOBOX';
}

export interface SelectProps<VT> extends Omit<InternalSelectProps<VT>, 'inputIcon' | 'mode'> {
  mode?: 'multiple' | 'tags';
}

// We still use class here since `forwardRef` not support generic in typescript
class Select<ValueType extends SelectValue = SelectValue> extends React.Component<
  SelectProps<ValueType>
> {
  static Option = Option;
  static OptGroup = OptGroup;

  static defaultProps = {
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
  };

  getMode = () => {
    const { mode } = this.props as InternalSelectProps<ValueType>;

    if ((mode as any) === 'combobox') {
      return undefined;
    } else if (mode === 'INTERNAL_COMBOBOX') {
      return 'combobox';
    }

    return mode;
  };

  renderSelect = ({ getPrefixCls, renderEmpty }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      suffixIcon,
      menuItemSelectedIcon,
      removeIcon,
      loading,
      notFoundContent,
      className,
      size,
    } = this.props as InternalSelectProps<ValueType>;

    const prefixCls = getPrefixCls('select', customizePrefixCls);
    const mode = this.getMode();

    const isMultiple = mode === 'multiple' || mode === 'tags';

    // ===================== Empty =====================
    let mergedNotFound = undefined;
    if (notFoundContent !== undefined) {
      mergedNotFound = notFoundContent;
    } else if (mode === 'combobox') {
      mergedNotFound = null;
    } else {
      mergedNotFound = renderEmpty('Select');
    }

    // ===================== Icons =====================
    // Arrow item icon
    let mergedSuffixIcon = null;
    if (suffixIcon !== undefined) {
      mergedSuffixIcon = suffixIcon;
    } else if (loading) {
      mergedSuffixIcon = <Loading spin />;
    } else {
      mergedSuffixIcon = <Down />;
    }

    // Checked item icon
    let mergedItemIcon = null;
    if (menuItemSelectedIcon !== undefined) {
      mergedItemIcon = menuItemSelectedIcon;
    } else if (isMultiple) {
      mergedItemIcon = <Check />;
    } else {
      mergedItemIcon = null;
    }

    let mergedRemoveIcon = null;
    if (removeIcon !== undefined) {
      mergedRemoveIcon = removeIcon;
    } else {
      mergedRemoveIcon = <Close />;
    }

    const selectProps = omit(this.props, ['prefixCls', 'suffixIcon', 'size']);

    const mergedClassName = classNames(className, {
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    });

    return (
      <RcSelect<ValueType>
        {...selectProps}
        prefixCls={prefixCls}
        inputIcon={mergedSuffixIcon}
        menuItemSelectedIcon={mergedItemIcon}
        removeIcon={mergedRemoveIcon}
        notFoundContent={mergedNotFound}
        className={mergedClassName}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderSelect}</ConfigConsumer>;
  }
}

export default Select;
