import * as React from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import Lazyload from 'react-lazy-load';
import Checkbox from '../checkbox';

export default class Item extends React.Component<any, any> {
  shouldComponentUpdate(...args: any[]) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }
  render() {
    const { renderedText, renderedEl, item, lazy, checked, prefixCls, onClick } = this.props;

    const className = classNames({
      [`${prefixCls}-content-item`]: true,
      [`${prefixCls}-content-item-disabled`]: item.disabled,
    });

    const listItem = (
      <li
        className={className}
        title={renderedText}
        onClick={item.disabled ? undefined : () => onClick(item)}
      >
        <Checkbox checked={checked} disabled={item.disabled} />
        <span>{renderedEl}</span>
      </li>
    );
    let children: JSX.Element | null = null;
    if (lazy) {
      const lazyProps = {
        height: 32,
        offset: 500,
        throttle: 0,
        debounce: false,
        ...lazy,
      };
      children = <Lazyload {...lazyProps}>{listItem}</Lazyload>;
    } else {
      children = listItem;
    }

    return children;
  }
}
