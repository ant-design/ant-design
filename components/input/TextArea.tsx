import * as React from 'react';
import ClearableLabeledInput from './ClearableLabeledInput';
import ResizableTextArea, { AutoSizeType } from './ResizableTextArea';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { fixControlledValue, resolveOnChange } from './Input';

export type HTMLTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface TextAreaProps extends HTMLTextareaProps {
  prefixCls?: string;
  autoSize?: boolean | AutoSizeType;
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  allowClear?: boolean;
  onResize?: (size: { width: number; height: number }) => void;
}

export interface TextAreaState {
  value: any;
}

class TextArea extends React.Component<TextAreaProps, TextAreaState> {
  resizableTextArea: ResizableTextArea;

  clearableInput: ClearableLabeledInput;

  constructor(props: TextAreaProps) {
    super(props);
    const value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    this.state = {
      value,
    };
  }

  static getDerivedStateFromProps(nextProps: TextAreaProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

  setValue(value: string, callback?: () => void) {
    if (!('value' in this.props)) {
      this.setState({ value }, callback);
    }
  }

  focus = () => {
    this.resizableTextArea.textArea.focus();
  };

  blur() {
    this.resizableTextArea.textArea.blur();
  }

  saveTextArea = (resizableTextArea: ResizableTextArea) => {
    this.resizableTextArea = resizableTextArea;
  };

  saveClearableInput = (clearableInput: ClearableLabeledInput) => {
    this.clearableInput = clearableInput;
  };

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setValue(e.target.value, () => {
      this.resizableTextArea.resizeTextarea();
    });
    resolveOnChange(this.resizableTextArea.textArea, e, this.props.onChange);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setValue('', () => {
      this.resizableTextArea.renderTextArea();
      this.focus();
    });
    resolveOnChange(this.resizableTextArea.textArea, e, this.props.onChange);
  };

  renderTextArea = (prefixCls: string) => {
    return (
      <ResizableTextArea
        {...this.props}
        prefixCls={prefixCls}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        ref={this.saveTextArea}
      />
    );
  };

  renderComponent = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { value } = this.state;
    const { prefixCls: customizePrefixCls } = this.props;
    const prefixCls = getPrefixCls('input', customizePrefixCls);
    return (
      <ClearableLabeledInput
        {...this.props}
        prefixCls={prefixCls}
        inputType="text"
        value={fixControlledValue(value)}
        element={this.renderTextArea(prefixCls)}
        handleReset={this.handleReset}
        ref={this.saveClearableInput}
        triggerFocus={this.focus}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
  }
}

export default TextArea;
