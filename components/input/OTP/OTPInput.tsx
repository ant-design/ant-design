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
  /**
   * @internal Only for `OTP` usage. Do not use in production.
   */
  __internalLastIndex?: number;
}

const OTPInput = React.forwardRef<InputRef, OTPInputProps>((props, ref) => {
  const {
    value,
    onChange,
    onActiveChange,
    index,
    mask,
    __internalLastIndex = index,
    ...restProps
  } = props;

  const internalValue = value && typeof mask === 'string' ? mask : value;

  const nextIndex = React.useRef<number>(index);

  const onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(index, event.target.value);
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
  const onInternalKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Delete' && nextIndex.current < __internalLastIndex) {
      event.preventDefault();
      onChange(++nextIndex.current, '');
      return;
    }
    nextIndex.current = index;

    if (event.key === 'ArrowLeft') {
      onActiveChange(index - 1);
    } else if (event.key === 'ArrowRight') {
      onActiveChange(index + 1);
    }

    syncSelection();
  };

  const onInternalKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Backspace' && !value) {
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
