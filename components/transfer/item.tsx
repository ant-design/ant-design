import React from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import assign from 'object-assign';
import Lazyload from 'react-lazy-load';
import Checkbox from '../checkbox';

function isRenderResultPlainObject(result) {
  return result && !React.isValidElement(result) &&
    Object.prototype.toString.call(result) === '[object Object]';
}

export default class Item extends React.Component<any, any> {
  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }
  matchFilter = (text) => {
    const { filter, filterOption, item } = this.props;
    if (filterOption) {
      return filterOption(filter, item);
    }
    return text.indexOf(filter) >= 0;
  }
  render() {
    const { render, filter, item, lazy, checked, prefixCls, onClick } = this.props;
    const renderResult = render(item);
    let renderedText;
    let renderedEl;
    if (isRenderResultPlainObject(renderResult)) {
      renderedText = renderResult.value;
      renderedEl = renderResult.label;
    } else {
      renderedText = renderResult;
      renderedEl = renderResult;
    }

    if (filter && filter.trim() && !this.matchFilter(renderedText)) {
      return null;
    }

    const className = classNames({
      [`${prefixCls}-content-item`]: true,
      [`${prefixCls}-content-item-disabled`]: item.disabled,
    });

    const lazyProps = assign({
      height: 32,
      offset: 500,
      throttle: 0,
      debounce: false,
    }, lazy);

    return (
      <Lazyload {...lazyProps}>
        <li
          className={className}
          title={renderedText}
          onClick={item.disabled ? undefined : () => onClick(item)}
        >
          <Checkbox checked={checked} disabled={item.disabled} />
          <span>{renderedEl}</span>
        </li>
      </Lazyload>
    );
  }
}
