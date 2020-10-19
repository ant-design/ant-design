import * as React from 'react';
import RcTextArea, { TextAreaProps as RcTextAreaProps, ResizableTextArea } from 'rc-textarea';
import omit from 'omit.js';
import classNames from 'classnames';
import ClearableLabeledInput from './ClearableLabeledInput';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { fixControlledValue, resolveOnChange } from './Input';

export interface TextAreaProps extends RcTextAreaProps {
  allowClear?: boolean;
  bordered?: boolean;
  showCount?: boolean;
  maxLength?: number;
}

export interface TextAreaState {
  value: any;
  /** `value` from prev props */
  prevValue: any;
}

class TextArea extends React.Component<TextAreaProps, TextAreaState> {
  resizableTextArea: ResizableTextArea;

  clearableInput: ClearableLabeledInput;

  constructor(props: TextAreaProps) {
    super(props);
    const value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    this.state = {
      value,
      // eslint-disable-next-line react/no-unused-state
      prevValue: props.value,
    };
  }

  static getDerivedStateFromProps(nextProps: TextAreaProps, { prevValue }: TextAreaState) {
    const newState: Partial<TextAreaState> = { prevValue: nextProps.value };
    if (nextProps.value !== undefined || prevValue !== nextProps.value) {
      newState.value = nextProps.value;
    }
    return newState;
  }

  setValue(value: string, callback?: () => void) {
    if (this.props.value === undefined) {
      this.setState({ value }, callback);
    }
  }

  focus = () => {
    this.resizableTextArea.textArea.focus();
  };

  blur() {
    this.resizableTextArea.textArea.blur();
  }

  saveTextArea = (textarea: RcTextArea) => {
    this.resizableTextArea = textarea?.resizableTextArea;
  };

  saveClearableInput = (clearableInput: ClearableLabeledInput) => {
    this.clearableInput = clearableInput;
  };

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setValue(e.target.value);
    resolveOnChange(this.resizableTextArea.textArea, e, this.props.onChange);
  };

  handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setValue('', () => {
      this.focus();
    });
    resolveOnChange(this.resizableTextArea.textArea, e, this.props.onChange);
  };

  renderTextArea = (prefixCls: string, bordered: boolean) => {
    const { showCount, className, style } = this.props;

    return (
      <RcTextArea
        {...omit(this.props, ['allowClear', 'bordered', 'showCount'])}
        className={classNames({
          [`${prefixCls}-borderless`]: !bordered,
          [className!]: className && !showCount,
        })}
        style={showCount ? null : style}
        prefixCls={prefixCls}
        onChange={this.handleChange}
        ref={this.saveTextArea}
      />
    );
  };

  renderComponent = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    let value = fixControlledValue(this.state?.value);
    const {
      prefixCls: customizePrefixCls,
      bordered = true,
      showCount = false,
      maxLength,
      className,
      style,
    } = this.props;

    const prefixCls = getPrefixCls('input', customizePrefixCls);

    // Max length value
    const hasMaxLength = Number(maxLength) > 0;
    value = hasMaxLength ? value.slice(0, maxLength) : value;

    // TextArea
    let textareaNode = (
      <ClearableLabeledInput
        {...this.props}
        prefixCls={prefixCls}
        direction={direction}
        inputType="text"
        value={value}
        element={this.renderTextArea(prefixCls, bordered)}
        handleReset={this.handleReset}
        ref={this.saveClearableInput}
        triggerFocus={this.focus}
        bordered={bordered}
      />
    );

    // Only show text area wrapper when needed
    if (showCount) {
      const valueLength = [...value].length;
      const dataCount = `${valueLength}${hasMaxLength ? ` / ${maxLength}` : ''}`;

      textareaNode = (
        <div
          className={classNames(
            `${prefixCls}-textarea`,
            {
              [`${prefixCls}-textarea-show-count`]: showCount,
              [`${prefixCls}-textarea-rtl`]: direction === 'rtl',
            },
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
  };

  render() {
    return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
  }
}

export default TextArea;
