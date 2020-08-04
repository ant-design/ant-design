import * as React from 'react';
import classNames from 'classnames';
import { ElementOf, Omit, tuple } from '../_util/type';
import Pagination from '../pagination';
import { TransferItem } from '.';
import { TransferListProps, RenderedItem } from './list';
import ListItem from './ListItem';
import { PaginationType } from './interface';

export const OmitProps = tuple('handleFilter', 'handleClear', 'checkedKeys');
export type OmitProp = ElementOf<typeof OmitProps>;
type PartialTransferListProps = Omit<TransferListProps, OmitProp>;

export interface TransferListBodyProps extends PartialTransferListProps {
  filteredItems: TransferItem[];
  filteredRenderItems: RenderedItem[];
  selectedKeys: string[];
}

function parsePagination(pagination?: PaginationType) {
  if (!pagination) {
    return null;
  }

  const defaultPagination = {
    pageSize: 10,
  };

  if (typeof pagination === 'object') {
    return {
      ...defaultPagination,
      ...pagination,
    };
  }

  return defaultPagination;
}

interface TransferListBodyState {
  current: number;
}

class ListBody extends React.Component<TransferListBodyProps, TransferListBodyState> {
  state = {
    current: 1,
  };

  static getDerivedStateFromProps(
    { filteredRenderItems, pagination }: TransferListBodyProps,
    { current }: TransferListBodyState,
  ) {
    const mergedPagination = parsePagination(pagination);
    if (mergedPagination) {
      // Calculate the page number
      const maxPageCount = Math.ceil(filteredRenderItems.length / mergedPagination.pageSize);

      if (current > maxPageCount) {
        return { current: maxPageCount };
      }
    }

    return null;
  }

  onItemSelect = (item: TransferItem) => {
    const { onItemSelect, selectedKeys } = this.props;
    const checked = selectedKeys.indexOf(item.key) >= 0;
    onItemSelect(item.key, !checked);
  };

  onItemRemove = (item: TransferItem) => {
    const { onItemRemove } = this.props;
    onItemRemove?.([item.key]);
  };

  onPageChange = (current: number) => {
    this.setState({ current });
  };

  getItems = () => {
    const { current } = this.state;
    const { pagination, filteredRenderItems } = this.props;

    const mergedPagination = parsePagination(pagination);

    let displayItems = filteredRenderItems;

    if (mergedPagination) {
      displayItems = filteredRenderItems.slice(
        (current - 1) * mergedPagination.pageSize,
        current * mergedPagination.pageSize,
      );
    }

    return displayItems;
  };

  render() {
    const { current } = this.state;
    const {
      prefixCls,
      onScroll,
      filteredRenderItems,
      selectedKeys,
      disabled: globalDisabled,
      showRemove,
      pagination,
    } = this.props;

    const mergedPagination = parsePagination(pagination);
    let paginationNode: React.ReactNode = null;

    if (mergedPagination) {
      paginationNode = (
        <Pagination
          simple
          disabled={globalDisabled}
          className={`${prefixCls}-pagination`}
          total={filteredRenderItems.length}
          pageSize={mergedPagination.pageSize}
          current={current}
          onChange={this.onPageChange}
        />
      );
    }

    return (
      <>
        <ul
          className={classNames(`${prefixCls}-content`, {
            [`${prefixCls}-content-show-remove`]: showRemove,
          })}
          onScroll={onScroll}
        >
          {this.getItems().map(({ renderedEl, renderedText, item }: RenderedItem) => {
            const { disabled } = item;
            const checked = selectedKeys.indexOf(item.key) >= 0;

            return (
              <ListItem
                disabled={globalDisabled || disabled}
                key={item.key}
                item={item}
                renderedText={renderedText}
                renderedEl={renderedEl}
                checked={checked}
                prefixCls={prefixCls}
                onClick={this.onItemSelect}
                onRemove={this.onItemRemove}
                showRemove={showRemove}
              />
            );
          })}
        </ul>

        {paginationNode}
      </>
    );
  }
}

export default ListBody;
