import * as React from 'react';

import Input, { type InputProps, type InputRef } from '../Input';

export interface OTPInputProps extends Omit<InputProps, 'onChange'> {
  index: number;
  onChange: (index: number, txt: string) => void;
  /** Trigger when current is empty and clear content */
  onBack: (index: number) => void;
}

const OTPInput = React.forwardRef<InputRef, OTPInputProps>((props, ref) => {
  const { value, onChange, onBack, index, ...restProps } = props;

  const onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(index, e.target.value);
  };

  // ========================= Focus ==========================
  const onInternalFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    e.target.select();
  };

  // ======================== Keyboard ========================
  const lockBackRef = React.useRef<boolean>(false);

  const onInternalKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Backspace' && value) {
      lockBackRef.current = true;
    }
  };

  const onInternalKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Backspace' && !value && !lockBackRef.current) {
      onBack(index);
    }
    lockBackRef.current = false;
  };

  // ========================= Render =========================
  return (
    <Input
      {...restProps}
      ref={ref}
      value={value}
      onChange={onInternalChange}
      onFocus={onInternalFocus}
      onKeyDown={onInternalKeyDown}
      onKeyUp={onInternalKeyUp}
    />
  );
});

export default OTPInput;
