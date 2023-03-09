import type { TextAreaProps as RcTextAreaProps } from 'rc-textarea/lib/interface';
import type { TextAreaRef as RcTextAreaRef } from 'rc-textarea';
import { forwardRef } from 'react';
import * as React from 'react';
import RcTextArea from 'rc-textarea';
import classNames from 'classnames';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import type { BaseInputProps } from 'rc-input/lib/interface';
import { FormItemInputContext } from '../form/context';
import useStyle from './style';
import type { SizeType } from '../config-provider/SizeContext';
import SizeContext from '../config-provider/SizeContext';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import type { InputFocusOptions } from './Input';
import { triggerFocus } from './Input';
import DisabledContext from '../config-provider/DisabledContext';
import { ConfigContext } from '../config-provider';

export interface TextAreaProps extends Omit<RcTextAreaProps, 'suffix'> {
  bordered?: boolean;
  size?: SizeType;
  status?: InputStatus;
}

export interface TextAreaRef {
  focus: (options?: InputFocusOptions) => void;
  blur: () => void;
  resizableTextArea?: RcTextAreaRef['resizableTextArea'];
}

const TextArea = forwardRef<TextAreaRef, TextAreaProps>(
  (
    {
      prefixCls: customizePrefixCls,
      bordered = true,
      size: customizeSize,
      disabled: customDisabled,
      status: customStatus,
      allowClear,
      ...rest
    },
    ref,
  ) => {
    const { getPrefixCls, direction } = React.useContext(ConfigContext);

    // ===================== Size =====================
    const size = React.useContext(SizeContext);
    const mergedSize = customizeSize || size;

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
    const [wrapSSR, hashId] = useStyle(prefixCls);

    return wrapSSR(
      <RcTextArea
        {...rest}
        disabled={mergedDisabled}
        allowClear={mergedAllowClear}
        classes={{
          affixWrapper: classNames(
            `${prefixCls}-textarea-affix-wrapper`,
            {
              [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
              [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
              [`${prefixCls}-affix-wrapper-sm`]: mergedSize === 'small',
              [`${prefixCls}-affix-wrapper-lg`]: mergedSize === 'large',
            },
            getStatusClassNames(`${prefixCls}-affix-wrapper`, mergedStatus),
            hashId,
          ),
          countWrapper: classNames(
            `${prefixCls}-textarea`,
            `${prefixCls}-textarea-show-count`,
            hashId,
          ),
          textarea: classNames(
            {
              [`${prefixCls}-borderless`]: !bordered,
              [`${prefixCls}-sm`]: mergedSize === 'small',
              [`${prefixCls}-lg`]: mergedSize === 'large',
            },
            getStatusClassNames(prefixCls, mergedStatus),
            hashId,
          ),
        }}
        prefixCls={prefixCls}
        suffix={
          hasFeedback && <span className={`${prefixCls}-textarea-suffix`}>{feedbackIcon}</span>
        }
        ref={innerRef}
      />,
    );
  },
);

export default TextArea;
