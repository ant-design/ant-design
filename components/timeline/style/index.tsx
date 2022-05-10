// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../_util/theme';
import { genComponentStyleHook, resetComponent } from '../../_util/theme';

export interface ComponentToken {}

interface TimelineToken extends FullToken<'Timeline'> {}

const genTimelineStyle: GenerateStyle<TimelineToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      margin: 0,
      padding: 0,
      listStyle: 'none',

      [`${componentCls}-item`]: {
        position: 'relative',
        margin: 0,
        paddingBottom: 20, // FIXME: v4 magic number
        fontSize: token.fontSizeBase,
        listStyle: 'none',

        '&-tail': {
          position: 'absolute',
          insetBlockStart: 10, // FIXME: v4 magic number
          insetInlineStart: `${token.radiusLG}px`,
          height: `calc(100% - 10px)`, // FIXME: v4 magic number
          borderInlineStart: `${token.radiusBase}px solid rgba(0, 0, 0, 0.06)`, // FIXME: v4 magic number
        },

        '&-pending': {
          [`${componentCls}-item-head`]: {
            fontSize: token.fontSizeSM,
            backgroundColor: 'transparent',
          },

          [`${componentCls}-item-tail`]: {
            display: 'none',
          },
        },

        '&-head': {
          position: 'absolute',
          width: 10, // FIXME: v4 magic number
          height: 10, // FIXME: v4 magic number
          backgroundColor: token.colorBgComponent,
          border: `${token.radiusBase}px solid transparent`,
          borderRadius: 100, // FIXME: v4 magic number

          '&-blue': {
            color: token.colorPrimary,
            borderColor: token.colorPrimary,
          },

          '&-red': {
            color: token.colorError,
            borderColor: token.colorError,
          },

          '&-green': {
            color: token.colorSuccess,
            borderColor: token.colorSuccess,
          },

          '&-gray': {
            color: token.colorTextDisabled,
            borderColor: token.colorTextDisabled,
          },
        },

        '&-head-custom': {
          position: 'absolute',
          insetBlockStart: 5.5, // FIXME: v4 magic number
          insetInlineStart: 5, // FIXME: v4 magic number
          width: 'auto',
          height: 'auto',
          marginBlockStart: 0,
          padding: '3px 1px', // FIXME: v4 magic number
          lineHeight: 1,
          textAlign: 'center',
          border: 0,
          borderRadius: 0,
          transform: `translate(-50%, -50%)`,
        },

        '&-content': {
          position: 'relative',
          insetBlockStart: `${
            -(token.fontSizeBase * token.lineHeight - token.fontSizeBase) + token.radiusSM
          }px`,
          marginInlineStart: token.marginLG + token.radiusBase,
          marginInlineEnd: 0,
          marginBlockStart: 0,
          marginBlockEnd: 0,
          wordBreak: 'break-word',
        },

        '&-last': {
          [`> ${componentCls}-item-tail`]: {
            display: 'none',
          },

          [`> ${componentCls}-item-content`]: {
            minHeight: 48, // FIXME: v4 magic number
          },
        },
      },

      [`&${componentCls}-alternate,
        &${componentCls}-right,
        &${componentCls}-label`]: {
        [`${componentCls}-item`]: {
          '&-tail, &-head, &-head-custom': {
            insetInlineStart: '50%',
          },

          '&-head': {
            marginInlineStart: `-${token.marginXXS}px`,

            '&-custom': {
              marginInlineStart: `${token.radiusSM}px`,
            },
          },

          '&-left': {
            [`${componentCls}-item-content`]: {
              insetInlineStart: `calc(50% - ${token.marginXXS}px)`,
              width: `calc(50% - 14px)`, // FIXME: v4 magic number
              textAlign: 'start',
            },
          },

          '&-right': {
            [`${componentCls}-item-content`]: {
              width: `calc(50% - ${token.marginSM}px)`,
              margin: 0,
              textAlign: 'end',
            },
          },
        },
      },

      [`&${componentCls}-right`]: {
        [`${componentCls}-item-right`]: {
          [`${componentCls}-item-tail,
            ${componentCls}-item-head,
            ${componentCls}-item-head-custom`]: {
            insetInlineStart: `calc(100% - ${token.radiusLG - token.radiusBase}px)`,
          },

          [`${componentCls}-item-content`]: {
            width: `calc(100% - 18px)`, // FIXME: v4 magic number
          },
        },
      },

      [`&${componentCls}-pending
        ${componentCls}-item-last
        ${componentCls}-item-tail`]: {
        display: 'block',
        height: `calc(100% - 14px)`, // FIXME: v4 magic number
        borderInlineStart: `${token.radiusBase}px dotted rgba(0, 0, 0, 0.06)`, // FIXME: v4 magic number
      },

      [`&${componentCls}-reverse
        ${componentCls}-item-last
        ${componentCls}-item-tail`]: {
        display: 'none',
      },

      [`&${componentCls}-reverse ${componentCls}-item-pending`]: {
        [`${componentCls}-item-tail`]: {
          insetBlockStart: 15, // FIXME: v4 magic number
          display: 'block',
          height: `calc(100% - 15px)`, // FIXME: v4 magic number
          borderInlineStart: `${token.radiusBase}px dotted rgba(0, 0, 0, 0.06)`, // FIXME: v4 magic number
        },

        [`${componentCls}-item-content`]: {
          minHeight: 48, // FIXME: v4 magic number
        },
      },

      [`&${componentCls}-label`]: {
        [`${componentCls}-item-label`]: {
          position: 'absolute',
          insetBlockStart: `${
            -(token.fontSizeBase * token.lineHeight - token.fontSizeBase) + token.radiusSM
          }px`,
          width: `calc(50% - ${token.marginSM}px)`,
          textAlign: 'end',
        },

        [`${componentCls}-item-right`]: {
          [`${componentCls}-item-label`]: {
            insetInlineStart: `calc(50% + 14px)`, // FIXME: v4 magic number
            width: `calc(50% - 14px)`, // FIXME: v4 magic number
            textAlign: 'start',
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Timeline', token => [genTimelineStyle(token)]);
