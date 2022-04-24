import { TinyColor } from '@ctrl/tinycolor';
import { clearFix } from '../../_util/theme';
import type { GenerateStyle, FullToken } from '../../_util/theme';

const genPictureStyle: GenerateStyle<FullToken<'Upload'>> = token => {
  const { componentCls, iconCls } = token;
  const listCls = `${componentCls}-list`;
  const itemCls = `${listCls}-item`;

  return {
    [`${componentCls}-wrapper`]: {
      // ${listCls} 增加优先级
      [`${listCls}${listCls}-picture, ${listCls}${listCls}-picture-card`]: {
        [itemCls]: {
          position: 'relative',
          height: 66,
          padding: token.paddingXS,
          border: `${token.controlLineWidth}px ${token.uploadPictureCardBorderStyle} ${token.colorBorder}`,
          borderRadius: token.radiusBase,

          '&:hover': {
            background: 'transparent',
          },

          [`${itemCls}-thumbnail`]: {
            width: 48,
            height: 48,
            lineHeight: '60px',
            textAlign: 'center',
            opacity: 0.8,
            flex: 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',

            [iconCls]: {
              fontSize: 26,
            },

            img: {
              display: 'block',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            },
          },

          [`${itemCls}-progress`]: {
            bottom: 14,
            width: 'calc(100% - 24px)',
            marginTop: 0,
            paddingInlineStart: 56,
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

  return {
    [`${componentCls}-wrapper${componentCls}-picture-card-wrapper`]: {
      ...clearFix(),
      display: 'inline-block',
      width: '100%',

      [`${componentCls}${componentCls}-select`]: {
        width: token.uploadPictureCardSize,
        height: token.uploadPictureCardSize,
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
          width: token.uploadPictureCardSize,
          height: token.uploadPictureCardSize,
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
            width: 16,
            margin: `0 ${token.marginXXS}px`,
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
          bottom: 32,
          width: `calc(100% - ${token.paddingXS * 2}px)`,
          paddingInlineStart: 0,
        },
      },
    },
  };
};

export { genPictureStyle, genPictureCardStyle };
