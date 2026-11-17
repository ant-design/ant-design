import { createContext } from 'react';

import type { Variant } from '../config-provider';

// Kept apart from `./context` so components reading the variant
// don't import the whole `@rc-component/form` through it.
export const VariantContext = createContext<Variant | undefined>(undefined);
