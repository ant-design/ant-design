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

  // ========================== Ref ===========================
  const inputRef = React.useRef<InputRef>(null);
  React.useImperativeHandle(ref, () => inputRef.current!);

  // ========================= Focus ==========================
  const syncSelection = () => {
    raf(() => {
      const inputEle = inputRef.current?.input;
      if (document.activeElement === inputEle && inputEle) {
        inputEle.select();
      }
    });
  };

  const onInternalFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    syncSelection();
  };

  // ======================== Keyboard ========================
  const onInternalKeyDown: React.KeyboardEventHandler<HTMLInputElement> = ({ key }) => {
    if (key === 'ArrowLeft') {
      onBack(index);
    } else if (key === 'ArrowRight') {
      onNext(index);
    }

    syncSelection();
  };

  const onInternalKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Backspace' && !value) {
      onBack(index);
    }

    syncSelection();
  };

  // ========================= Render =========================
  return (
    <Input
      {...restProps}
      ref={inputRef}
      value={value}
      onInput={onInternalChange}
      onFocus={onInternalFocus}
      onKeyDown={onInternalKeyDown}
      onKeyUp={onInternalKeyUp}
      onMouseDown={syncSelection}
      onMouseUp={syncSelection}
    />
  );
});

export default OTPInput;
