import { EXPAND_COLUMN, Summary } from 'rc-table';
import * as React from 'react';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import type { TableProps } from './InternalTable';
import InternalTable from './InternalTable';
import {
  SELECTION_ALL,
  SELECTION_COLUMN,
  SELECTION_INVERT,
  SELECTION_NONE,
} from './hooks/useSelection';
import type { RefTable } from './interface';

export type AnyObject = Record<PropertyKey, any>;

const Table = <RecordType extends AnyObject = any>(
  props: TableProps<RecordType>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const renderTimesRef = React.useRef(0);
  renderTimesRef.current += 1;
  return <InternalTable<RecordType> {...props} ref={ref} _renderTimes={renderTimesRef.current} />;
};

const ForwardTable = React.forwardRef(Table) as unknown as RefTable & {
  SELECTION_COLUMN: typeof SELECTION_COLUMN;
  EXPAND_COLUMN: typeof EXPAND_COLUMN;
  SELECTION_ALL: typeof SELECTION_ALL;
  SELECTION_INVERT: typeof SELECTION_INVERT;
  SELECTION_NONE: typeof SELECTION_NONE;
  Column: typeof Column;
  ColumnGroup: typeof ColumnGroup;
  Summary: typeof Summary;
};

ForwardTable.SELECTION_COLUMN = SELECTION_COLUMN;
ForwardTable.EXPAND_COLUMN = EXPAND_COLUMN;
ForwardTable.SELECTION_ALL = SELECTION_ALL;
ForwardTable.SELECTION_INVERT = SELECTION_INVERT;
ForwardTable.SELECTION_NONE = SELECTION_NONE;
ForwardTable.Column = Column;
ForwardTable.ColumnGroup = ColumnGroup;
ForwardTable.Summary = Summary;

export default ForwardTable;
