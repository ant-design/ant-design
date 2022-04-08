import { createContext } from 'react';
import { Locale } from '.';

export type LocaleContextProps = Partial<Locale> & { exist?: boolean };

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export default LocaleContext;
