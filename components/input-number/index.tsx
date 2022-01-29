import * as React from 'react';
import { useContext } from 'react';
import classNames from 'classnames';
import RcInputNumber, { InputNumberProps as RcInputNumberProps } from 'rc-input-number';
import UpOutlined from '@ant-design/icons/UpOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';
import { ValidateStatus } from '../form/FormItem';
import { ConfigContext } from '../config-provider';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import { cloneElement } from '../_util/reactNode';
import { FormItemStatusContext } from '../form/context';
import getFeedbackIcon from '../_util/getFeedbackIcon';
import getStatusClassNames from '../_util/getStatusClassNames';

type ValueType = string | number;

export interface InputNumberProps<T extends ValueType = ValueType>
  extends Omit<RcInputNumberProps<T>, 'prefix' | 'size'> {
  prefixCls?: string;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  size?: SizeType;
  bordered?: boolean;
  status?: ValidateStatus;
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const size = React.useContext(SizeContext);
  const [focused, setFocus] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => inputRef.current!);

  const {
    className,
    size: customizeSize,
    prefixCls: customizePrefixCls,
    addonBefore,
    addonAfter,
    prefix,
    bordered = true,
    readOnly,
    status: customStatus,
    ...others
  } = props;

  const prefixCls = getPrefixCls('input-number', customizePrefixCls);
  const upIcon = <UpOutlined className={`${prefixCls}-handler-up-inner`} />;
  const downIcon = <DownOutlined className={`${prefixCls}-handler-down-inner`} />;

  const { hasFeedback, status: contextStatus } = useContext(FormItemStatusContext);
  const mergedStatus = contextStatus || customStatus;

  const mergeSize = customizeSize || size;
  const inputNumberClass = classNames(
    {
      [`${prefixCls}-lg`]: mergeSize === 'large',
      [`${prefixCls}-sm`]: mergeSize === 'small',
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-readonly`]: readOnly,
      [`${prefixCls}-borderless`]: !bordered,
    },
    getStatusClassNames(prefixCls, mergedStatus, hasFeedback),
    className,
  );

  let element = (
    <RcInputNumber
      ref={inputRef}
      className={inputNumberClass}
      upHandler={upIcon}
      downHandler={downIcon}
      prefixCls={prefixCls}
      readOnly={readOnly}
      {...others}
    />
  );

  if (prefix != null || hasFeedback) {
    const affixWrapperCls = classNames(
      `${prefixCls}-affix-wrapper`,
      getStatusClassNames(`${prefixCls}-affix-wrapper`, mergedStatus, hasFeedback),
      {
        [`${prefixCls}-affix-wrapper-focused`]: focused,
        [`${prefixCls}-affix-wrapper-disabled`]: props.disabled,
        [`${prefixCls}-affix-wrapper-sm`]: size === 'small',
        [`${prefixCls}-affix-wrapper-lg`]: size === 'large',
        [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
        [`${prefixCls}-affix-wrapper-readonly`]: readOnly,
        [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
        // className will go to addon wrapper
        [`${className}`]: !(addonBefore || addonAfter) && className,
      },
    );

    element = (
      <div
        className={affixWrapperCls}
        style={props.style}
        onMouseUp={() => inputRef.current!.focus()}
      >
        {prefix && <span className={`${prefixCls}-prefix`}>{prefix}</span>}
        {cloneElement(element, {
          style: null,
          value: props.value,
          onFocus: (event: React.FocusEvent<HTMLInputElement>) => {
            setFocus(true);
            props.onFocus?.(event);
          },
          onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
            setFocus(false);
            props.onBlur?.(event);
          },
        })}
        {hasFeedback && (
          <span className={`${prefixCls}-suffix`}>{getFeedbackIcon(prefixCls, mergedStatus)}</span>
        )}
      </div>
    );
  }

  if (addonBefore != null || addonAfter != null) {
    const wrapperClassName = `${prefixCls}-group`;
    const addonClassName = `${wrapperClassName}-addon`;
    const addonBeforeNode = addonBefore ? (
      <div className={addonClassName}>{addonBefore}</div>
    ) : null;
    const addonAfterNode = addonAfter ? <div className={addonClassName}>{addonAfter}</div> : null;

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
    element = (
      <div className={mergedGroupClassName} style={props.style}>
        <div className={mergedWrapperClassName}>
          {addonBeforeNode}
          {cloneElement(element, { style: null })}
          {addonAfterNode}
        </div>
      </div>
    );
  }

  return element;
});

export default InputNumber as (<T extends ValueType = ValueType>(
  props: React.PropsWithChildren<InputNumberProps<T>> & {
    ref?: React.Ref<HTMLInputElement>;
  },
) => React.ReactElement) & { displayName?: string };
