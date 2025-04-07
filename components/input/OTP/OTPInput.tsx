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
  const internalValue = value && maskValue;

  // ========================== Ref ===========================
  const inputRef = React.useRef<InputRef>(null);
  React.useImperativeHandle(ref, () => inputRef.current!);

  // ========================= Input ==========================
  const onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (inputRef.current?.input && maskValue) {
      const escapedMaskValue = maskValue
        .toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
      const inputBackgroundStyle = inputRef.current.input.style;
      if (e.target.value && restProps.type === 'number' && typeof mask === 'string') {
        inputBackgroundStyle.background = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><text x='50%' y='50%' dominant-baseline='central' text-anchor='middle'>${escapedMaskValue}</text></svg>") center center / 26px no-repeat #fff`;
      } else {
        inputBackgroundStyle.background = '';
      }
    }
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
      value={restProps.type === 'number' ? value : internalValue}
      onInput={onInternalChange}
      onFocus={syncSelection}
      onKeyDown={onInternalKeyDown}
      onKeyUp={onInternalKeyUp}
      onMouseDown={syncSelection}
      onMouseUp={syncSelection}
      className={classNames(className, {
        [`${prefixCls}-mask-number`]: restProps.type === 'number' && mask,
      })}
    />
  );
});

export default OTPInput;
