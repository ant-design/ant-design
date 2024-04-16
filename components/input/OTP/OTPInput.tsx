import * as React from 'react';
import raf from 'rc-util/lib/raf';

import Input from '../Input';
import type { InputProps, InputRef } from '../Input';

export interface OTPInputProps extends Omit<InputProps, 'onChange'> {
  index: number;
  onChange: (index: number, value: string) => void;
  /** Tell parent to do active offset */
  onActiveChange: (nextIndex: number) => void;

  mask?: boolean | string;
}

const OTPInput = React.forwardRef<InputRef, OTPInputProps>((props, ref) => {
  const { value, onChange, onActiveChange, index, mask, ...restProps } = props;

  const internalValue = value && typeof mask === 'string' ? mask : value;

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

  // ======================== Keyboard ========================
  const onInternalKeyDown: React.KeyboardEventHandler<HTMLInputElement> = ({ key }) => {
    if (key === 'ArrowLeft') {
      onActiveChange(index - 1);
    } else if (key === 'ArrowRight') {
      onActiveChange(index + 1);
    }

    syncSelection();
  };

  const onInternalKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Backspace' && !value) {
      onActiveChange(index - 1);
    }

    syncSelection();
  };

  // ========================= Render =========================
  return (
    <Input
      {...restProps}
      ref={inputRef}
      value={internalValue}
      onInput={onInternalChange}
      onFocus={syncSelection}
      onKeyDown={onInternalKeyDown}
      onKeyUp={onInternalKeyUp}
      onMouseDown={syncSelection}
      onMouseUp={syncSelection}
      type={mask === true ? 'password' : 'text'}
    />
  );
});

export default OTPInput;
