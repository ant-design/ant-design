import { genCSSVarRegister } from '../../theme/internal';
import { prepareComponentToken } from '.';

export default genCSSVarRegister('Menu', prepareComponentToken, {
  unitless: {
    groupTitleLineHeight: true,
  },
});
