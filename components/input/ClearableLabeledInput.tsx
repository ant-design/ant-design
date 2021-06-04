import * as React from 'react';
import classNames from 'classnames';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import { tuple } from '../_util/type';
import { InputProps, getInputClassName } from './Input';
import { DirectionType } from '../config-provider';
import { SizeType } from '../config-provider/SizeContext';
import { cloneElement } from '../_util/reactNode';

const ClearableInputType = tuple('text', 'input');

export function hasPrefixSuffix(props: InputProps | ClearableInputProps) {
  return !!(props.prefix || props.suffix || props.allowClear);
}

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
}

/** This props only for input. */
interface ClearableInputProps extends BasicProps {
  size?: SizeType;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  triggerFocus?: () => void;
}

const renderClearIcon = (prefixCls: string, props: ClearableInputProps) => {
  const { allowClear, value, disabled, readOnly, handleReset } = props;
  if (!allowClear) {
    return null;
  }
  const needClear = !disabled && !readOnly && value;
  const className = `${prefixCls}-clear-icon`;
  return (
    <CloseCircleFilled
      onClick={handleReset}
      className={classNames(
        {
          [`${className}-hidden`]: !needClear,
        },
        className,
      )}
      role="button"
    />
  );
};

const renderSuffix = (prefixCls: string, props: ClearableInputProps) => {
  const { suffix, allowClear } = props;
  if (suffix || allowClear) {
    return (
      <span className={`${prefixCls}-suffix`}>
        {renderClearIcon(prefixCls, props)}
        {suffix}
      </span>
    );
  }
  return null;
};

const renderLabeledIcon = (
  prefixCls: string,
  element: React.ReactElement,
  props: ClearableInputProps,
  containerRef: any,
  onInputMouseUp: React.MouseEventHandler,
) => {
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
  } = props;

  const suffixNode = renderSuffix(prefixCls, props);
  if (!hasPrefixSuffix(props)) {
    return cloneElement(element, {
      value,
    });
  }

  const prefixNode = prefix ? <span className={`${prefixCls}-prefix`}>{prefix}</span> : null;

  const affixWrapperCls = classNames(`${prefixCls}-affix-wrapper`, {
    [`${prefixCls}-affix-wrapper-focused`]: focused,
    [`${prefixCls}-affix-wrapper-disabled`]: disabled,
    [`${prefixCls}-affix-wrapper-sm`]: size === 'small',
    [`${prefixCls}-affix-wrapper-lg`]: size === 'large',
    [`${prefixCls}-affix-wrapper-input-with-clear-btn`]: suffix && allowClear && value,
    [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
    [`${prefixCls}-affix-wrapper-readonly`]: readOnly,
    [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
    // className will go to addon wrapper
    [`${className}`]: !hasAddon(props) && className,
  });
  return (
    <span ref={containerRef} className={affixWrapperCls} style={style} onMouseUp={onInputMouseUp}>
      {prefixNode}
      {cloneElement(element, {
        style: null,
        value,
        className: getInputClassName(prefixCls, bordered, size, disabled),
      })}
      {suffixNode}
    </span>
  );
};

const renderInputWithLabel = (
  prefixCls: string,
  labeledElement: React.ReactElement,
  props: ClearableInputProps,
) => {
  const { addonBefore, addonAfter, style, size, className, direction } = props;
  // Not wrap when there is not addons
  if (!hasAddon(props)) {
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
    className,
  );

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
};

const renderTextAreaWithClearIcon = (
  prefixCls: string,
  element: React.ReactElement,
  props: ClearableInputProps,
) => {
  const { value, allowClear, className, style, direction, bordered } = props;
  if (!allowClear) {
    return cloneElement(element, {
      value,
    });
  }
  const affixWrapperCls = classNames(
    `${prefixCls}-affix-wrapper`,
    `${prefixCls}-affix-wrapper-textarea-with-clear-btn`,
    {
      [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
      [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
      // className will go to addon wrapper
      [`${className}`]: !hasAddon(props) && className,
    },
  );
  return (
    <span className={affixWrapperCls} style={style}>
      {cloneElement(element, {
        style: null,
        value,
      })}
      {renderClearIcon(prefixCls, props)}
    </span>
  );
};

export interface ClearableLabeledInputRef {
  renderClearIcon: (prefixCls: string) => JSX.Element | null;
  renderSuffix: (prefixCls: string) => JSX.Element | null;
  renderLabeledIcon: (prefixCls: string, element: React.ReactElement) => JSX.Element;
  renderInputWithLabel: (prefixCls: string, labeledElement: React.ReactElement) => JSX.Element;
  renderTextAreaWithClearIcon: (prefixCls: string, element: React.ReactElement) => JSX.Element;
}

const ClearableLabeledInput = React.forwardRef<ClearableLabeledInputRef, ClearableInputProps>(
  (props, ref) => {
    const containerRef = React.createRef<HTMLSpanElement>();
    const { prefixCls, inputType, element } = props;

    const onInputMouseUp: React.MouseEventHandler = e => {
      if (containerRef.current?.contains(e.target as Element)) {
        const { triggerFocus } = props;
        triggerFocus?.();
      }
    };

    React.useImperativeHandle(ref, () => ({
      renderClearIcon: (_prefixCls: string) => renderClearIcon(_prefixCls, props),
      renderSuffix: (_prefixCls: string) => renderSuffix(_prefixCls, props),
      renderLabeledIcon: (_prefixCls: string, _element: React.ReactElement) =>
        renderLabeledIcon(_prefixCls, _element, props, containerRef, onInputMouseUp),
      renderInputWithLabel: (_prefixCls: string, labeledElement: React.ReactElement) =>
        renderInputWithLabel(_prefixCls, labeledElement, props),
      renderTextAreaWithClearIcon: (_prefixCls: string, _element: React.ReactElement) =>
        renderTextAreaWithClearIcon(_prefixCls, _element, props),
    }));

    if (inputType === ClearableInputType[0]) {
      return renderTextAreaWithClearIcon(prefixCls, element, props);
    }
    return renderInputWithLabel(
      prefixCls,
      renderLabeledIcon(prefixCls, element, props, containerRef, onInputMouseUp),
      props,
    );
  },
);

export default ClearableLabeledInput;
