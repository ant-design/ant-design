import * as React from 'react';
import { findDOMNode } from 'react-dom';
import Animate from 'rc-animate';
import raf from '../_util/raf';
import { Omit, tuple } from '../_util/type';
import { TransferItem } from '.';
import { TransferListProps, RenderedItem } from './list';
import ListItem from './ListItem';

export const OmitProps = tuple(
  'handleFilter',
  'handleSelect',
  'handleSelectAll',
  'handleClear',
  'body',
  'checkedKeys',
);
export type OmitProp = (typeof OmitProps)[number];
type PartialTransferListProps = Omit<TransferListProps, OmitProp>;

export interface TransferListBodyProps extends PartialTransferListProps {
  filteredItems: TransferItem[];
  filteredRenderItems: RenderedItem[];
  selectedKeys: string[];
}

class ListBody extends React.Component<TransferListBodyProps> {
  state = {
    mounted: false,
  };

  private mountId: number;

  private lazyId: number;

  componentDidMount() {
    this.mountId = raf(() => {
      this.setState({ mounted: true });
    });
  }

  componentDidUpdate(prevProps: TransferListBodyProps) {
    const { filteredRenderItems, lazy } = this.props;
    if (prevProps.filteredRenderItems.length !== filteredRenderItems.length && lazy !== false) {
      // TODO: Replace this with ref when react 15 support removed.
      const container = findDOMNode(this);

      raf.cancel(this.lazyId);
      this.lazyId = raf(() => {
        if (container) {
          const scrollEvent = new Event('scroll', { bubbles: true });
          container.dispatchEvent(scrollEvent);
        }
      });
    }
  }

  componentWillUnmount() {
    raf.cancel(this.mountId);
    raf.cancel(this.lazyId);
  }

  onItemSelect = (item: TransferItem) => {
    const { onItemSelect, selectedKeys } = this.props;
    const checked = selectedKeys.indexOf(item.key) >= 0;
    onItemSelect(item.key, !checked);
  };

  render() {
    const { mounted } = this.state;
    const { prefixCls, onScroll, filteredRenderItems, lazy, selectedKeys } = this.props;

    return (
      <Animate
        component="ul"
        componentProps={{ onScroll }}
        className={`${prefixCls}-content`}
        transitionName={mounted ? `${prefixCls}-content-item-highlight` : ''}
        transitionLeave={false}
      >
        {filteredRenderItems.map(({ renderedEl, renderedText, item }: RenderedItem) => {
          const { disabled } = item;
          const checked = selectedKeys.indexOf(item.key) >= 0;

          return (
            <ListItem
              disabled={disabled}
              key={item.key}
              item={item}
              lazy={lazy}
              renderedText={renderedText}
              renderedEl={renderedEl}
              checked={checked}
              prefixCls={prefixCls}
              onClick={this.onItemSelect}
            />
          );
        })}
      </Animate>
    );
  }
}

const ListBodyWrapper = (props: TransferListBodyProps) => <ListBody {...props} />;

export default ListBodyWrapper;
