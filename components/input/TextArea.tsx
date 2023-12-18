import * as React from 'react';
import { forwardRef } from 'react';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import classNames from 'classnames';
import type { BaseInputProps } from 'rc-input/lib/interface';
import type { TextAreaRef as RcTextAreaRef } from 'rc-textarea';
import RcTextArea from 'rc-textarea';
import type { TextAreaProps as RcTextAreaProps } from 'rc-textarea/lib/interface';

import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import { FormItemInputContext } from '../form/context';
import type { InputFocusOptions, InputVariant } from './Input';
import { InputVariants, triggerFocus } from './Input';
import useStyle from './style';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useVariant from '../_util/hooks/useVariants';
import { devUseWarning } from '../_util/warning';
import { hasPrefixSuffix } from './utils';

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
  variant?: InputVariant;
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
    variant: customVariant,
    ...rest
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    const { deprecated } = devUseWarning('TextArea');
    deprecated(!('bordered' in props), 'bordered', 'variant');
  }

  const { getPrefixCls, direction } = React.useContext(ConfigContext);

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

  // Allow clear
  let mergedAllowClear: BaseInputProps['allowClear'];
  if (typeof allowClear === 'object' && allowClear?.clearIcon) {
    mergedAllowClear = allowClear;
  } else if (allowClear) {
    mergedAllowClear = { clearIcon: <CloseCircleFilled /> };
  }

  // ===================== Style =====================
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const [variant, enableVariantCls] = useVariant(customVariant, bordered, InputVariants);
  const hasAffix = hasPrefixSuffix(props) || hasFeedback;

  return wrapCSSVar(
    <RcTextArea
      {...rest}
      disabled={mergedDisabled}
      allowClear={mergedAllowClear}
      className={classNames(cssVarCls, rootCls, className, rootClassName)}
      classNames={{
        ...classes,
        textarea: classNames(
          {
            [`${prefixCls}-${variant}`]: !hasAffix && enableVariantCls,
            [`${prefixCls}-sm`]: mergedSize === 'small',
            [`${prefixCls}-lg`]: mergedSize === 'large',
          },
          getStatusClassNames(prefixCls, mergedStatus),
          hashId,
          classes?.textarea,
        ),
        affixWrapper: classNames(
          `${prefixCls}-textarea-affix-wrapper`,
          {
            [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
            [`${prefixCls}-${variant}`]: enableVariantCls,
            [`${prefixCls}-affix-wrapper-sm`]: mergedSize === 'small',
            [`${prefixCls}-affix-wrapper-lg`]: mergedSize === 'large',
            [`${prefixCls}-textarea-show-count`]: props.showCount || props.count?.show,
          },
          getStatusClassNames(prefixCls, mergedStatus),
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
