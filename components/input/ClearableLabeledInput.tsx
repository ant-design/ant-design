import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import classNames from 'classnames';
import * as React from 'react';
import { DirectionType } from '../config-provider';
import { SizeType } from '../config-provider/SizeContext';
import { FormItemStatusContext, FormItemStatusContextProps } from '../form/context';
import { cloneElement } from '../_util/reactNode';
import { getStatusClassNames, InputStatus } from '../_util/statusUtils';
import { tuple } from '../_util/type';
import type { InputProps } from './Input';
import { getInputClassName, hasPrefixSuffix } from './utils';

const ClearableInputType = tuple('text', 'input');

function hasAddon(props: InputProps | ClearableInputProps) {
  return !!(props.addonBefore || props.addonAfter);
}

/** This basic props required for input and textarea. */
interface BasicProps {
  prefixCls: string;
  inputType: typeof ClearableInputType[number];
  value?: any;
  allowClear?: boolean;
  element: React.ReactElement;
  handleReset: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  direction?: DirectionType;
  focused?: boolean;
  readOnly?: boolean;
  bordered: boolean;
  hidden?: boolean;
}

/** This props only for input. */
export interface ClearableInputProps extends BasicProps {
  size?: SizeType;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  triggerFocus?: () => void;
  status?: InputStatus;
}

class ClearableLabeledInput extends React.Component<ClearableInputProps> {
  /** @private Do Not use out of this class. We do not promise this is always keep. */
  private containerRef = React.createRef<HTMLSpanElement>();

  onInputMouseUp: React.MouseEventHandler = e => {
    if (this.containerRef.current?.contains(e.target as Element)) {
      const { triggerFocus } = this.props;
      triggerFocus?.();
    }
  };

  renderClearIcon(prefixCls: string) {
    const { allowClear, value, disabled, readOnly, handleReset, suffix } = this.props;
    if (!allowClear) {
      return null;
    }
    const needClear = !disabled && !readOnly && value;
    const className = `${prefixCls}-clear-icon`;
    return (
      <CloseCircleFilled
        onClick={handleReset}
        // Do not trigger onBlur when clear input
        // https://github.com/ant-design/ant-design/issues/31200
        onMouseDown={e => e.preventDefault()}
        className={classNames(
          {
            [`${className}-hidden`]: !needClear,
            [`${className}-has-suffix`]: !!suffix,
          },
          className,
        )}
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

  renderLabeledIcon(
    prefixCls: string,
    element: React.ReactElement,
    statusContext: FormItemStatusContextProps,
  ) {
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
      hidden,
      status: customStatus,
    } = this.props;

    const { status: contextStatus, hasFeedback } = statusContext;

    if (!hasPrefixSuffix(this.props)) {
      return cloneElement(element, {
        value,
      });
    }

    const suffixNode = this.renderSuffix(prefixCls);
    const prefixNode = prefix ? <span className={`${prefixCls}-prefix`}>{prefix}</span> : null;

    const affixWrapperCls = classNames(
      `${prefixCls}-affix-wrapper`,
      {
        [`${prefixCls}-affix-wrapper-focused`]: focused,
        [`${prefixCls}-affix-wrapper-disabled`]: disabled,
        [`${prefixCls}-affix-wrapper-sm`]: size === 'small',
        [`${prefixCls}-affix-wrapper-lg`]: size === 'large',
        [`${prefixCls}-affix-wrapper-input-with-clear-btn`]: suffix && allowClear && value,
        [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
        [`${prefixCls}-affix-wrapper-readonly`]: readOnly,
        [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
        // className will go to addon wrapper
        [`${className}`]: !hasAddon(this.props) && className,
      },
      getStatusClassNames(`${prefixCls}-affix-wrapper`, contextStatus || customStatus, hasFeedback),
    );
    return (
      <span
        ref={this.containerRef}
        className={affixWrapperCls}
        style={style}
        onMouseUp={this.onInputMouseUp}
        hidden={hidden}
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

  renderInputWithLabel(
    prefixCls: string,
    labeledElement: React.ReactElement,
    statusContext: FormItemStatusContextProps,
  ) {
    const {
      addonBefore,
      addonAfter,
      style,
      size,
      className,
      direction,
      hidden,
      status: customStatus,
    } = this.props;
    const { status: contextStatus, hasFeedback } = statusContext;
    // Not wrap when there is not addons
    if (!hasAddon(this.props)) {
      return labeledElement;
    }

    const wrapperClassName = `${prefixCls}-group`;
    const addonClassName = `${wrapperClassName}-addon`;
    const addonBeforeNode = addonBefore ? (
      <span className={addonClassName}>{addonBefore}</span>
    ) : null;
    const addonAfterNode = addonAfter ? <span className={addonClassName}>{addonAfter}</span> : null;

    const mergedWrapperClassName = classNames(`${prefixCls}-wrapper`, wrapperClassName, {
      [`${wrapperClassName}-rtl`]: direction === 'rtl',
    });

    const mergedGroupClassName = classNames(
      `${prefixCls}-group-wrapper`,
      {
        [`${prefixCls}-group-wrapper-sm`]: size === 'small',
        [`${prefixCls}-group-wrapper-lg`]: size === 'large',
        [`${prefixCls}-group-wrapper-rtl`]: direction === 'rtl',
      },
      getStatusClassNames(`${prefixCls}-group-wrapper`, contextStatus || customStatus, hasFeedback),
      className,
    );

    // Need another wrapper for changing display:table to display:inline-block
    // and put style prop in wrapper
    return (
      <span className={mergedGroupClassName} style={style} hidden={hidden}>
        <span className={mergedWrapperClassName}>
          {addonBeforeNode}
          {cloneElement(labeledElement, { style: null })}
          {addonAfterNode}
        </span>
      </span>
    );
  }

  renderTextAreaWithClearIcon(
    prefixCls: string,
    element: React.ReactElement,
    statusContext: FormItemStatusContextProps,
  ) {
    const {
      value,
      allowClear,
      className,
      style,
      direction,
      bordered,
      hidden,
      status: customStatus,
    } = this.props;

    const { status: contextStatus, hasFeedback } = statusContext;

    if (!allowClear) {
      return cloneElement(element, {
        value,
      });
    }
    const affixWrapperCls = classNames(
      `${prefixCls}-affix-wrapper`,
      `${prefixCls}-affix-wrapper-textarea-with-clear-btn`,
      getStatusClassNames(`${prefixCls}-affix-wrapper`, contextStatus || customStatus, hasFeedback),
      {
        [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
        [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
        // className will go to addon wrapper
        [`${className}`]: !hasAddon(this.props) && className,
      },
    );
    return (
      <span className={affixWrapperCls} style={style} hidden={hidden}>
        {cloneElement(element, {
          style: null,
          value,
        })}
        {this.renderClearIcon(prefixCls)}
      </span>
    );
  }

  render() {
    return (
      <FormItemStatusContext.Consumer>
        {statusContext => {
          const { prefixCls, inputType, element } = this.props;
          if (inputType === ClearableInputType[0]) {
            return this.renderTextAreaWithClearIcon(prefixCls, element, statusContext);
          }
          return this.renderInputWithLabel(
            prefixCls,
            this.renderLabeledIcon(prefixCls, element, statusContext),
            statusContext,
          );
        }}
      </FormItemStatusContext.Consumer>
    );
  }
}

export default ClearableLabeledInput;
