import * as React from 'react';
import DoubleLeftOutlined from '@ant-design/icons/DoubleLeftOutlined';
import DoubleRightOutlined from '@ant-design/icons/DoubleRightOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import classNames from 'classnames';
import type { PaginationLocale, PaginationProps as RcPaginationProps } from 'rc-pagination';
import RcPagination from 'rc-pagination';
import enUS from 'rc-pagination/lib/locale/en_US';

import { ConfigContext } from '../config-provider';
import useSize from '../config-provider/hooks/useSize';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import { useLocale } from '../locale';
import { CustomSelect, SelectContext } from './Select';
import type { SelectContextProps } from './Select';
import useStyle from './style';

export interface PaginationProps extends Omit<RcPaginationProps, 'showSizeChanger'> {
  showQuickJumper?: boolean | { goButton?: React.ReactNode };
  size?: 'default' | 'small';
  showSizeChanger?: boolean | { showSearch?: boolean };
  responsive?: boolean;
  role?: string;
  totalBoundaryShowSizeChanger?: number;
  rootClassName?: string;
}

export type PaginationPosition = 'top' | 'bottom' | 'both';

export type PaginationAlign = 'start' | 'center' | 'end';

export interface PaginationConfig extends Omit<PaginationProps, 'rootClassName'> {
  position?: PaginationPosition;
  align?: PaginationAlign;
}

export type { PaginationLocale };

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    selectPrefixCls: customizeSelectPrefixCls,
    className,
    rootClassName,
    style,
    size: customizeSize,
    locale: customLocale,
    selectComponentClass,
    responsive,
    showSizeChanger,
    ...restProps
  } = props;
  const { xs } = useBreakpoint(responsive);

  const { getPrefixCls, direction, pagination = {} } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('pagination', customizePrefixCls);

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergedShowSizeChanger =
    typeof showSizeChanger === 'boolean' ? showSizeChanger : pagination.showSizeChanger;

  const iconsProps = React.useMemo<Record<PropertyKey, React.ReactNode>>(() => {
    const ellipsis = <span className={`${prefixCls}-item-ellipsis`}>•••</span>;
    const prevIcon = (
      <button className={`${prefixCls}-item-link`} type="button" tabIndex={-1}>
        {direction === 'rtl' ? <RightOutlined /> : <LeftOutlined />}
      </button>
    );
    const nextIcon = (
      <button className={`${prefixCls}-item-link`} type="button" tabIndex={-1}>
        {direction === 'rtl' ? <LeftOutlined /> : <RightOutlined />}
      </button>
    );
    const jumpPrevIcon = (
      <a className={`${prefixCls}-item-link`}>
        <div className={`${prefixCls}-item-container`}>
          {direction === 'rtl' ? (
            <DoubleRightOutlined className={`${prefixCls}-item-link-icon`} />
          ) : (
            <DoubleLeftOutlined className={`${prefixCls}-item-link-icon`} />
          )}
          {ellipsis}
        </div>
      </a>
    );
    const jumpNextIcon = (
      <a className={`${prefixCls}-item-link`}>
        <div className={`${prefixCls}-item-container`}>
          {direction === 'rtl' ? (
            <DoubleLeftOutlined className={`${prefixCls}-item-link-icon`} />
          ) : (
            <DoubleRightOutlined className={`${prefixCls}-item-link-icon`} />
          )}
          {ellipsis}
        </div>
      </a>
    );
    return { prevIcon, nextIcon, jumpPrevIcon, jumpNextIcon };
  }, [direction, prefixCls]);

  const [contextLocale] = useLocale('Pagination', enUS);

  const locale = { ...contextLocale, ...customLocale };

  const mergedSize = useSize(customizeSize);

  const isSmall = mergedSize === 'small' || !!(xs && !mergedSize && responsive);

  const selectPrefixCls = getPrefixCls('select', customizeSelectPrefixCls);

  const extendedClassName = classNames(
    {
      [`${prefixCls}-mini`]: isSmall,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    pagination?.className,
    className,
    rootClassName,
    hashId,
  );

  const mergedStyle: React.CSSProperties = { ...pagination?.style, ...style };

  const memoizedContextValue = React.useMemo<SelectContextProps>(
    () => ({
      size: isSmall ? 'small' : 'middle',
      showSearch: typeof showSizeChanger === 'boolean' ? true : showSizeChanger?.showSearch ?? true,
    }),
    [showSizeChanger, isSmall],
  );

  return wrapSSR(
    <SelectContext.Provider value={memoizedContextValue}>
      <RcPagination
        {...iconsProps}
        {...restProps}
        style={mergedStyle}
        prefixCls={prefixCls}
        selectPrefixCls={selectPrefixCls}
        className={extendedClassName}
        selectComponentClass={selectComponentClass ?? CustomSelect}
        locale={locale}
        showSizeChanger={mergedShowSizeChanger}
      />
    </SelectContext.Provider>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Pagination.displayName = 'Pagination';
}

export default Pagination;
