import * as React from 'react';
import RcTextArea, { TextAreaProps as RcTextAreaProps } from 'rc-textarea';
import ResizableTextArea from 'rc-textarea/lib/ResizableTextArea';
import omit from 'omit.js';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { useState } from 'react';
import ClearableLabeledInput from './ClearableLabeledInput';
import { ConfigContext } from '../config-provider';
import {
  resolveOnChange,
  triggerFocus,
  InputFocusOptions,
  truncateValue,
  hasMaxLength,
} from './Input';
import SizeContext, { SizeType } from '../config-provider/SizeContext';

interface ShowCountProps {
  formatter: (args: { count: number; maxLength?: number }) => string;
}

export interface TextAreaProps extends RcTextAreaProps {
  allowClear?: boolean;
  bordered?: boolean;
  showCount?: boolean | ShowCountProps;
  size?: SizeType;
}

export interface TextAreaRef {
  focus: (options?: InputFocusOptions) => void;
  blur: () => void;
  resizableTextArea?: ResizableTextArea;
}

const TextArea = React.forwardRef<TextAreaRef, TextAreaProps>(
  (
    {
      prefixCls: customizePrefixCls,
      bordered = true,
      showCount = false,
      maxLength,
      className,
      style,
      size: customizeSize,
      ...props
    },
    ref,
  ) => {
    const { getPrefixCls, direction } = React.useContext(ConfigContext);
    const size = React.useContext(SizeContext);

    const innerRef = React.useRef<RcTextArea>();
    const clearableInputRef = React.useRef<ClearableLabeledInput>(null);

    const [inputLock, setInputLock] = useState(false);

    const [value, setValue] = useMergedState(props.defaultValue, {
      value: props.value,
      postState: (post: any) => (!inputLock ? truncateValue(Number(maxLength), post) : post),
    });

    const prevValue = React.useRef(props.value);

    React.useEffect(() => {
      if (props.value !== undefined || prevValue.current !== props.value) {
        setValue(props.value);
        prevValue.current = props.value;
      }
    }, [props.value, prevValue.current]);

    const handleSetValue = (val: string, callback?: () => void) => {
      if (props.value === undefined) {
        setValue(val);
        callback?.();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!inputLock) {
        handleSetValue(e.target.value);
      }
      resolveOnChange(innerRef.current as any, e, props.onChange);
    };

    const handleCompositionStart = () => {
      setInputLock(true);
    };

    const handleCompositionEnd = (e: React.CompositionEvent<HTMLTextAreaElement>) => {
      setInputLock(false);
      e.data = hasMaxLength(maxLength)
        ? e.data.slice(0, maxLength! - (value as string).length)
        : e.data;
    };

    const handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      handleSetValue('', () => {
        innerRef.current?.focus();
      });
      resolveOnChange(innerRef.current as any, e, props.onChange);
    };

    const prefixCls = getPrefixCls('input', customizePrefixCls);

    React.useImperativeHandle(ref, () => ({
      resizableTextArea: innerRef.current?.resizableTextArea,
      focus: (option?: InputFocusOptions) => {
        triggerFocus(innerRef.current?.resizableTextArea?.textArea, option);
      },
      blur: () => innerRef.current?.blur(),
    }));

    const textArea = (
      <RcTextArea
        {...omit(props, ['allowClear'])}
        maxLength={maxLength}
        className={classNames({
          [`${prefixCls}-borderless`]: !bordered,
          [className!]: className && !showCount,
          [`${prefixCls}-sm`]: size === 'small' || customizeSize === 'small',
          [`${prefixCls}-lg`]: size === 'large' || customizeSize === 'large',
        })}
        style={showCount ? null : style}
        prefixCls={prefixCls}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        ref={innerRef}
      />
    );

    // TextArea
    const textareaNode = (
      <ClearableLabeledInput
        {...props}
        prefixCls={prefixCls}
        direction={direction}
        inputType="text"
        value={value}
        element={textArea}
        handleReset={handleReset}
        ref={clearableInputRef}
        bordered={bordered}
      />
    );
    // Only show text area wrapper when needed
    if (showCount) {
      // consider emoji length as-is
      const val = truncateValue(Number(maxLength), value);
      const valueLength = Math.min(val.length, maxLength ?? Infinity);

      let dataCount = '';
      if (typeof showCount === 'object') {
        dataCount = showCount.formatter({ count: valueLength, maxLength });
      } else {
        dataCount = `${valueLength}${hasMaxLength(maxLength) ? ` / ${maxLength}` : ''}`;
      }

      return (
        <div
          className={classNames(
            `${prefixCls}-textarea`,
            {
              [`${prefixCls}-textarea-rtl`]: direction === 'rtl',
            },
            `${prefixCls}-textarea-show-count`,
            className,
          )}
          style={style}
          data-count={dataCount}
        >
          {textareaNode}
        </div>
      );
    }

    return textareaNode;
  },
);

export default TextArea;
