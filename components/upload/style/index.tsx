// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { genComponentStyleHook, resetComponent } from '../../_util/theme';
import genDraggerStyle from './dragger';
import genListStyle from './list';
import genMotionStyle from './motion';
import genRtlStyle from './rtl';
import { genPictureStyle, genPictureCardStyle } from './picture';
import type { GenerateStyle, FullToken } from '../../_util/theme';

export interface ComponentToken {
  uploadPictureCardSize: number;
  uploadPictureCardBorderStyle: CSSObject['borderStyle'];
  uploadActionsColor: CSSObject['color'];
}

const genBaseStyle: GenerateStyle<FullToken<'Upload'>> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-wrapper`]: {
      ...resetComponent(token),

      [componentCls]: {
        outline: 0,
        "input[type='file']": {
          cursor: 'pointer',
        },
      },

      [`${componentCls}-select`]: {
        display: 'inline-block',
      },

      [`${componentCls}-disabled`]: {
        cursor: 'not-allowed',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Upload',
  (token, { hashId }) => [
    genBaseStyle(token),
    genDraggerStyle(token),
    genPictureStyle(token),
    genPictureCardStyle(token),
    genListStyle(token),
    genMotionStyle(token, hashId),
    genRtlStyle(token),
  ],
  token => ({
    uploadPictureCardSize: 104,
    uploadPictureCardBorderStyle: token.controlLineType,
    uploadActionsColor: token.colorTextSecondary,
  }),
);
