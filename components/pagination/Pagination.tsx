import * as React from 'react';
import RcPagination from 'rc-pagination';
import enUS from 'rc-pagination/lib/locale/en_US';
import classNames from 'classnames';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import DoubleLeftOutlined from '@ant-design/icons/DoubleLeftOutlined';
import DoubleRightOutlined from '@ant-design/icons/DoubleRightOutlined';

import MiniSelect from './MiniSelect';
import Select from '../select';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { ConfigContext } from '../config-provider';
import useBreakpoint from '../grid/hooks/useBreakpoint';

export interface PaginationProps {
  total?: number;
  defaultCurrent?: number;
  disabled?: boolean;
  current?: number;
  defaultPageSize?: number;
  pageSize?: number;
  onChange?: (page: number, pageSize?: number) => void;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
  onShowSizeChange?: (current: number, size: number) => void;
  showQuickJumper?: boolean | { goButton?: React.ReactNode };
  showTitle?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  size?: 'default' | 'small';
  responsive?: boolean;
  simple?: boolean;
  style?: React.CSSProperties;
  locale?: Object;
  className?: string;
  prefixCls?: string;
  selectPrefixCls?: string;
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactElement<HTMLElement>,
  ) => React.ReactNode;
  role?: string;
  showLessItems?: boolean;
}

export type PaginationPosition = 'top' | 'bottom' | 'both';

export interface PaginationConfig extends PaginationProps {
  position?: PaginationPosition;
}

export type PaginationLocale = any;

export interface IconProps {
  prefixCls: string;
  children: React.ReactNode;
}

export const DirectionIcon: React.FC<IconProps> = ({ prefixCls, children, ...restProps }) => (
  <button className={`${prefixCls}-item-link`} type="button" tabIndex={-1} {...restProps}>
    {children}
  </button>
);

export const JumpIcon: React.FC<IconProps> = ({ prefixCls, children }) => (
  <a className={`${prefixCls}-item-link`}>
    {/* You can use transition effects in the container :) */}
    <div className={`${prefixCls}-item-container`}>
      {children}
      <span className={`${prefixCls}-item-ellipsis`}>•••</span>
    </div>
  </a>
);

const Pagination: React.FC<PaginationProps> = ({
  prefixCls: customizePrefixCls,
  selectPrefixCls: customizeSelectPrefixCls,
  className,
  size,
  locale: customLocale,
  ...restProps
}) => {
  const { xs } = useBreakpoint();

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('pagination', customizePrefixCls);

  const getIconsProps = () => {
    let prevIcon = (
      <DirectionIcon prefixCls={prefixCls}>
        <LeftOutlined />
      </DirectionIcon>
    );
    let nextIcon = (
      <DirectionIcon prefixCls={prefixCls}>
        <RightOutlined />
      </DirectionIcon>
    );
    const jumpClass = `${prefixCls}-item-link-icon`;
    let jumpPrevIcon = (
      <JumpIcon prefixCls={prefixCls}>
        <DoubleLeftOutlined className={jumpClass} />
      </JumpIcon>
    );
    let jumpNextIcon = (
      <JumpIcon prefixCls={prefixCls}>
        <DoubleRightOutlined className={jumpClass} />
      </JumpIcon>
    );
    // change arrows direction in right-to-left direction
    if (direction === 'rtl') {
      [prevIcon, nextIcon] = [nextIcon, prevIcon];
      [jumpPrevIcon, jumpNextIcon] = [jumpNextIcon, jumpPrevIcon];
    }
    return {
      prevIcon,
      nextIcon,
      jumpPrevIcon,
      jumpNextIcon,
    };
  };

  const renderPagination = (contextLocale: PaginationLocale) => {
    const locale = { ...contextLocale, ...customLocale };
    const isSmall = size === 'small' || !!(xs && !size && restProps.responsive);
    const selectPrefixCls = getPrefixCls('select', customizeSelectPrefixCls);
    const extendedClassName = classNames(
      {
        mini: isSmall,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );

    return (
      <RcPagination
        {...restProps}
        prefixCls={prefixCls}
        selectPrefixCls={selectPrefixCls}
        {...getIconsProps()}
        className={extendedClassName}
        selectComponentClass={isSmall ? MiniSelect : Select}
        locale={locale}
      />
    );
  };

  return (
    <LocaleReceiver componentName="Pagination" defaultLocale={enUS}>
      {renderPagination}
    </LocaleReceiver>
  );
};

export default Pagination;
