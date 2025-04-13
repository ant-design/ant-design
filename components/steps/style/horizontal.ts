import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genHorizontalStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls } = token;
  const stepsItemCls = `${componentCls}-item`; // .ant-steps-item

  return {
    [`${componentCls}-horizontal`]: {
      [`${stepsItemCls}-tail`]: {
        transform: 'translateY(-50%)',
      },
    },
  };
};

export default genHorizontalStyle;
