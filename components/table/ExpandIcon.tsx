import * as React from 'react';
import classNames from 'classnames';
import DownOutlined from '@ant-design/icons/DownOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
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

    let Icon = DownOutlined;
    if (expandable && expanded) {
      Icon = UpOutlined;
    }

    return (
      <Icon
        type="button"
        onClick={e => {
          onExpand(record, e!);
          e.stopPropagation();
        }}
        className={classNames(iconPrefix, {
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
