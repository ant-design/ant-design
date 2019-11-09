import * as React from 'react';
import classNames from 'classnames';
import { Plus, Minus } from '@ant-design/icons';
import { TableLocale } from './interface';

interface DefaultExpandIconProps<RecordType> {
  prefixCls: string;
  onExpand: (record: RecordType, e: React.MouseEvent<HTMLElement>) => void;
  record: RecordType;
  expanded: boolean;
}

function renderExpandIcon(locale: TableLocale) {
  return function expandIcon<RecordType>({
    prefixCls,
    onExpand,
    record,
    expanded,
  }: DefaultExpandIconProps<RecordType>) {
    return (
      <button
        type="button"
        onClick={e => onExpand(record, e!)}
        className={classNames(`${prefixCls}-row-expand-icon`, `${prefixCls}-row-collapsed`)}
        aria-label={expanded ? locale.collapse : locale.expand}
      >
        {expanded ? <Minus /> : <Plus />}
      </button>
    );
  };
}

export default renderExpandIcon;
