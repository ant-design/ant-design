import * as React from 'react';
import { raf } from '@rc-component/util';
import { clsx } from 'clsx';

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
  const { className, value, onChange, onActiveChange, index, mask, onFocus, ...restProps } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('otp');
  const maskValue = typeof mask === 'string' ? mask : value;

  // ========================== Ref ===========================
  const inputRef = React.useRef<InputRef>(null);

  React.useImperativeHandle(ref, () => inputRef.current!);

  // ====================== Composition =======================
  // Track IME composition so that the intermediate value of CJK input methods
  // is not written into the cell on every `input` event (see #52093).
  const compositionRef = React.useRef(false);
  // The value committed on `compositionend`. Some browsers fire an extra
  // `input` right after `compositionend`, so we use this to avoid committing
  // the same value twice.
  const composedValueRef = React.useRef<string | null>(null);

  // ========================= Input ==========================
  const onInternalChange: React.InputEventHandler<HTMLInputElement> = (e) => {
    // Skip the intermediate values while composing. The final value is
    // submitted on `compositionend`, which keeps every IME working.
    if (compositionRef.current) {
      return;
    }
    const nextValue = (e.target as HTMLInputElement).value;
    // De-dupe the trailing `input` that some browsers emit right after
    // `compositionend` with the already-committed value.
    if (composedValueRef.current !== null) {
      const composedValue = composedValueRef.current;
      composedValueRef.current = null;
      if (nextValue === composedValue) {
        return;
      }
    }
    onChange(index, nextValue);
  };

  const onInternalCompositionStart: React.CompositionEventHandler<HTMLInputElement> = () => {
    compositionRef.current = true;
    composedValueRef.current = null;
  };

  const onInternalCompositionEnd: React.CompositionEventHandler<HTMLInputElement> = (e) => {
    compositionRef.current = false;
    const nextValue = (e.target as HTMLInputElement).value;
    // Composition can end without a real change (e.g. cancelled by `Esc` or
    // blur). Skip in that case so we don't emit a redundant `onChange`.
    if (nextValue === value) {
      composedValueRef.current = null;
      return;
    }
    composedValueRef.current = nextValue;
    onChange(index, nextValue);
    // The trailing `input` (if any) arrives synchronously right after
    // `compositionend`. Clear the ref in the next tick so a browser that
    // never fires that trailing `input` can not leave a stale value behind
    // and block typing the same character again later.
    raf(() => {
      composedValueRef.current = null;
    });
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

  const onInternalFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    onFocus?.(e);
    syncSelection();
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
        type={mask === true ? 'password' : 'text'}
        {...restProps}
        ref={inputRef}
        value={value}
        onInput={onInternalChange}
        onCompositionStart={onInternalCompositionStart}
        onCompositionEnd={onInternalCompositionEnd}
        onFocus={onInternalFocus}
        onKeyDown={onInternalKeyDown}
        onMouseDown={syncSelection}
        onMouseUp={syncSelection}
        className={clsx(className, { [`${prefixCls}-mask-input`]: mask })}
      />
    </span>
  );
});

export default OTPInput;
