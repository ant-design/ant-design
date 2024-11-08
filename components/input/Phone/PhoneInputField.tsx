import { Input, type InputProps, type InputRef } from 'antd';
import React, { forwardRef, useEffect, useState } from 'react';
import { AddonFlag } from './AddonFlag';
import { usePhoneInputContext } from './PhoneInputContext';

export type PhoneInputFieldProps = Omit<
  InputProps,
  'type' | 'addonBefore' | 'defaultValue' | 'value' | 'status'
>;

export const PhoneInputField = forwardRef<InputRef, PhoneInputFieldProps>((props, ref) => {
  const { onChange: customOnChange, onClear: customOnClear, ...rest } = props;
  const { state, dispatch } = usePhoneInputContext();
  const { phone, intlE164 } = state;
  const [status, setStatus] = useState<'error' | undefined>();

  useEffect(() => {
    setStatus(phone?.isValid() ? undefined : 'error');
  }, [phone]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    customOnChange?.(e);
    const value = e.target.value;
    dispatch({
      typingE164: value.length === 0 ? '+' : value,
    });
  };

  const onClear = () => {
    customOnClear?.();
    dispatch({
      typingE164: '+',
    });
  };
  return (
    <Input
      {...rest}
      ref={ref}
      type="tel"
      addonBefore={<AddonFlag />}
      status={status}
      onChange={onChange}
      onClear={onClear}
      value={intlE164}
    />
  );
});
