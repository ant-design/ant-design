import React from 'react';
import { PropTypes } from 'react';
import classNames from 'classnames';
import List from './list';
import { TransferListProps } from './list';
import Operation from './operation';
import Search from './search';

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
}

export interface TransferContext {
  antLocale?: {
    Transfer?: any,
  };
}

const defaultTitles = ['', ''];
export default class Transfer extends React.Component<TransferProps, any> {
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

  static contextTypes = {
    antLocale: PropTypes.object,
  };

  context: TransferContext;
  splitedDataSource: any;

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

  componentWillReceiveProps(nextProps: TransferProps) {
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    if (nextProps.targetKeys !== this.props.targetKeys ||
        nextProps.dataSource !== this.props.dataSource) {
      // clear cached splited dataSource
      this.splitedDataSource = null;

      const { dataSource, targetKeys = [] } = nextProps;
      function existInDateSourcekey(key) {
        return dataSource.some(item => item.key === key);
      }
      // clear key nolonger existed
      // clear checkedKeys according to targetKeys
      this.setState({
        sourceSelectedKeys: sourceSelectedKeys.filter(existInDateSourcekey)
          .filter(data => targetKeys.filter(key => key === data).length === 0),
        targetSelectedKeys: targetSelectedKeys.filter(existInDateSourcekey)
          .filter(data => targetKeys.filter(key => key === data).length > 0),
      });
    }
    if (nextProps.selectedKeys) {
      const targetKeys = nextProps.targetKeys;
      this.setState({
        sourceSelectedKeys: nextProps.selectedKeys.filter(key => targetKeys.indexOf(key) === -1),
        targetSelectedKeys: nextProps.selectedKeys.filter(key => targetKeys.indexOf(key) > -1),
      });
    }
  }
  splitDataSource(props: TransferProps) {
    if (this.splitedDataSource) {
      return this.splitedDataSource;
    }

    const { rowKey, dataSource, targetKeys = [] } = props;
    if (rowKey) {
      dataSource.forEach(record => {
        record.key = rowKey(record);
      });
    }

    const leftDataSource = dataSource.filter(({ key }) => targetKeys.indexOf(key) === -1);
    const rightDataSource: TransferItem[] = [];
    targetKeys.forEach((targetKey) => {
      const targetItem = dataSource.filter(record => record.key === targetKey)[0];
      if (targetItem) {
        rightDataSource.push(targetItem);
      }
    });

    this.splitedDataSource = {
      leftDataSource,
      rightDataSource,
    };

    return this.splitedDataSource;
  }

  moveTo = (direction) => {
    const { targetKeys = [], onChange } = this.props;
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    const moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
    // move items to target box
    const newTargetKeys = direction === 'right'
      ? moveKeys.concat(targetKeys)
      : targetKeys.filter(targetKey => moveKeys.indexOf(targetKey) === -1);

    // empty checked keys
    const oppositeDirection = direction === 'right' ? 'left' : 'right';
    this.setState({
      [this.getSelectedKeysName(oppositeDirection)]: [],
    });
    this.handleSelectChange(oppositeDirection, []);

    if (onChange) {
      onChange(newTargetKeys, direction, moveKeys);
    }
  }

  moveToLeft = () => this.moveTo('left')
  moveToRight = () => this.moveTo('right')

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
    const holder = checkAll ? [] : filteredDataSource.map(item => item.key);
    this.handleSelectChange(direction, holder);

    if (!this.props.selectedKeys) {
      this.setState({
        [this.getSelectedKeysName(direction)]: holder,
      });
    }
  }

  handleLeftSelectAll = (filteredDataSource, checkAll) => (
    this.handleSelectAll('left', filteredDataSource, checkAll)
  )
  handleRightSelectAll = (filteredDataSource, checkAll) => (
    this.handleSelectAll('right', filteredDataSource, checkAll)
  )

  handleFilter = (direction, e) => {
    this.setState({
      // add filter
      [`${direction}Filter`]: e.target.value,
    });
    if (this.props.onSearchChange) {
      this.props.onSearchChange(direction, e);
    }
  }

  handleLeftFilter = (e) => this.handleFilter('left', e)
  handleRightFilter = (e) => this.handleFilter('right', e)

  handleClear = (direction) => {
    this.setState({
      [`${direction}Filter`]: '',
    });
  }

  handleLeftClear = () => this.handleClear('left')
  handleRightClear = () => this.handleClear('right')

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

  getTitles(): string[] {
    const { props, context } = this;
    if (props.titles) {
      return props.titles;
    }
    const transferLocale = context &&
      context.antLocale &&
      context.antLocale.Transfer;
    if (transferLocale) {
      return transferLocale.titles || [];
    }
    return defaultTitles;
  }

  getSelectedKeysName(direction) {
    return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
  }

  render() {
    const {
      prefixCls = 'ant-transfer', operations = [], showSearch, notFoundContent,
      searchPlaceholder, body, footer, listStyle, className = '',
      filterOption, render, lazy,
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
          body={body}
          footer={footer}
          prefixCls={`${prefixCls}-list`}
          lazy={lazy}
        />
        <Operation
          rightActive={rightActive}
          rightArrowText={operations[0]}
          moveToRight={this.moveToRight}
          leftActive={leftActive}
          leftArrowText={operations[1]}
          moveToLeft={this.moveToLeft}
          className={`${prefixCls}-operation`}
        />
        <List
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
          body={body}
          footer={footer}
          prefixCls={`${prefixCls}-list`}
          lazy={lazy}
        />
      </div>
    );
  }
}
