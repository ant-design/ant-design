import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import List, { TransferListProps } from './list';
import Operation from './operation';
import Search from './search';
import warning from '../_util/warning';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import { ConfigConsumer, ConfigConsumerProps, RenderEmptyHandler } from '../config-provider';
import { TransferListBodyProps } from './renderListBody';

export { TransferListProps } from './list';
export { TransferOperationProps } from './operation';
export { TransferSearchProps } from './search';

export type TransferDirection = 'left' | 'right';

export interface RenderResultObject {
  label: React.ReactElement;
  value: string;
}

export type RenderResult = React.ReactElement | RenderResultObject | string | null;

type TransferRender = (item: TransferItem) => RenderResult;

export interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
  [name: string]: any;
}

export interface ListStyle {
  direction: TransferDirection;
}

export interface TransferProps {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  dataSource: TransferItem[];
  targetKeys?: string[];
  selectedKeys?: string[];
  render?: TransferRender;
  onChange?: (targetKeys: string[], direction: string, moveKeys: string[]) => void;
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  style?: React.CSSProperties;
  listStyle: ((style: ListStyle) => React.CSSProperties) | React.CSSProperties;
  operationStyle?: React.CSSProperties;
  titles?: string[];
  operations?: string[];
  showSearch?: boolean;
  filterOption?: (inputValue: string, item: TransferItem) => boolean;
  searchPlaceholder?: string;
  notFoundContent?: React.ReactNode;
  locale?: {};
  footer?: (props: TransferListProps) => React.ReactNode;
  body?: (props: TransferListProps) => React.ReactNode;
  rowKey?: (record: TransferItem) => string;
  onSearchChange?: (direction: TransferDirection, e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (direction: TransferDirection, value: string) => void;
  lazy?: {} | boolean;
  onScroll?: (direction: TransferDirection, e: React.SyntheticEvent<HTMLDivElement>) => void;
  children?: (props: TransferListBodyProps) => React.ReactNode;
  showSelectAll?: boolean;
}

export interface TransferLocale {
  titles: string[];
  notFoundContent: string;
  searchPlaceholder: string;
  itemUnit: string;
  itemsUnit: string;
}

class Transfer extends React.Component<TransferProps, any> {
  // For high-level customized Transfer @dqaria
  static List = List;

  static Operation = Operation;

  static Search = Search;

  static defaultProps = {
    dataSource: [],
    locale: {},
    showSearch: false,
    listStyle: () => {},
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    disabled: PropTypes.bool,
    dataSource: PropTypes.array as PropTypes.Validator<TransferItem[]>,
    render: PropTypes.func,
    targetKeys: PropTypes.array,
    onChange: PropTypes.func,
    height: PropTypes.number,
    style: PropTypes.object,
    listStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    operationStyle: PropTypes.object,
    className: PropTypes.string,
    titles: PropTypes.array,
    operations: PropTypes.array,
    showSearch: PropTypes.bool,
    filterOption: PropTypes.func,
    searchPlaceholder: PropTypes.string,
    notFoundContent: PropTypes.node,
    locale: PropTypes.object,
    body: PropTypes.func,
    footer: PropTypes.func,
    rowKey: PropTypes.func,
    lazy: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  };

  static getDerivedStateFromProps(nextProps: TransferProps) {
    if (nextProps.selectedKeys) {
      const targetKeys = nextProps.targetKeys || [];
      return {
        sourceSelectedKeys: nextProps.selectedKeys.filter(key => !targetKeys.includes(key)),
        targetSelectedKeys: nextProps.selectedKeys.filter(key => targetKeys.includes(key)),
      };
    }
    return null;
  }

  separatedDataSource: {
    leftDataSource: TransferItem[];
    rightDataSource: TransferItem[];
  } | null = null;

  constructor(props: TransferProps) {
    super(props);

    warning(
      !('notFoundContent' in props || 'searchPlaceholder' in props),
      'Transfer',
      '`notFoundContent` and `searchPlaceholder` will be removed, ' +
        'please use `locale` instead.',
    );

    warning(
      !('body' in props),
      'Transfer',
      '`body` is internal usage and will bre removed, please use `children` instead.',
    );

    const { selectedKeys = [], targetKeys = [] } = props;
    this.state = {
      sourceSelectedKeys: selectedKeys.filter(key => targetKeys.indexOf(key) === -1),
      targetSelectedKeys: selectedKeys.filter(key => targetKeys.indexOf(key) > -1),
    };
  }

  // eslint-disable-next-line
  getSelectedKeysName(direction: TransferDirection) {
    return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
  }

  getTitles(transferLocale: TransferLocale): string[] {
    const { props } = this;
    if (props.titles) {
      return props.titles;
    }
    return transferLocale.titles;
  }

  getLocale = (transferLocale: TransferLocale, renderEmpty: RenderEmptyHandler) => {
    // Keep old locale props still working.
    const oldLocale: { notFoundContent?: any; searchPlaceholder?: string } = {
      notFoundContent: renderEmpty('Transfer'),
    };
    if ('notFoundContent' in this.props) {
      oldLocale.notFoundContent = this.props.notFoundContent;
    }
    if ('searchPlaceholder' in this.props) {
      oldLocale.searchPlaceholder = this.props.searchPlaceholder;
    }

    return { ...transferLocale, ...oldLocale, ...this.props.locale };
  };

  moveTo = (direction: TransferDirection) => {
    const { targetKeys = [], dataSource = [], onChange } = this.props;
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    const moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
    // filter the disabled options
    const newMoveKeys = moveKeys.filter(
      (key: string) => !dataSource.some(data => !!(key === data.key && data.disabled)),
    );
    // move items to target box
    const newTargetKeys =
      direction === 'right'
        ? newMoveKeys.concat(targetKeys)
        : targetKeys.filter(targetKey => newMoveKeys.indexOf(targetKey) === -1);

    // empty checked keys
    const oppositeDirection = direction === 'right' ? 'left' : 'right';
    this.setState({
      [this.getSelectedKeysName(oppositeDirection)]: [],
    });
    this.handleSelectChange(oppositeDirection, []);

    if (onChange) {
      onChange(newTargetKeys, direction, newMoveKeys);
    }
  };

  moveToLeft = () => this.moveTo('left');

  moveToRight = () => this.moveTo('right');

  onItemSelectAll = (direction: TransferDirection, selectedKeys: string[], checkAll: boolean) => {
    const originalSelectedKeys = this.state[this.getSelectedKeysName(direction)] || [];

    let mergedCheckedKeys = [];
    if (checkAll) {
      // Merge current keys with origin key
      mergedCheckedKeys = Array.from(new Set([...originalSelectedKeys, ...selectedKeys]));
    } else {
      // Remove current keys from origin keys
      mergedCheckedKeys = originalSelectedKeys.filter(
        (key: string) => selectedKeys.indexOf(key) === -1,
      );
    }

    this.handleSelectChange(direction, mergedCheckedKeys);

    if (!this.props.selectedKeys) {
      this.setState({
        [this.getSelectedKeysName(direction)]: mergedCheckedKeys,
      });
    }
  };

  handleSelectAll = (
    direction: TransferDirection,
    filteredDataSource: TransferItem[],
    checkAll: boolean,
  ) => {
    warning(
      false,
      'Transfer',
      '`handleSelectAll` will be removed, please use `onSelectAll` instead.',
    );
    this.onItemSelectAll(direction, filteredDataSource.map(({ key }) => key), !checkAll);
  };

  // [Legacy] Old prop `body` pass origin check as arg. It's confusing.
  // TODO: Remove this in next version.
  handleLeftSelectAll = (filteredDataSource: TransferItem[], checkAll: boolean) =>
    this.handleSelectAll('left', filteredDataSource, !checkAll);

  handleRightSelectAll = (filteredDataSource: TransferItem[], checkAll: boolean) =>
    this.handleSelectAll('right', filteredDataSource, !checkAll);

  onLeftItemSelectAll = (selectedKeys: string[], checkAll: boolean) =>
    this.onItemSelectAll('left', selectedKeys, checkAll);

  onRightItemSelectAll = (selectedKeys: string[], checkAll: boolean) =>
    this.onItemSelectAll('right', selectedKeys, checkAll);

  handleFilter = (direction: TransferDirection, e: React.ChangeEvent<HTMLInputElement>) => {
    const { onSearchChange, onSearch } = this.props;
    const { value } = e.target;
    if (onSearchChange) {
      warning(false, 'Transfer', '`onSearchChange` is deprecated. Please use `onSearch` instead.');
      onSearchChange(direction, e);
    }
    if (onSearch) {
      onSearch(direction, value);
    }
  };

  handleLeftFilter = (e: React.ChangeEvent<HTMLInputElement>) => this.handleFilter('left', e);

  handleRightFilter = (e: React.ChangeEvent<HTMLInputElement>) => this.handleFilter('right', e);

  handleClear = (direction: TransferDirection) => {
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(direction, '');
    }
  };

  handleLeftClear = () => this.handleClear('left');

  handleRightClear = () => this.handleClear('right');

  onItemSelect = (direction: TransferDirection, selectedKey: string, checked: boolean) => {
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    const holder = direction === 'left' ? [...sourceSelectedKeys] : [...targetSelectedKeys];
    const index = holder.indexOf(selectedKey);
    if (index > -1) {
      holder.splice(index, 1);
    }
    if (checked) {
      holder.push(selectedKey);
    }
    this.handleSelectChange(direction, holder);

    if (!this.props.selectedKeys) {
      this.setState({
        [this.getSelectedKeysName(direction)]: holder,
      });
    }
  };

  handleSelect = (direction: TransferDirection, selectedItem: TransferItem, checked: boolean) => {
    warning(false, 'Transfer', '`handleSelect` will be removed, please use `onSelect` instead.');
    this.onItemSelect(direction, selectedItem.key, checked);
  };

  handleLeftSelect = (selectedItem: TransferItem, checked: boolean) =>
    this.handleSelect('left', selectedItem, checked);

  handleRightSelect = (selectedItem: TransferItem, checked: boolean) =>
    this.handleSelect('right', selectedItem, checked);

  onLeftItemSelect = (selectedKey: string, checked: boolean) =>
    this.onItemSelect('left', selectedKey, checked);

  onRightItemSelect = (selectedKey: string, checked: boolean) =>
    this.onItemSelect('right', selectedKey, checked);

  handleScroll = (direction: TransferDirection, e: React.SyntheticEvent<HTMLDivElement>) => {
    const { onScroll } = this.props;
    if (onScroll) {
      onScroll(direction, e);
    }
  };

  handleLeftScroll = (e: React.SyntheticEvent<HTMLDivElement>) => this.handleScroll('left', e);

  handleRightScroll = (e: React.SyntheticEvent<HTMLDivElement>) => this.handleScroll('right', e);

  handleSelectChange(direction: TransferDirection, holder: string[]) {
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    const { onSelectChange } = this.props;
    if (!onSelectChange) {
      return;
    }

    if (direction === 'left') {
      onSelectChange(holder, targetSelectedKeys);
    } else {
      onSelectChange(sourceSelectedKeys, holder);
    }
  }

  handleListStyle = (
    listStyle: ((style: ListStyle) => React.CSSProperties) | React.CSSProperties,
    direction: TransferDirection,
  ) => {
    if (typeof listStyle === 'function') {
      return listStyle({ direction });
    }
    return listStyle;
  };

  separateDataSource() {
    const { dataSource, rowKey, targetKeys = [] } = this.props;

    const leftDataSource: TransferItem[] = [];
    const rightDataSource: TransferItem[] = new Array(targetKeys.length);
    dataSource.forEach(record => {
      if (rowKey) {
        record.key = rowKey(record);
      }

      // rightDataSource should be ordered by targetKeys
      // leftDataSource should be ordered by dataSource
      const indexOfKey = targetKeys.indexOf(record.key);
      if (indexOfKey !== -1) {
        rightDataSource[indexOfKey] = record;
      } else {
        leftDataSource.push(record);
      }
    });

    return {
      leftDataSource,
      rightDataSource,
    };
  }

  renderTransfer = (transferLocale: TransferLocale) => (
    <ConfigConsumer>
      {({ getPrefixCls, renderEmpty }: ConfigConsumerProps) => {
        const {
          prefixCls: customizePrefixCls,
          className,
          disabled,
          operations = [],
          showSearch,
          body,
          footer,
          style,
          listStyle,
          operationStyle,
          filterOption,
          render,
          lazy,
          children,
          showSelectAll,
        } = this.props;
        const prefixCls = getPrefixCls('transfer', customizePrefixCls);
        const locale = this.getLocale(transferLocale, renderEmpty);
        const { sourceSelectedKeys, targetSelectedKeys } = this.state;

        const { leftDataSource, rightDataSource } = this.separateDataSource();
        const leftActive = targetSelectedKeys.length > 0;
        const rightActive = sourceSelectedKeys.length > 0;

        const cls = classNames(className, prefixCls, {
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-customize-list`]: !!children,
        });

        const titles = this.getTitles(locale);
        return (
          <div className={cls} style={style}>
            <List
              prefixCls={`${prefixCls}-list`}
              titleText={titles[0]}
              dataSource={leftDataSource}
              filterOption={filterOption}
              style={this.handleListStyle(listStyle, 'left')}
              checkedKeys={sourceSelectedKeys}
              handleFilter={this.handleLeftFilter}
              handleClear={this.handleLeftClear}
              handleSelect={this.handleLeftSelect}
              handleSelectAll={this.handleLeftSelectAll}
              onItemSelect={this.onLeftItemSelect}
              onItemSelectAll={this.onLeftItemSelectAll}
              render={render}
              showSearch={showSearch}
              body={body}
              renderList={children}
              footer={footer}
              lazy={lazy}
              onScroll={this.handleLeftScroll}
              disabled={disabled}
              direction="left"
              showSelectAll={showSelectAll}
              {...locale}
            />
            <Operation
              className={`${prefixCls}-operation`}
              rightActive={rightActive}
              rightArrowText={operations[0]}
              moveToRight={this.moveToRight}
              leftActive={leftActive}
              leftArrowText={operations[1]}
              moveToLeft={this.moveToLeft}
              style={operationStyle}
              disabled={disabled}
            />
            <List
              prefixCls={`${prefixCls}-list`}
              titleText={titles[1]}
              dataSource={rightDataSource}
              filterOption={filterOption}
              style={this.handleListStyle(listStyle, 'right')}
              checkedKeys={targetSelectedKeys}
              handleFilter={this.handleRightFilter}
              handleClear={this.handleRightClear}
              handleSelect={this.handleRightSelect}
              handleSelectAll={this.handleRightSelectAll}
              onItemSelect={this.onRightItemSelect}
              onItemSelectAll={this.onRightItemSelectAll}
              render={render}
              showSearch={showSearch}
              body={body}
              renderList={children}
              footer={footer}
              lazy={lazy}
              onScroll={this.handleRightScroll}
              disabled={disabled}
              direction="right"
              showSelectAll={showSelectAll}
              {...locale}
            />
          </div>
        );
      }}
    </ConfigConsumer>
  );

  render() {
    return (
      <LocaleReceiver componentName="Transfer" defaultLocale={defaultLocale.Transfer}>
        {this.renderTransfer}
      </LocaleReceiver>
    );
  }
}

polyfill(Transfer);

export default Transfer;
