import { useEffect, useInsertionEffect, useRef } from 'react';
import { removeCSS, updateCSS } from '@rc-component/util';

const duration = 0.5;
const viewTransitionStyle = `
@keyframes keepAlive {100% { z-index: -1 }}

::view-transition-old(root),
::view-transition-new(root) {
  animation: keepAlive ${duration}s linear;
  animation-fill-mode: forwards;
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

const useThemeAnimation = (isDark: boolean) => {
  const pendingUpdateRef = useRef<{ isDark: boolean; resolve: () => void } | null>(null);
  const transitionRef = useRef<ViewTransition | null>(null);

  const startAnimationTheme = (clipPath: string[]) => {
    document.documentElement.animate(
      {
        clipPath: isDark ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: duration * 1000,
        easing: 'ease-in',
        pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
      },
    );
  };

  const toggleAnimationTheme = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    updateTheme: () => void,
  ) => {
    if (
      !event ||
      typeof document.startViewTransition !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      updateTheme();
      return;
    }
    const time = Date.now();
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => {
      if (transitionRef.current !== transition) {
        updateTheme();
        return;
      }

      return new Promise<void>((resolve) => {
        pendingUpdateRef.current?.resolve();
        pendingUpdateRef.current = { isDark: !isDark, resolve };

        // 在主题样式变化前禁用 CSS transition，避免捕获过渡中的颜色。
        updateCSS('* { transition: none !important; }', 'disable-transition');

        const root = document.documentElement;
        root.classList.remove(isDark ? 'dark' : 'light');
        root.classList.add(isDark ? 'light' : 'dark');
        updateTheme();
      });
    });
    transitionRef.current = transition;

    transition.ready.then(() => {
      // eslint-disable-next-line no-console
      console.log(`Theme transition finished in ${Date.now() - time}ms`);
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
      startAnimationTheme(clipPath);
    });

    const cleanup = () => {
      if (transitionRef.current === transition) {
        transitionRef.current = null;
        removeCSS('disable-transition');
      }
    };
    transition.finished.then(cleanup, cleanup);
  };

  // inject transition style
  useInsertionEffect(() => {
    if (typeof document.startViewTransition === 'function') {
      updateCSS(viewTransitionStyle, 'view-transition-style');
    }
  }, []);

  // isDark 提交时，主题样式与 data-prefers-color 已经更新，可以捕获新画面。
  useEffect(() => {
    const pending = pendingUpdateRef.current;
    if (pending && pending.isDark === isDark) {
      pendingUpdateRef.current = null;
      pending.resolve();
    }
  }, [isDark]);

  useEffect(() => {
    return () => {
      transitionRef.current?.skipTransition();
      transitionRef.current = null;
      pendingUpdateRef.current?.resolve();
      pendingUpdateRef.current = null;
      removeCSS('disable-transition');
    };
  }, []);

  return toggleAnimationTheme;
};

export default useThemeAnimation;
