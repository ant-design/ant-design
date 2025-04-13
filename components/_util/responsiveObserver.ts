import React from 'react';

import type { GlobalToken } from '../theme/internal';
import { useToken } from '../theme/internal';

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type BreakpointMap = Record<Breakpoint, string>;
export type ScreenMap = Partial<Record<Breakpoint, boolean>>;
export type ScreenSizeMap = Partial<Record<Breakpoint, number>>;

export const responsiveArray: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
type SubscribeFunc = (screens: ScreenMap) => void;

const getResponsiveMap = (token: GlobalToken): BreakpointMap => ({
  xs: `(max-width: ${token.screenXSMax}px)`,
  sm: `(min-width: ${token.screenSM}px)`,
  md: `(min-width: ${token.screenMD}px)`,
  lg: `(min-width: ${token.screenLG}px)`,
  xl: `(min-width: ${token.screenXL}px)`,
  xxl: `(min-width: ${token.screenXXL}px)`,
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
  const responsiveMap = getResponsiveMap(validateBreakpoints(token));

  // To avoid repeat create instance, we add `useMemo` here.
  return React.useMemo<ResponsiveObserverType>(() => {
    const subscribers = new Map<number, SubscribeFunc>();
    let subUid = -1;
    let screens: Partial<Record<Breakpoint, boolean>> = {};
    return {
      responsiveMap,
      matchHandlers: {},
      dispatch(pointMap: ScreenMap) {
        screens = pointMap;
        subscribers.forEach((func) => func(screens));
        return subscribers.size >= 1;
      },
      subscribe(func: SubscribeFunc): number {
        if (!subscribers.size) {
          this.register();
        }
        subUid += 1;
        subscribers.set(subUid, func);
        func(screens);
        return subUid;
      },
      unsubscribe(paramToken: number) {
        subscribers.delete(paramToken);
        if (!subscribers.size) {
          this.unregister();
        }
      },
      register() {
        Object.keys(responsiveMap).forEach((screen) => {
          const matchMediaQuery = responsiveMap[screen as Breakpoint];
          const listener = ({ matches }: { matches: boolean }) => {
            this.dispatch({ ...screens, [screen]: matches });
          };
          const mql = window.matchMedia(matchMediaQuery);
          mql.addListener(listener);
          this.matchHandlers[matchMediaQuery] = { mql, listener };
          listener(mql);
        });
      },
      unregister() {
        Object.keys(responsiveMap).forEach((screen) => {
          const matchMediaQuery = responsiveMap[screen as Breakpoint];
          const handler = this.matchHandlers[matchMediaQuery];
          handler?.mql.removeListener(handler?.listener);
        });
        subscribers.clear();
      },
    };
  }, [token]);
};

export default useResponsiveObserver;
