import type { TableProps } from 'rc-table';

export default function useContainerWidth(prefixCls: string) {
  const getContainerWidth: TableProps['getContainerWidth'] = (ele, width) => {
    const container = ele.querySelector(`.${prefixCls}-container`);

    if (container) {
      const style = getComputedStyle(container);
      const borderLeft = parseInt(style.borderLeftWidth, 10);
      const borderRight = parseInt(style.borderRightWidth, 10);

      return width - borderLeft - borderRight;
    }

    return width;
  };

  return getContainerWidth;
}
