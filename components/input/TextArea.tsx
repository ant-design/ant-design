import * as React from 'react';
import RcTextArea, { TextAreaProps as RcTextAreaProps, ResizableTextArea } from 'rc-textarea';
import omit from 'omit.js';
import ClearableLabeledInput from './ClearableLabeledInput';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { fixControlledValue, resolveOnChange } from './Input';

export interface TextAreaProps extends RcTextAreaProps {
  allowClear?: boolean;
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

  renderTextArea = (prefixCls: string) => {
    return (
      <RcTextArea
        {...omit(this.props, ['allowClear'])}
        prefixCls={prefixCls}
        onChange={this.handleChange}
        ref={this.saveTextArea}
      />
    );
  };

  renderComponent = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const { value } = this.state;
    const { prefixCls: customizePrefixCls } = this.props;
    const prefixCls = getPrefixCls('input', customizePrefixCls);
    return (
      <ClearableLabeledInput
        {...this.props}
        prefixCls={prefixCls}
        direction={direction}
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
