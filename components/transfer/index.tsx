import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List, { TransferListProps } from './list';
import Operation from './operation';
import Search from './search';
import injectLocale from '../locale-provider/injectLocale';

function noop() {
}

export interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

export interface TransferProps {
  prefixCls?: string;
  className?: string;
  dataSource: TransferItem[];
  targetKeys: string[];
  selectedKeys?: string[];
  render?: (record: TransferItem) => React.ReactNode;
  onChange?: (targetKeys: string[], direction: string, moveKeys: any) => void;
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  style?: React.CSSProperties;
  listStyle?: React.CSSProperties;
  titles?: string[];
  operations?: string[];
  showSearch?: boolean;
  filterOption: (inputValue: any, item: any) => boolean;
  searchPlaceholder?: string;
  notFoundContent?: React.ReactNode;
  footer?: (props: TransferListProps) => React.ReactNode;
  body?: (props: TransferListProps) => React.ReactNode;
  rowKey?: (record: TransferItem) => string;
  onSearchChange?: (direction: 'left' | 'right', e: Event) => void;
  lazy?: {};
  onScroll?: (direction: 'left' | 'right', e: Event) => void;
}

abstract class Transfer extends React.Component<TransferProps, any> {
  // For high-level customized Transfer @dqaria
  static List = List;
  static Operation = Operation;
  static Search = Search;

  static defaultProps = {
    dataSource: [],
    render: noop,
    showSearch: false,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    dataSource: PropTypes.array,
    render: PropTypes.func,
    targetKeys: PropTypes.array,
    onChange: PropTypes.func,
    height: PropTypes.number,
    listStyle: PropTypes.object,
    className: PropTypes.string,
    titles: PropTypes.array,
    operations: PropTypes.array,
    showSearch: PropTypes.bool,
    filterOption: PropTypes.func,
    searchPlaceholder: PropTypes.string,
    notFoundContent: PropTypes.node,
    body: PropTypes.func,
    footer: PropTypes.func,
    rowKey: PropTypes.func,
    lazy: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  };

  splitedDataSource: {
    leftDataSource: TransferItem[],
    rightDataSource: TransferItem[],
  } | null;

  constructor(props: TransferProps) {
    super(props);

    const { selectedKeys = [], targetKeys = [] } = props;
    this.state = {
      leftFilter: '',
      rightFilter: '',
      sourceSelectedKeys: selectedKeys.filter(key => targetKeys.indexOf(key) === -1),
      targetSelectedKeys: selectedKeys.filter(key => targetKeys.indexOf(key) > -1),
    };
  }

  abstract getLocale()

  componentWillReceiveProps(nextProps: TransferProps) {
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;

    if (nextProps.targetKeys !== this.props.targetKeys ||
      nextProps.dataSource !== this.props.dataSource) {
      // clear cached splited dataSource
      this.splitedDataSource = null;

      if (!nextProps.selectedKeys) {
        // clear key nolonger existed
        // clear checkedKeys according to targetKeys
        const { dataSource, targetKeys = [] } = nextProps;

        const newSourceSelectedKeys: String[] = [];
        const newTargetSelectedKeys: String[] = [];
        dataSource.forEach(({ key }) => {
          if (sourceSelectedKeys.includes(key) && !targetKeys.includes(key)) {
            newSourceSelectedKeys.push(key);
          }
          if (targetSelectedKeys.includes(key) && targetKeys.includes(key)) {
            newTargetSelectedKeys.push(key);
          }
        });
        this.setState({
          sourceSelectedKeys: newSourceSelectedKeys,
          targetSelectedKeys: newTargetSelectedKeys,
        });
      }
    }

    if (nextProps.selectedKeys) {
      const targetKeys = nextProps.targetKeys;
      this.setState({
        sourceSelectedKeys: nextProps.selectedKeys.filter(key => !targetKeys.includes(key)),
        targetSelectedKeys: nextProps.selectedKeys.filter(key => targetKeys.includes(key)),
      });
    }
  }

  splitDataSource(props: TransferProps) {
    if (this.splitedDataSource) {
      return this.splitedDataSource;
    }

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

    this.splitedDataSource = {
      leftDataSource,
      rightDataSource,
    };

    return this.splitedDataSource;
  }

  moveTo = (direction) => {
    const { targetKeys = [], dataSource = [], onChange } = this.props;
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    const moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
    // filter the disabled options
    const newMoveKeys = moveKeys.filter(key => !dataSource.some(data => !!(key === data.key && data.disabled)));
    // move items to target box
    const newTargetKeys = direction === 'right'
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
  }

  moveToLeft = () => this.moveTo('left');
  moveToRight = () => this.moveTo('right');

  handleSelectChange(direction: string, holder: string[]) {
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

  handleSelectAll = (direction, filteredDataSource, checkAll) => {
    const originalSelectedKeys = this.state[this.getSelectedKeysName(direction)] || [];
    const currentKeys = filteredDataSource.map(item => item.key);
    // Only operate current keys from original selected keys
    const newKeys1 = originalSelectedKeys.filter(key => currentKeys.indexOf(key) === -1);
    const newKeys2 = [...originalSelectedKeys];
    currentKeys.forEach((key) => {
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
  }

  handleLeftSelectAll = (filteredDataSource, checkAll) => (
    this.handleSelectAll('left', filteredDataSource, checkAll)
  );
  handleRightSelectAll = (filteredDataSource, checkAll) => (
    this.handleSelectAll('right', filteredDataSource, checkAll)
  );

  handleFilter = (direction, e) => {
    this.setState({
      // add filter
      [`${direction}Filter`]: e.target.value,
    });
    if (this.props.onSearchChange) {
      this.props.onSearchChange(direction, e);
    }
  }

  handleLeftFilter = (e) => this.handleFilter('left', e);
  handleRightFilter = (e) => this.handleFilter('right', e);

  handleClear = (direction) => {
    this.setState({
      [`${direction}Filter`]: '',
    });
  }

  handleLeftClear = () => this.handleClear('left');
  handleRightClear = () => this.handleClear('right');

  handleSelect = (direction, selectedItem, checked) => {
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
  }

  handleLeftSelect = (selectedItem, checked) => this.handleSelect('left', selectedItem, checked);
  handleRightSelect = (selectedItem, checked) => this.handleSelect('right', selectedItem, checked);

  handleScroll = (direction, e) => {
    const { onScroll } = this.props;
    if (onScroll) {
      onScroll(direction, e);
    }
  }

  handleLeftScroll = (e) => this.handleScroll('left', e);
  handleRightScroll = (e) => this.handleScroll('right', e);

  getTitles(): string[] {
    const { props } = this;
    if (props.titles) {
      return props.titles;
    }
    const transferLocale = this.getLocale();
    return transferLocale.titles;
  }

  getSelectedKeysName(direction) {
    return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
  }

  render() {
    const locale = this.getLocale();
    const {
      prefixCls = 'ant-transfer',
      className,
      operations = [],
      showSearch,
      notFoundContent = locale.notFoundContent,
      searchPlaceholder = locale.searchPlaceholder,
      body,
      footer,
      listStyle,
      filterOption,
      render,
      lazy,
    } = this.props;
    const { leftFilter, rightFilter, sourceSelectedKeys, targetSelectedKeys } = this.state;

    const { leftDataSource, rightDataSource } = this.splitDataSource(this.props);
    const leftActive = targetSelectedKeys.length > 0;
    const rightActive = sourceSelectedKeys.length > 0;

    const cls = classNames(className, prefixCls);

    const titles = this.getTitles();
    return (
      <div className={cls}>
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
          searchPlaceholder={searchPlaceholder}
          notFoundContent={notFoundContent}
          itemUnit={locale.itemUnit}
          itemsUnit={locale.itemsUnit}
          body={body}
          footer={footer}
          lazy={lazy}
          onScroll={this.handleLeftScroll}
        />
        <Operation
          className={`${prefixCls}-operation`}
          rightActive={rightActive}
          rightArrowText={operations[0]}
          moveToRight={this.moveToRight}
          leftActive={leftActive}
          leftArrowText={operations[1]}
          moveToLeft={this.moveToLeft}
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
          searchPlaceholder={searchPlaceholder}
          notFoundContent={notFoundContent}
          itemUnit={locale.itemUnit}
          itemsUnit={locale.itemsUnit}
          body={body}
          footer={footer}
          lazy={lazy}
          onScroll={this.handleRightScroll}
        />
      </div>
    );
  }
}

const injectTransferLocale = injectLocale('Transfer', {
  titles: ['', ''],
  searchPlaceholder: 'Search',
  notFoundContent: 'Not Found',
});
export default injectTransferLocale<TransferProps>(Transfer as any);
