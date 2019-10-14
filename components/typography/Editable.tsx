import * as React from 'react';
import KeyCode from 'rc-util/lib/KeyCode';
import { polyfill } from 'react-lifecycles-compat';
import Icon from '../icon';
import TextArea from '../input/TextArea';

interface EditableProps {
  prefixCls?: string;
  value?: string;
  ['aria-label']?: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  className?: string;
  style?: React.CSSProperties;
}

interface EditableState {
  current: string;
  prevValue?: string;
}

class Editable extends React.Component<EditableProps, EditableState> {
  static getDerivedStateFromProps(nextProps: EditableProps, prevState: EditableState) {
    const { prevValue } = prevState;
    const { value } = nextProps;
    const newState: Partial<EditableState> = {
      prevValue: value,
    };

    if (prevValue !== value) {
      newState.current = value;
    }

    return newState;
  }

  textarea?: TextArea;

  lastKeyCode?: number;

  inComposition?: boolean = false;

  state = {
    current: '',
  };

  componentDidMount() {
    if (this.textarea) {
      this.textarea.focus();
    }
  }

  onChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({ target: { value } }) => {
    this.setState({ current: value.replace(/[\r\n]/g, '') });
  };

  onCompositionStart = () => {
    this.inComposition = true;
  };

  onCompositionEnd = () => {
    this.inComposition = false;
  };

  onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = ({ keyCode }) => {
    // We don't record keyCode when IME is using
    if (this.inComposition) return;

    this.lastKeyCode = keyCode;
  };

  onKeyUp: React.KeyboardEventHandler<HTMLTextAreaElement> = ({
    keyCode,
    ctrlKey,
    altKey,
    metaKey,
    shiftKey,
  }) => {
    const { onCancel } = this.props;
    // Check if it's a real key
    if (
      this.lastKeyCode === keyCode &&
      !this.inComposition &&
      !ctrlKey &&
      !altKey &&
      !metaKey &&
      !shiftKey
    ) {
      if (keyCode === KeyCode.ENTER) {
        this.confirmChange();
      } else if (keyCode === KeyCode.ESC) {
        onCancel();
      }
    }
  };

  onBlur: React.FocusEventHandler<HTMLTextAreaElement> = () => {
    this.confirmChange();
  };

  confirmChange = () => {
    const { current } = this.state;
    const { onSave } = this.props;

    onSave(current.trim());
  };

  setTextarea = (textarea: TextArea) => {
    this.textarea = textarea;
  };

  render() {
    const { current } = this.state;
    const { prefixCls, 'aria-label': ariaLabel, className, style } = this.props;

    return (
      <div className={`${prefixCls} ${prefixCls}-edit-content ${className}`} style={style}>
        <TextArea
          ref={this.setTextarea}
          value={current}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          onCompositionStart={this.onCompositionStart}
          onCompositionEnd={this.onCompositionEnd}
          onBlur={this.onBlur}
          aria-label={ariaLabel}
          autoSize
        />
        <Icon type="enter" className={`${prefixCls}-edit-content-confirm`} />
      </div>
    );
  }
}

polyfill(Editable);

export default Editable;
