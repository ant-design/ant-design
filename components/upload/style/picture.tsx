import { TinyColor } from '@ctrl/tinycolor';
import type { UploadToken } from '.';
import type { GenerateStyle } from '../../_util/theme';
import { clearFix } from '../../_util/theme';

const genPictureStyle: GenerateStyle<UploadToken> = token => {
  const { componentCls, iconCls, uploadThumbnailSize, uploadProgressOffset } = token;
  const listCls = `${componentCls}-list`;
  const itemCls = `${listCls}-item`;

  return {
    [`${componentCls}-wrapper`]: {
      // ${listCls} 增加优先级
      [`${listCls}${listCls}-picture, ${listCls}${listCls}-picture-card`]: {
        [itemCls]: {
          position: 'relative',
          height: uploadThumbnailSize + token.controlLineWidth * 2 + token.paddingXS * 2,
          padding: token.paddingXS,
          border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
          borderRadius: token.radiusBase,

          '&:hover': {
            background: 'transparent',
          },

          [`${itemCls}-thumbnail`]: {
            width: uploadThumbnailSize,
            height: uploadThumbnailSize,
            lineHeight: `${uploadThumbnailSize + token.paddingSM}px`,
            textAlign: 'center',
            flex: 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',

            [iconCls]: {
              fontSize: token.fontSizeHeading2,
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
            width: `calc(100% - ${token.paddingSM * 2}px)`,
            marginTop: 0,
            paddingInlineStart: uploadThumbnailSize + token.paddingXS,
          },
        },

        [`${itemCls}-error`]: {
          borderColor: token.colorError,

          // Adjust the color of the error icon : https://github.com/ant-design/ant-design/pull/24160
          [`${itemCls}-thumbnail ${iconCls}`]: {
            [`svg path[fill='#e6f7ff']`]: {
              fill: token.colorBgError,
            },
            [`svg path[fill='#1890ff']`]: {
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
    },
  };
};

const genPictureCardStyle: GenerateStyle<UploadToken> = token => {
  const { componentCls, iconCls, fontSizeLG, colorTextLightSolid } = token;
  const listCls = `${componentCls}-list`;
  const itemCls = `${listCls}-item`;

  const uploadPictureCardSize = token.uploadPicCardSize;

  return {
    [`${componentCls}-wrapper${componentCls}-picture-card-wrapper`]: {
      ...clearFix(),
      display: 'inline-block',
      width: '100%',

      [`${componentCls}${componentCls}-select`]: {
        width: uploadPictureCardSize,
        height: uploadPictureCardSize,
        marginInlineEnd: token.marginXS,
        marginBottom: token.marginXS,
        textAlign: 'center',
        verticalAlign: 'top',
        backgroundColor: token.colorBgComponentSecondary,
        border: `${token.controlLineWidth}px dashed ${token.colorBorder}`,
        borderRadius: token.radiusBase,
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
      [`${listCls}${listCls}-picture-card`]: {
        [`${listCls}-item-container`]: {
          display: 'inline-block',
          width: uploadPictureCardSize,
          height: uploadPictureCardSize,
          marginBlock: `0 ${token.marginXS}px`,
          marginInline: `0 ${token.marginXS}px`,
          verticalAlign: 'top',
        },

        '&::after': {
          display: 'none',
        },

        [itemCls]: {
          height: '100%',
          margin: 0,

          '&::before': {
            position: 'absolute',
            zIndex: 1,
            width: `calc(100% - ${token.paddingXS * 2}px)`,
            height: `calc(100% - ${token.paddingXS * 2}px)`,
            backgroundColor: token.controlMaskBg,
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

          [`${iconCls}-eye, ${iconCls}-download, ${iconCls}-delete`]: {
            zIndex: 10,
            width: fontSizeLG,
            margin: `0 ${token.marginXXS}px`,
            fontSize: fontSizeLG,
            cursor: 'pointer',
            transition: `all ${token.motionDurationSlow}`,
          },
        },

        [`${itemCls}-actions, ${itemCls}-actions:hover`]: {
          [`${iconCls}-eye, ${iconCls}-download, ${iconCls}-delete`]: {
            color: new TinyColor(colorTextLightSolid).setAlpha(0.65).toRgbString(),
            '&:hover': {
              color: colorTextLightSolid,
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
          width: `calc(100% - ${token.paddingXS * 2}px)`,
        },

        [`${itemCls}-uploading`]: {
          [`&${itemCls}`]: {
            backgroundColor: token.colorBgComponentSecondary,
          },

          [`&::before, ${iconCls}-eye, ${iconCls}-download, ${iconCls}-delete`]: {
            display: 'none',
          },
        },

        [`${itemCls}-progress`]: {
          bottom: token.marginXL,
          width: `calc(100% - ${token.paddingXS * 2}px)`,
          paddingInlineStart: 0,
        },
      },
    },
  };
};

export { genPictureStyle, genPictureCardStyle };
