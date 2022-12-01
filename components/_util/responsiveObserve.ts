import { useToken } from '../theme/internal';

export type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type BreakpointMap = Record<Breakpoint, string>;
export type ScreenMap = Partial<Record<Breakpoint, boolean>>;
export type ScreenSizeMap = Partial<Record<Breakpoint, number>>;

export const responsiveArray: Breakpoint[] = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

const useResponsiveMap = (): BreakpointMap => {
  const [, token] = useToken();
  return {
    xs: `(max-width: ${token.screenXS}px)`,
    sm: `(max-width: ${token.screenSM}px)`,
    md: `(max-width: ${token.screenMD}px)`,
    lg: `(max-width: ${token.screenLG}px)`,
    xl: `(max-width: ${token.screenXL}px)`,
    xxl: `(max-width: ${token.screenXXL}px)`,
    xxxl: `(max-width: ${token.screenXXXL}px)`,
  } as BreakpointMap;
};

type SubscribeFunc = (screens: ScreenMap) => void;
const subscribers = new Map<Number, SubscribeFunc>();
let subUid = -1;
let screens = {};

const responsiveObserve = {
  matchHandlers: {} as {
    [prop: string]: {
      mql: MediaQueryList;
      listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null;
    };
  },
  dispatch(pointMap: ScreenMap) {
    screens = pointMap;
    subscribers.forEach((func) => func(screens));
    return subscribers.size >= 1;
  },
  subscribe(func: SubscribeFunc): number {
    if (!subscribers.size) this.register();
    subUid += 1;
    subscribers.set(subUid, func);
    func(screens);
    return subUid;
  },
  unsubscribe(token: number) {
    subscribers.delete(token);
    if (!subscribers.size) this.unregister();
  },
  unregister() {
    const responsiveMap: BreakpointMap = useResponsiveMap();
    Object.keys(responsiveMap).forEach((screen: Breakpoint) => {
      const matchMediaQuery = responsiveMap[screen];
      const handler = this.matchHandlers[matchMediaQuery];
      handler?.mql.removeListener(handler?.listener);
    });
    subscribers.clear();
  },
  register() {
    const responsiveMap: BreakpointMap = useResponsiveMap();
    Object.keys(responsiveMap).forEach((screen: Breakpoint) => {
      const matchMediaQuery = responsiveMap[screen];
      const listener = ({ matches }: { matches: boolean }) => {
        this.dispatch({
          ...screens,
          [screen]: matches,
        });
      };
      const mql = window.matchMedia(matchMediaQuery);
      mql.addListener(listener);
      this.matchHandlers[matchMediaQuery] = {
        mql,
        listener,
      };

      listener(mql);
    });
  },
};

export default responsiveObserve;
