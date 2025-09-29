import * as React from 'react';
import classNames from 'classnames';
import raf from 'rc-util/lib/raf';

import { ConfigContext } from '../../config-provider';
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
  const { className, value, onChange, onActiveChange, index, mask, ...restProps } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('otp');
  const maskValue = typeof mask === 'string' ? mask : value;

  // ========================== Ref ===========================
  const inputRef = React.useRef<InputRef>(null);
  React.useImperativeHandle(ref, () => inputRef.current!);

  // ========================= Input ==========================
  const onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(index, e.target.value);
  };

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
    const { key, ctrlKey, metaKey } = event;

    if (key === 'ArrowLeft') {
      onActiveChange(index - 1);
    } else if (key === 'ArrowRight') {
      onActiveChange(index + 1);
    } else if (key === 'z' && (ctrlKey || metaKey)) {
      event.preventDefault();
    } else if (key === 'Backspace' && !value) {
      onActiveChange(index - 1);
    }

    syncSelection();
  };

  // ========================= Render =========================
  return (
    <span className={`${prefixCls}-input-wrapper`} role="presentation">
      {/* mask value */}
      {mask && value !== '' && value !== undefined && (
        <span className={`${prefixCls}-mask-icon`} aria-hidden="true">
          {maskValue}
        </span>
      )}

      <Input
        aria-label={`OTP Input ${index + 1}`}
        {...restProps}
        type={mask === true ? 'password' : restProps.type || 'text'}
        ref={inputRef}
        value={value}
        onInput={onInternalChange}
        onFocus={syncSelection}
        onKeyDown={onInternalKeyDown}
        onMouseDown={syncSelection}
        onMouseUp={syncSelection}
        className={classNames(className, {
          [`${prefixCls}-mask-input`]: mask,
        })}
      />
    </span>
  );
});

export default OTPInput;
