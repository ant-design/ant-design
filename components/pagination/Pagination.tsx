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
import type { SelectProps } from '../select';
import { useLocale } from '../locale';
import { useToken } from '../theme/internal';
import { MiddleSelect, MiniSelect } from './Select';
import useStyle from './style';
import BorderedStyle from './style/bordered';

export interface PaginationProps extends RcPaginationProps {
  showQuickJumper?: boolean | { goButton?: React.ReactNode };
  size?: 'default' | 'small';
  responsive?: boolean;
  role?: string;
  totalBoundaryShowSizeChanger?: number;
  rootClassName?: string;
  showSizeChanger?: boolean | SelectProps;
}

export type PaginationPosition = 'top' | 'bottom' | 'both';

export interface PaginationConfig extends Omit<PaginationProps, 'rootClassName'> {
  position?: PaginationPosition;
}

export type { PaginationLocale };

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    align,
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
  const [, token] = useToken();

  const { getPrefixCls, direction, pagination = {} } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('pagination', customizePrefixCls);

  // Style
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

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
      // biome-ignore lint/a11y/useValidAnchor: it is hard to refactor
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
      // biome-ignore lint/a11y/useValidAnchor: it is hard to refactor
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
      [`${prefixCls}-${align}`]: !!align,
      [`${prefixCls}-mini`]: isSmall,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-bordered`]: token.wireframe,
    },
    pagination?.className,
    className,
    rootClassName,
    hashId,
    cssVarCls,
  );

  const mergedStyle: React.CSSProperties = { ...pagination?.style, ...style };

  return wrapCSSVar(
    <>
      {token.wireframe && <BorderedStyle prefixCls={prefixCls} />}
      <RcPagination
        {...iconsProps}
        {...restProps}
        style={mergedStyle}
        prefixCls={prefixCls}
        selectPrefixCls={selectPrefixCls}
        className={extendedClassName}
        selectComponentClass={selectComponentClass || (isSmall ? MiniSelect : MiddleSelect)}
        locale={locale}
        showSizeChanger={mergedShowSizeChanger}
      />
    </>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Pagination.displayName = 'Pagination';
}

export default Pagination;
