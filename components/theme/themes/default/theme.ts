import { createTheme } from '@ant-design/cssinjs';
import type { Theme } from '@ant-design/cssinjs';

import type { MapToken, SeedToken } from '../../interface';
import defaultDerivative from './index';

const defaultTheme = createTheme(defaultDerivative);

// Explicitly type the export to avoid type inference issues in declaration files
const typedDefaultTheme: Theme<SeedToken, MapToken> = defaultTheme;

export default typedDefaultTheme;
