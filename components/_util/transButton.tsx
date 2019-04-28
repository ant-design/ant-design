/**
 * Wrap of sub component which need use as Button capacity (like Icon component).
 * This helps accessibility reader to tread as a interactive button to operation.
 */
import * as React from 'react';
import KeyCode from 'rc-util/lib/KeyCode';

interface TransButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

const inlineStyle: React.CSSProperties = {
  border: 0,
  background: 'transparent',
  padding: 0,
  lineHeight: 'inherit',
  display: 'inline-block',
};

class TransButton extends React.Component<TransButtonProps> {
  div?: HTMLDivElement;
  lastKeyCode?: number;

  onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = event => {
    const { keyCode } = event;
    if (keyCode === KeyCode.ENTER) {
      event.preventDefault();
    }
  };

  onKeyUp: React.KeyboardEventHandler<HTMLDivElement> = event => {
    const { keyCode } = event;
    const { onClick } = this.props;
    if (keyCode === KeyCode.ENTER && onClick) {
      onClick();
    }
  };

  setRef = (btn: HTMLDivElement) => {
    this.div = btn;
  };

  focus() {
    if (this.div) {
      this.div.focus();
    }
  }

  blur() {
    if (this.div) {
      this.div.blur();
    }
  }

  render() {
    const { style } = this.props;
    return (
      <div
        role="button"
        tabIndex={0}
        ref={this.setRef}
        {...this.props}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        style={{ ...inlineStyle, ...style }}
      />
    );
  }
}

export default TransButton;
