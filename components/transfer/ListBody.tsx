import * as React from 'react';
import Animate from 'rc-animate';
import classNames from 'classnames';
import Search from './search';
import Item from './item';
import { TransferListProps } from './list';
import { TransferItem } from '.';

interface ListBodyProps extends TransferListProps {
  mounted: boolean;
  onItemSelect: (selectedItem: TransferItem) => void;
}

function isRenderResultPlainObject(result: any) {
  return (
    result &&
    !React.isValidElement(result) &&
    Object.prototype.toString.call(result) === '[object Object]'
  );
}

const renderItem = (item: TransferItem, render: (item: any) => any = () => null) => {
  const renderResult = render(item);
  const isRenderResultPlain = isRenderResultPlainObject(renderResult);
  return {
    renderedText: isRenderResultPlain ? renderResult.value : renderResult,
    renderedEl: isRenderResultPlain ? renderResult.label : renderResult,
  };
};

const ListBody: React.SFC<ListBodyProps> = ({
  dataSource,
  filter,
  showSearch,
  prefixCls,
  checkedKeys,
  disabled,
  lazy,
  searchPlaceholder,
  notFoundContent,
  onScroll,
  onItemSelect,
  render,
  mounted,
}) => {
  const showItems = dataSource.map((item) => {
    const { renderedText, renderedEl } = renderItem(item, render);
    if (filter && filter.trim() && !this.matchFilter(renderedText, item)) {
      return null;
    }

    // // all show items
    // if (!item.disabled) {
    //   // response to checkAll items
    //   filteredDataSource.push(item);
    // }

    const checked = checkedKeys.indexOf(item.key) >= 0;
    return (
      <Item
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
  });

  const search = showSearch ? (
    <div className={`${prefixCls}-body-search-wrapper`}>
      <Search
        prefixCls={`${prefixCls}-search`}
        onChange={this.handleFilter}
        handleClear={this.handleClear}
        placeholder={searchPlaceholder}
        value={filter}
        disabled={disabled}
      />
    </div>
  ) : null;

  const searchNotFound = showItems.every((item) => item === null) && (
    <div className={`${prefixCls}-body-not-found`}>{notFoundContent}</div>
  );

  return (
    <div
      className={classNames(
        showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`,
      )}
    >
      {search}
      {!searchNotFound && (
        <Animate
          component="ul"
          componentProps={{ onScroll }}
          className={`${prefixCls}-content`}
          transitionName={mounted ? `${prefixCls}-content-item-highlight` : ''}
          transitionLeave={false}
        >
          {showItems}
        </Animate>
      )}
      {searchNotFound}
    </div>
  );
};

export default ListBody;
