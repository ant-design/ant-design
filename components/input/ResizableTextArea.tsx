import * as React from 'react';
import ResizeObserver from 'rc-resize-observer';
import omit from 'omit.js';
import classNames from 'classnames';
import calculateNodeHeight from './calculateNodeHeight';
import raf from '../_util/raf';
import { TextAreaProps } from './TextArea';

const RESIZE_STATUS_NONE = 0;
const RESIZE_STATUS_RESIZING = 1;
const RESIZE_STATUS_RESIZED = 2;

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

export interface TextAreaState {
  textareaStyles?: React.CSSProperties;
  /** We need add process style to disable scroll first and then add back to avoid unexpected scrollbar  */
  resizeStatus?:
    | typeof RESIZE_STATUS_NONE
    | typeof RESIZE_STATUS_RESIZING
    | typeof RESIZE_STATUS_RESIZED;
}

class ResizableTextArea extends React.Component<TextAreaProps, TextAreaState> {
  nextFrameActionId: number;

  resizeFrameId: number;

  constructor(props: TextAreaProps) {
    super(props);
    this.state = {
      textareaStyles: {},
      resizeStatus: RESIZE_STATUS_NONE,
    };
  }

  textArea: HTMLTextAreaElement;

  saveTextArea = (textArea: HTMLTextAreaElement) => {
    this.textArea = textArea;
  };

  componentDidMount() {
    this.resizeTextarea();
  }

  componentDidUpdate(prevProps: TextAreaProps) {
    // Re-render with the new content then recalculate the height as required.
    if (prevProps.value !== this.props.value) {
      this.resizeTextarea();
    }
  }

  handleResize = (size: { width: number; height: number }) => {
    const { resizeStatus } = this.state;
    const { autoSize, onResize } = this.props;

    if (resizeStatus !== RESIZE_STATUS_NONE) {
      return;
    }

    if (typeof onResize === 'function') {
      onResize(size);
    }
    if (autoSize) {
      this.resizeOnNextFrame();
    }
  };

  resizeOnNextFrame = () => {
    raf.cancel(this.nextFrameActionId);
    this.nextFrameActionId = raf(this.resizeTextarea);
  };

  resizeTextarea = () => {
    const { autoSize } = this.props;
    if (!autoSize || !this.textArea) {
      return;
    }
    const { minRows, maxRows } = autoSize as AutoSizeType;
    const textareaStyles = calculateNodeHeight(this.textArea, false, minRows, maxRows);
    this.setState({ textareaStyles, resizeStatus: RESIZE_STATUS_RESIZING }, () => {
      raf.cancel(this.resizeFrameId);
      this.resizeFrameId = raf(() => {
        this.setState({ resizeStatus: RESIZE_STATUS_RESIZED }, () => {
          this.resizeFrameId = raf(() => {
            this.setState({ resizeStatus: RESIZE_STATUS_NONE });
          });
        });
      });
    });
  };

  componentWillUnmount() {
    raf.cancel(this.nextFrameActionId);
    raf.cancel(this.resizeFrameId);
  }

  renderTextArea = () => {
    const { prefixCls, autoSize, onResize, className, disabled } = this.props;
    const { textareaStyles, resizeStatus } = this.state;
    const otherProps = omit(this.props, [
      'prefixCls',
      'onPressEnter',
      'autoSize',
      'defaultValue',
      'allowClear',
      'onResize',
    ]);
    const cls = classNames(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled,
    });
    // Fix https://github.com/ant-design/ant-design/issues/6776
    // Make sure it could be reset when using form.getFieldDecorator
    if ('value' in otherProps) {
      otherProps.value = otherProps.value || '';
    }
    const style = {
      ...this.props.style,
      ...textareaStyles,
      ...(resizeStatus === RESIZE_STATUS_RESIZING ? { overflow: 'hidden' } : null),
    };
    return (
      <ResizeObserver onResize={this.handleResize} disabled={!(autoSize || onResize)}>
        <textarea {...otherProps} className={cls} style={style} ref={this.saveTextArea} />
      </ResizeObserver>
    );
  };

  render() {
    return this.renderTextArea();
  }
}

export default ResizableTextArea;
