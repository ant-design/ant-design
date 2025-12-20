import * as React from 'react';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { clsx } from 'clsx';

import type { KeyWiseTransferItem, TransferSemanticClassNames, TransferSemanticStyles } from '.';
import Checkbox from '../checkbox';
import { useLocale } from '../locale';
import defaultLocale from '../locale/en_US';

type ListItemProps<RecordType> = {
  prefixCls: string;
  classNames: TransferSemanticClassNames;
  styles: TransferSemanticStyles;
  renderedText?: string | number;
  renderedEl: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  onClick: (item: RecordType, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  onRemove?: (item: RecordType) => void;
  item: RecordType;
  showRemove?: boolean;
};

const ListItem = <RecordType extends KeyWiseTransferItem>(props: ListItemProps<RecordType>) => {
  const {
    prefixCls,
    classNames,
    styles,
    renderedText,
    renderedEl,
    item,
    checked,
    disabled,
    onClick,
    onRemove,
    showRemove,
  } = props;

  const classes = clsx(`${prefixCls}-content-item`, classNames.item, {
    [`${prefixCls}-content-item-disabled`]: disabled || item.disabled,
    [`${prefixCls}-content-item-checked`]: checked && !item.disabled,
  });

  let title: string | undefined;
  if (typeof renderedText === 'string' || typeof renderedText === 'number') {
    title = String(renderedText);
  }

  const [contextLocale] = useLocale('Transfer', defaultLocale.Transfer);

  const liProps: React.HTMLAttributes<HTMLLIElement> = {
    className: classes,
    style: styles.item,
    title,
  };

  const labelNode = (
    <span
      className={clsx(`${prefixCls}-content-item-text`, classNames.itemContent)}
      style={styles.itemContent}
    >
      {renderedEl}
    </span>
  );

  if (showRemove) {
    return (
      <li {...liProps}>
        {labelNode}
        <button
          type="button"
          disabled={disabled || item.disabled}
          className={`${prefixCls}-content-item-remove`}
          aria-label={contextLocale?.remove}
          onClick={() => onRemove?.(item)}
        >
          <DeleteOutlined />
        </button>
      </li>
    );
  }

  // Default click to select
  liProps.onClick = disabled || item.disabled ? undefined : (event) => onClick(item, event);

  return (
    <li {...liProps}>
      <Checkbox
        className={clsx(`${prefixCls}-checkbox`, classNames.itemIcon)}
        style={styles.itemIcon}
        checked={checked}
        disabled={disabled || item.disabled}
      />
      {labelNode}
    </li>
  );
};

export default React.memo(ListItem);
