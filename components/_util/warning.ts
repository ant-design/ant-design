import warning, { resetWarned } from 'rc-util/lib/warning';

export { resetWarned };

export default (valid: boolean, component: string, message: string): void => {
  warning(valid, `[antd: ${component}] ${message}`);
};
