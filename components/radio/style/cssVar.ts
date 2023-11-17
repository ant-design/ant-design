import { genCSSVarRegister } from '../../theme/internal';
import { prepareComponentToken } from '.';

export default genCSSVarRegister('Radio', prepareComponentToken, {
  unitless: {
    radioSize: true,
    dotSize: true,
  },
});
