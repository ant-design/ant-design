import * as React from 'react';
import KeyCode from 'rc-util/lib/KeyCode';
import { polyfill } from 'react-lifecycles-compat';
import TextArea from '../input/TextArea';

interface EditableProps {
  value?: string;
  onChange?: (value: string) => void;
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

  state = {
    current: '',
  };

  componentDidMount() {
    if (this.textarea) {
      this.textarea.focus();
    }
  }

  onChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({ target: { value } }) => {
    this.setState({ current: value });
  };

  onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = ({ keyCode }) => {
    if (keyCode === KeyCode.ENTER) {
      const { current } = this.state;
      const { onChange } = this.props;

      if (onChange) {
        onChange(current.trim());
      }
    }
  };

  setTextarea = (textarea: TextArea) => {
    this.textarea = textarea;
  };

  render() {
    const { current } = this.state;

    return (
      <TextArea
        ref={this.setTextarea}
        value={current}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        autosize
      />
    );
  }
}

polyfill(Editable);

export default Editable;
