import * as React from 'react';
import RcPagination from 'rc-pagination';
import enUS from 'rc-pagination/lib/locale/en_US';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import Select from '../select';
import MiniSelect from './MiniSelect';

export interface PaginationProps {
  total?: number;
  defaultCurrent?: number;
  current?: number;
  defaultPageSize?: number;
  pageSize?: number;
  onChange?: (page: number, pageSize?: number) => void;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
  onShowSizeChange?: (current: number, size: number) => void;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  size?: string;
  simple?: boolean;
  style?: React.CSSProperties;
  locale?: Object;
  className?: string;
  prefixCls?: string;
  selectPrefixCls?: string;
  itemRender?: (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next') => React.ReactNode;
  role?: string;
}

export interface PaginationConfig extends PaginationProps {
  position?: 'top' | 'bottom' | 'both';
}

export type PaginationLocale = any;

export default class Pagination extends React.Component<PaginationProps, {}> {
  static defaultProps = {
    prefixCls: 'ant-pagination',
    selectPrefixCls: 'ant-select',
  };

  renderPagination = (contextLocale: PaginationLocale) => {
    const { className, size, locale: customLocale,  ...restProps } = this.props;
    const locale = { ...contextLocale, ...customLocale };
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

  render() {
    return (
      <LocaleReceiver
        componentName="Pagination"
        defaultLocale={enUS}
      >
        {this.renderPagination}
      </LocaleReceiver>
    );
  }
}
