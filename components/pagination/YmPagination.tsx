import React, { useState } from 'react';
import Pagination, { PaginationProps } from './Pagination';
import Select from '../select';
import Input from '../input';

const { Option } = Select;

const YmPagination: React.FC<PaginationProps> = ({ ...restProps }) => {
  const { defaultPageSize = 10, defaultCurrent = 1 } = restProps;
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<string | number>(defaultCurrent);

  const Selector = ({ total }: { total: number }) => {
    setTotalPage(total);
    return (
      <span>
        {'Showing '}
        <Select
          size="small"
          defaultValue={pageSize}
          style={{ width: 60 }}
          onChange={value => {
            setPageSize(value);
            if (restProps.onChange) {
              restProps.onChange(Number(currentPage), value);
            }
          }}
        >
          <Option value={10}>10</Option>
          <Option value={20}>20</Option>
          <Option value={30}>30</Option>
        </Select>
        {` of ${total}`}
      </span>
    );
  };

  const totalPages = Math.ceil(totalPage / pageSize);

  const handleSetPage = (value: string | number | undefined) => {
    const pageToGo = Number(value);
    if (Number.isInteger(pageToGo) && pageToGo > 0 && pageToGo <= totalPages) {
      setCurrentPage(pageToGo);
      if (restProps.onChange) {
        restProps.onChange(pageToGo, pageSize);
      }
    }
    if (value === '') {
      setCurrentPage('');
    }
  };

  const prefixCls = 'ant-pagination-ym';

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <Pagination
        prefixCls={prefixCls}
        showTotal={total => <Selector total={total} />}
        pageSize={pageSize}
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
          className={`${prefixCls}-input`}
          value={currentPage}
          onChange={e => handleSetPage(e.target.value)}
        />
        / {totalPages}
      </div>
    </div>
  );
};

export default YmPagination;
