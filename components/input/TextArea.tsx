import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import calculateNodeHeight from './calculateNodeHeight';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import ResizeObserver from '../_util/resizeObserver';
import raf from '../_util/raf';

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

export type HTMLTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface TextAreaProps extends HTMLTextareaProps {
  prefixCls?: string;
  autosize?: boolean | AutoSizeType;
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}

export interface TextAreaState {
  textareaStyles?: React.CSSProperties;
  /** We need add process style to disable scroll first and then add back to avoid unexpected scrollbar  */
  resizing?: boolean;
}

class TextArea extends React.Component<TextAreaProps, TextAreaState> {
  nextFrameActionId: number;

  resizeFrameId: number;

  state = {
    textareaStyles: {},
    resizing: false,
  };

  private textAreaRef: HTMLTextAreaElement;

  componentDidMount() {
    this.resizeTextarea();
  }

  componentDidUpdate(prevProps: TextAreaProps) {
    // Re-render with the new content then recalculate the height as required.
    if (prevProps.value !== this.props.value) {
      this.resizeTextarea();
    }
  }

  componentWillUnmount() {
    raf.cancel(this.nextFrameActionId);
    raf.cancel(this.resizeFrameId);
  }

  saveTextAreaRef = (textArea: HTMLTextAreaElement) => {
    this.textAreaRef = textArea;
  };

  handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!('value' in this.props)) {
      this.resizeTextarea();
    }
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
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

  resizeOnNextFrame = () => {
    raf.cancel(this.nextFrameActionId);
    this.nextFrameActionId = raf(this.resizeTextarea);
  };

  resizeTextarea = () => {
    const { autosize } = this.props;
    if (!autosize || !this.textAreaRef) {
      return;
    }
    const { minRows, maxRows } = autosize as AutoSizeType;
    const textareaStyles = calculateNodeHeight(this.textAreaRef, false, minRows, maxRows);
    this.setState({ textareaStyles, resizing: true }, () => {
      raf.cancel(this.resizeFrameId);
      this.resizeFrameId = raf(() => {
        this.setState({ resizing: false });
      });
    });
  };

  focus() {
    this.textAreaRef.focus();
  }

  blur() {
    this.textAreaRef.blur();
  }

  renderTextArea = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { textareaStyles, resizing } = this.state;
    const { prefixCls: customizePrefixCls, className, disabled, autosize } = this.props;
    const { ...props } = this.props;
    const otherProps = omit(props, ['prefixCls', 'onPressEnter', 'autosize']);
    const prefixCls = getPrefixCls('input', customizePrefixCls);
    const cls = classNames(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled,
    });

    const style = {
      ...props.style,
      ...textareaStyles,
      ...(resizing ? { overflow: 'hidden' } : null),
    };
    // Fix https://github.com/ant-design/ant-design/issues/6776
    // Make sure it could be reset when using form.getFieldDecorator
    if ('value' in otherProps) {
      otherProps.value = otherProps.value || '';
    }
    return (
      <ResizeObserver onResize={this.resizeOnNextFrame} disabled={!autosize}>
        <textarea
          {...otherProps}
          className={cls}
          style={style}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleTextareaChange}
          ref={this.saveTextAreaRef}
        />
      </ResizeObserver>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderTextArea}</ConfigConsumer>;
  }
}

polyfill(TextArea);

export default TextArea;
