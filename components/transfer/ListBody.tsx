import classNames from 'classnames';
import * as React from 'react';
import type { KeyWiseTransferItem } from '.';
import Pagination from '../pagination';
import type { PaginationType } from './interface';
import type { RenderedItem, TransferListProps } from './list';
import ListItem from './ListItem';

export const OmitProps = ['handleFilter', 'handleClear', 'checkedKeys'] as const;
export type OmitProp = typeof OmitProps[number];
type PartialTransferListProps<RecordType> = Omit<TransferListProps<RecordType>, OmitProp>;

export interface TransferListBodyProps<RecordType> extends PartialTransferListProps<RecordType> {
  filteredItems: RecordType[];
  filteredRenderItems: RenderedItem<RecordType>[];
  selectedKeys: string[];
}

function parsePagination(pagination?: PaginationType) {
  if (!pagination) {
    return null;
  }

  const defaultPagination = {
    pageSize: 10,
    simple: true,
    showSizeChanger: false,
    showLessItems: false,
  };

  if (typeof pagination === 'object') {
    return { ...defaultPagination, ...pagination };
  }

  return defaultPagination;
}

export interface ListBodyRef {
  getItems?: RenderedItem<KeyWiseTransferItem>[];
}

const ListBody: React.ForwardRefRenderFunction<
  ListBodyRef,
  TransferListBodyProps<KeyWiseTransferItem>
> = <RecordType extends KeyWiseTransferItem>(
  props: TransferListBodyProps<RecordType>,
  ref: React.ForwardedRef<ListBodyRef>,
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
      const maxPageCount = Math.ceil(filteredRenderItems.length / mergedPagination.pageSize);
      if (current > maxPageCount) {
        setCurrent(maxPageCount);
      }
    }
  }, [current, filteredRenderItems, pagination]);

  const onClick = (item: RecordType) => {
    onItemSelect?.(item.key, !selectedKeys.includes(item.key));
  };

  const onRemove = (item: RecordType) => {
    onItemRemove?.([item.key]);
  };

  const onPageChange = (cur: number) => {
    setCurrent(cur);
  };

  const getItems = React.useMemo<RenderedItem<RecordType>[]>(() => {
    const mergedPagination = parsePagination(pagination);
    const displayItems = mergedPagination
      ? filteredRenderItems.slice(
          (current - 1) * mergedPagination.pageSize,
          current * mergedPagination.pageSize,
        )
      : filteredRenderItems;
    return displayItems;
  }, [current, filteredRenderItems, pagination]);

  React.useImperativeHandle(ref, () => ({
    getItems,
  }));

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

  return (
    <>
      <ul
        className={classNames(`${prefixCls}-content`, {
          [`${prefixCls}-content-show-remove`]: showRemove,
        })}
        onScroll={onScroll}
      >
        {(getItems || []).map(({ renderedEl, renderedText, item }) => (
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
  ListBody.displayName = 'ListBody';
}

export default React.forwardRef<ListBodyRef, TransferListBodyProps<KeyWiseTransferItem>>(ListBody);
