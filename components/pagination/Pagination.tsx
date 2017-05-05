import React from 'react';
import RcPagination from 'rc-pagination';
import zhCN from 'rc-pagination/lib/locale/zh_CN';
import classNames from 'classnames';
import injectLocale from '../locale-provider/injectLocale';
import Select from '../select';
import MiniSelect from './MiniSelect';

export interface PaginationProps {
  total: number;
  defaultCurrent?: number;
  current?: number;
  defaultPageSize?: number;
  pageSize?: number;
  onChange?: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
  onShowSizeChange?: (current: number, size: number) => void;
  showQuickJumper?: boolean;
  showTotal?: (total: number) => React.ReactNode;
  size?: string;
  simple?: boolean;
  style?: React.CSSProperties;
  locale?: Object;
  className?: string;
  prefixCls?: string;
  selectPrefixCls?: string;
}

abstract class Pagination extends React.Component<PaginationProps, any> {
  static defaultProps = {
    prefixCls: 'ant-pagination',
    selectPrefixCls: 'ant-select',
  };

  abstract getLocale()

  render() {
    const { className, size, ...restProps } = this.props;
    const locale = this.getLocale();
    const isSmall = size === 'small';
    return (
      <RcPagination
        {...restProps}
        className={classNames(className, { mini: isSmall })}
        selectComponentClass={isSmall ? MiniSelect : Select}
        locale={locale}
      />
    );
  }
}

const injectPaginationLocale = injectLocale('Pagination', zhCN);
export default injectPaginationLocale<PaginationProps>(Pagination as any);
