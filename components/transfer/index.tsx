import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import List, { TransferListProps } from './list';
import Operation from './operation';
import Search from './search';
import warning from '../_util/warning';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import { ConfigConsumer, ConfigConsumerProps, RenderEmptyHandler } from '../config-provider';
import { polyfill } from 'react-lifecycles-compat';

export { TransferListProps } from './list';
export { TransferOperationProps } from './operation';
export { TransferSearchProps } from './search';

function noop() {}

export type TransferDirection = 'left' | 'right';
type TransferRender = (record: TransferItem) => React.ReactNode;

export interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

export interface TransferProps {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  dataSource: TransferItem[];
  targetKeys?: string[];
  selectedKeys?: string[];
  render?: TransferRender;
  onChange?: (targetKeys: string[], direction: string, moveKeys: any) => void;
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  style?: React.CSSProperties;
  listStyle?: React.CSSProperties;
  operationStyle?: React.CSSProperties;
  titles?: string[];
  operations?: string[];
  showSearch?: boolean;
  filterOption?: (inputValue: any, item: any) => boolean;
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
    render: noop as TransferRender,
    locale: {},
    showSearch: false,
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
    listStyle: PropTypes.object,
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

    const { selectedKeys = [], targetKeys = [] } = props;
    this.state = {
      leftFilter: '',
      rightFilter: '',
      sourceSelectedKeys: selectedKeys.filter(key => targetKeys.indexOf(key) === -1),
      targetSelectedKeys: selectedKeys.filter(key => targetKeys.indexOf(key) > -1),
    };
  }

  separateDataSource(props: TransferProps) {
    const { dataSource, rowKey, targetKeys = [] } = props;

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

  handleSelectChange(direction: TransferDirection, holder: string[]) {
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    const onSelectChange = this.props.onSelectChange;
    if (!onSelectChange) {
      return;
    }

    if (direction === 'left') {
      onSelectChange(holder, targetSelectedKeys);
    } else {
      onSelectChange(sourceSelectedKeys, holder);
    }
  }

  handleSelectAll = (
    direction: TransferDirection,
    filteredDataSource: TransferItem[],
    checkAll: boolean,
  ) => {
    const originalSelectedKeys = this.state[this.getSelectedKeysName(direction)] || [];
    const currentKeys = filteredDataSource.map(item => item.key);
    // Only operate current keys from original selected keys
    const newKeys1 = originalSelectedKeys.filter((key: string) => currentKeys.indexOf(key) === -1);
    const newKeys2 = [...originalSelectedKeys];
    currentKeys.forEach(key => {
      if (newKeys2.indexOf(key) === -1) {
        newKeys2.push(key);
      }
    });
    const holder = checkAll ? newKeys1 : newKeys2;
    this.handleSelectChange(direction, holder);

    if (!this.props.selectedKeys) {
      this.setState({
        [this.getSelectedKeysName(direction)]: holder,
      });
    }
  };

  handleLeftSelectAll = (filteredDataSource: TransferItem[], checkAll: boolean) =>
    this.handleSelectAll('left', filteredDataSource, checkAll);
  handleRightSelectAll = (filteredDataSource: TransferItem[], checkAll: boolean) =>
    this.handleSelectAll('right', filteredDataSource, checkAll);

  handleFilter = (direction: TransferDirection, e: React.ChangeEvent<HTMLInputElement>) => {
    const { onSearchChange, onSearch } = this.props;
    const value = e.target.value;
    this.setState({
      // add filter
      [`${direction}Filter`]: value,
    });
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
    this.setState({
      [`${direction}Filter`]: '',
    });
    if (onSearch) {
      onSearch(direction, '');
    }
  };

  handleLeftClear = () => this.handleClear('left');
  handleRightClear = () => this.handleClear('right');

  handleSelect = (direction: TransferDirection, selectedItem: TransferItem, checked: boolean) => {
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    const holder = direction === 'left' ? [...sourceSelectedKeys] : [...targetSelectedKeys];
    const index = holder.indexOf(selectedItem.key);
    if (index > -1) {
      holder.splice(index, 1);
    }
    if (checked) {
      holder.push(selectedItem.key);
    }
    this.handleSelectChange(direction, holder);

    if (!this.props.selectedKeys) {
      this.setState({
        [this.getSelectedKeysName(direction)]: holder,
      });
    }
  };

  handleLeftSelect = (selectedItem: TransferItem, checked: boolean) => {
    return this.handleSelect('left', selectedItem, checked);
  };

  handleRightSelect = (selectedItem: TransferItem, checked: boolean) => {
    return this.handleSelect('right', selectedItem, checked);
  };

  handleScroll = (direction: TransferDirection, e: React.SyntheticEvent<HTMLDivElement>) => {
    const { onScroll } = this.props;
    if (onScroll) {
      onScroll(direction, e);
    }
  };

  handleLeftScroll = (e: React.SyntheticEvent<HTMLDivElement>) => this.handleScroll('left', e);
  handleRightScroll = (e: React.SyntheticEvent<HTMLDivElement>) => this.handleScroll('right', e);

  getTitles(transferLocale: TransferLocale): string[] {
    const { props } = this;
    if (props.titles) {
      return props.titles;
    }
    return transferLocale.titles;
  }

  getSelectedKeysName(direction: TransferDirection) {
    return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
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
        } = this.props;
        const prefixCls = getPrefixCls('transfer', customizePrefixCls);
        const locale = this.getLocale(transferLocale, renderEmpty);
        const { leftFilter, rightFilter, sourceSelectedKeys, targetSelectedKeys } = this.state;

        const { leftDataSource, rightDataSource } = this.separateDataSource(this.props);
        const leftActive = targetSelectedKeys.length > 0;
        const rightActive = sourceSelectedKeys.length > 0;

        const cls = classNames(className, prefixCls, disabled && `${prefixCls}-disabled`);

        const titles = this.getTitles(locale);
        return (
          <div className={cls} style={style}>
            <List
              prefixCls={`${prefixCls}-list`}
              titleText={titles[0]}
              dataSource={leftDataSource}
              filter={leftFilter}
              filterOption={filterOption}
              style={listStyle}
              checkedKeys={sourceSelectedKeys}
              handleFilter={this.handleLeftFilter}
              handleClear={this.handleLeftClear}
              handleSelect={this.handleLeftSelect}
              handleSelectAll={this.handleLeftSelectAll}
              render={render}
              showSearch={showSearch}
              body={body}
              footer={footer}
              lazy={lazy}
              onScroll={this.handleLeftScroll}
              disabled={disabled}
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
              filter={rightFilter}
              filterOption={filterOption}
              style={listStyle}
              checkedKeys={targetSelectedKeys}
              handleFilter={this.handleRightFilter}
              handleClear={this.handleRightClear}
              handleSelect={this.handleRightSelect}
              handleSelectAll={this.handleRightSelectAll}
              render={render}
              showSearch={showSearch}
              body={body}
              footer={footer}
              lazy={lazy}
              onScroll={this.handleRightScroll}
              disabled={disabled}
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
