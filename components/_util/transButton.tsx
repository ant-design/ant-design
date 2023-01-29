/**
 * Wrap the sub-component that needs to be used as a button (such as an Icon component).
 *
 * This helps accessibility readers treat it as an interactive button for operation.
 */
import KeyCode from 'rc-util/lib/KeyCode';
import * as React from 'react';

interface TransButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  noStyle?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
}

const inlineStyle: React.CSSProperties = {
  border: 0,
  background: 'transparent',
  padding: 0,
  lineHeight: 'inherit',
  display: 'inline-block',
};

const TransButton = React.forwardRef<HTMLDivElement, TransButtonProps>((props, ref) => {
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    const { keyCode } = event;
    if (keyCode === KeyCode.ENTER) {
      event.preventDefault();
    }
  };

  const onKeyUp: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    const { keyCode } = event;
    const { onClick } = props;
    if (keyCode === KeyCode.ENTER && onClick) {
      onClick();
    }
  };

  const { style, noStyle, disabled, ...restProps } = props;

  let mergedStyle: React.CSSProperties = {};

  if (!noStyle) {
    mergedStyle = {
      ...inlineStyle,
    };
  }

  if (disabled) {
    mergedStyle.pointerEvents = 'none';
  }

  mergedStyle = {
    ...mergedStyle,
    ...style,
  };

  return (
    <div
      role="button"
      tabIndex={0}
      ref={ref}
      {...restProps}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      style={mergedStyle}
    />
  );
});

export default TransButton;
