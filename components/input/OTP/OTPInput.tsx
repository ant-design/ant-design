import * as React from 'react';
import raf from 'rc-util/lib/raf';

import Input from '../Input';
import type { InputProps, InputRef } from '../Input';

export interface OTPInputProps extends Omit<InputProps, 'onChange'> {
  index: number;
  onChange: (index: number, value: string) => void;
  /** Tell parent to do active offset */
  onActiveChange: (nextIndex: number) => void;
  allowedSymbols?: RegExp;
  type?: 'alphanumeric' | 'numeric';
  mask?: boolean | string;
}
const types = ['alphanumeric', 'numeric']
const OTPInput = React.forwardRef<InputRef, OTPInputProps>((props, ref) => {
  const { value, onChange, onActiveChange, index, mask, type, allowedSymbols, ...restProps } = props;

  const internalValue = value && typeof mask === 'string' ? mask : value;

  const onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let result = true;
    if (type && types.includes(type)) {
      switch (type) {
        case "alphanumeric":
          result = /^[0-9a-zA-Z]+$/g.test(e.target.value);
          break;
        case "numeric":
          result = /^\d+$/g.test(e.target.value)
          break;
        default:
          result = true;
      };
    } else if (allowedSymbols instanceof RegExp) {
      result = allowedSymbols.test(e.target.value);
    }
    onChange(index, result ? e.target.value : '');
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
      type={mask === true ? 'password' : 'text'}
      {...restProps}
      ref={inputRef}
      value={internalValue}
      onInput={onInternalChange}
      onFocus={syncSelection}
      onKeyDown={onInternalKeyDown}
      onKeyUp={onInternalKeyUp}
      onMouseDown={syncSelection}
      onMouseUp={syncSelection}
    />
  );
});

export default OTPInput;
