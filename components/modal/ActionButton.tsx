import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '../button';
import { ButtonType, ButtonProps } from '../button/button';

export interface ActionButtonProps {
  type?: ButtonType;
  actionFn?: (...args: any[]) => any | PromiseLike<any>;
  closeModal: Function;
  autoFocus?: boolean;
  buttonProps?: ButtonProps;
}

export interface ActionButtonState {
  loading: ButtonProps['loading'];
}

export default class ActionButton extends React.Component<ActionButtonProps, ActionButtonState> {
  timeoutId: number;

  clicked: boolean;

  state = {
    loading: false,
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      const $this = ReactDOM.findDOMNode(this) as HTMLInputElement;
      this.timeoutId = setTimeout(() => $this.focus());
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  handlePromiseOnOk(returnValueOfOnOk?: PromiseLike<any>) {
    const { closeModal } = this.props;
    if (!returnValueOfOnOk || !returnValueOfOnOk.then) {
      return;
    }
    this.setState({ loading: true });
    returnValueOfOnOk.then(
      (...args: any[]) => {
        // It's unnecessary to set loading=false, for the Modal will be unmounted after close.
        // this.setState({ loading: false });
        closeModal(...args);
      },
      (e: Error) => {
        // Emit error when catch promise reject
        // eslint-disable-next-line no-console
        console.error(e);
        // See: https://github.com/ant-design/ant-design/issues/6183
        this.setState({ loading: false });
        this.clicked = false;
      },
    );
  }

  onClick = () => {
    const { actionFn, closeModal } = this.props;
    if (this.clicked) {
      return;
    }
    this.clicked = true;
    if (!actionFn) {
      closeModal();
      return;
    }
    let returnValueOfOnOk;
    if (actionFn.length) {
      returnValueOfOnOk = actionFn(closeModal);
      // https://github.com/ant-design/ant-design/issues/23358
      this.clicked = false;
    } else {
      returnValueOfOnOk = actionFn();
      if (!returnValueOfOnOk) {
        closeModal();
        return;
      }
    }
    this.handlePromiseOnOk(returnValueOfOnOk);
  };

  render() {
    const { type, children, buttonProps } = this.props;
    const { loading } = this.state;
    return (
      <Button type={type} onClick={this.onClick} loading={loading} {...buttonProps}>
        {children}
      </Button>
    );
  }
}
