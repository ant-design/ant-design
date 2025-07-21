// Style as status component
import type { CSSInterpolation } from '@ant-design/cssinjs';

import { prepareComponentToken, prepareToken } from '.';
import type { TagToken } from '.';
import capitalize from '../../_util/capitalize';
import { genSubStyleComponent } from '../../theme/internal';

// ============================== Status ==============================
type CssVariableType = 'Success' | 'Info' | 'Error' | 'Warning';

const genTagStatusStyle = (
  token: TagToken,
  status: 'success' | 'processing' | 'error' | 'warning',
  cssVariableType: CssVariableType,
): CSSInterpolation => {
  const capitalizedCssVariableType = capitalize<CssVariableType>(cssVariableType);
  return {
    [`${token.componentCls}${token.componentCls}-${status}:not(${token.componentCls}-disabled)`]: {
      [`&${token.componentCls}-outlined`]: {
        backgroundColor: token[`color${capitalizedCssVariableType}Bg`],
        borderColor: token[`color${capitalizedCssVariableType}Border`],
        color: token[`color${cssVariableType}`],
      },
      [`&${token.componentCls}-solid`]: {
        backgroundColor: token[`color${cssVariableType}`],
        borderColor: token[`color${cssVariableType}`],
      },
      [`&${token.componentCls}-filled`]: {
        backgroundColor: token[`color${capitalizedCssVariableType}Bg`],
        color: token[`color${cssVariableType}`],
      },
    },
  };
};

// ============================== Export ==============================
export default genSubStyleComponent<'Tag'>(
  ['Tag', 'status'],
  (token) => {
    const tagToken = prepareToken(token);
    return [
      genTagStatusStyle(tagToken, 'success', 'Success'),
      genTagStatusStyle(tagToken, 'processing', 'Info'),
      genTagStatusStyle(tagToken, 'error', 'Error'),
      genTagStatusStyle(tagToken, 'warning', 'Warning'),
    ];
  },
  prepareComponentToken,
);
