import { genCSSVarRegister } from '../../theme/internal';
import { prepareComponentToken } from '.';

export default genCSSVarRegister('Select', prepareComponentToken, {
  unitless: {
    optionLineHeight: true,
  },
});
