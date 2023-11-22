import { genCSSVarRegister } from '../../theme/internal';
import { formatComponentToken, prepareComponentToken } from '.';

export default genCSSVarRegister('Menu', prepareComponentToken, {
  unitless: {
    groupTitleLineHeight: true,
  },
  format: formatComponentToken,
});
