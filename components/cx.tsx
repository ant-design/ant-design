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

  return {
    classNames,
    cx,
    // alias
    cxsf: skipFirst,
  };
};
