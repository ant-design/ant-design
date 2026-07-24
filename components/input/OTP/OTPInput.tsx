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
  const {
    className,
    value,
    onChange,
    onActiveChange,
    index,
    mask,
    onFocus,
    onCompositionStart,
    onCompositionEnd,
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('otp');
  const maskValue = typeof mask === 'string' ? mask : value;

  // ========================== Ref ===========================
  const inputRef = React.useRef<InputRef>(null);
  const composingRef = React.useRef(false);
  const composedValueRef = React.useRef<string | null>(null);

  React.useImperativeHandle(ref, () => inputRef.current!);

  // ========================= Input ==========================
  const onInternalChange: React.InputEventHandler<HTMLInputElement> = (e) => {
    if (composingRef.current || (e.nativeEvent as InputEvent).isComposing) {
      return;
    }

    const nextValue = (e.target as HTMLInputElement).value;

    if (composedValueRef.current !== null) {
      const composedValue = composedValueRef.current;
      composedValueRef.current = null;

      if (nextValue === composedValue) {
        return;
      }
    }

    onChange(index, nextValue);
  };

  const onInternalCompositionStart: React.CompositionEventHandler<HTMLInputElement> = (e) => {
    composingRef.current = true;
    composedValueRef.current = null;
    onCompositionStart?.(e);
  };

  const onInternalCompositionEnd: React.CompositionEventHandler<HTMLInputElement> = (e) => {
    composingRef.current = false;
    const nextValue = (e.target as HTMLInputElement).value;

    if (nextValue !== value) {
      composedValueRef.current = nextValue;
      onChange(index, nextValue);

      raf(() => {
        composedValueRef.current = null;
      });
    } else {
      composedValueRef.current = null;
    }

    onCompositionEnd?.(e);
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
