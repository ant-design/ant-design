import React, { forwardRef, useContext, useEffect, useRef } from 'react';
import RcInput, { InputProps as RcInputProps, InputRef } from 'rc-input';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import classNames from 'classnames';
import { composeRef } from 'rc-util/lib/ref';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import {
  getFeedbackIcon,
  getMergedStatus,
  getStatusClassNames,
  InputStatus,
} from '../_util/statusUtils';
import { ConfigContext } from '../config-provider';
import { FormItemStatusContext } from '../form/context';
import { hasPrefixSuffix } from './utils';
import devWarning from '../_util/devWarning';

export interface InputFocusOptions extends FocusOptions {
  cursor?: 'start' | 'end' | 'all';
}

export type { InputRef };

export function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return String(value);
}

export function resolveOnChange<E extends HTMLInputElement | HTMLTextAreaElement>(
  target: E,
  e:
    | React.ChangeEvent<E>
    | React.MouseEvent<HTMLElement, MouseEvent>
    | React.CompositionEvent<HTMLElement>,
  onChange: undefined | ((event: React.ChangeEvent<E>) => void),
  targetValue?: string,
) {
  if (!onChange) {
    return;
  }
  let event = e;

  if (e.type === 'click') {
    // Clone a new target for event.
    // Avoid the following usage, the setQuery method gets the original value.
    //
    // const [query, setQuery] = React.useState('');
    // <Input
    //   allowClear
    //   value={query}
    //   onChange={(e)=> {
    //     setQuery((prevStatus) => e.target.value);
    //   }}
    // />

    const currentTarget = target.cloneNode(true) as E;

    // click clear icon
    event = Object.create(e, {
      target: { value: currentTarget },
      currentTarget: { value: currentTarget },
    });

    currentTarget.value = '';
    onChange(event as React.ChangeEvent<E>);
    return;
  }

  // Trigger by composition event, this means we need force change the input value
  if (targetValue !== undefined) {
    event = Object.create(e, {
      target: { value: target },
      currentTarget: { value: target },
    });

    target.value = targetValue;
    onChange(event as React.ChangeEvent<E>);
    return;
  }
  onChange(event as React.ChangeEvent<E>);
}

export function triggerFocus(
  element?: HTMLInputElement | HTMLTextAreaElement,
  option?: InputFocusOptions,
) {
  if (!element) return;

  element.focus(option);

  // Selection content
  const { cursor } = option || {};
  if (cursor) {
    const len = element.value.length;

    switch (cursor) {
      case 'start':
        element.setSelectionRange(0, 0);
        break;

      case 'end':
        element.setSelectionRange(len, len);
        break;

      default:
        element.setSelectionRange(0, len);
    }
  }
}

export interface InputProps
  extends Omit<
    RcInputProps,
    'wrapperClassName' | 'groupClassName' | 'inputClassName' | 'affixWrapperClassName'
  > {
  size?: SizeType;
  status?: InputStatus;
  bordered?: boolean;
}

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    bordered = true,
    status: customStatus,
    size: customSize,
    onBlur,
    onFocus,
    suffix,
    allowClear,
    ...rest
  } = props;
  const { getPrefixCls, direction, input } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('input', customizePrefixCls);
  const inputRef = useRef<InputRef>(null);

  // ===================== Status =====================
  const size = React.useContext(SizeContext);
  const mergedSize = customSize || size;

  // ===================== Status =====================
  const { status: contextStatus, hasFeedback } = useContext(FormItemStatusContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  // ===================== Focus warning =====================
  const inputHasPrefixSuffix = hasPrefixSuffix(props);
  const prevHasPrefixSuffix = useRef<boolean>(inputHasPrefixSuffix);
  useEffect(() => {
    if (inputHasPrefixSuffix && !prevHasPrefixSuffix.current) {
      devWarning(
        document.activeElement === inputRef.current?.input,
        'Input',
        `When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ`,
      );
    }
    prevHasPrefixSuffix.current = inputHasPrefixSuffix;
  }, [inputHasPrefixSuffix]);

  // ===================== Remove Password value =====================
  const removePasswordTimeoutRef = useRef<number[]>([]);
  const removePasswordTimeout = () => {
    removePasswordTimeoutRef.current.push(
      window.setTimeout(() => {
        if (
          inputRef.current?.input &&
          inputRef.current?.input.getAttribute('type') === 'password' &&
          inputRef.current?.input.hasAttribute('value')
        ) {
          inputRef.current?.input.removeAttribute('value');
        }
      }),
    );
  };

  useEffect(() => {
    removePasswordTimeout();
    return () => removePasswordTimeoutRef.current.forEach(item => window.clearTimeout(item));
  }, []);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    removePasswordTimeout();
    onBlur?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    removePasswordTimeout();
    onFocus?.(e);
  };

  const suffixNode = (hasFeedback || suffix) && (
    <>
      {suffix}
      {hasFeedback && getFeedbackIcon(prefixCls, mergedStatus)}
    </>
  );

  const withPrefixSuffix = hasPrefixSuffix(props) || hasFeedback;

  // Allow clear
  let mergedAllowClear;
  if (typeof allowClear === 'object' && allowClear?.clearIcon) {
    mergedAllowClear = allowClear;
  } else if (allowClear) {
    mergedAllowClear = { clearIcon: <CloseCircleFilled /> };
  }

  return (
    <RcInput
      ref={composeRef(ref, inputRef)}
      prefixCls={prefixCls}
      autoComplete={input?.autoComplete}
      {...rest}
      onBlur={handleBlur}
      onFocus={handleFocus}
      suffix={suffixNode}
      allowClear={mergedAllowClear}
      inputClassName={classNames(
        !withPrefixSuffix && {
          [`${prefixCls}-sm`]: mergedSize === 'small',
          [`${prefixCls}-lg`]: mergedSize === 'large',
          [`${prefixCls}-rtl`]: direction === 'rtl',
          [`${prefixCls}-borderless`]: !bordered,
        },
        !withPrefixSuffix && getStatusClassNames(prefixCls, mergedStatus),
      )}
      affixWrapperClassName={classNames(
        {
          [`${prefixCls}-affix-wrapper-sm`]: mergedSize === 'small',
          [`${prefixCls}-affix-wrapper-lg`]: mergedSize === 'large',
          [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
          [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
        },
        getStatusClassNames(`${prefixCls}-affix-wrapper`, mergedStatus, hasFeedback),
      )}
      wrapperClassName={classNames({
        [`${prefixCls}-group-rtl`]: direction === 'rtl',
      })}
      groupClassName={classNames(
        {
          [`${prefixCls}-group-wrapper-sm`]: mergedSize === 'small',
          [`${prefixCls}-group-wrapper-lg`]: mergedSize === 'large',
          [`${prefixCls}-group-wrapper-rtl`]: direction === 'rtl',
        },
        getStatusClassNames(`${prefixCls}-group-wrapper`, mergedStatus, hasFeedback),
      )}
    />
  );
});

export default Input;
