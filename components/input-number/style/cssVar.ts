import { genCSSVarRegister } from '../../theme/internal';
import { formatComponentToken, prepareComponentToken } from '.';

export default genCSSVarRegister('InputNumber', prepareComponentToken, {
  format: formatComponentToken,
  unitless: {
    handleOpacity: true,
  },
});
