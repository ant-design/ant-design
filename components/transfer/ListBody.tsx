import * as React from 'react';
import classNames from 'classnames';
import Animate from 'rc-animate';
import raf from '../_util/raf';
import { TransferListProps } from './list';

export interface TransferListBodyProps extends TransferListProps {
  
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
    const { prefixCls, onScroll } = this.props;

    return (
      <Animate
        component="ul"
        componentProps={{ onScroll }}
        className={`${prefixCls}-content`}
        transitionName={mounted ? `${prefixCls}-content-item-highlight` : ''}
        transitionLeave={false}
      >
        {/* {showItems} */}
      </Animate>
    );
  }
}

export default (props: TransferListBodyProps) => <ListBody {...props} />;