import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import type { GetProps, GetRef, InputProps } from 'antd';
import { Input, Select } from 'antd';
import type { CountryIso2 } from 'react-international-phone';
import {
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';

const SelectCountryCode = forwardRef<
  GetRef<typeof Select<CountryIso2>>,
  GetProps<typeof Select<CountryIso2>>
>((props, ref) => {
  const options = useMemo(
    () =>
      defaultCountries.map((country) => {
        const countryData = parseCountry(country);
        return {
          value: countryData.iso2,
          label: <FlagImage iso2={countryData.iso2} size={24} />,
        };
      }),
    [],
  );
  return <Select {...props} options={options} ref={ref} aria-label="Country code" />;
});

SelectCountryCode.displayName = 'SelectCountryCode';

interface PhoneInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

const AntdPhoneInput = forwardRef<GetRef<typeof Input>, PhoneInputProps>(
  ({ value, onChange, ...props }, ref) => {
    const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
      defaultCountry: 'us',
      value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone);
      },
    });

    const handleRef = useCallback(
      (node: GetRef<typeof Input>) => {
        // Assign to usePhoneInput ref
        inputRef.current = node?.input || null;

        // Forward ref to parent
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [inputRef, ref],
    );

    return (
      <Input
        ref={handleRef}
        addonBefore={
          <SelectCountryCode value={country.iso2} onChange={(value) => setCountry(value)} />
        }
        value={inputValue}
        onChange={handlePhoneValueChange}
        aria-label="Phone number"
        {...props}
      />
    );
  },
);

AntdPhoneInput.displayName = 'AntdPhoneInput';

const App: React.FC = () => {
  const [value, setValue] = useState('');

  return <AntdPhoneInput value={value} onChange={setValue} />;
};

export default App;
