import * as React from 'react';
import { Summary, EXPAND_COLUMN } from 'rc-table';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import InternalTable from './InternalTable';
import type { TableProps } from './InternalTable';
import type { RefTable } from './interface';
import {
  SELECTION_ALL,
  SELECTION_COLUMN,
  SELECTION_INVERT,
  SELECTION_NONE,
} from './hooks/useSelection';

function Table<RecordType extends object = any>(
  props: TableProps<RecordType>,
  ref: React.Ref<HTMLDivElement>,
) {
  const renderTimesRef = React.useRef(0);
  renderTimesRef.current += 1;

  return <InternalTable<RecordType> {...props} ref={ref} _renderTimes={renderTimesRef.current} />;
}

const ForwardTable = React.forwardRef(Table) as any as RefTable & {
  SELECTION_COLUMN: typeof SELECTION_COLUMN;
  EXPAND_COLUMN: typeof EXPAND_COLUMN;
  SELECTION_ALL: 'SELECT_ALL';
  SELECTION_INVERT: 'SELECT_INVERT';
  SELECTION_NONE: 'SELECT_NONE';
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
