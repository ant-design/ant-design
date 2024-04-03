import * as React from 'react';
import raf from 'rc-util/lib/raf';

import Input from '../Input';
import type { InputProps, InputRef } from '../Input';

export interface OTPInputProps extends Omit<InputProps, 'onChange'> {
  index: number;
  onChange: (index: number, value: string) => void;
  /** Tell parent to do active offset */
  onActiveChange: (nextIndex: number) => void;
  /**
   * @descCN 如果希望在 Input.OTP 输入框展示密文，可以设置 `mask` 为 `true`，或者设置为自定义的字符。
   * @descEN If you want to display the ciphertext in the Input.OTP, you can set `mask` to `true`, or set a custom character.
   * @default false
   * @since 5.17.0
   */
  mask?: boolean | string;
}

const OTPInput = React.forwardRef<InputRef, OTPInputProps>((props, ref) => {
  const { value, onChange, onActiveChange, index, mask, ...restProps } = props;
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
      value={value}
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
