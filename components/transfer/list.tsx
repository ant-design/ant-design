import DownOutlined from '@ant-design/icons/DownOutlined';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import Checkbox from '../checkbox';
import Dropdown from '../dropdown';
import Menu from '../menu';
import { isValidElement } from '../_util/reactNode';
import type {
  KeyWiseTransferItem,
  RenderResult,
  RenderResultObject,
  SelectAllLabel,
  TransferDirection,
  TransferLocale,
} from './index';
import type { PaginationType } from './interface';
import type { TransferListBodyProps } from './ListBody';
import DefaultListBody, { OmitProps } from './ListBody';
import Search from './search';

const defaultRender = () => null;

function isRenderResultPlainObject(result: RenderResult): result is RenderResultObject {
  return !!(
    result &&
    !isValidElement(result) &&
    Object.prototype.toString.call(result) === '[object Object]'
  );
}

function getEnabledItemKeys<RecordType extends KeyWiseTransferItem>(items: RecordType[]) {
  return items.filter(data => !data.disabled).map(data => data.key);
}

export interface RenderedItem<RecordType> {
  renderedText: string;
  renderedEl: React.ReactNode;
  item: RecordType;
}

type RenderListFunction<T> = (props: TransferListBodyProps<T>) => React.ReactNode;

export interface TransferListProps<RecordType> extends TransferLocale {
  prefixCls: string;
  titleText: React.ReactNode;
  dataSource: RecordType[];
  filterOption?: (filterText: string, item: RecordType) => boolean;
  style?: React.CSSProperties;
  checkedKeys: string[];
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onItemSelect: (key: string, check: boolean) => void;
  onItemSelectAll: (dataSource: string[], checkAll: boolean) => void;
  onItemRemove?: (keys: string[]) => void;
  handleClear: () => void;
  /** Render item */
  render?: (item: RecordType) => RenderResult;
  showSearch?: boolean;
  searchPlaceholder: string;
  itemUnit: string;
  itemsUnit: string;
  renderList?: RenderListFunction<RecordType>;
  footer?: (
    props: TransferListProps<RecordType>,
    info?: { direction: TransferDirection },
  ) => React.ReactNode;
  onScroll: (e: React.UIEvent<HTMLUListElement>) => void;
  disabled?: boolean;
  direction: TransferDirection;
  showSelectAll?: boolean;
  selectAllLabel?: SelectAllLabel;
  showRemove?: boolean;
  pagination?: PaginationType;
}

interface TransferListState {
  /** Filter input value */
  filterValue: string;
}

export default class TransferList<
  RecordType extends KeyWiseTransferItem,
> extends React.PureComponent<TransferListProps<RecordType>, TransferListState> {
  static defaultProps = {
    dataSource: [],
    titleText: '',
    showSearch: false,
  };

  timer: number;

  triggerScrollTimer: number;

  defaultListBodyRef = React.createRef<DefaultListBody<RecordType>>();

  constructor(props: TransferListProps<RecordType>) {
    super(props);
    this.state = {
      filterValue: '',
    };
  }

  componentWillUnmount() {
    clearTimeout(this.triggerScrollTimer);
  }

  getCheckStatus(filteredItems: RecordType[]) {
    const { checkedKeys } = this.props;
    if (checkedKeys.length === 0) {
      return 'none';
    }
    if (filteredItems.every(item => checkedKeys.indexOf(item.key) >= 0 || !!item.disabled)) {
      return 'all';
    }
    return 'part';
  }

  // ================================ Item ================================
  getFilteredItems(
    dataSource: RecordType[],
    filterValue: string,
  ): { filteredItems: RecordType[]; filteredRenderItems: RenderedItem<RecordType>[] } {
    const filteredItems: RecordType[] = [];
    const filteredRenderItems: RenderedItem<RecordType>[] = [];

    dataSource.forEach(item => {
      const renderedItem = this.renderItem(item);
      const { renderedText } = renderedItem;

      // Filter skip
      if (filterValue && !this.matchFilter(renderedText, item)) {
        return null;
      }

      filteredItems.push(item);
      filteredRenderItems.push(renderedItem);
    });

    return { filteredItems, filteredRenderItems };
  }

  // =============================== Filter ===============================
  handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { handleFilter } = this.props;
    const {
      target: { value: filterValue },
    } = e;
    this.setState({ filterValue });
    handleFilter(e);
  };

  handleClear = () => {
    const { handleClear } = this.props;
    this.setState({ filterValue: '' });
    handleClear();
  };

  matchFilter = (text: string, item: RecordType) => {
    const { filterValue } = this.state;
    const { filterOption } = this.props;
    if (filterOption) {
      return filterOption(filterValue, item);
    }
    return text.indexOf(filterValue) >= 0;
  };

  // =============================== Render ===============================
  renderListBody = (
    renderList: RenderListFunction<RecordType> | undefined,
    props: TransferListBodyProps<RecordType>,
  ) => {
    let bodyContent: React.ReactNode = renderList ? renderList(props) : null;
    const customize: boolean = !!bodyContent;
    if (!customize) {
      bodyContent = <DefaultListBody ref={this.defaultListBodyRef} {...props} />;
    }
    return {
      customize,
      bodyContent,
    };
  };

  getListBody(
    prefixCls: string,
    searchPlaceholder: string,
    filterValue: string,
    filteredItems: RecordType[],
    notFoundContent: React.ReactNode | React.ReactNode,
    filteredRenderItems: RenderedItem<RecordType>[],
    checkedKeys: string[],
    renderList?: RenderListFunction<RecordType>,
    showSearch?: boolean,
    disabled?: boolean,
  ): React.ReactNode {
    const search = showSearch ? (
      <div className={`${prefixCls}-body-search-wrapper`}>
        <Search
          prefixCls={`${prefixCls}-search`}
          onChange={this.handleFilter}
          handleClear={this.handleClear}
          placeholder={searchPlaceholder}
          value={filterValue}
          disabled={disabled}
        />
      </div>
    ) : null;

    const { bodyContent, customize } = this.renderListBody(renderList, {
      ...omit(this.props, OmitProps),
      filteredItems,
      filteredRenderItems,
      selectedKeys: checkedKeys,
    });

    const getNotFoundContent = () => {
      const contentIndex = this.props.direction === 'left' ? 0 : 1;
      return Array.isArray(notFoundContent) ? notFoundContent[contentIndex] : notFoundContent;
    };

    let bodyNode: React.ReactNode;
    // We should wrap customize list body in a classNamed div to use flex layout.
    if (customize) {
      bodyNode = <div className={`${prefixCls}-body-customize-wrapper`}>{bodyContent}</div>;
    } else {
      bodyNode = filteredItems.length ? (
        bodyContent
      ) : (
        <div className={`${prefixCls}-body-not-found`}>{getNotFoundContent()}</div>
      );
    }

    return (
      <div
        className={classNames(
          showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`,
        )}
      >
        {search}
        {bodyNode}
      </div>
    );
  }

  getCheckBox({
    filteredItems,
    onItemSelectAll,
    disabled,
    prefixCls,
  }: {
    filteredItems: RecordType[];
    onItemSelectAll: (dataSource: string[], checkAll: boolean) => void;
    disabled?: boolean;
    prefixCls?: string;
  }): false | JSX.Element {
    const checkStatus = this.getCheckStatus(filteredItems);
    const checkedAll = checkStatus === 'all';
    const checkAllCheckbox = (
      <Checkbox
        disabled={disabled}
        checked={checkedAll}
        indeterminate={checkStatus === 'part'}
        className={`${prefixCls}-checkbox`}
        onChange={() => {
          // Only select enabled items
          onItemSelectAll(
            filteredItems.filter(item => !item.disabled).map(({ key }) => key),
            !checkedAll,
          );
        }}
      />
    );

    return checkAllCheckbox;
  }

  renderItem = (item: RecordType): RenderedItem<RecordType> => {
    const { render = defaultRender } = this.props;
    const renderResult = render(item);
    const isRenderResultPlain = isRenderResultPlainObject(renderResult);
    return {
      renderedText: isRenderResultPlain
        ? (renderResult as RenderResultObject).value
        : (renderResult as string),
      renderedEl: isRenderResultPlain ? (renderResult as RenderResultObject).label : renderResult,
      item,
    };
  };

  getSelectAllLabel = (selectedCount: number, totalCount: number): React.ReactNode => {
    const { itemsUnit, itemUnit, selectAllLabel } = this.props;
    if (selectAllLabel) {
      return typeof selectAllLabel === 'function'
        ? selectAllLabel({ selectedCount, totalCount })
        : selectAllLabel;
    }
    const unit = totalCount > 1 ? itemsUnit : itemUnit;
    return (
      <>
        {(selectedCount > 0 ? `${selectedCount}/` : '') + totalCount} {unit}
      </>
    );
  };

  render() {
    const { filterValue } = this.state;
    const {
      prefixCls,
      dataSource,
      titleText,
      checkedKeys,
      disabled,
      footer,
      showSearch,
      style,
      searchPlaceholder,
      notFoundContent,
      selectAll,
      selectCurrent,
      selectInvert,
      removeAll,
      removeCurrent,
      renderList,
      onItemSelectAll,
      onItemRemove,
      showSelectAll = true,
      showRemove,
      pagination,
      direction,
    } = this.props;

    // Custom Layout
    const footerDom =
      footer && (footer.length < 2 ? footer(this.props) : footer(this.props, { direction }));

    const listCls = classNames(prefixCls, {
      [`${prefixCls}-with-pagination`]: !!pagination,
      [`${prefixCls}-with-footer`]: !!footerDom,
    });

    // ====================== Get filtered, checked item list ======================

    const { filteredItems, filteredRenderItems } = this.getFilteredItems(dataSource, filterValue);

    // ================================= List Body =================================

    const listBody = this.getListBody(
      prefixCls,
      searchPlaceholder,
      filterValue,
      filteredItems,
      notFoundContent,
      filteredRenderItems,
      checkedKeys,
      renderList,
      showSearch,
      disabled,
    );

    // ================================ List Footer ================================
    const listFooter = footerDom ? <div className={`${prefixCls}-footer`}>{footerDom}</div> : null;

    const checkAllCheckbox =
      !showRemove &&
      !pagination &&
      this.getCheckBox({ filteredItems, onItemSelectAll, disabled, prefixCls });

    let menu: React.ReactElement | null = null;
    if (showRemove) {
      const items = [
        /* Remove Current Page */
        pagination
          ? {
              key: 'removeCurrent',
              onClick: () => {
                const pageKeys = getEnabledItemKeys(
                  (this.defaultListBodyRef.current?.getItems() || []).map(entity => entity.item),
                );
                onItemRemove?.(pageKeys);
              },
              label: removeCurrent,
            }
          : null,

        /* Remove All */
        {
          key: 'removeAll',
          onClick: () => {
            onItemRemove?.(getEnabledItemKeys(filteredItems));
          },
          label: removeAll,
        },
      ].filter(item => item);

      menu = <Menu items={items} />;
    } else {
      const items = [
        {
          key: 'selectAll',
          onClick: () => {
            const keys = getEnabledItemKeys(filteredItems);
            onItemSelectAll(keys, keys.length !== checkedKeys.length);
          },
          label: selectAll,
        },
        pagination
          ? {
              key: 'selectCurrent',
              onClick: () => {
                const pageItems = this.defaultListBodyRef.current?.getItems() || [];
                onItemSelectAll(getEnabledItemKeys(pageItems.map(entity => entity.item)), true);
              },
              label: selectCurrent,
            }
          : null,

        {
          key: 'selectInvert',
          onClick: () => {
            let availableKeys: string[];
            if (pagination) {
              availableKeys = getEnabledItemKeys(
                (this.defaultListBodyRef.current?.getItems() || []).map(entity => entity.item),
              );
            } else {
              availableKeys = getEnabledItemKeys(filteredItems);
            }

            const checkedKeySet = new Set(checkedKeys);
            const newCheckedKeys: string[] = [];
            const newUnCheckedKeys: string[] = [];

            availableKeys.forEach(key => {
              if (checkedKeySet.has(key)) {
                newUnCheckedKeys.push(key);
              } else {
                newCheckedKeys.push(key);
              }
            });

            onItemSelectAll(newCheckedKeys, true);
            onItemSelectAll(newUnCheckedKeys, false);
          },
          label: selectInvert,
        },
      ];

      menu = <Menu items={items} />;
    }

    const dropdown = (
      <Dropdown className={`${prefixCls}-header-dropdown`} overlay={menu} disabled={disabled}>
        <DownOutlined />
      </Dropdown>
    );

    // ================================== Render ===================================
    return (
      <div className={listCls} style={style}>
        {/* Header */}
        <div className={`${prefixCls}-header`}>
          {showSelectAll ? (
            <>
              {checkAllCheckbox}
              {dropdown}
            </>
          ) : null}
          <span className={`${prefixCls}-header-selected`}>
            {this.getSelectAllLabel(checkedKeys.length, filteredItems.length)}
          </span>

          <span className={`${prefixCls}-header-title`}>{titleText}</span>
        </div>

        {/* Body */}
        {listBody}

        {/* Footer */}
        {listFooter}
      </div>
    );
  }
}
