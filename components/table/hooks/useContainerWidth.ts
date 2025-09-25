import type { TableProps } from 'rc-table';

export default function useContainerWidth(prefixCls: string) {
  const getContainerWidth: TableProps['getContainerWidth'] = (ele, width) => {
    const container = ele.querySelector(`.${prefixCls}-container`);
    let returnWidth = width;

    if (container) {
      const style = getComputedStyle(container);
      const borderLeft = Number.parseInt(style.borderLeftWidth, 10);
      const borderRight = Number.parseInt(style.borderRightWidth, 10);
      returnWidth = width - borderLeft - borderRight;
    }

    return returnWidth;
  };

  return getContainerWidth;
}
