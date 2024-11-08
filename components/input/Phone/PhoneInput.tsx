import type { InputRef } from 'antd';
import type { CountryCode } from 'libphonenumber-js';
import React, { forwardRef } from 'react';
import { CountrySelector, type CustomOption } from './CountrySelector';
import { PhoneInputProvider } from './PhoneInputContext';
import { PhoneInputField, type PhoneInputFieldProps } from './PhoneInputField';
import { SelectorOpener } from './SelectorOpener';

export type PhoneProps = PhoneInputFieldProps & {
  defaultRegion?: CountryCode;
  defaultValue?: string;
  customRegions?: CustomOption[];
};

export const Phone = forwardRef<InputRef, PhoneProps>((props, ref) => {
  const { defaultRegion, defaultValue, customRegions, ...phoneInputFieldProps } = props;
  return (
    <div style={{ position: 'relative' }}>
      <PhoneInputProvider
        defaultRegion={defaultRegion}
        defaultValue={defaultValue}
        customRegions={customRegions}
      >
        <PhoneInputField {...phoneInputFieldProps} ref={ref} />
        <SelectorOpener>
          <CountrySelector />
        </SelectorOpener>
      </PhoneInputProvider>
    </div>
  );
});
