import React from 'react';
import RcTable from 'rc-table';

export interface ColumnGroupProps {
  title?: React.ReactNode;
}

export default class ColumnGroup extends (RcTable.ColumnGroup as React.ComponentClass<ColumnGroupProps>) {}
