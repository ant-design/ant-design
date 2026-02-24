import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { UploadToken } from '.';
import { clearFix, textEllipsis } from '../../style';
import type { GenerateStyle } from '../../theme/internal';

const genListStyle: GenerateStyle<UploadToken, CSSObject> = (token) => {
  const { componentCls, iconCls, fontSize, lineHeight, motionDurationSlow, calc } = token;
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
          height: calc(token.lineHeight).mul(fontSize).equal(),
          marginTop: token.marginXS,
          fontSize,
          display: 'flex',
          alignItems: 'center',
          transition: `background-color ${motionDurationSlow}`,
          borderRadius: token.borderRadiusSM,

          '&:hover': {
            backgroundColor: token.controlItemBgHover,
          },

          [`${itemCls}-name`]: {
            ...textEllipsis,
            padding: `0 ${unit(token.paddingXS)}`,
            lineHeight,
            flex: 'auto',
            transition: `all ${motionDurationSlow}`,
          },

          [actionsCls]: {
            whiteSpace: 'nowrap',

            [actionCls]: {
              opacity: 0,
            },

            [iconCls]: {
              color: token.actionsColor,
              transition: `all ${motionDurationSlow}`,
            },

            [`
              ${actionCls}:focus-visible,
              &.picture ${actionCls}
            `]: {
              opacity: 1,
            },
          },

          [`${componentCls}-icon ${iconCls}`]: {
            color: token.colorIcon,
            fontSize,
          },

          [`${itemCls}-progress`]: {
            position: 'absolute',
            bottom: token.calc(token.uploadProgressOffset).mul(-1).equal(),
            width: '100%',
            paddingInlineStart: calc(fontSize).add(token.paddingXS).equal(),
            fontSize,
            lineHeight: 0,
            pointerEvents: 'none',

            '> div': {
              margin: 0,
            },
          },
        },

        [`${itemCls}:hover ${actionCls}`]: {
          opacity: 1,
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
          transition: ['opacity', 'height']
            .map((prop) => `${prop} ${motionDurationSlow}`)
            .join(', '),

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
