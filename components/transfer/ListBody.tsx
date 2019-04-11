import * as React from 'react';
import classNames from 'classnames';
import Animate from 'rc-animate';
import raf from '../_util/raf';
import { Omit, tuple } from '../_util/type';
import { TransferItem } from '.';
import { TransferListProps, RenderedItem } from './list';
import ListItem from './ListItem';

export const OmitProps = tuple('handleFilter', 'handleSelect', 'handleSelectAll', 'handleClear');
export type OmitProp = (typeof OmitProps)[number];
type PartialTransferListProps = Omit<TransferListProps, OmitProp>;

export interface TransferListBodyProps extends PartialTransferListProps {
  filteredItems: TransferItem[];
  filteredRenderItems: RenderedItem[];
  onItemSelect: (item: TransferItem) => void;
}

class ListBody extends React.Component<TransferListBodyProps> {
  private mountId: number;

  state = {
    mounted: false,
  };

  componentDidMount() {
    this.mountId = raf(() => {
      this.setState({ mounted: true });
    });
  }

  componentWillMount() {
    raf.cancel(this.mountId);
  }

  render() {
    const { mounted } = this.state;
    const { prefixCls, onScroll, filteredRenderItems, lazy, checkedKeys, onItemSelect } = this.props;

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
          const checked = checkedKeys.indexOf(item.key) >= 0;

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
              onClick={onItemSelect}
            />
          );
        })}
      </Animate>
    );
  }
}

export default (props: TransferListBodyProps) => <ListBody {...props} />;