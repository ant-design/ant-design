import React from 'react';

import type { GlobalToken } from '../theme/internal';
import { useToken } from '../theme/internal';
import { isFunction } from './is';

export const responsiveArray = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs'] as const;
export const responsiveArrayReversed = [...responsiveArray].reverse();

export type Breakpoint = (typeof responsiveArray)[number];
export type BreakpointMap = Record<Breakpoint, string>;
export type ScreenMap = Partial<Record<Breakpoint, boolean>>;
export type ScreenSizeMap = Partial<Record<Breakpoint, number>>;

type SubscribeFunc = (screens: ScreenMap) => void;

const getResponsiveMap = (token: GlobalToken): BreakpointMap => ({
  xs: `(max-width: ${token.screenXSMax}px)`,
  sm: `(min-width: ${token.screenSM}px)`,
  md: `(min-width: ${token.screenMD}px)`,
  lg: `(min-width: ${token.screenLG}px)`,
  xl: `(min-width: ${token.screenXL}px)`,
  xxl: `(min-width: ${token.screenXXL}px)`,
  xxxl: `(min-width: ${token.screenXXXL}px)`,
});

/**
 * Ensures that the breakpoints token are valid, in good order
 * For each breakpoint : screenMin <= screen <= screenMax and screenMax <= nextScreenMin
 */
const validateBreakpoints = (token: GlobalToken) => {
  const indexableToken: any = token;
  const revBreakpoints = [...responsiveArray].reverse();

  revBreakpoints.forEach((breakpoint, i) => {
    const breakpointUpper = breakpoint.toUpperCase();
    const screenMin = `screen${breakpointUpper}Min`;
    const screen = `screen${breakpointUpper}`;

    if (!(indexableToken[screenMin] <= indexableToken[screen])) {
      throw new Error(
        `${screenMin}<=${screen} fails : !(${indexableToken[screenMin]}<=${indexableToken[screen]})`,
      );
    }

    if (i < revBreakpoints.length - 1) {
      const screenMax = `screen${breakpointUpper}Max`;

      if (!(indexableToken[screen] <= indexableToken[screenMax])) {
        throw new Error(
          `${screen}<=${screenMax} fails : !(${indexableToken[screen]}<=${indexableToken[screenMax]})`,
        );
      }

      const nextBreakpointUpperMin = revBreakpoints[i + 1].toUpperCase();
      const nextScreenMin = `screen${nextBreakpointUpperMin}Min`;

      if (!(indexableToken[screenMax] <= indexableToken[nextScreenMin])) {
        throw new Error(
          `${screenMax}<=${nextScreenMin} fails : !(${indexableToken[screenMax]}<=${indexableToken[nextScreenMin]})`,
        );
      }
    }
  });
  return token;
};

export const matchScreen = (screens: ScreenMap, screenSizes?: ScreenSizeMap) => {
  if (!screenSizes) {
    return;
  }
  for (const breakpoint of responsiveArray) {
    if (screens[breakpoint] && screenSizes?.[breakpoint] !== undefined) {
      return screenSizes[breakpoint];
    }
  }
};

interface ResponsiveObserverType {
  responsiveMap: BreakpointMap;
  getSnapshot?: () => ScreenMap | undefined;
  getServerSnapshot?: () => ScreenMap | undefined;
  dispatch: (map: ScreenMap) => boolean;
  subscribe: (func: SubscribeFunc) => number;
  unsubscribe: (token: number) => void;
  register: () => void;
  unregister: () => void;
  matchHandlers: Record<
    PropertyKey,
    {
      mql: MediaQueryList;
      listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void;
    }
  >;
}

const useResponsiveObserver = () => {
  const [, token] = useToken();
  const { xs, sm, md, lg, xl, xxl, xxxl } = getResponsiveMap(validateBreakpoints(token));

  // To avoid repeat create instance, we add `useMemo` here.
  return React.useMemo<ResponsiveObserverType>(() => {
    const responsiveMap = { xs, sm, md, lg, xl, xxl, xxxl };
    const subscribers = new Map<number, SubscribeFunc>();
    let subUid = -1;
    let screens: ScreenMap | undefined;
    return {
      responsiveMap,
      matchHandlers: {},
      getSnapshot: () => screens,
      getServerSnapshot: () => undefined,
      dispatch(pointMap: ScreenMap) {
        if (!screens || responsiveArray.some((screen) => screens?.[screen] !== pointMap[screen])) {
          screens = pointMap;
          subscribers.forEach((func) => {
            func(pointMap);
          });
        }
        return subscribers.size >= 1;
      },
      subscribe(func: SubscribeFunc): number {
        if (!subscribers.size) {
          this.register();
        }
        subUid += 1;
        subscribers.set(subUid, func);
        // Register initializes all breakpoints before notifying the first subscriber.
        func(screens!);
        return subUid;
      },
      unsubscribe(paramToken: number) {
        subscribers.delete(paramToken);
        if (!subscribers.size) {
          this.unregister();
        }
      },
      register() {
        Object.entries(responsiveMap).forEach(([screen, mediaQuery]) => {
          const listener = ({ matches }: { matches: boolean }) => {
            this.dispatch({ ...screens, [screen]: matches });
          };
          const mql = window.matchMedia(mediaQuery);
          if (isFunction(mql.addEventListener)) {
            mql.addEventListener('change', listener);
          }
          this.matchHandlers[mediaQuery] = { mql, listener };
          listener(mql);
        });
      },
      unregister() {
        Object.values(responsiveMap).forEach((mediaQuery) => {
          const handler = this.matchHandlers[mediaQuery];
          if (isFunction(handler?.mql.removeEventListener)) {
            handler.mql.removeEventListener('change', handler?.listener);
          }
        });
        subscribers.clear();
      },
    };
  }, [xs, sm, md, lg, xl, xxl, xxxl]);
};

export default useResponsiveObserver;
