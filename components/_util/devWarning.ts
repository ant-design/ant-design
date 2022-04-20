import devWarning, { resetWarned } from 'rc-util/lib/warning';

export { resetWarned };

export default (valid: boolean, component: string, message: string): void => {
  devWarning(valid, `[antd: ${component}] ${message}`);

  // StrictMode will inject console which will not throw warning in React 17.
  if (process.env.NODE_ENV === 'test') {
    resetWarned();
  }
};
