declare const CSSINJS_STATISTIC: any;

const enableStatistic =
  process.env.NODE_ENV !== 'production' || typeof CSSINJS_STATISTIC !== 'undefined';
let recording = true;

/**
 * This function will do as `Object.assign` in production. But will use Object.defineProperty:get to
 * pass all value access in development. To support statistic field usage with alias token.
 */
export function merge<T extends object>(...objs: Partial<T>[]): T {
  /* istanbul ignore next */
  if (!enableStatistic) {
    return Object.assign({}, ...objs);
  }

  recording = false;

  const ret = {} as T;

  objs.forEach((obj) => {
    const keys = Object.keys(obj);

    keys.forEach((key) => {
      Object.defineProperty(ret, key, {
        configurable: true,
        enumerable: true,
        get: () => (obj as any)[key],
      });
    });
  });

  recording = true;
  return ret;
}

/** @internal Internal Usage. Not use in your production. */
export const statistic: Record<
  string,
  { global: string[]; component: Record<string, string | number> }
> = {};

/** @internal Internal Usage. Not use in your production. */
// eslint-disable-next-line camelcase
export const _statistic_build_: typeof statistic = {};

/* istanbul ignore next */
function noop() {}

/** Statistic token usage case. Should use `merge` function if you do not want spread record. */
export default function statisticToken<T extends object>(token: T) {
  let tokenKeys: Set<string> | undefined;
  let proxy = token;
  let flush: (componentName: string, componentToken: Record<string, string | number>) => void =
    noop;

  if (enableStatistic) {
    tokenKeys = new Set<string>();

    proxy = new Proxy(token, {
      get(obj: any, prop: any) {
        if (recording) {
          tokenKeys!.add(prop);
        }
        return obj[prop];
      },
    });

    flush = (componentName, componentToken) => {
      statistic[componentName] = { global: Array.from(tokenKeys!), component: componentToken };
    };
  }

  return { token: proxy, keys: tokenKeys, flush };
}
