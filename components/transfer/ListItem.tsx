import * as React from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import Lazyload from 'react-lazy-load';
import Checkbox from '../checkbox';

export default class ListItem extends React.Component<any, any> {
  shouldComponentUpdate(...args: any[]) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  render() {
    const {
      renderedText,
      renderedEl,
      item,
      lazy,
      checked,
      disabled,
      prefixCls,
      onClick,
    } = this.props;

    const className = classNames({
      [`${prefixCls}-content-item`]: true,
      [`${prefixCls}-content-item-disabled`]: disabled || item.disabled,
    });

    let title: string | undefined;
    if (typeof renderedText === 'string' || typeof renderedText === 'number') {
      title = String(renderedText);
    }

    const listItem = (
      <li
        className={className}
        title={title}
        onClick={disabled || item.disabled ? undefined : () => onClick(item)}
      >
        <Checkbox checked={checked} disabled={disabled || item.disabled} />
        <span className={`${prefixCls}-content-item-text`}>{renderedEl}</span>
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
