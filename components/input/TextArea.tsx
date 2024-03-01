import * as React from 'react';
import { forwardRef } from 'react';
import classNames from 'classnames';
import type { TextAreaRef as RcTextAreaRef } from 'rc-textarea';
import RcTextArea from 'rc-textarea';
import type { TextAreaProps as RcTextAreaProps } from 'rc-textarea/lib/interface';

import getAllowClear from '../_util/getAllowClear';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import { FormItemInputContext } from '../form/context';
import type { Variant } from '../form/hooks/useVariants';
import useVariant from '../form/hooks/useVariants';
import type { InputFocusOptions } from './Input';
import { triggerFocus } from './Input';
import useStyle from './style';

export interface TextAreaProps extends Omit<RcTextAreaProps, 'suffix'> {
  /** @deprecated Use `variant` instead */
  bordered?: boolean;
  size?: SizeType;
  status?: InputStatus;
  rootClassName?: string;
  /**
   * @since 5.13.0
   * @default "outlined"
   */
  variant?: Variant;
}

export interface TextAreaRef {
  focus: (options?: InputFocusOptions) => void;
  blur: () => void;
  resizableTextArea?: RcTextAreaRef['resizableTextArea'];
}

const TextArea = forwardRef<TextAreaRef, TextAreaProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    bordered = true,
    size: customizeSize,
    disabled: customDisabled,
    status: customStatus,
    allowClear,
    classNames: classes,
    rootClassName,
    className,
    style,
    styles,
    variant: customVariant,
    ...rest
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    const { deprecated } = devUseWarning('TextArea');
    deprecated(!('bordered' in props), 'bordered', 'variant');
  }

  const { getPrefixCls, direction, textArea } = React.useContext(ConfigContext);

  // ===================== Size =====================
  const mergedSize = useSize(customizeSize);

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  // ===================== Status =====================
  const {
    status: contextStatus,
    hasFeedback,
    feedbackIcon,
  } = React.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  // ===================== Ref =====================
  const innerRef = React.useRef<RcTextAreaRef>(null);

  React.useImperativeHandle(ref, () => ({
    resizableTextArea: innerRef.current?.resizableTextArea,
    focus: (option?: InputFocusOptions) => {
      triggerFocus(innerRef.current?.resizableTextArea?.textArea, option);
    },
    blur: () => innerRef.current?.blur(),
  }));

  const prefixCls = getPrefixCls('input', customizePrefixCls);

  // ===================== Style =====================
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const [variant, enableVariantCls] = useVariant(customVariant, bordered);

  const mergedAllowClear = getAllowClear(allowClear ?? textArea?.allowClear);

  return wrapCSSVar(
    <RcTextArea
      autoComplete={textArea?.autoComplete}
      {...rest}
      style={{ ...textArea?.style, ...style }}
      styles={{ ...textArea?.styles, ...styles }}
      disabled={mergedDisabled}
      allowClear={mergedAllowClear}
      className={classNames(cssVarCls, rootCls, className, rootClassName, textArea?.className)}
      classNames={{
        ...classes,
        ...textArea?.classNames,
        textarea: classNames(
          {
            [`${prefixCls}-sm`]: mergedSize === 'small',
            [`${prefixCls}-lg`]: mergedSize === 'large',
          },
          hashId,
          classes?.textarea,
          textArea?.classNames?.textarea,
        ),
        variant: classNames(
          {
            [`${prefixCls}-${variant}`]: enableVariantCls,
          },
          getStatusClassNames(prefixCls, mergedStatus),
        ),
        affixWrapper: classNames(
          `${prefixCls}-textarea-affix-wrapper`,
          {
            [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
            [`${prefixCls}-affix-wrapper-sm`]: mergedSize === 'small',
            [`${prefixCls}-affix-wrapper-lg`]: mergedSize === 'large',
            [`${prefixCls}-textarea-show-count`]: props.showCount || props.count?.show,
          },
          hashId,
        ),
      }}
      prefixCls={prefixCls}
      suffix={hasFeedback && <span className={`${prefixCls}-textarea-suffix`}>{feedbackIcon}</span>}
      ref={innerRef}
    />,
  );
});

export default TextArea;
