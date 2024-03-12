import React, { forwardRef, useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';
import type { InputRef, InputProps as RcInputProps } from 'rc-input';
import RcInput from 'rc-input';
import { composeRef } from 'rc-util/lib/ref';

import getAllowClear from '../_util/getAllowClear';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import { FormItemInputContext, NoFormStyle } from '../form/context';
import type { Variant } from '../form/hooks/useVariants';
import useVariant from '../form/hooks/useVariants';
import { NoCompactStyle, useCompactItemContext } from '../space/Compact';
import useRemovePasswordTimeout from './hooks/useRemovePasswordTimeout';
import useStyle from './style';
import { hasPrefixSuffix } from './utils';

export interface InputFocusOptions extends FocusOptions {
  cursor?: 'start' | 'end' | 'all';
}

export type { InputRef };

export function triggerFocus(
  element?: HTMLInputElement | HTMLTextAreaElement,
  option?: InputFocusOptions,
) {
  if (!element) {
    return;
  }

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
        break;
    }
  }
}

export interface InputProps
  extends Omit<
    RcInputProps,
    'wrapperClassName' | 'groupClassName' | 'inputClassName' | 'affixWrapperClassName' | 'classes'
  > {
  rootClassName?: string;
  size?: SizeType;
  disabled?: boolean;
  status?: InputStatus;
  /** @deprecated Use `variant="borderless"` instead. */
  bordered?: boolean;
  /**
   * @since 5.13.0
   * @default "outlined"
   */
  variant?: Variant;
  [key: `data-${string}`]: string | undefined;
}

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    bordered = true,
    status: customStatus,
    size: customSize,
    disabled: customDisabled,
    onBlur,
    onFocus,
    suffix,
    allowClear,
    addonAfter,
    addonBefore,
    className,
    style,
    styles,
    rootClassName,
    onChange,
    classNames: classes,
    variant: customVariant,
    ...rest
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    const { deprecated } = devUseWarning('Input');
    deprecated(!('bordered' in props), 'bordered', 'variant');
  }

  const { getPrefixCls, direction, input } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('input', customizePrefixCls);
  const inputRef = useRef<InputRef>(null);

  // Style
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  // ===================== Compact Item =====================
  const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);

  // ===================== Size =====================
  const mergedSize = useSize((ctx) => customSize ?? compactSize ?? ctx);

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  // ===================== Status =====================
  const { status: contextStatus, hasFeedback, feedbackIcon } = useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  // ===================== Focus warning =====================
  const inputHasPrefixSuffix = hasPrefixSuffix(props) || !!hasFeedback;
  const prevHasPrefixSuffix = useRef<boolean>(inputHasPrefixSuffix);

  /* eslint-disable react-hooks/rules-of-hooks */
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Input');

    useEffect(() => {
      if (inputHasPrefixSuffix && !prevHasPrefixSuffix.current) {
        warning(
          document.activeElement === inputRef.current?.input,
          'usage',
          `When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ`,
        );
      }
      prevHasPrefixSuffix.current = inputHasPrefixSuffix;
    }, [inputHasPrefixSuffix]);
  }
  /* eslint-enable */

  // ===================== Remove Password value =====================
  const removePasswordTimeout = useRemovePasswordTimeout(inputRef, true);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    removePasswordTimeout();
    onBlur?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    removePasswordTimeout();
    onFocus?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    removePasswordTimeout();
    onChange?.(e);
  };

  const suffixNode = (hasFeedback || suffix) && (
    <>
      {suffix}
      {hasFeedback && feedbackIcon}
    </>
  );

  const mergedAllowClear = getAllowClear(allowClear ?? input?.allowClear);

  const [variant, enableVariantCls] = useVariant(customVariant, bordered);

  return wrapCSSVar(
    <RcInput
      ref={composeRef(ref, inputRef)}
      prefixCls={prefixCls}
      autoComplete={input?.autoComplete}
      {...rest}
      disabled={mergedDisabled}
      onBlur={handleBlur}
      onFocus={handleFocus}
      style={{ ...input?.style, ...style }}
      styles={{ ...input?.styles, ...styles }}
      suffix={suffixNode}
      allowClear={mergedAllowClear}
      className={classNames(
        className,
        rootClassName,
        cssVarCls,
        rootCls,
        compactItemClassnames,
        input?.className,
      )}
      onChange={handleChange}
      addonAfter={
        addonAfter && (
          <NoCompactStyle>
            <NoFormStyle override status>
              {addonAfter}
            </NoFormStyle>
          </NoCompactStyle>
        )
      }
      addonBefore={
        addonBefore && (
          <NoCompactStyle>
            <NoFormStyle override status>
              {addonBefore}
            </NoFormStyle>
          </NoCompactStyle>
        )
      }
      classNames={{
        ...classes,
        ...input?.classNames,
        input: classNames(
          {
            [`${prefixCls}-sm`]: mergedSize === 'small',
            [`${prefixCls}-lg`]: mergedSize === 'large',
            [`${prefixCls}-rtl`]: direction === 'rtl',
          },
          classes?.input,
          input?.classNames?.input,
          hashId,
        ),
        variant: classNames(
          {
            [`${prefixCls}-${variant}`]: enableVariantCls,
          },
          getStatusClassNames(prefixCls, mergedStatus),
        ),
        affixWrapper: classNames(
          {
            [`${prefixCls}-affix-wrapper-sm`]: mergedSize === 'small',
            [`${prefixCls}-affix-wrapper-lg`]: mergedSize === 'large',
            [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
          },
          hashId,
        ),
        wrapper: classNames(
          {
            [`${prefixCls}-group-rtl`]: direction === 'rtl',
          },
          hashId,
        ),
        groupWrapper: classNames(
          {
            [`${prefixCls}-group-wrapper-sm`]: mergedSize === 'small',
            [`${prefixCls}-group-wrapper-lg`]: mergedSize === 'large',
            [`${prefixCls}-group-wrapper-rtl`]: direction === 'rtl',
            [`${prefixCls}-group-wrapper-${variant}`]: enableVariantCls,
          },
          getStatusClassNames(`${prefixCls}-group-wrapper`, mergedStatus, hasFeedback),
          hashId,
        ),
      }}
    />,
  );
});

export default Input;
