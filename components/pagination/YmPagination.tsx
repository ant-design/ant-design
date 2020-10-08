import React, { useState } from 'react';
import Pagination, { PaginationProps } from './Pagination';
import Select from '../select';
import Input from '../input';

const { Option } = Select;

const YmPagination: React.FC<PaginationProps> = ({ ...restProps }) => {
  const { pageSize, defaultPageSize, current, defaultCurrent, total: quantity = 0 } = restProps;

  const currentToSet = current || defaultCurrent || 1;
  const pageSizeToSet = pageSize || defaultPageSize || 10;

  const [currentPageSize, setCurrentPageSize] = useState<number>(pageSizeToSet);
  const [currentPage, setCurrentPage] = useState<string | number>(currentToSet);

  const prefixCls = 'ant-pagination-ym';

  const Selector = ({ total }: { total: number }) => {
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
          <Option key={10} value={10}>
            10
          </Option>
          {total > 20 && (
            <Option key={20} value={20}>
              20
            </Option>
          )}
          {total > 30 && (
            <Option key={30} value={30}>
              30
            </Option>
          )}
          {total > 50 && (
            <Option key={50} value={50}>
              50
            </Option>
          )}
        </Select>
        {` of ${total}`}
      </div>
    );
  };

  const totalPages = Math.ceil(quantity / currentPageSize);

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

  const renderGoTo = () => {
    if (restProps.hideOnSinglePage && totalPages === 1) {
      return null;
    }
    return (
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
    );
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
      {renderGoTo()}
    </div>
  );
};

export default YmPagination;
