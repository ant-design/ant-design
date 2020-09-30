import React, { useState } from 'react';
import Pagination, { PaginationProps } from './Pagination';
import Select from '../select';
import Input from '../input';

const { Option } = Select;

const YmPagination: React.FC<PaginationProps> = ({ ...restProps }) => {
  const { pageSize, defaultPageSize, current, defaultCurrent, total: quantity } = restProps;

  const currentToSet = current || defaultCurrent || 1;
  const pageSizeToSet = pageSize || defaultPageSize || 10;

  const [currentPageSize, setCurrentPageSize] = useState<number>(pageSizeToSet);
  const [totalItems, setTotalItems] = useState<number>(quantity || 0);
  const [currentPage, setCurrentPage] = useState<string | number>(currentToSet);

  const prefixCls = 'ant-pagination-ym';

  const Selector = ({ total }: { total: number }) => {
    setTotalItems(total);

    return (
      <div className={`${prefixCls}-showing-select`}>
        {'Showing '}
        <Select
          disabled={restProps.disabled}
          size="small"
          defaultValue={currentPageSize}
          className={`${prefixCls}-select`}
          onChange={value => {
            setCurrentPageSize(value);
            if (restProps.onChange) {
              restProps.onChange(Number(currentPage), value);
            }
          }}
        >
          <Option value={10}>10</Option>
          <Option value={20}>20</Option>
          <Option value={30}>30</Option>
          <Option value={50}>50</Option>
        </Select>
        {` of ${total}`}
      </div>
    );
  };

  const totalPages = Math.ceil(totalItems / currentPageSize);

  const handleSetPage = (value: string | number | undefined) => {
    const pageToGo = Number(value);
    if (Number.isInteger(pageToGo) && pageToGo > 0 && pageToGo <= totalPages) {
      setCurrentPage(pageToGo);
      if (restProps.onChange) {
        restProps.onChange(pageToGo, currentPageSize);
      }
    }
    if (value === '') {
      setCurrentPage('');
    }
  };

  return (
    <div className={`${prefixCls}-container`}>
      <Pagination
        prefixCls={prefixCls}
        showTotal={total => <Selector total={total} />}
        pageSize={currentPageSize}
        current={Number(currentPage)}
        onChange={(...params) => {
          if (restProps.onChange) {
            restProps.onChange(...params);
          }
          setCurrentPage(params[0]);
        }}
        {...restProps}
        simple={false}
        showQuickJumper={false}
        showSizeChanger={false}
      />
      <div className={`${prefixCls}-options-quick-jumper`}>
        Go to
        <Input
          disabled={restProps.disabled}
          className={`${prefixCls}-input`}
          value={restProps.current || currentPage}
          onChange={e => handleSetPage(e.target.value)}
        />
        / {totalPages}
      </div>
    </div>
  );
};

export default YmPagination;
