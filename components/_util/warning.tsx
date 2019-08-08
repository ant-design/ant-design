import warning from 'warning';

let warned: Record<string, boolean> = {};

export function resetWarned() {
  warned = {};
}

export default (valid: boolean, component: string, message: string): void => {
  if (!valid && !warned[message]) {
    warning(false, `[antd: ${component}] ${message}`);
    warned[message] = true;
  }
};
