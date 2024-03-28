import { blue } from '@ant-design/colors';

import type { UploadToken } from '.';
import { clearFix, textEllipsis } from '../../style';
import type { GenerateStyle } from '../../theme/internal';
import { unit } from '@ant-design/cssinjs';

const genPictureStyle: GenerateStyle<UploadToken> = (token) => {
  const { componentCls, iconCls, uploadThumbnailSize, uploadProgressOffset, calc } = token;
  const listCls = `${componentCls}-list`;
  const itemCls = `${listCls}-item`;

  return {
    [`${componentCls}-wrapper`]: {
      // ${listCls} 增加优先级
      [`
        ${listCls}${listCls}-picture,
        ${listCls}${listCls}-picture-card,
        ${listCls}${listCls}-picture-circle
      `]: {
        [itemCls]: {
          position: 'relative',
          height: calc(uploadThumbnailSize)
            .add(calc(token.lineWidth).mul(2))
            .add(calc(token.paddingXS).mul(2))
            .equal(),
          padding: token.paddingXS,
          border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderRadius: token.borderRadiusLG,

          '&:hover': {
            background: 'transparent',
          },

          [`${itemCls}-thumbnail`]: {
            ...textEllipsis,
            width: uploadThumbnailSize,
            height: uploadThumbnailSize,
            lineHeight: unit(calc(uploadThumbnailSize).add(token.paddingSM).equal()),
            textAlign: 'center',
            flex: 'none',

            [iconCls]: {
              fontSize: token.fontSizeHeading2,
              color: token.colorPrimary,
            },

            img: {
              display: 'block',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            },
          },

          [`${itemCls}-progress`]: {
            bottom: uploadProgressOffset,
            width: `calc(100% - ${unit(calc(token.paddingSM).mul(2).equal())})`,
            marginTop: 0,
            paddingInlineStart: calc(uploadThumbnailSize).add(token.paddingXS).equal(),
          },
        },

        [`${itemCls}-error`]: {
          borderColor: token.colorError,

          // Adjust the color of the error icon : https://github.com/ant-design/ant-design/pull/24160
          [`${itemCls}-thumbnail ${iconCls}`]: {
            [`svg path[fill='${blue[0]}']`]: {
              fill: token.colorErrorBg,
            },
            [`svg path[fill='${blue.primary}']`]: {
              fill: token.colorError,
            },
          },
        },

        [`${itemCls}-uploading`]: {
          borderStyle: 'dashed',

          [`${itemCls}-name`]: {
            marginBottom: uploadProgressOffset,
          },
        },
      },

      [`${listCls}${listCls}-picture-circle ${itemCls}`]: {
        [`&, &::before, ${itemCls}-thumbnail`]: {
          borderRadius: '50%',
        },
      },
    },
  };
};

const genPictureCardStyle: GenerateStyle<UploadToken> = (token) => {
  const { componentCls, iconCls, fontSizeLG, colorTextLightSolid, calc } = token;

  const listCls = `${componentCls}-list`;
  const itemCls = `${listCls}-item`;

  const uploadPictureCardSize = token.uploadPicCardSize;

  return {
    [`
      ${componentCls}-wrapper${componentCls}-picture-card-wrapper,
      ${componentCls}-wrapper${componentCls}-picture-circle-wrapper
    `]: {
      ...clearFix(),
      display: 'inline-block',
      width: '100%',

      [`${componentCls}${componentCls}-select`]: {
        width: uploadPictureCardSize,
        height: uploadPictureCardSize,
        textAlign: 'center',
        verticalAlign: 'top',
        backgroundColor: token.colorFillAlter,
        border: `${unit(token.lineWidth)} dashed ${token.colorBorder}`,
        borderRadius: token.borderRadiusLG,
        cursor: 'pointer',
        transition: `border-color ${token.motionDurationSlow}`,

        [`> ${componentCls}`]: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        },

        [`&:not(${componentCls}-disabled):hover`]: {
          borderColor: token.colorPrimary,
        },
      },

      // list
      [`${listCls}${listCls}-picture-card, ${listCls}${listCls}-picture-circle`]: {
        display: 'flex',
        flexWrap: 'wrap',
        '@supports not (gap: 1px)': {
          '& > *': {
            marginBlockEnd: token.marginXS,
            marginInlineEnd: token.marginXS,
          },
        },
        '@supports (gap: 1px)': {
          gap: token.marginXS,
        },

        [`${listCls}-item-container`]: {
          display: 'inline-block',
          width: uploadPictureCardSize,
          height: uploadPictureCardSize,
          verticalAlign: 'top',
        },

        '&::after': {
          display: 'none',
        },

        '&::before': {
          display: 'none',
        },

        [itemCls]: {
          height: '100%',
          margin: 0,

          '&::before': {
            position: 'absolute',
            zIndex: 1,
            width: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`,
            height: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`,
            backgroundColor: token.colorBgMask,
            opacity: 0,
            transition: `all ${token.motionDurationSlow}`,
            content: '" "',
          },
        },

        [`${itemCls}:hover`]: {
          [`&::before, ${itemCls}-actions`]: {
            opacity: 1,
          },
        },

        [`${itemCls}-actions`]: {
          position: 'absolute',
          insetInlineStart: 0,
          zIndex: 10,
          width: '100%',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          opacity: 0,
          transition: `all ${token.motionDurationSlow}`,

          [`
            ${iconCls}-eye,
            ${iconCls}-download,
            ${iconCls}-delete
          `]: {
            zIndex: 10,
            width: fontSizeLG,
            margin: `0 ${unit(token.marginXXS)}`,
            fontSize: fontSizeLG,
            cursor: 'pointer',
            transition: `all ${token.motionDurationSlow}`,
            color: colorTextLightSolid,

            '&:hover': {
              color: colorTextLightSolid,
            },

            svg: {
              verticalAlign: 'baseline',
            },
          },
        },

        [`${itemCls}-thumbnail, ${itemCls}-thumbnail img`]: {
          position: 'static',
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        },

        [`${itemCls}-name`]: {
          display: 'none',
          textAlign: 'center',
        },

        [`${itemCls}-file + ${itemCls}-name`]: {
          position: 'absolute',
          bottom: token.margin,
          display: 'block',
          width: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`,
        },

        [`${itemCls}-uploading`]: {
          [`&${itemCls}`]: {
            backgroundColor: token.colorFillAlter,
          },

          [`&::before, ${iconCls}-eye, ${iconCls}-download, ${iconCls}-delete`]: {
            display: 'none',
          },
        },

        [`${itemCls}-progress`]: {
          bottom: token.marginXL,
          width: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`,
          paddingInlineStart: 0,
        },
      },
    },
    [`${componentCls}-wrapper${componentCls}-picture-circle-wrapper`]: {
      [`${componentCls}${componentCls}-select`]: {
        borderRadius: '50%',
      },
    },
  };
};

export { genPictureStyle, genPictureCardStyle };
