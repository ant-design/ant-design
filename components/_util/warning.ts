import * as React from 'react';
import rcWarning, { resetWarned as rcResetWarned } from 'rc-util/lib/warning';

export function noop() {}

let deprecatedWarnList: Record<string, string[]> | null = null;

export function resetWarned() {
  deprecatedWarnList = null;
  rcResetWarned();
}

type Warning = (valid: boolean, component: string, message?: string) => void;

// eslint-disable-next-line import/no-mutable-exports
let warning: Warning = noop;
if (process.env.NODE_ENV !== 'production') {
  warning = (valid, component, message) => {
    rcWarning(valid, `[antd: ${component}] ${message}`);

    // StrictMode will inject console which will not throw warning in React 17.
    if (process.env.NODE_ENV === 'test') {
      resetWarned();
    }
  };
}

type BaseTypeWarning = (
  valid: boolean,
  /**
   * - deprecated: Some API will be removed in future but still support now.
   * - usage: Some API usage is not correct.
   * - breaking: Breaking change like API is removed.
   */
  type: 'deprecated' | 'usage' | 'breaking',
  message?: string,
) => void;

type TypeWarning = BaseTypeWarning & {
  deprecated: (valid: boolean, oldProp: string, newProp: string, message?: string) => void;
};

export interface WarningContextProps {
  strict?: boolean;
}

export const WarningContext = React.createContext<WarningContextProps>({});

/**
 * This is a hook but we not named as `useWarning`
 * since this is only used in development.
 * We should always wrap this in `if (process.env.NODE_ENV !== 'production')` condition
 */
export const devUseWarning: (component: string) => TypeWarning =
  process.env.NODE_ENV !== 'production'
    ? (component) => {
        const { strict } = React.useContext(WarningContext);

        const typeWarning: TypeWarning = (valid, type, message) => {
          if (!valid) {
            if (strict === false && type === 'deprecated') {
              const existWarning = deprecatedWarnList;

              if (!deprecatedWarnList) {
                deprecatedWarnList = {};
              }

              deprecatedWarnList[component] = deprecatedWarnList[component] || [];
              if (!deprecatedWarnList[component].includes(message || '')) {
                deprecatedWarnList[component].push(message || '');
              }

              // Warning for the first time
              if (!existWarning) {
                // eslint-disable-next-line no-console
                console.warn(
                  '[antd] There exists deprecated usage in your code:',
                  deprecatedWarnList,
                );
              }
            } else {
              warning(valid, component, message);
            }
          }
        };

        typeWarning.deprecated = (valid, oldProp, newProp, message) => {
          typeWarning(
            valid,
            'deprecated',
            `\`${oldProp}\` is deprecated. Please use \`${newProp}\` instead.${
              message ? ` ${message}` : ''
            }`,
          );
        };

        return typeWarning;
      }
    : () => {
        const noopWarning: TypeWarning = () => {};

        noopWarning.deprecated = noop;

        return noopWarning;
      };

export default warning;
