import React from 'react';
import { usePhoneInputContext } from './PhoneInputContext';

export function SelectorOpener({ children }: { children: React.ReactNode }) {
  const { isCountrySelectorOpen, setIsCountrySelectorOpen } = usePhoneInputContext();
  return (
    <div
      style={{
        visibility: isCountrySelectorOpen ? 'visible' : 'hidden',
        width: '100%',
        top: 'auto',
        position: 'absolute',
        zIndex: 100,
      }}
      onBlur={() => setIsCountrySelectorOpen(false)}
    >
      {children}
    </div>
  );
}
