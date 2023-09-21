import { useEffect, useRef } from 'react';
import { removeCSS, updateCSS } from 'rc-util/lib/Dom/dynamicCSS';

import theme from '../../components/theme';

const viewTransitionStyle = `
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

.dark::view-transition-old(root) {
  z-index: 1;
}

.dark::view-transition-new(root) {
  z-index: 999;
}

::view-transition-old(root) {
  z-index: 999;
}

::view-transition-new(root) {
  z-index: 1;
}
`;

const useThemeAnimation = () => {
  const {
    token: { colorBgElevated },
  } = theme.useToken();

  const animateRef = useRef<{ colorBgElevated: string }>({ colorBgElevated });

  const startAnimationTheme = (clipPath: string[], isDark: boolean) => {
    updateCSS(
      `
    * {
    transition: none !important;
  }
    `,
      'disable-transition',
    );

    document.documentElement
      .animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
        },
      )
      .addEventListener('finish', () => {
        removeCSS('disable-transition');
      });
  };

  const toggleAnimationTheme = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    isDark: boolean,
  ) => {
    // @ts-ignore
    if (!(event && typeof document.startViewTransition === 'function')) {
      return;
    }
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    updateCSS(
      `
    [data-prefers-color='dark'] {
      color-scheme: light !important;
    }

    [data-prefers-color='light'] {
      color-scheme: dark !important;
    }
    `,
      'color-scheme',
    );
    document
      // @ts-ignore
      .startViewTransition(async () => {
        // wait for theme change end
        while (colorBgElevated === animateRef.current.colorBgElevated) {
          // eslint-disable-next-line no-await-in-loop
          await new Promise((resolve) => {
            setTimeout(resolve, 1000 / 60);
          });
        }
        const root = document.documentElement;
        root.classList.remove(isDark ? 'dark' : 'light');
        root.classList.add(isDark ? 'light' : 'dark');
      })
      .ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        removeCSS('color-scheme');
        startAnimationTheme(clipPath, isDark);
      });
  };

  // inject transition style
  useEffect(() => {
    // @ts-ignore
    if (typeof document.startViewTransition === 'function') {
      updateCSS(viewTransitionStyle, 'view-transition-style');
    }
  }, []);

  useEffect(() => {
    if (colorBgElevated !== animateRef.current.colorBgElevated) {
      animateRef.current.colorBgElevated = colorBgElevated;
    }
  }, [colorBgElevated]);

  return toggleAnimationTheme;
};

export default useThemeAnimation;
