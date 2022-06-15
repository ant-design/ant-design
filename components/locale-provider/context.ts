import { createContext } from 'react';
import type { Locale } from '.';

export type LocaleContextProps = Partial<Locale> & { exist?: boolean };

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export default LocaleContext;
