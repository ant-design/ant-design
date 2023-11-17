import { prepareComponentToken } from '.';
import { genCSSVarRegister } from '../../theme/internal';

export default genCSSVarRegister<'Table'>('Table', prepareComponentToken, {
  unitless: {
    expandIconScale: true,
  },
});
