import * as React from 'react';
import classNames from 'classnames';
import { DeleteOutlined } from '@ant-design/icons';
import { TransferItem } from '.';
import Checkbox from '../checkbox';

type ListItemProps = {
  renderedText?: string | number;
  renderedEl: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  prefixCls: string;
  onClick: (item: TransferItem) => void;
  item: TransferItem;
  showRemove?: boolean;
};

const ListItem = (props: ListItemProps) => {
  const {
    renderedText,
    renderedEl,
    item,
    checked,
    disabled,
    prefixCls,
    onClick,
    showRemove,
  } = props;

  const className = classNames({
    [`${prefixCls}-content-item`]: true,
    [`${prefixCls}-content-item-disabled`]: disabled || item.disabled,
    [`${prefixCls}-content-item-checked`]: checked,
  });

  let title: string | undefined;
  if (typeof renderedText === 'string' || typeof renderedText === 'number') {
    title = String(renderedText);
  }

  const listItem = (
    <li
      className={className}
      title={title}
      onClick={disabled || item.disabled ? undefined : () => onClick(item)}
    >
      {!showRemove && <Checkbox checked={checked} disabled={disabled || item.disabled} />}
      <span className={`${prefixCls}-content-item-text`}>{renderedEl}</span>
      {showRemove && <DeleteOutlined />}
    </li>
  );

  return listItem;
};

export default React.memo(ListItem);
