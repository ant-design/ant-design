import warning, { resetWarned } from 'rc-util/lib/warning';

export { resetWarned };
export function noop() {}

type DevWarning = (valid: boolean, component: string, message: string) => void;

// eslint-disable-next-line import/no-mutable-exports
let devWarning: DevWarning = noop;
if (process.env.NODE_ENV !== 'production') {
  devWarning = (valid, component, message) => {
    warning(valid, `[antd: ${component}] ${message}`);

    // StrictMode will inject console which will not throw warning in React 17.
    if (process.env.NODE_ENV === 'test') {
      resetWarned();
    }
  };
}

export default devWarning;
