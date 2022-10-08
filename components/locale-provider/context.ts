import { createContext } from 'react';
import type { Locale } from '.';

export type LocaleContextProps = Locale & { exist?: boolean };

const LocaleContext = createContext<LocaleContextProps | null>(null);

export default LocaleContext;
