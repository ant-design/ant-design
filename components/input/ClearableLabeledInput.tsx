import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import Icon from '../icon';
import { tuple } from '../_util/type';
import { InputProps, InputSizes, getInputClassName } from './Input';

const ClearableInputType = tuple('text', 'input');

export function hasPrefixSuffix(props: InputProps | ClearableInputProps) {
  return !!(props.prefix || props.suffix || props.allowClear);
}

/**
 * This basic props required for input and textarea.
 */
interface BasicProps {
  prefixCls: string;
  inputType: (typeof ClearableInputType)[number];
  value?: any;
  defaultValue?: any;
  allowClear?: boolean;
  element: React.ReactElement<any>;
  handleReset: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  className?: string;
  style?: object;
  disabled?: boolean;
}

/**
 * This props only for input.
 */
interface ClearableInputProps extends BasicProps {
  size?: (typeof InputSizes)[number];
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
}

class ClearableLabeledInput extends React.Component<ClearableInputProps> {
  renderClearIcon(prefixCls: string) {
    const { allowClear, value, disabled, inputType, handleReset } = this.props;
    if (!allowClear || disabled || value === undefined || value === null || value === '') {
      return null;
    }
    const className =
      inputType === ClearableInputType[0]
        ? `${prefixCls}-textarea-clear-icon`
        : `${prefixCls}-clear-icon`;
    return (
      <Icon
        type="close-circle"
        theme="filled"
        onClick={handleReset}
        className={className}
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

  renderLabeledIcon(prefixCls: string, element: React.ReactElement<any>) {
    const props = this.props;
    const suffix = this.renderSuffix(prefixCls);
    if (!hasPrefixSuffix(props)) {
      return React.cloneElement(element, {
        value: props.value,
      });
    }

    const prefix = props.prefix ? (
      <span className={`${prefixCls}-prefix`}>{props.prefix}</span>
    ) : null;

    const affixWrapperCls = classNames(props.className, `${prefixCls}-affix-wrapper`, {
      [`${prefixCls}-affix-wrapper-sm`]: props.size === 'small',
      [`${prefixCls}-affix-wrapper-lg`]: props.size === 'large',
      [`${prefixCls}-affix-wrapper-input-with-clear-btn`]:
        props.suffix && props.allowClear && this.props.value,
    });
    return (
      <span className={affixWrapperCls} style={props.style}>
        {prefix}
        {React.cloneElement(element, {
          style: null,
          value: props.value,
          className: getInputClassName(prefixCls, props.size, props.disabled),
        })}
        {suffix}
      </span>
    );
  }

  renderInputWithLabel(prefixCls: string, labeledElement: React.ReactElement<any>) {
    const { addonBefore, addonAfter, style, size, className } = this.props;
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
    });

    const mergedGroupClassName = classNames(className, `${prefixCls}-group-wrapper`, {
      [`${prefixCls}-group-wrapper-sm`]: size === 'small',
      [`${prefixCls}-group-wrapper-lg`]: size === 'large',
    });

    // Need another wrapper for changing display:table to display:inline-block
    // and put style prop in wrapper
    return (
      <span className={mergedGroupClassName} style={style}>
        <span className={mergedWrapperClassName}>
          {addonBeforeNode}
          {React.cloneElement(labeledElement, { style: null })}
          {addonAfterNode}
        </span>
      </span>
    );
  }

  renderTextAreaWithClearIcon(prefixCls: string, element: React.ReactElement<any>) {
    const { value, allowClear, className, style } = this.props;
    if (!allowClear) {
      return React.cloneElement(element, {
        value,
      });
    }
    const affixWrapperCls = classNames(
      className,
      `${prefixCls}-affix-wrapper`,
      `${prefixCls}-affix-wrapper-textarea-with-clear-btn`,
    );
    return (
      <span className={affixWrapperCls} style={style}>
        {React.cloneElement(element, {
          style: null,
          value,
        })}
        {this.renderClearIcon(prefixCls)}
      </span>
    );
  }

  renderClearableLabeledInput() {
    const { prefixCls, inputType, element } = this.props;
    if (inputType === ClearableInputType[0]) {
      return this.renderTextAreaWithClearIcon(prefixCls, element);
    }
    return this.renderInputWithLabel(prefixCls, this.renderLabeledIcon(prefixCls, element));
  }

  render() {
    return this.renderClearableLabeledInput();
  }
}

polyfill(ClearableLabeledInput);

export default ClearableLabeledInput;
