import * as React from 'react';
import RcTable from 'rc-table';
import { TableProps as RcTableProps } from 'rc-table/lib/Table';
import Pagination, { PaginationProps } from '../pagination';
import { ConfigContext } from '../config-provider/context';

export interface TableProps<RecordType> extends RcTableProps<RecordType> {
  dataSource?: RcTableProps<RecordType>['data'];
  pagination?: false | PaginationProps;
}

function Table<RecordType = any>(props: TableProps<RecordType>) {
  const { prefixCls: customizePrefixCls, dataSource, pagination } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('table', customizePrefixCls);

  // ============================ Render ============================
  let paginationNode;
  if (pagination !== false) {
    paginationNode = <Pagination className={`${prefixCls}-pagination`} />;
  }

  return (
    <div className={`${prefixCls}-wrapper`}>
      <RcTable {...props} prefixCls={prefixCls} data={dataSource} />
      {paginationNode}
    </div>
  );
}

export default Table;
