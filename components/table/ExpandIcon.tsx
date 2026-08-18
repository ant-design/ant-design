import * as React from 'react';
import type { ExpandableConfig, ExpandIconProps } from '@rc-component/table';
import { clsx } from 'clsx';

import type { AnyObject } from '../_util/type';
import type { TableLocale } from './interface';

type ExpandIconLocale = Pick<TableLocale, 'collapse' | 'collapseAll' | 'expand' | 'expandAll'>;

type ExpandIconComponent<RecordType> = React.ComponentType<ExpandIconProps<RecordType>>;
type RenderExpandIcon<RecordType> = NonNullable<ExpandableConfig<RecordType>['expandIcon']>;

type DefaultExpandIconProps<RecordType> = ExpandIconProps<RecordType> & {
  locale: ExpandIconLocale;
};

const DefaultExpandIcon = <RecordType extends AnyObject = AnyObject>(
  props: DefaultExpandIconProps<RecordType>,
) => {
  const { prefixCls, type, expanded, expandable, locale, onClick } = props;
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

function renderExpandIcon<RecordType extends AnyObject = AnyObject>(
  locale: ExpandIconLocale,
): RenderExpandIcon<RecordType> {
  return (props) => {
    const { prefixCls, onExpand, record, expanded, expandable } = props;
    return (
      <DefaultExpandIcon
        type="row"
        prefixCls={prefixCls}
        record={record}
        expanded={expanded}
        expandable={expandable}
        locale={locale}
        onClick={(e) => {
          onExpand(record, e!);
          e.stopPropagation();
        }}
      />
    );
  };
}

export function renderExpandIconComponent<RecordType extends AnyObject = AnyObject>(
  locale: ExpandIconLocale,
  rowExpandIcon: RenderExpandIcon<RecordType>,
): ExpandIconComponent<RecordType> {
  return (props) => {
    if (props.type === 'row') {
      const { prefixCls, record, expanded, expandable, onClick } = props;
      return rowExpandIcon({
        prefixCls,
        record,
        expanded,
        expandable,
        onExpand: (_record, event) => onClick(event),
      });
    }

    return <DefaultExpandIcon {...props} locale={locale} />;
  };
}

export default renderExpandIcon;
