import { prepareColComponentToken, prepareRowComponentToken } from '.';
import { genCSSVarRegister } from '../../theme/internal';

export const useColCssVar = genCSSVarRegister<'Grid'>('Grid', prepareColComponentToken);

export const useRowCssVar = genCSSVarRegister<'Grid'>('Grid', prepareRowComponentToken);
