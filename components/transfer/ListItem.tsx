import * as React from 'react';
import classNames from 'classnames';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { TransferItem, TransferLocale } from '.';
import defaultLocale from '../locale/default';
import Checkbox from '../checkbox';
import TransButton from '../_util/transButton';
import LocaleReceiver from '../locale-provider/LocaleReceiver';

type ListItemProps = {
  renderedText?: string | number;
  renderedEl: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  prefixCls: string;
  onClick: (item: TransferItem) => void;
  onRemove?: (item: TransferItem) => void;
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
    onRemove,
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

  return (
    <LocaleReceiver componentName="Transfer" defaultLocale={defaultLocale.Transfer}>
      {(transferLocale: TransferLocale) => {
        const liProps: React.HTMLAttributes<HTMLLIElement> = { className, title };
        const labelNode = <span className={`${prefixCls}-content-item-text`}>{renderedEl}</span>;

        // Show remove
        if (showRemove) {
          return (
            <li {...liProps}>
              {labelNode}
              <TransButton
                disabled={disabled || item.disabled}
                className={`${prefixCls}-content-item-remove`}
                aria-label={transferLocale.remove}
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
        liProps.onClick = disabled || item.disabled ? undefined : () => onClick(item);
        return (
          <li {...liProps}>
            <Checkbox checked={checked} disabled={disabled || item.disabled} />
            {labelNode}
          </li>
        );
      }}
    </LocaleReceiver>
  );
};

export default React.memo(ListItem);
