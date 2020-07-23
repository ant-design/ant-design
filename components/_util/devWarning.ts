import devWarning, { resetWarned, noteOnce } from 'rc-util/lib/warning';

export { resetWarned };

export default (valid: boolean, component: string, message: string): void => {
  devWarning(valid, `[antd: ${component}] ${message}`);
};

export const devNote = (valid: boolean, component: string, message: string): void => {
  noteOnce(valid, `[antd: ${component}] ${message}`);
};
