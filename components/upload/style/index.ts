import { resetComponent } from '../../style';
import { genCollapseMotion } from '../../style/motion';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import genDraggerStyle from './dragger';
import genListStyle from './list';
import genMotionStyle from './motion';
import { genPictureCardStyle, genPictureStyle } from './picture';
import genRtlStyle from './rtl';

export interface ComponentToken {
  /**
   * @desc 操作按扭颜色
   * @descEN Action button color
   */
  actionsColor: string;
}

export interface UploadToken extends FullToken<'Upload'> {
  uploadThumbnailSize: number | string;
  uploadProgressOffset: number | string;
  uploadPicCardSize: number | string;
}

const genBaseStyle: GenerateStyle<UploadToken> = (token) => {
  const { componentCls, colorTextDisabled } = token;

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

      [`${componentCls}-hidden`]: {
        display: 'none',
      },

      [`${componentCls}-disabled`]: {
        color: colorTextDisabled,
        cursor: 'not-allowed',
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Upload'> = (token) => ({
  actionsColor: token.colorTextDescription,
});

// ============================== Export ==============================
export default genStyleHooks(
  'Upload',
  (token) => {
    const { fontSizeHeading3, fontHeight, lineWidth, controlHeightLG, calc } = token;

    const uploadToken = mergeToken<UploadToken>(token, {
      uploadThumbnailSize: calc(fontSizeHeading3).mul(2).equal(),
      uploadProgressOffset: calc(calc(fontHeight).div(2)).add(lineWidth).equal(),
      uploadPicCardSize: calc(controlHeightLG).mul(2.55).equal(),
    });

    return [
      genBaseStyle(uploadToken),
      genDraggerStyle(uploadToken),
      genPictureStyle(uploadToken),
      genPictureCardStyle(uploadToken),
      genListStyle(uploadToken),
      genMotionStyle(uploadToken),
      genRtlStyle(uploadToken),
      genCollapseMotion(uploadToken),
    ];
  },
  prepareComponentToken,
);
