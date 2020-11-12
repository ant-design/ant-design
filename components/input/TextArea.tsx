import * as React from 'react';
import RcTextArea, { TextAreaProps as RcTextAreaProps } from 'rc-textarea';
import omit from 'omit.js';
import classNames from 'classnames';
import ClearableLabeledInput from './ClearableLabeledInput';
import { ConfigContext } from '../config-provider';
import { fixControlledValue, resolveOnChange } from './Input';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import useCombinedRefs from '../_util/hooks/useCombinedRefs';

export interface TextAreaProps extends RcTextAreaProps {
  allowClear?: boolean;
  bordered?: boolean;
  showCount?: boolean;
  maxLength?: number;
  size?: SizeType;
}

export interface TextAreaRef extends HTMLTextAreaElement {
  resizableTextArea: any;
}

const TextArea = React.forwardRef<TextAreaRef, TextAreaProps>((props, ref) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const size = React.useContext(SizeContext);

  const innerRef = React.useRef<TextAreaRef>();
  const mergedRef = useCombinedRefs(ref, innerRef);
  const clearableInputRef = React.useRef<ClearableLabeledInput>(null);

  const [value, setValue] = React.useState(
    typeof props.value === 'undefined' ? props.defaultValue : props.value,
  );

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
      if (callback) {
        callback();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleSetValue(e.target.value);
    resolveOnChange(mergedRef.current!, e, props.onChange);
  };

  const handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    handleSetValue('', () => {
      mergedRef.current?.focus();
    });
    resolveOnChange(mergedRef.current!, e, props.onChange);
  };

  const renderTextArea = (prefixCls: string, bordered: boolean) => {
    const { showCount, className, style, size: customizeSize } = props;

    return (
      <RcTextArea
        {...omit(props, ['allowClear', 'bordered', 'showCount', 'size'])}
        className={classNames({
          [`${prefixCls}-borderless`]: !bordered,
          [className!]: className && !showCount,
          [`${prefixCls}-sm`]: size === 'small' || customizeSize === 'small',
          [`${prefixCls}-lg`]: size === 'large' || customizeSize === 'large',
        })}
        style={showCount ? null : style}
        prefixCls={prefixCls}
        onChange={handleChange}
        ref={mergedRef}
      />
    );
  };

  let val = fixControlledValue(value) as string;
  const {
    prefixCls: customizePrefixCls,
    bordered = true,
    showCount = false,
    maxLength,
    className,
    style,
  } = props;

  const prefixCls = getPrefixCls('input', customizePrefixCls);

  // Max length value
  const hasMaxLength = Number(maxLength) > 0;
  // fix #27612 将value转为数组进行截取，解决 '😂'.length === 2 等emoji表情导致的截取乱码的问题
  val = hasMaxLength ? [...val].slice(0, maxLength).join('') : val;

  // TextArea
  const textareaNode = (
    <ClearableLabeledInput
      {...props}
      prefixCls={prefixCls}
      direction={direction}
      inputType="text"
      value={val}
      element={renderTextArea(prefixCls, bordered)}
      handleReset={handleReset}
      ref={clearableInputRef}
      bordered={bordered}
    />
  );

  // Only show text area wrapper when needed
  if (showCount) {
    const valueLength = [...val].length;
    const dataCount = `${valueLength}${hasMaxLength ? ` / ${maxLength}` : ''}`;

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
});

export default TextArea;
