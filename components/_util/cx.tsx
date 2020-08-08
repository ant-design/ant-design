import classNames from 'classnames';

// space
const s = ' ';

export default (prefixCls: string) => {
  const cx = (...params: any) => {
    const str = classNames(...params);
    const arr = str.split(s);
    return arr.map(item => `${prefixCls}-${item}`).join(s);
  };

  const concatCls = (str: string) => {
    return (...params: any) => {
      const pre = str === '' ? '' : `${str}${s}`;

      return `${pre}${cx(...params)}`;
    };
  };

  const mixUnprefix = (...params: any) => {
    const str = classNames(...params);
    return concatCls(str);
  };

  const skipFirst = (...params: any) => {
    const [first, ...rest] = params;
    return mixUnprefix(first)(...rest);
  };

  const cxRoot = (...params: any) => {
    return `${prefixCls}${s}${cx(...params)}`;
  };

  return {
    classNames,
    cx,
    cxRoot,
    // alias
    cxsf: skipFirst,
  };
};
