const copy: ((str?: string, options?: object) => void) & {
  lastStr?: string;
  lastOptions?: object;
} = (str: string, options = {}) => {
  copy.lastStr = str;
  copy.lastOptions = options;
};

export default copy;
