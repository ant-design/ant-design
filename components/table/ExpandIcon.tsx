import * as React from 'react';
import { cnb } from 'cnbuilder';
import { TableLocale } from './interface';

interface DefaultExpandIconProps<RecordType> {
  prefixCls: string;
  onExpand: (record: RecordType, e: React.MouseEvent<HTMLElement>) => void;
  record: RecordType;
  expanded: boolean;
  expandable: boolean;
}

function renderExpandIcon(locale: TableLocale) {
  return function expandIcon<RecordType>({
    prefixCls,
    onExpand,
    record,
    expanded,
    expandable,
  }: DefaultExpandIconProps<RecordType>) {
    const iconPrefix = `${prefixCls}-row-expand-icon`;

    return (
      <button
        type="button"
        onClick={e => {
          onExpand(record, e!);
          e.stopPropagation();
        }}
        className={cnb(iconPrefix, {
          [`${iconPrefix}-spaced`]: !expandable,
          [`${iconPrefix}-expanded`]: expandable && expanded,
          [`${iconPrefix}-collapsed`]: expandable && !expanded,
        })}
        aria-label={expanded ? locale.collapse : locale.expand}
      />
    );
  };
}

export default renderExpandIcon;
