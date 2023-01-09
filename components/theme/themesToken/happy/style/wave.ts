import { Keyframes, useStyleRegister } from '@ant-design/cssinjs';
import type { UseTokenType } from '../wave';

const antCheckboxEffect = new Keyframes('antCheckboxEffect', {
  '0%': {
    transform: 'scale(1)',
  },
  '10%': {
    transform: 'scale(1.1)',
  },
  '35%': {
    transform: 'scale(0.94)',
  },
  '60%': {
    transform: 'scale(1.05)',
  },
  '85%': {
    transform: 'scale(0.97)',
  },
  '100%': {
    transform: 'scale(1)',
  },
});

export default function useStyle(tokenConfig: UseTokenType) {
  const [theme, token, hashId] = tokenConfig;

  useStyleRegister({ theme, token, hashId, path: ['Customize', 'Wave', 'Effect'] }, () => {
    const prefixCls = '.happy-wave';
    const { colorPrimary, colorPrimaryBgHover, motionDurationFast, motionDurationSlow } = token;
    const activeCls = '&.happy-in-out-leave-active';

    return [
      {
        // ======================== Target ========================
        [`${prefixCls}-target`]: {
          animationName: antCheckboxEffect,
          animationDuration: `0.45s`,
          animationTimingFunction: 'ease-in-out',
          animationFillMode: 'backwards',
        },

        // ========================= Dots =========================
        [prefixCls]: {
          position: 'fixed',
          pointerEvents: 'none',

          [`${prefixCls}-dot`]: {
            boxSizing: 'border-box',
            position: 'absolute',
            width: 8,
            height: 8,
            borderRadius: '100%',
            opacity: 0,
            transform: 'translate(-50%, -50%)',
            display: 'none',

            // =================== Basic Motion ===================
            '&.happy-in-out': {
              transition: `all ${motionDurationSlow}`,
              display: 'block',

              '&-leave': {
                opacity: 1,

                '&-active': {
                  opacity: 0,
                },
              },
            },

            // Dot 1
            '&-1': {
              left: 0,
              top: 0,
              border: `1px solid ${colorPrimary}`,

              [activeCls]: {
                left: -30,
                top: -10,
              },
            },

            // Dot 2
            '&-2': {
              left: '10%',
              top: 0,
              width: 4,
              height: 4,
              background: colorPrimaryBgHover,

              [activeCls]: {
                left: 'calc(10% - 10px)',
                top: -20,
                width: 1,
                height: 1,
              },
            },

            // Dot 3
            '&-3': {
              left: '35%',
              top: -5,
              width: 4,
              height: 4,
              background: colorPrimary,
              opacity: 0.8,

              [activeCls]: {
                left: 'calc(35% - 3px)',
                top: -15,
                width: 1,
                height: 1,
              },
            },

            // -----------------------
            // Dot 4
            '&-4': {
              left: '80%',
              top: 0,
              width: 6,
              height: 6,
              background: colorPrimaryBgHover,

              [activeCls]: {
                left: 'calc(80% + 10px)',
                top: -20,
                width: 1,
                height: 1,
              },
            },

            // -----------------------
            // Dot 5
            '&-5': {
              left: '100%',
              top: '45%',
              width: 10,
              height: 10,
              background: colorPrimary,

              [activeCls]: {
                left: 'calc(100% + 20px)',
                top: 'calc(45% - 3px)',
                width: 1,
                height: 1,
              },
            },

            // Dot 6
            '&-6': {
              left: '100%',
              top: '90%',
              width: 4,
              height: 4,
              background: colorPrimary,

              [activeCls]: {
                left: 'calc(100% + 30px)',
                top: 'calc(90% + 15px)',
                width: 1,
                height: 1,
              },
            },

            // -----------------------
            // Dot 7
            '&-7': {
              left: '80%',
              top: '100%',
              width: 10,
              height: 10,
              background: colorPrimary,

              [activeCls]: {
                left: 'calc(80% + 10px)',
                top: 'calc(100% + 10px)',
                width: 1,
                height: 1,
              },
            },

            // Dot 8
            '&-8': {
              left: '55%',
              top: '100%',
              width: 4,
              height: 4,
              background: colorPrimaryBgHover,

              [activeCls]: {
                left: 'calc(55% + 2px)',
                top: 'calc(100% + 20px)',
                width: 1,
                height: 1,
              },
            },

            // Dot 9
            '&-9': {
              left: 0,
              top: '100%',
              width: 10,
              height: 10,
              background: colorPrimaryBgHover,

              [activeCls]: {
                left: -15,
                top: 'calc(100% + 15px)',
                width: 1,
                height: 1,
              },
            },

            // -----------------------
            // Dot 10
            '&-10': {
              left: 0,
              top: '50%',
              width: 10,
              height: 10,
              background: colorPrimary,

              [activeCls]: {
                left: -50,
                top: '50%',
                width: 1,
                height: 1,
              },
            },
          },
        },
      },
    ];
  });
}
