import { createContext } from 'react';
import { Locale } from '.';

const LocaleContext = createContext<(Partial<Locale> & { exist?: boolean }) | undefined>(undefined);

export default LocaleContext;
