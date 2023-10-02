import * as React from 'react';
import rcWarning, { resetWarned } from 'rc-util/lib/warning';

export { resetWarned };
export function noop() {}

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
  deprecated?: boolean;
}

export const WarningContext = React.createContext<WarningContextProps>({});

/**
 * This is a hook but we not named as `useWarning`
 * since this is only used in development.
 * We should always wrap this in `if (process.env.NODE_ENV !== 'production')` condition
 */
export const devUseWarning: (component: string) => TypeWarning =
  process.env.NODE_ENV !== 'production'
    ? (component: string) => {
        const { deprecated } = React.useContext(WarningContext);

        const typeWarning: TypeWarning = (valid, type, message) => {
          if (deprecated !== false || type !== 'deprecated') {
            warning(valid, component, message);
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
