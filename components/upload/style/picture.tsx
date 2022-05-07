import { TinyColor } from '@ctrl/tinycolor';
import { clearFix } from '../../_util/theme';
import type { GenerateStyle, FullToken } from '../../_util/theme';

const genPictureStyle: GenerateStyle<FullToken<'Upload'>> = token => {
  const { componentCls, iconCls } = token;
  const listCls = `${componentCls}-list`;
  const itemCls = `${listCls}-item`;
  // FIXME: upload token
  const uploadPictureThumbnailSize = 48;

  return {
    [`${componentCls}-wrapper`]: {
      // ${listCls} 增加优先级
      [`${listCls}${listCls}-picture, ${listCls}${listCls}-picture-card`]: {
        [itemCls]: {
          position: 'relative',
          height: uploadPictureThumbnailSize + token.controlLineWidth * 2 + token.paddingXS * 2,
          padding: token.paddingXS,
          border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
          borderRadius: token.radiusBase,

          '&:hover': {
            background: 'transparent',
          },

          [`${itemCls}-thumbnail`]: {
            width: uploadPictureThumbnailSize,
            height: uploadPictureThumbnailSize,
            lineHeight: `${uploadPictureThumbnailSize + token.paddingSM}px`,
            textAlign: 'center',
            // FIXME: upload token
            opacity: 0.8,
            flex: 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',

            [iconCls]: {
              fontSize: uploadPictureThumbnailSize / 2 + 2,
            },

            img: {
              display: 'block',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            },
          },

          [`${itemCls}-progress`]: {
            // FIXME: upload token
            bottom: 14,
            width: `calc(100% - ${token.paddingSM * 2}px)`,
            marginTop: 0,
            // FIXME: upload token
            paddingInlineStart: uploadPictureThumbnailSize + token.paddingXS,
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
            // FIXME: upload token
            marginBottom: 12,
          },
        },
      },
    },
  };
};

const genPictureCardStyle: GenerateStyle<FullToken<'Upload'>> = token => {
  const { componentCls, iconCls } = token;
  const listCls = `${componentCls}-list`;
  const itemCls = `${listCls}-item`;

  // FIXME: upload token
  const uploadPictureCardThumbnailSize = 88;
  const uploadPictureCardSize = uploadPictureCardThumbnailSize + token.paddingXS * 2;

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
            // FIXME: upload token
            backgroundColor: new TinyColor('#000').setAlpha(0.5).toRgbString(),
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
            // FIXME: upload token
            width: 16,
            margin: `0 ${token.marginXXS}px`,
            // FIXME: upload token
            fontSize: 16,
            cursor: 'pointer',
            transition: `all ${token.motionDurationSlow}`,
          },
        },

        [`${itemCls}-actions, ${itemCls}-actions:hover`]: {
          [`${iconCls}-eye, ${iconCls}-download, ${iconCls}-delete`]: {
            // FIXME: @text-color-dark: fade(@white, 85%);
            color: new TinyColor('#fff').setAlpha(0.85).toRgbString(),
            '&:hover': {
              // FIXME: @text-color-dark: fade(@white, 85%);
              color: '#fff',
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
          // FIXME: upload token
          bottom: 18,
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
          // FIXME: upload token
          bottom: 32,
          width: `calc(100% - ${token.paddingXS * 2}px)`,
          paddingInlineStart: 0,
        },
      },
    },
  };
};

export { genPictureStyle, genPictureCardStyle };
