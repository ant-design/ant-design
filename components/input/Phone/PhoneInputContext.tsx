import {
  AsYouType,
  type CountryCode,
  type PhoneNumber,
  getCountryCallingCode,
} from 'libphonenumber-js';
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react';
import React from 'react';
import { CustomOption } from './CountrySelector';

type PhoneState = { countryCode?: CountryCode; phone?: PhoneNumber; intlE164: string };

function reducer(
  pre: PhoneState,
  param: { countryCode?: CountryCode; typingE164?: string },
): PhoneState {
  const newCountryCode = param.countryCode;
  if (newCountryCode) {
    const nationalNumber = pre.phone?.nationalNumber.toString() || '';
    const newE164 = `+${getCountryCallingCode(newCountryCode) + nationalNumber}`;
    const asYouType = new AsYouType();
    const intlE164 = asYouType.input(newE164);
    return {
      countryCode: newCountryCode,
      phone: asYouType.getNumber(),
      intlE164,
    };
  }
  const typingE164 = param.typingE164;
  if (typingE164) {
    const asYouType = new AsYouType();
    const intlE164 = asYouType.input(typingE164);
    return {
      countryCode: asYouType.getCountry(),
      phone: asYouType.getNumber(),
      intlE164,
    };
  }
  return pre;
}

const PhoneInputContext = createContext<{
  state: PhoneState;
  dispatch: Dispatch<{ countryCode?: CountryCode; typingE164?: string }>;
  customRegions?: CustomOption[];
  isCountrySelectorOpen: boolean;
  setIsCountrySelectorOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export function PhoneInputProvider({
  defaultRegion,
  defaultValue,
  customRegions,
  children,
}: {
  defaultRegion?: CountryCode;
  defaultValue?: string;
  customRegions?: CustomOption[];
  children: ReactNode;
}) {
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [state, dispatch] = useReducer(
    reducer,
    reducer({ intlE164: '+' }, { countryCode: defaultRegion, typingE164: defaultValue }),
  );

  const value = useMemo(
    () => ({
      state,
      dispatch,
      customRegions,
      isCountrySelectorOpen,
      setIsCountrySelectorOpen,
    }),
    [state, customRegions, isCountrySelectorOpen],
  );

  return <PhoneInputContext.Provider value={value}>{children}</PhoneInputContext.Provider>;
}

export function usePhoneInputContext() {
  const context = useContext(PhoneInputContext);
  if (!context) {
    throw new Error('usePhoneInputContext must be used within <PhoneInputProvider>');
  }
  return context;
}
