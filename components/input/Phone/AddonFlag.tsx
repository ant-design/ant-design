import React from 'react';
import { CountryFlag } from './CountrySelector';
import { usePhoneInputContext } from './PhoneInputContext';

export function AddonFlag() {
  const { state, setIsCountrySelectorOpen } = usePhoneInputContext();

  const onClick = () => {
    setIsCountrySelectorOpen((pre) => !pre);
  };

  return (
    <div style={{ width: 25, cursor: 'pointer' }} onClick={onClick} onKeyUp={onClick}>
      <CountryFlag countryCode={state.countryCode} />
    </div>
  );
}
