import warning from 'warning';

const warned: Record<string, boolean> = {};
export default (valid: boolean, message: string): void => {
  if (!valid && !warned[message]) {
    warning(false, message);
    warned[message] = true;
  }
};
