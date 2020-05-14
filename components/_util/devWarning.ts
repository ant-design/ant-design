import devWarning, { resetWarned } from 'rc-util/lib/warning';

export { resetWarned };

export default (valid: boolean, component: string, message: string): void => {
  devWarning(valid, `[antd: ${component}] ${message}`);
};
