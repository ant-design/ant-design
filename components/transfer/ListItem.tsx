import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import classNames from 'classnames';
import * as React from 'react';
import type { KeyWiseTransferItem } from '.';
import TransButton from '../_util/transButton';
import Checkbox from '../checkbox';
import { useLocale } from '../locale';
import defaultLocale from '../locale/en_US';

type ListItemProps<RecordType> = {
  renderedText?: string | number;
  renderedEl: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  prefixCls: string;
  onClick: (item: RecordType, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  onRemove?: (item: RecordType) => void;
  item: RecordType;
  showRemove?: boolean;
};

const ListItem = <RecordType extends KeyWiseTransferItem>(props: ListItemProps<RecordType>) => {
  const {
    renderedText,
    renderedEl,
    item,
    checked,
    disabled,
    prefixCls,
    onClick,
    onRemove,
    showRemove,
  } = props;

  const className = classNames(`${prefixCls}-content-item`, {
    [`${prefixCls}-content-item-disabled`]: disabled || item.disabled,
    [`${prefixCls}-content-item-checked`]: checked,
  });

  let title: string | undefined;
  if (typeof renderedText === 'string' || typeof renderedText === 'number') {
    title = String(renderedText);
  }

  const [contextLocale] = useLocale('Transfer', defaultLocale.Transfer);

  const liProps: React.HTMLAttributes<HTMLLIElement> = { className, title };

  const labelNode = <span className={`${prefixCls}-content-item-text`}>{renderedEl}</span>;

  if (showRemove) {
    return (
      <li {...liProps}>
        {labelNode}
        <TransButton
          disabled={disabled || item.disabled}
          className={`${prefixCls}-content-item-remove`}
          aria-label={contextLocale?.remove}
          onClick={() => {
            onRemove?.(item);
          }}
        >
          <DeleteOutlined />
        </TransButton>
      </li>
    );
  }

  // Default click to select
  liProps.onClick = disabled || item.disabled ? undefined : (event) => onClick(item, event);

  return (
    <li {...liProps}>
      <Checkbox
        className={`${prefixCls}-checkbox`}
        checked={checked}
        disabled={disabled || item.disabled}
      />
      {labelNode}
    </li>
  );
};

export default React.memo(ListItem);
