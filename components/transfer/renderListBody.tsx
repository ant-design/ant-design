import * as React from 'react';
import { ElementOf, Omit, tuple } from '../_util/type';
import { TransferItem } from '.';
import { TransferListProps, RenderedItem } from './list';
import ListItem from './ListItem';

export const OmitProps = tuple('handleFilter', 'handleClear', 'checkedKeys');
export type OmitProp = ElementOf<typeof OmitProps>;
type PartialTransferListProps = Omit<TransferListProps, OmitProp>;

export interface TransferListBodyProps extends PartialTransferListProps {
  filteredItems: TransferItem[];
  filteredRenderItems: RenderedItem[];
  selectedKeys: string[];
}

class ListBody extends React.Component<TransferListBodyProps> {
  onItemSelect = (item: TransferItem) => {
    const { onItemSelect, selectedKeys } = this.props;
    const checked = selectedKeys.indexOf(item.key) >= 0;
    onItemSelect(item.key, !checked);
  };

  onItemRemove = (item: TransferItem) => {
    const { onItemRemove } = this.props;
    onItemRemove?.(item.key);
  };

  render() {
    const {
      prefixCls,
      onScroll,
      filteredRenderItems,
      selectedKeys,
      disabled: globalDisabled,
      showRemove,
    } = this.props;

    return (
      <ul className={`${prefixCls}-content`} onScroll={onScroll}>
        {filteredRenderItems.map(({ renderedEl, renderedText, item }: RenderedItem) => {
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
    );
  }
}

const ListBodyWrapper = (props: TransferListBodyProps) => <ListBody {...props} />;

export default ListBodyWrapper;
