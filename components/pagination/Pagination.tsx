import DoubleLeftOutlined from '@ant-design/icons/DoubleLeftOutlined';
import DoubleRightOutlined from '@ant-design/icons/DoubleRightOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import classNames from 'classnames';
import type { PaginationLocale, PaginationProps as RcPaginationProps } from 'rc-pagination';
import RcPagination from 'rc-pagination';
import enUS from 'rc-pagination/lib/locale/en_US';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import useSize from '../config-provider/hooks/useSize';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import { useLocale } from '../locale';
import { MiddleSelect, MiniSelect } from './Select';
import useStyle from './style';

export interface PaginationProps extends RcPaginationProps {
  showQuickJumper?: boolean | { goButton?: React.ReactNode };
  size?: 'default' | 'small';
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

const Pagination: React.FC<PaginationProps> = ({
  prefixCls: customizePrefixCls,
  selectPrefixCls: customizeSelectPrefixCls,
  className,
  rootClassName,
  size: customizeSize,
  locale: customLocale,
  selectComponentClass,
  responsive,
  showSizeChanger,
  ...restProps
}) => {
  const { xs } = useBreakpoint(responsive);

  const { getPrefixCls, direction, pagination = {} } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('pagination', customizePrefixCls);

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergedShowSizeChanger = showSizeChanger ?? pagination.showSizeChanger;

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
    className,
    rootClassName,
    hashId,
  );

  return wrapSSR(
    <RcPagination
      {...iconsProps}
      {...restProps}
      prefixCls={prefixCls}
      selectPrefixCls={selectPrefixCls}
      className={extendedClassName}
      selectComponentClass={selectComponentClass || (isSmall ? MiniSelect : MiddleSelect)}
      locale={locale}
      showSizeChanger={mergedShowSizeChanger}
    />,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Pagination.displayName = 'Pagination';
}

export default Pagination;
