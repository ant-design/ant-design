import { genCSSVarRegister } from '../../theme/internal';
import { prepareComponentToken } from '.';

export default genCSSVarRegister('Radio', prepareComponentToken, {
  unitless: {
    dotCheckedScale: true,
    dotCheckedScaleDisabled: true,
  },
});
