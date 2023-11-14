import { genCSSVarRegister } from '../../theme/internal';
import { prepareComponentToken } from '.';

export default genCSSVarRegister('Modal', prepareComponentToken, {
  unitless: {
    titleLineHeight: true,
  },
});
