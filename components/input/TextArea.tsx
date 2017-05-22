import React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { AbstractInputProps } from './Input';
import calculateNodeHeight from './calculateNodeHeight';

function onNextFrame(cb) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }
  return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

export interface TextAreaProps extends AbstractInputProps {
  autosize?: boolean | AutoSizeType;
  onPressEnter?: React.FormEventHandler<any>;
}

export type HTMLTextareaProps = React.HTMLProps<HTMLTextAreaElement>;

export default class TextArea extends React.Component<TextAreaProps & HTMLTextareaProps, any> {
  static defaultProps = {
    prefixCls: 'ant-input',
  };

  nextFrameActionId: number;
  textAreaRef: HTMLTextAreaElement;
  state = {
    textareaStyles: null,
  };

  componentDidMount() {
    this.resizeTextarea();
  }

  componentWillReceiveProps(nextProps) {
    // Re-render with the new content then recalculate the height as required.
    if (this.props.value !== nextProps.value) {
      if (this.nextFrameActionId) {
        clearNextFrameAction(this.nextFrameActionId);
      }
      this.nextFrameActionId = onNextFrame(this.resizeTextarea);
    }
  }

  focus() {
    this.textAreaRef.focus();
  }

  blur() {
    this.textAreaRef.blur();
  }

  resizeTextarea = () => {
    const { autosize } = this.props;
    if (!autosize || !this.textAreaRef) {
      return;
    }
    const minRows = autosize ? (autosize as AutoSizeType).minRows : null;
    const maxRows = autosize ? (autosize as AutoSizeType).maxRows : null;
    const textareaStyles = calculateNodeHeight(this.textAreaRef, false, minRows, maxRows);
    this.setState({ textareaStyles });
  }

  handleTextareaChange = (e) => {
    if (!('value' in this.props)) {
      this.resizeTextarea();
    }
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  }

  handleKeyDown = (e) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  saveTextAreaRef = (textArea) => {
    this.textAreaRef = textArea;
  }

  render() {
    const props = this.props;
    const otherProps = omit(props, [
      'prefixCls',
      'onPressEnter',
      'autosize',
    ]);
    const style = {
      ...props.style,
      ...this.state.textareaStyles,
    };
    return (
      <textarea
        {...otherProps}
        className={classNames(props.prefixCls, props.className)}
        style={style}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleTextareaChange}
        ref={this.saveTextAreaRef}
      />
    );
  }
}
