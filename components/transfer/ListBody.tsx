import * as React from 'react';
import { useControlledState } from '@rc-component/util';
import { clsx } from 'clsx';

import type { KeyWiseTransferItem } from '.';
import Pagination from '../pagination';
import type { PaginationType, TransferKey } from './interface';
import ListItem from './ListItem';
import type { RenderedItem, TransferListProps } from './Section';

export const OmitProps = ['handleFilter', 'handleClear', 'checkedKeys'] as const;
export type OmitProp = (typeof OmitProps)[number];
type PartialTransferListProps<RecordType> = Omit<TransferListProps<RecordType>, OmitProp>;
type ExistPagination = Exclude<PaginationType, boolean>;

export interface TransferListBodyProps<RecordType> extends PartialTransferListProps<RecordType> {
  filteredItems: RecordType[];
  filteredRenderItems: RenderedItem<RecordType>[];
  selectedKeys: TransferKey[];
}

const parsePagination = (pagination?: ExistPagination) => {
  const defaultPagination: PaginationType = {
    simple: true,
    showSizeChanger: false,
    showLessItems: false,
  };

  return { ...defaultPagination, ...pagination };
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
    classNames = {},
    styles = {},
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

  const mergedPagination = React.useMemo(() => {
    if (!pagination) {
      return null;
    }

    const convertPagination = typeof pagination === 'object' ? pagination : {};

    return parsePagination(convertPagination);
  }, [pagination]);

  const [pageSize, setPageSize] = useControlledState<number>(10, mergedPagination?.pageSize);

  React.useEffect(() => {
    if (mergedPagination) {
      const maxPageCount = Math.ceil(filteredRenderItems.length / pageSize!);
      setCurrent(Math.min(current, maxPageCount));
    }
  }, [filteredRenderItems, mergedPagination, pageSize]);

  const onInternalClick = (item: KeyWiseTransferItem, e: React.MouseEvent<Element, MouseEvent>) => {
    onItemSelect(item.key, !selectedKeys.includes(item.key), e);
  };

  const onRemove = (item: KeyWiseTransferItem) => {
    onItemRemove?.([item.key]);
  };

  const onPageChange = (cur: number) => {
    setCurrent(cur);
  };

  const onSizeChange = (cur: number, size: number) => {
    setCurrent(cur);
    setPageSize(size);
  };

  const memoizedItems = React.useMemo<RenderedItem<RecordType>[]>(() => {
    const displayItems = mergedPagination
      ? filteredRenderItems.slice((current - 1) * pageSize!, current * pageSize!)
      : filteredRenderItems;
    return displayItems;
  }, [current, filteredRenderItems, mergedPagination, pageSize]);

  React.useImperativeHandle(ref, () => ({ items: memoizedItems }));

  const paginationNode: React.ReactNode = mergedPagination ? (
    <Pagination
      size="small"
      disabled={globalDisabled}
      simple={mergedPagination.simple}
      pageSize={pageSize}
      showLessItems={mergedPagination.showLessItems}
      showSizeChanger={mergedPagination.showSizeChanger}
      className={`${prefixCls}-pagination`}
      total={filteredRenderItems.length}
      current={current}
      onChange={onPageChange}
      onShowSizeChange={onSizeChange}
    />
  ) : null;

  return (
    <>
      <ul
        className={clsx(`${prefixCls}-content`, classNames.list, {
          [`${prefixCls}-content-show-remove`]: showRemove,
        })}
        style={styles.list}
        onScroll={onScroll}
      >
        {(memoizedItems || []).map(({ renderedEl, renderedText, item }) => (
          <ListItem
            key={item.key}
            prefixCls={prefixCls}
            classNames={classNames}
            styles={styles}
            item={item}
            renderedText={renderedText}
            renderedEl={renderedEl}
            showRemove={showRemove}
            onClick={onInternalClick}
            onRemove={onRemove}
            checked={selectedKeys.includes(item.key)}
            disabled={globalDisabled}
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
