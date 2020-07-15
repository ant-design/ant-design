import * as React from 'react';
import classNames from 'classnames';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import { tuple } from '../_util/type';
import { InputProps, getInputClassName } from './Input';
import { SizeType } from '../config-provider/SizeContext';
import { cloneElement } from '../_util/reactNode';

const ClearableInputType = tuple('text', 'input');

export function hasPrefixSuffix(props: InputProps | ClearableInputProps) {
  return !!(props.prefix || props.suffix || props.allowClear);
}

/**
 * This basic props required for input and textarea.
 */
interface BasicProps {
  prefixCls: string;
  inputType: typeof ClearableInputType[number];
  value?: any;
  allowClear?: boolean;
  element: React.ReactElement;
  handleReset: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  className?: string;
  style?: object;
  disabled?: boolean;
  direction?: any;
  focused?: boolean;
  readOnly?: boolean;
  bordered: boolean;
}

/**
 * This props only for input.
 */
interface ClearableInputProps extends BasicProps {
  size?: SizeType;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  triggerFocus: () => void;
}

class ClearableLabeledInput extends React.Component<ClearableInputProps> {
  /** @private Do not use out of this class. We do not promise this is always keep. */
  private containerRef = React.createRef<HTMLSpanElement>();

  onInputMouseUp: React.MouseEventHandler = e => {
    if (this.containerRef.current?.contains(e.target as Element)) {
      const { triggerFocus } = this.props;
      triggerFocus();
    }
  };

  renderClearIcon(prefixCls: string) {
    const { allowClear, value, disabled, readOnly, inputType, handleReset } = this.props;

    if (!allowClear) {
      return null;
    }

    const needClear = !disabled && !readOnly && value;
    const className =
      inputType === ClearableInputType[0]
        ? `${prefixCls}-textarea-clear-icon`
        : `${prefixCls}-clear-icon`;
    return (
      <CloseCircleFilled
        onClick={handleReset}
        className={classNames(className, {
          [`${className}-hidden`]: !needClear,
        })}
        role="button"
      />
    );
  }

  renderSuffix(prefixCls: string) {
    const { suffix, allowClear } = this.props;
    if (suffix || allowClear) {
      return (
        <span className={`${prefixCls}-suffix`}>
          {this.renderClearIcon(prefixCls)}
          {suffix}
        </span>
      );
    }
    return null;
  }

  renderLabeledIcon(prefixCls: string, element: React.ReactElement) {
    const {
      focused,
      value,
      prefix,
      className,
      size,
      suffix,
      disabled,
      allowClear,
      direction,
      style,
      readOnly,
      bordered,
    } = this.props;
    const suffixNode = this.renderSuffix(prefixCls);
    if (!hasPrefixSuffix(this.props)) {
      return cloneElement(element, {
        value,
      });
    }

    const prefixNode = prefix ? <span className={`${prefixCls}-prefix`}>{prefix}</span> : null;

    const affixWrapperCls = classNames(className, `${prefixCls}-affix-wrapper`, {
      [`${prefixCls}-affix-wrapper-focused`]: focused,
      [`${prefixCls}-affix-wrapper-disabled`]: disabled,
      [`${prefixCls}-affix-wrapper-sm`]: size === 'small',
      [`${prefixCls}-affix-wrapper-lg`]: size === 'large',
      [`${prefixCls}-affix-wrapper-input-with-clear-btn`]: suffix && allowClear && value,
      [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
      [`${prefixCls}-affix-wrapper-readonly`]: readOnly,
      [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
    });
    return (
      <span
        ref={this.containerRef}
        className={affixWrapperCls}
        style={style}
        onMouseUp={this.onInputMouseUp}
      >
        {prefixNode}
        {cloneElement(element, {
          style: null,
          value,
          className: getInputClassName(prefixCls, bordered, size, disabled),
        })}
        {suffixNode}
      </span>
    );
  }

  renderInputWithLabel(prefixCls: string, labeledElement: React.ReactElement) {
    const { addonBefore, addonAfter, style, size, className, direction } = this.props;
    // Not wrap when there is not addons
    if (!addonBefore && !addonAfter) {
      return labeledElement;
    }

    const wrapperClassName = `${prefixCls}-group`;
    const addonClassName = `${wrapperClassName}-addon`;
    const addonBeforeNode = addonBefore ? (
      <span className={addonClassName}>{addonBefore}</span>
    ) : null;
    const addonAfterNode = addonAfter ? <span className={addonClassName}>{addonAfter}</span> : null;

    const mergedWrapperClassName = classNames(`${prefixCls}-wrapper`, {
      [wrapperClassName]: addonBefore || addonAfter,
      [`${wrapperClassName}-rtl`]: direction === 'rtl',
    });

    const mergedGroupClassName = classNames(className, `${prefixCls}-group-wrapper`, {
      [`${prefixCls}-group-wrapper-sm`]: size === 'small',
      [`${prefixCls}-group-wrapper-lg`]: size === 'large',
      [`${prefixCls}-group-wrapper-rtl`]: direction === 'rtl',
    });

    // Need another wrapper for changing display:table to display:inline-block
    // and put style prop in wrapper
    return (
      <span className={mergedGroupClassName} style={style}>
        <span className={mergedWrapperClassName}>
          {addonBeforeNode}
          {cloneElement(labeledElement, { style: null })}
          {addonAfterNode}
        </span>
      </span>
    );
  }

  renderTextAreaWithClearIcon(prefixCls: string, element: React.ReactElement) {
    const { value, allowClear, className, style, direction, bordered } = this.props;
    if (!allowClear) {
      return cloneElement(element, {
        value,
      });
    }
    const affixWrapperCls = classNames(
      className,
      `${prefixCls}-affix-wrapper`,
      `${prefixCls}-affix-wrapper-textarea-with-clear-btn`,
      {
        [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
        [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
      },
    );
    return (
      <span className={affixWrapperCls} style={style}>
        {cloneElement(element, {
          style: null,
          value,
        })}
        {this.renderClearIcon(prefixCls)}
      </span>
    );
  }

  render() {
    const { prefixCls, inputType, element } = this.props;
    if (inputType === ClearableInputType[0]) {
      return this.renderTextAreaWithClearIcon(prefixCls, element);
    }
    return this.renderInputWithLabel(prefixCls, this.renderLabeledIcon(prefixCls, element));
  }
}

export default ClearableLabeledInput;
