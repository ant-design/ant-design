// deps-lint-skip-all
import type { FullToken, GenerateStyle } from '../../_util/theme';
import { genComponentStyleHook } from '../../_util/theme';

export interface ComponentToken {
  zIndexPopup: number;
}

export interface PopconfirmToken extends FullToken<'Popconfirm'> {}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<PopconfirmToken> = ({ componentCls, zIndexPopup }) => ({
  [componentCls]: {
    zIndex: zIndexPopup,
  },
});

// ============================== Export ==============================
export default genComponentStyleHook(
  'Popconfirm',
  token => genBaseStyle(token),
  token => {
    const { zIndexPopupBase } = token;

    return {
      zIndexPopup: zIndexPopupBase + 60,
    };
  },
);
