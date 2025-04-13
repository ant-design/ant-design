const copy: ((str?: string, options?: object) => void) & {
  lastStr?: string;
  lastOptions?: object;
} = (str = '', options = {}) => {
  copy.lastStr = str;
  copy.lastOptions = options;
};

export default copy;
