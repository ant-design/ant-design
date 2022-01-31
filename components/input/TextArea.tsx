import * as React from 'react';
import RcTextArea, { TextAreaProps as RcTextAreaProps } from 'rc-textarea';
import ResizableTextArea from 'rc-textarea/lib/ResizableTextArea';
import omit from 'rc-util/lib/omit';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import ClearableLabeledInput from './ClearableLabeledInput';
import { ConfigContext } from '../config-provider';
import { fixControlledValue, resolveOnChange, triggerFocus, InputFocusOptions } from './Input';
import SizeContext, { SizeType } from '../config-provider/SizeContext';

interface ShowCountProps {
  formatter: (args: { count: number; maxLength?: number }) => string;
}

function fixEmojiLength(value: string, maxLength: number) {
  return [...(value || '')].slice(0, maxLength).join('');
}

function setTriggerValue(
  isCursorInEnd: boolean,
  preValue: string,
  triggerValue: string,
  maxLength: number,
) {
  let newTriggerValue = triggerValue;
  if (isCursorInEnd) {
    // 光标在尾部，直接截断
    newTriggerValue = fixEmojiLength(triggerValue, maxLength!);
  } else if (
    [...((preValue || '') as string)].length < triggerValue.length &&
    [...((triggerValue || '') as string)].length > maxLength!
  ) {
    // 光标在中间，如果最后的值超过最大值，则采用原先的值
    newTriggerValue = preValue as string;
  }
  return newTriggerValue;
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
      onCompositionStart,
      onCompositionEnd,
      onChange,
      ...props
    },
    ref,
  ) => {
    const { getPrefixCls, direction } = React.useContext(ConfigContext);
    const size = React.useContext(SizeContext);

    const innerRef = React.useRef<RcTextArea>(null);
    const clearableInputRef = React.useRef<ClearableLabeledInput>(null);

    const [compositing, setCompositing] = React.useState(false);
    const [oldCompositionValue, setOldCompositionValue] = React.useState<string>();
    const [oldSelectionStart, setOldSelectionStart] = React.useState<number>(0);

    const [value, setValue] = useMergedState(props.defaultValue, {
      value: props.value,
    });
    const { hidden } = props;

    const handleSetValue = (val: string, callback?: () => void) => {
      if (props.value === undefined) {
        setValue(val);
        callback?.();
      }
    };

    // =========================== Value Update ===========================
    // Max length value
    const hasMaxLength = Number(maxLength) > 0;

    const onInternalCompositionStart: React.CompositionEventHandler<HTMLTextAreaElement> = e => {
      // 拼音输入前保存一份旧值
      setCompositing(true);
      // 保存旧的光标位置
      setOldSelectionStart(e.currentTarget.selectionStart);
      setOldCompositionValue(value as string);
      onCompositionStart?.(e);
    };

    const onInternalCompositionEnd: React.CompositionEventHandler<HTMLTextAreaElement> = e => {
      setCompositing(false);

      let triggerValue = e.currentTarget.value;
      if (hasMaxLength) {
        const isCursorInEnd =
          oldSelectionStart >= maxLength! + 1 || oldSelectionStart === oldCompositionValue?.length;
        triggerValue = setTriggerValue(
          isCursorInEnd,
          oldCompositionValue as string,
          triggerValue,
          maxLength!,
        );
      }
      // Patch composition onChange when value changed
      handleSetValue(triggerValue);
      resolveOnChange(e.currentTarget, e, onChange, triggerValue);
      onCompositionEnd?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let triggerValue = e.target.value;
      if (!compositing && hasMaxLength) {
        // 1. 复制粘贴超过maxlength的情况 2.未超过maxlength的情况
        const isCursorInEnd =
          e.target.selectionStart >= maxLength! + 1 ||
          e.target.selectionStart === triggerValue.length;
        triggerValue = setTriggerValue(isCursorInEnd, value as string, triggerValue, maxLength!);
      }
      handleSetValue(triggerValue);
      resolveOnChange(e.currentTarget, e, onChange, triggerValue);
    };

    // ============================== Reset ===============================
    const handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      handleSetValue('', () => {
        innerRef.current?.focus();
      });
      resolveOnChange(innerRef.current?.resizableTextArea?.textArea!, e, onChange);
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
        className={classNames({
          [`${prefixCls}-borderless`]: !bordered,
          [className!]: className && !showCount,
          [`${prefixCls}-sm`]: size === 'small' || customizeSize === 'small',
          [`${prefixCls}-lg`]: size === 'large' || customizeSize === 'large',
        })}
        style={showCount ? undefined : style}
        prefixCls={prefixCls}
        onCompositionStart={onInternalCompositionStart}
        onChange={handleChange}
        onCompositionEnd={onInternalCompositionEnd}
        ref={innerRef}
      />
    );

    const val = fixControlledValue(value) as string;

    // TextArea
    const textareaNode = (
      <ClearableLabeledInput
        {...props}
        prefixCls={prefixCls}
        direction={direction}
        inputType="text"
        value={val}
        element={textArea}
        handleReset={handleReset}
        ref={clearableInputRef}
        bordered={bordered}
        style={showCount ? undefined : style}
      />
    );

    // Only show text area wrapper when needed
    if (showCount) {
      const valueLength = [...val].length;

      let dataCount = '';
      if (typeof showCount === 'object') {
        dataCount = showCount.formatter({ count: valueLength, maxLength });
      } else {
        dataCount = `${valueLength}${hasMaxLength ? ` / ${maxLength}` : ''}`;
      }

      return (
        <div
          hidden={hidden}
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
