import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

export const STATUS_WAIT = 'wait';
export const STATUS_PROCESS = 'process';
export const STATUS_FINISH = 'finish';
export const STATUS_ERROR = 'error';

const genStatusStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const {
    componentCls,
    colorTextDisabled,
    colorTextLightSolid,
    colorPrimary,
    colorTextLabel,
    colorError,
    colorErrorHover,
    colorErrorBgFilledHover,
    colorFillTertiary,
    colorErrorBg,
    colorPrimaryBgHover,
    colorPrimaryBg,
    colorText,
    colorTextDescription,
    colorBgContainer,
    colorPrimaryHover,
    lineType,
    antCls,
  } = token;

  const itemCls = `${componentCls}-item`;

  const [varName, varRef] = genCssVar(antCls, 'cmp-steps');

  return {
    [componentCls]: [
      {
        // ========================= Variable =========================
        [itemCls]: {
          // Normal
          // >>> line
          [varName('item-solid-line-color')]: '#000',

          // >>> text
          [varName('item-title-color')]: '#000',
          [varName('item-content-color')]: '#000',
          [varName('item-subtitle-color')]: varRef('item-content-color'),

          // >>> icon
          [varName('item-icon-custom-color')]: '#000',
          [varName('item-icon-bg-color')]: '#000',
          [varName('item-icon-border-color')]: '#000',
          [varName('item-icon-text-color')]: '#fff',

          // >>> dot
          [varName('item-icon-dot-color')]: '#000',
          [varName('item-icon-dot-bg-color')]: varRef('item-icon-dot-color'),
          [varName('item-icon-dot-border-color')]: varRef('item-icon-dot-color'),

          // Hover
          // >>> text
          [varName('item-text-hover-color')]: '#000',

          // >>> icon
          [varName('item-icon-bg-hover-color')]: varRef('item-icon-bg-color'),
          [varName('item-icon-border-hover-color')]: varRef('item-icon-border-color'),
          [varName('item-icon-text-hover-color')]: varRef('item-icon-text-color'),

          // Active
          // >>> text
          [varName('item-content-active-color')]: varRef('item-content-color'),

          // >>> icon
          [varName('item-icon-active-bg-color')]: varRef('item-icon-bg-color'),
          [varName('item-icon-active-border-color')]: varRef('item-icon-border-color'),
          [varName('item-icon-active-text-color')]: varRef('item-icon-text-color'),

          // Status
          [varName('item-process-rail-line-style')]: lineType,
        },

        // ========================= Template =========================
        // Normal
        // >>> line
        [`${itemCls}-rail`]: {
          borderColor: varRef('item-solid-line-color'),
        },

        // >>> icon
        [`${itemCls}-custom ${itemCls}-icon`]: {
          color: varRef('item-icon-custom-color'),
        },

        // >>> text
        [`${itemCls}-title`]: {
          color: varRef('item-title-color'),
        },

        [`${itemCls}-subtitle`]: {
          color: varRef('item-subtitle-color'),
        },

        [`${itemCls}-content`]: {
          color: varRef('item-content-color'),
        },

        // Active
        // >>> icon
        [`${itemCls}-active ${itemCls}-icon`]: {
          //
        },

        // >>> text
        [`${itemCls}-active ${itemCls}-content`]: {
          color: varRef('item-content-active-color'),
        },

        // Hover
        // >>> text
        [`${itemCls}[role='button']:not(${itemCls}-active):hover`]: {
          [`${itemCls}-title, ${itemCls}-content`]: {
            color: varRef('item-text-hover-color'),
          },
        },

        // Not dot
        [`&:not(${componentCls}-dot)`]: {
          [`${itemCls}:not(${itemCls}-custom)`]: {
            [`${itemCls}-icon`]: {
              background: varRef('item-icon-bg-color'),
              borderColor: varRef('item-icon-border-color'),
              color: varRef('item-icon-text-color'),
            },

            // Hover
            [`&[role='button']:not(${itemCls}-active):hover`]: {
              [`${itemCls}-icon`]: {
                background: varRef('item-icon-bg-hover-color'),
                borderColor: varRef('item-icon-border-hover-color'),
                color: varRef('item-icon-text-hover-color'),
              },
            },

            // Active
            [`&${itemCls}-active`]: {
              [`${itemCls}-icon`]: {
                background: varRef('item-icon-active-bg-color'),
                borderColor: varRef('item-icon-active-border-color'),
                color: varRef('item-icon-active-text-color'),
              },
            },
          },
        },

        // Dot
        [`&${componentCls}-dot`]: {
          [`${itemCls}-icon`]: {
            background: varRef('item-icon-dot-bg-color'),
            borderColor: varRef('item-icon-dot-border-color'),
            color: varRef('item-icon-dot-color'),
            [`&${itemCls}-icon-dot-custom`]: {
              background: 'transparent',
              border: 'none',
            },
          },
        },
      },
      {
        // ========================== Shared ==========================
        // Wait
        [`${itemCls}-${STATUS_WAIT}`]: {
          [varName('item-icon-custom-color')]: colorTextDisabled,
          [varName('item-title-color')]: colorTextDescription,
          [varName('item-content-color')]: colorTextDescription,
          [varName('item-content-active-color')]: colorText,
          [varName('item-text-hover-color')]: colorPrimaryHover,
        },
        [`${itemCls}-rail-${STATUS_WAIT}`]: {
          [varName('item-solid-line-color')]: colorTextDisabled,
        },

        // Process
        [`${itemCls}-${STATUS_PROCESS}`]: {
          [varName('item-icon-custom-color')]: colorPrimary,
          [varName('item-title-color')]: colorText,
          [varName('item-content-color')]: colorTextDescription,
          [varName('item-content-active-color')]: colorText,
          [varName('item-text-hover-color')]: colorPrimaryHover,
        },
        [`${itemCls}-rail-${STATUS_PROCESS}`]: {
          [varName('item-solid-line-color')]: colorPrimary,

          // Special for Timeline usage
          [varName('rail-line-style')]: varRef('item-process-rail-line-style'),
        },

        // Finish
        [`${itemCls}-${STATUS_FINISH}`]: {
          [varName('item-icon-custom-color')]: colorPrimary,
          [varName('item-title-color')]: colorText,
          [varName('item-content-color')]: colorTextDescription,
          [varName('item-content-active-color')]: colorText,
          [varName('item-text-hover-color')]: colorPrimaryHover,
        },
        [`${itemCls}-rail-${STATUS_FINISH}`]: {
          [varName('item-solid-line-color')]: colorPrimary,
        },

        // Error
        [`${itemCls}-${STATUS_ERROR}`]: {
          [varName('item-icon-custom-color')]: colorError,
          [varName('item-title-color')]: colorError,
          [varName('item-content-color')]: colorError,
          [varName('item-content-active-color')]: colorError,
          [varName('item-text-hover-color')]: colorErrorHover,
        },
        [`${itemCls}-rail-${STATUS_ERROR}`]: {
          [varName('item-solid-line-color')]: colorError,
        },
      },
      {
        // ========================== Filled ==========================
        [`&${componentCls}-filled`]: {
          [itemCls]: {
            [varName('item-icon-dot-border-color')]: 'transparent',
          },

          // Wait
          [`${itemCls}-${STATUS_WAIT}`]: {
            [varName('item-icon-bg-color')]: colorFillTertiary,
            [varName('item-icon-border-color')]: 'transparent',
            [varName('item-icon-text-color')]: colorTextLabel,
            [varName('item-icon-dot-bg-color')]: colorTextDisabled,
            // Hover
            [varName('item-icon-bg-hover-color')]: colorPrimaryBgHover,
            [varName('item-icon-border-hover-color')]: 'transparent',
            [varName('item-icon-text-hover-color')]: colorPrimary,
            // Active
            [varName('item-icon-active-bg-color')]: colorPrimary,
            [varName('item-icon-active-border-color')]: 'transparent',
            [varName('item-icon-active-text-color')]: colorTextLightSolid,
          },

          // Finish & Process
          [`${itemCls}-${STATUS_PROCESS}, ${itemCls}-${STATUS_FINISH}`]: {
            [varName('item-icon-bg-color')]: colorPrimaryBg,
            [varName('item-icon-border-color')]: 'transparent',
            [varName('item-icon-text-color')]: colorPrimary,
            [varName('item-icon-dot-bg-color')]: colorPrimary,
            // Hover
            [varName('item-icon-bg-hover-color')]: colorPrimaryBgHover,
            [varName('item-icon-border-hover-color')]: 'transparent',
            [varName('item-icon-text-hover-color')]: colorPrimary,
            // Active
            [varName('item-icon-active-bg-color')]: colorPrimary,
            [varName('item-icon-active-border-color')]: 'transparent',
            [varName('item-icon-active-text-color')]: colorTextLightSolid,
          },

          // Error
          [`${itemCls}-${STATUS_ERROR}`]: {
            [varName('item-icon-bg-color')]: colorErrorBg,
            [varName('item-icon-border-color')]: 'transparent',
            [varName('item-icon-text-color')]: colorError,
            [varName('item-icon-dot-bg-color')]: colorError,
            // Hover
            [varName('item-icon-bg-hover-color')]: colorErrorBgFilledHover,
            [varName('item-icon-border-hover-color')]: 'transparent',
            [varName('item-icon-text-hover-color')]: colorError,
            // Active
            [varName('item-icon-active-bg-color')]: colorError,
            [varName('item-icon-active-border-color')]: 'transparent',
            [varName('item-icon-active-text-color')]: colorTextLightSolid,
          },
        },
      },
      {
        // ========================= Outlined =========================
        [`&${componentCls}-outlined`]: {
          [itemCls]: {
            [varName('item-icon-dot-bg-color')]: 'transparent',
          },

          // Wait
          [`${itemCls}-${STATUS_WAIT}`]: {
            [varName('item-icon-bg-color')]: colorBgContainer,
            [varName('item-icon-border-color')]: colorTextDisabled,
            [varName('item-icon-text-color')]: colorTextDisabled,
            [varName('item-icon-dot-color')]: colorTextDisabled,
            // Hover
            [varName('item-icon-bg-hover-color')]: 'transparent',
            [varName('item-icon-border-hover-color')]: colorPrimaryHover,
            [varName('item-icon-text-hover-color')]: colorPrimaryHover,
            // Active
            [varName('item-icon-active-bg-color')]: colorFillTertiary,
          },

          // Finish & Process
          [`${itemCls}-${STATUS_PROCESS}, ${itemCls}-${STATUS_FINISH}`]: {
            [varName('item-icon-bg-color')]: colorBgContainer,
            [varName('item-icon-border-color')]: colorPrimary,
            [varName('item-icon-text-color')]: colorPrimary,
            [varName('item-icon-dot-color')]: colorPrimary,
            // Hover
            [varName('item-icon-bg-hover-color')]: 'transparent',
            [varName('item-icon-border-hover-color')]: colorPrimaryHover,
            [varName('item-icon-text-hover-color')]: colorPrimaryHover,
            // Active
            [varName('item-icon-active-bg-color')]: colorPrimaryBg,
          },

          // Error
          [`${itemCls}-${STATUS_ERROR}`]: {
            [varName('item-icon-bg-color')]: colorBgContainer,
            [varName('item-icon-border-color')]: colorError,
            [varName('item-icon-text-color')]: colorError,
            [varName('item-icon-dot-color')]: colorError,
            // Hover
            [varName('item-icon-bg-hover-color')]: 'transparent',
            [varName('item-icon-border-hover-color')]: colorErrorHover,
            [varName('item-icon-text-hover-color')]: colorErrorHover,
            // Active
            [varName('item-icon-active-bg-color')]: colorErrorBg,
          },
        },
      },
    ],
  };
};

export default genStatusStyle;
