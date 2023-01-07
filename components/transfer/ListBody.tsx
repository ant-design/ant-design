import classNames from 'classnames';
import * as React from 'react';
import type { KeyWiseTransferItem } from '.';
import type { PaginationType } from './interface';
import type { RenderedItem, TransferListProps } from './list';
import Pagination from '../pagination';
import ListItem from './ListItem';

export const OmitProps = ['handleFilter', 'handleClear', 'checkedKeys'] as const;
export type OmitProp = typeof OmitProps[number];
type PartialTransferListProps<RecordType> = Omit<TransferListProps<RecordType>, OmitProp>;

export interface TransferListBodyProps<RecordType> extends PartialTransferListProps<RecordType> {
  filteredItems: RecordType[];
  filteredRenderItems: RenderedItem<RecordType>[];
  selectedKeys: string[];
}

const parsePagination = (pagination?: PaginationType) => {
  if (!pagination) {
    return null;
  }

  const defaultPagination: PaginationType = {
    pageSize: 10,
    simple: true,
    showSizeChanger: false,
    showLessItems: false,
  };

  if (typeof pagination === 'object') {
    return { ...defaultPagination, ...pagination };
  }

  return defaultPagination;
};

export interface ListBodyRef<RecordType extends KeyWiseTransferItem> {
  items?: RenderedItem<RecordType>[];
}

const TransferListBody: React.ForwardRefRenderFunction<
  ListBodyRef<KeyWiseTransferItem>,
  TransferListBodyProps<KeyWiseTransferItem>
> = <RecordType extends KeyWiseTransferItem>(
  props: TransferListBodyProps<RecordType>,
  ref: React.ForwardedRef<ListBodyRef<RecordType>>,
) => {
  const {
    prefixCls,
    filteredRenderItems,
    selectedKeys,
    disabled: globalDisabled,
    showRemove,
    pagination,
    onScroll,
    onItemSelect,
    onItemRemove,
  } = props;

  const [current, setCurrent] = React.useState<number>(1);

  React.useEffect(() => {
    const mergedPagination = parsePagination(pagination);
    if (mergedPagination) {
      const maxPageCount = Math.ceil(filteredRenderItems.length / mergedPagination.pageSize!);
      setCurrent(Math.min(current, maxPageCount));
    }
  }, [filteredRenderItems, pagination]);

  const onClick = (item: RecordType) => {
    onItemSelect?.(item.key, !selectedKeys.includes(item.key));
  };

  const onRemove = (item: RecordType) => {
    onItemRemove?.([item.key]);
  };

  const onPageChange = (cur: number) => {
    setCurrent(cur);
  };

  const memoizedItems = React.useMemo<RenderedItem<RecordType>[]>(() => {
    const mergedPagination = parsePagination(pagination);
    const displayItems = mergedPagination
      ? filteredRenderItems.slice(
          (current - 1) * mergedPagination.pageSize!,
          current * mergedPagination.pageSize!,
        )
      : filteredRenderItems;
    return displayItems;
  }, [current, filteredRenderItems, pagination]);

  React.useImperativeHandle(ref, () => ({ items: memoizedItems }));

  const mergedPagination = parsePagination(pagination);

  const paginationNode: React.ReactNode = mergedPagination ? (
    <Pagination
      size="small"
      disabled={globalDisabled}
      simple={mergedPagination.simple}
      pageSize={mergedPagination.pageSize}
      showLessItems={mergedPagination.showLessItems}
      showSizeChanger={mergedPagination.showSizeChanger}
      className={`${prefixCls}-pagination`}
      total={filteredRenderItems.length}
      current={current}
      onChange={onPageChange}
    />
  ) : null;

  const cls = classNames(`${prefixCls}-content`, {
    [`${prefixCls}-content-show-remove`]: showRemove,
  });

  return (
    <>
      <ul className={cls} onScroll={onScroll}>
        {(memoizedItems || []).map(({ renderedEl, renderedText, item }) => (
          <ListItem
            key={item.key}
            item={item}
            renderedText={renderedText}
            renderedEl={renderedEl}
            prefixCls={prefixCls}
            showRemove={showRemove}
            onClick={onClick}
            onRemove={onRemove}
            checked={selectedKeys.includes(item.key)}
            disabled={globalDisabled || item.disabled}
          />
        ))}
      </ul>
      {paginationNode}
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  TransferListBody.displayName = 'TransferListBody';
}

export default React.forwardRef<
  ListBodyRef<KeyWiseTransferItem>,
  TransferListBodyProps<KeyWiseTransferItem>
>(TransferListBody);
