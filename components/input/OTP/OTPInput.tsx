import * as React from 'react';
import raf from 'rc-util/lib/raf';

import Input, { type InputProps, type InputRef } from '../Input';

export interface OTPInputProps extends Omit<InputProps, 'onChange'> {
  index: number;
  onChange: (index: number, txt: string) => void;
  /** Switch to previous input */
  onBack: (index: number) => void;
  /** Switch to next input */
  onNext: (index: number) => void;
}

const OTPInput = React.forwardRef<InputRef, OTPInputProps>((props, ref) => {
  const { value, onChange, onBack, onNext, index, ...restProps } = props;

  const onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(index, e.target.value);
  };

  // ========================= Focus ==========================

  const onInternalFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    raf(() => {
      e.target.select();
    });
  };

  // ======================== Keyboard ========================
  const onInternalKeyDown: React.KeyboardEventHandler<HTMLInputElement> = ({ key }) => {
    if (key === 'ArrowLeft') {
      onBack(index);
    } else if (key === 'ArrowRight') {
      onNext(index);
    }
  };

  const onInternalKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Backspace' && !value) {
      onBack(index);
    }
  };

  // ========================= Render =========================
  return (
    <Input
      {...restProps}
      ref={ref}
      value={value}
      onInput={onInternalChange}
      onFocus={onInternalFocus}
      onKeyDown={onInternalKeyDown}
      onKeyUp={onInternalKeyUp}
    />
  );
});

export default OTPInput;
