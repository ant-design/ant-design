import React from 'react';
import type { ExpandIconProps, TableProps } from '@rc-component/table';
import { useEvent } from '@rc-component/util';
import { clsx } from 'clsx';

import type { AnyObject, GetProp } from '../_util/type';
import type { TableLocale } from './interface';

type ExpandIconComponent<RecordType extends AnyObject = AnyObject> = GetProp<
  TableProps<RecordType>,
  'components'
>['ExpandIcon'];

const InternalExpandIcon = <RecordType extends AnyObject = AnyObject>(
  props: ExpandIconProps<RecordType> & {
    locale: TableLocale;
  },
) => {
  const { prefixCls, type, expanded, expandable, onClick, locale } = props;
  const iconPrefix = `${prefixCls}-row-expand-icon`;

  if (type === 'all' && !expandable) {
    return <span className={clsx(iconPrefix, `${iconPrefix}-spaced`)} />;
  }

  const ariaLabel =
    type === 'all'
      ? expanded
        ? locale.collapseAll
        : locale.expandAll
      : expanded
        ? locale.collapse
        : locale.expand;

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(iconPrefix, {
        [`${iconPrefix}-spaced`]: !expandable,
        [`${iconPrefix}-expanded`]: expandable && expanded,
        [`${iconPrefix}-collapsed`]: expandable && !expanded,
      })}
      aria-label={ariaLabel}
      aria-expanded={expanded}
    />
  );
};

export default function useExpandIcon<RecordType extends AnyObject = AnyObject>(
  locale: TableLocale,
  ExpandIcon: ExpandIconComponent<RecordType> | undefined,
  ...legacyRenderExpandIcon: (TableProps<RecordType>['expandIcon'] | undefined)[]
): ExpandIconComponent<RecordType> {
  const MergedExpandIcon = useEvent((props: ExpandIconProps<RecordType>) => {
    if (ExpandIcon) {
      return <ExpandIcon {...props} />;
    }

    for (const renderExpandIcon of legacyRenderExpandIcon) {
      if (renderExpandIcon) {
        if (props.type === 'row') {
          const { prefixCls, record, expanded, expandable, onClick } = props;
          return renderExpandIcon({
            prefixCls,
            record,
            expanded,
            expandable,
            onExpand: (_record, event) => onClick(event),
          });
        }

        return <InternalExpandIcon {...props} locale={locale} />;
      }
    }

    return <InternalExpandIcon {...props} locale={locale} />;
  });

  return MergedExpandIcon;
}
