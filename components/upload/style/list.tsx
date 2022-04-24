import { clearFix } from '../../_util/theme';
import type { GenerateStyle, FullToken } from '../../_util/theme';

const genListStyle: GenerateStyle<FullToken<'Upload'>> = token => {
  const { componentCls, antCls, iconCls } = token;
  const itemCls = `${componentCls}-list-item`;
  const actionsCls = `${itemCls}-actions`;
  const actionCls = `${itemCls}-action`;

  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-list`]: {
        ...clearFix(),
        lineHeight: token.lineHeight,

        [itemCls]: {
          position: 'relative',
          height: token.lineHeight * token.fontSizeBase,
          marginTop: token.marginXS,
          fontSize: token.fontSizeBase,
          display: 'flex',
          alignItems: 'center',
          transition: `background-color ${token.motionDurationSlow}`,

          '&:hover': {
            backgroundColor: token.controlItemBgHover,
          },

          [`${itemCls}-name`]: {
            padding: `0 ${token.paddingXS}px`,
            overflow: 'hidden',
            lineHeight: token.lineHeight,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            flex: 'auto',
            transition: `all ${token.motionDurationSlow}`,
          },

          [actionsCls]: {
            [actionCls]: {
              opacity: 0,
            },

            [`${actionCls}${antCls}-btn-sm`]: {
              // FIXME: upload token
              height: 20,
              lineHeight: 1,
              // FIXME: should not override small button
              '> span': {
                transform: 'scale(1)',
              },
            },

            [`
              ${actionCls}:focus,
              &.picture ${actionCls}
            `]: {
              opacity: 1,
            },

            [iconCls]: {
              color: token.uploadActionsColor,
              transition: `all ${token.motionDurationSlow}`,
            },

            [`&:hover ${iconCls}`]: {
              color: token.colorText,
            },
          },

          [`${componentCls}-icon ${iconCls}`]: {
            color: token.colorTextSecondary,
            fontSize: token.fontSizeBase,
          },

          [`${itemCls}-progress`]: {
            position: 'absolute',
            // FIXME: upload token
            bottom: -12,
            width: '100%',
            paddingInlineStart: token.fontSizeBase + token.paddingXS,
            fontSize: token.fontSizeBase,
            lineHeight: 0,
          },
        },

        [`${itemCls}:hover ${actionCls}`]: {
          opacity: 1,
          color: token.colorText,
        },

        [`${itemCls}-error`]: {
          color: token.colorError,
          [`${itemCls}-name, ${componentCls}-icon ${iconCls}`]: {
            color: token.colorError,
          },

          [actionsCls]: {
            [`${iconCls}, ${iconCls}:hover`]: {
              color: token.colorError,
            },

            [actionCls]: {
              opacity: 1,
            },
          },
        },

        [`${componentCls}-list-item-container`]: {
          transition: `opacity ${token.motionDurationSlow}, height ${token.motionDurationSlow}`,

          // For smooth removing animation
          '&::before': {
            display: 'table',
            width: 0,
            height: 0,
            content: '""',
          },
        },
      },
    },
  };
};

export default genListStyle;
