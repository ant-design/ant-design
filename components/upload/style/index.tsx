import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken, resetComponent } from '../../theme';
import genDraggerStyle from './dragger';
import genListStyle from './list';
import genMotionStyle from './motion';
import { genPictureCardStyle, genPictureStyle } from './picture';
import genRtlStyle from './rtl';

export interface ComponentToken {}

export interface UploadToken extends FullToken<'Upload'> {
  uploadThumbnailSize: number;
  uploadProgressOffset: number;
  uploadPicCardSize: number;
}

const genBaseStyle: GenerateStyle<UploadToken> = token => {
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
export default genComponentStyleHook('Upload', token => {
  const { fontSizeHeading3, fontSizeBase, lineHeight, lineWidth, controlHeightLG } = token;
  const listItemHeightSM = Math.round(fontSizeBase * lineHeight);

  const uploadToken = mergeToken<UploadToken>(token, {
    uploadThumbnailSize: fontSizeHeading3 * 2,
    uploadProgressOffset: listItemHeightSM / 2 + lineWidth,
    uploadPicCardSize: controlHeightLG * 2.55,
  });

  return [
    genBaseStyle(uploadToken),
    genDraggerStyle(uploadToken),
    genPictureStyle(uploadToken),
    genPictureCardStyle(uploadToken),
    genListStyle(uploadToken),
    genMotionStyle(uploadToken),
    genRtlStyle(uploadToken),
  ];
});
