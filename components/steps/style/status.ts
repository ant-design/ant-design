import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

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
    colorText,
    colorTextDescription,
    colorBgContainer,
    colorPrimaryHover,
  } = token;

  const itemCls = `${componentCls}-item`;

  return {
    [componentCls]: [
      {
        // ========================= Variable =========================
        [itemCls]: {
          // Normal
          // >>> line
          '--steps-item-solid-line-color': '#000',

          // >>> text
          '--steps-item-title-color': '#000',
          '--steps-item-content-color': '#000',
          '--steps-item-subtitle-color': 'var(--steps-item-content-color)',

          // >>> icon
          '--steps-item-icon-custom-color': '#000',
          '--steps-item-icon-bg-color': '#000',
          '--steps-item-icon-border-color': '#000',
          '--steps-item-icon-text-color': '#fff',

          // >>> dot
          '--steps-item-icon-dot-color': '#000',
          '--steps-item-icon-dot-bg-color': 'var(--steps-item-icon-dot-color)',
          '--steps-item-icon-dot-border-color': 'var(--steps-item-icon-dot-color)',

          // Hover
          // >>> text
          '--steps-item-text-hover-color': '#000',

          // >>> icon
          '--steps-item-icon-bg-hover-color': `var(--steps-item-icon-bg-color)`,
          '--steps-item-icon-border-hover-color': `var(--steps-item-icon-border-color)`,
          '--steps-item-icon-text-hover-color': `var(--steps-item-icon-text-color)`,

          // Active
          // >>> text
          '--steps-item-content-active-color': `var(--steps-item-content-color)`,

          // >>> icon
          '--steps-item-icon-active-bg-color': 'var(--steps-item-icon-bg-color)',
          '--steps-item-icon-active-border-color': 'var(--steps-item-icon-border-color)',
          '--steps-item-icon-active-text-color': 'var(--steps-item-icon-text-color)',

          // Status
          '--steps-item-process-rail-line-style': token.lineType,
        },

        // ========================= Template =========================
        // Normal
        // >>> line
        [`${itemCls}-rail`]: {
          borderColor: `var(--steps-item-solid-line-color)`,
        },

        // >>> icon
        [`${itemCls}-custom ${itemCls}-icon`]: {
          color: `var(--steps-item-icon-custom-color)`,
        },

        // >>> text
        [`${itemCls}-title`]: {
          color: `var(--steps-item-title-color)`,
        },

        [`${itemCls}-subtitle`]: {
          color: `var(--steps-item-subtitle-color)`,
        },

        [`${itemCls}-content`]: {
          color: `var(--steps-item-content-color)`,
        },

        // Active
        // >>> icon
        [`${itemCls}-active ${itemCls}-icon`]: {},

        // >>> text
        [`${itemCls}-active ${itemCls}-content`]: {
          color: `var(--steps-item-content-active-color)`,
        },

        // Hover
        // >>> text
        [`${itemCls}[role='button']:not(${itemCls}-active):hover`]: {
          [`${itemCls}-title, ${itemCls}-content`]: {
            color: `var(--steps-item-text-hover-color)`,
          },
        },

        // Not dot
        [`&:not(${componentCls}-dot)`]: {
          [`${itemCls}:not(${itemCls}-custom)`]: {
            [`${itemCls}-icon`]: {
              background: `var(--steps-item-icon-bg-color)`,
              borderColor: `var(--steps-item-icon-border-color)`,
              color: `var(--steps-item-icon-text-color)`,
            },

            // Hover
            [`&[role='button']:not(${itemCls}-active):hover`]: {
              [`${itemCls}-icon`]: {
                background: `var(--steps-item-icon-bg-hover-color)`,
                borderColor: `var(--steps-item-icon-border-hover-color)`,
                color: `var(--steps-item-icon-text-hover-color)`,
              },
            },

            // Active
            [`&${itemCls}-active`]: {
              [`${itemCls}-icon`]: {
                background: `var(--steps-item-icon-active-bg-color)`,
                borderColor: `var(--steps-item-icon-active-border-color)`,
                color: `var(--steps-item-icon-active-text-color)`,
              },
            },
          },
        },

        // Dot
        [`&${componentCls}-dot`]: {
          [`${itemCls}-icon`]: {
            background: `var(--steps-item-icon-dot-bg-color)`,
            borderColor: `var(--steps-item-icon-dot-border-color)`,
            color: `var(--steps-item-icon-dot-color)`,
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
          '--steps-item-icon-custom-color': colorTextDisabled,
          '--steps-item-title-color': colorTextDescription,
          '--steps-item-content-color': colorTextDescription,
          '--steps-item-content-active-color': colorText,
          '--steps-item-text-hover-color': colorPrimaryHover,
        },
        [`${itemCls}-rail-${STATUS_WAIT}`]: {
          '--steps-item-solid-line-color': colorTextDisabled,
        },

        // Process
        [`${itemCls}-${STATUS_PROCESS}`]: {
          '--steps-item-icon-custom-color': colorPrimary,
          '--steps-item-title-color': colorText,
          '--steps-item-content-color': colorTextDescription,
          '--steps-item-content-active-color': colorText,
          '--steps-item-text-hover-color': colorPrimaryHover,
        },
        [`${itemCls}-rail-${STATUS_PROCESS}`]: {
          '--steps-item-solid-line-color': colorPrimary,

          // Special for Timeline usage
          '--steps-rail-line-style': 'var(--steps-item-process-rail-line-style)',
        },

        // Finish
        [`${itemCls}-${STATUS_FINISH}`]: {
          '--steps-item-icon-custom-color': colorPrimary,
          '--steps-item-title-color': colorText,
          '--steps-item-content-color': colorTextDescription,
          '--steps-item-content-active-color': colorText,
          '--steps-item-text-hover-color': colorPrimaryHover,
        },
        [`${itemCls}-rail-${STATUS_FINISH}`]: {
          '--steps-item-solid-line-color': colorPrimary,
        },

        // Error
        [`${itemCls}-${STATUS_ERROR}`]: {
          '--steps-item-icon-custom-color': colorError,
          '--steps-item-title-color': colorError,
          '--steps-item-content-color': colorError,
          '--steps-item-content-active-color': colorError,
          '--steps-item-text-hover-color': token.colorErrorHover,
        },
        [`${itemCls}-rail-${STATUS_ERROR}`]: {
          '--steps-item-solid-line-color': colorError,
        },
      },
      {
        // ========================== Filled ==========================
        [`&${componentCls}-filled`]: {
          [itemCls]: {
            '--steps-item-icon-dot-border-color': 'transparent',
          },

          // Wait
          [`${itemCls}-${STATUS_WAIT}`]: {
            '--steps-item-icon-bg-color': token.colorFillTertiary,
            '--steps-item-icon-border-color': 'transparent',
            '--steps-item-icon-text-color': colorTextLabel,
            '--steps-item-icon-dot-bg-color': colorTextDisabled,
            // Hover
            '--steps-item-icon-bg-hover-color': token.colorPrimaryBgHover,
            '--steps-item-icon-border-hover-color': 'transparent',
            '--steps-item-icon-text-hover-color': colorPrimary,
            // Active
            '--steps-item-icon-active-bg-color': colorPrimary,
            '--steps-item-icon-active-border-color': 'transparent',
            '--steps-item-icon-active-text-color': colorTextLightSolid,
          },

          // Finish & Process
          [`${itemCls}-${STATUS_PROCESS}, ${itemCls}-${STATUS_FINISH}`]: {
            '--steps-item-icon-bg-color': token.colorPrimaryBg,
            '--steps-item-icon-border-color': 'transparent',
            '--steps-item-icon-text-color': colorPrimary,
            '--steps-item-icon-dot-bg-color': colorPrimary,
            // Hover
            '--steps-item-icon-bg-hover-color': token.colorPrimaryBgHover,
            '--steps-item-icon-border-hover-color': 'transparent',
            '--steps-item-icon-text-hover-color': colorPrimary,
            // Active
            '--steps-item-icon-active-bg-color': colorPrimary,
            '--steps-item-icon-active-border-color': 'transparent',
            '--steps-item-icon-active-text-color': colorTextLightSolid,
          },

          // Error
          [`${itemCls}-${STATUS_ERROR}`]: {
            '--steps-item-icon-bg-color': token.colorErrorBg,
            '--steps-item-icon-border-color': 'transparent',
            '--steps-item-icon-text-color': colorError,
            '--steps-item-icon-dot-bg-color': colorError,
            // Hover
            '--steps-item-icon-bg-hover-color': token.colorErrorBgFilledHover,
            '--steps-item-icon-border-hover-color': 'transparent',
            '--steps-item-icon-text-hover-color': colorError,
            // Active
            '--steps-item-icon-active-bg-color': colorError,
            '--steps-item-icon-active-border-color': 'transparent',
            '--steps-item-icon-active-text-color': colorTextLightSolid,
          },
        },
      },
      {
        // ========================= Outlined =========================
        [`&${componentCls}-outlined`]: {
          [itemCls]: {
            '--steps-item-icon-dot-bg-color': 'transparent',
          },

          // Wait
          [`${itemCls}-${STATUS_WAIT}`]: {
            '--steps-item-icon-bg-color': colorBgContainer,
            '--steps-item-icon-border-color': colorTextDisabled,
            '--steps-item-icon-text-color': colorTextDisabled,
            '--steps-item-icon-dot-color': colorTextDisabled,
            // Hover
            '--steps-item-icon-bg-hover-color': 'transparent',
            '--steps-item-icon-border-hover-color': colorPrimaryHover,
            '--steps-item-icon-text-hover-color': colorPrimaryHover,
            // Active
            '--steps-item-icon-active-bg-color': token.colorFillTertiary,
          },

          // Finish & Process
          [`${itemCls}-${STATUS_PROCESS}, ${itemCls}-${STATUS_FINISH}`]: {
            '--steps-item-icon-bg-color': colorBgContainer,
            '--steps-item-icon-border-color': colorPrimary,
            '--steps-item-icon-text-color': colorPrimary,
            '--steps-item-icon-dot-color': colorPrimary,
            // Hover
            '--steps-item-icon-bg-hover-color': 'transparent',
            '--steps-item-icon-border-hover-color': token.colorPrimaryHover,
            '--steps-item-icon-text-hover-color': token.colorPrimaryHover,
            // Active
            '--steps-item-icon-active-bg-color': token.colorPrimaryBg,
          },

          // Error
          [`${itemCls}-${STATUS_ERROR}`]: {
            '--steps-item-icon-bg-color': colorBgContainer,
            '--steps-item-icon-border-color': colorError,
            '--steps-item-icon-text-color': colorError,
            '--steps-item-icon-dot-color': colorError,
            // Hover
            '--steps-item-icon-bg-hover-color': 'transparent',
            '--steps-item-icon-border-hover-color': token.colorErrorHover,
            '--steps-item-icon-text-hover-color': token.colorErrorHover,
            // Active
            '--steps-item-icon-active-bg-color': token.colorErrorBg,
          },
        },
      },
    ],
  };
};

export default genStatusStyle;
