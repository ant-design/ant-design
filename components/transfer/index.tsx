import React from 'react';
import { PropTypes } from 'react';
import classNames from 'classnames';
import List from './list';
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

// Transfer
export interface TransferProps {
  dataSource: TransferItem[];
  targetKeys: string[];
  render?: (record: TransferItem) => any;
  onChange?: (targetKeys: TransferItem[], direction: string, moveKeys: any) => void;
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  listStyle?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
  titles?: string[];
  operations?: string[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  notFoundContent?: React.ReactNode;
  footer?: (props: any) => any;
  style?: React.CSSProperties;
  filterOption: (inputValue: any, item: any) => boolean;
  body?: (props: any) => any;
  rowKey?: (record: any) => string;
}

export interface TransferContext {
  antLocale?: {
    Transfer?: any,
  };
}

const defaultTitles = ['源列表', '目的列表'];
export default class Transfer extends React.Component<TransferProps, any> {
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
  };

  static contextTypes = {
    antLocale: PropTypes.object,
  };

  context: TransferContext;
  splitedDataSource: any;

  constructor(props) {
    super(props);
    this.state = {
      leftFilter: '',
      rightFilter: '',
      leftCheckedKeys: [],
      rightCheckedKeys: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { leftCheckedKeys, rightCheckedKeys } = this.state;
    if (nextProps.targetKeys !== this.props.targetKeys ||
        nextProps.dataSource !== this.props.dataSource) {
      // clear cached splited dataSource
      this.splitedDataSource = null;

      const { dataSource, targetKeys = [] } = nextProps;
      function existInDateSourcekey(key) {
        return dataSource.filter(item => item.key === key).length;
      }
      // clear key nolonger existed
      // clear checkedKeys according to targetKeys
      this.setState({
        leftCheckedKeys: leftCheckedKeys.filter(existInDateSourcekey)
          .filter(data => targetKeys.filter(key => key === data).length === 0),
        rightCheckedKeys: rightCheckedKeys.filter(existInDateSourcekey)
          .filter(data => targetKeys.filter(key => key === data).length > 0),
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
    const { leftCheckedKeys, rightCheckedKeys } = this.state;
    const moveKeys = direction === 'right' ? leftCheckedKeys : rightCheckedKeys;
    // move items to target box
    const newTargetKeys = direction === 'right'
      ? moveKeys.concat(targetKeys)
      : targetKeys.filter(targetKey => moveKeys.indexOf(targetKey) === -1);

    // empty checked keys
    const oppositeDirection = direction === 'right' ? 'left' : 'right';
    this.setState({
      [`${oppositeDirection}CheckedKeys`]: [],
    });
    this.handleSelectChange(oppositeDirection, []);

    if (onChange) {
      onChange(newTargetKeys, direction, moveKeys);
    }
  }

  moveToLeft = () => this.moveTo('left')
  moveToRight = () => this.moveTo('right')

  handleSelectChange(direction: string, holder: string[]) {
    const { leftCheckedKeys, rightCheckedKeys } = this.state;
    const onSelectChange = this.props.onSelectChange;
    if (!onSelectChange) {
      return;
    }

    if (direction === 'left') {
      onSelectChange(holder, rightCheckedKeys);
    } else {
      onSelectChange(leftCheckedKeys, holder);
    }
  }

  handleSelectAll = (direction, filteredDataSource, checkAll) => {
    const holder = checkAll ? [] : filteredDataSource.map(item => item.key);
    this.setState({
      [`${direction}CheckedKeys`]: holder,
    });
    this.handleSelectChange(direction, holder);
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
    const { leftCheckedKeys, rightCheckedKeys } = this.state;
    const holder = direction === 'left' ? [...leftCheckedKeys] : [...rightCheckedKeys];
    let index;
    holder.forEach((key, i) => {
      if (key === selectedItem.key) {
        index = i;
      }
    });
    if (index > -1) {
      holder.splice(index, 1);
    }
    if (checked) {
      holder.push(selectedItem.key);
    }
    this.setState({
      [`${direction}CheckedKeys`]: holder,
    });
    this.handleSelectChange(direction, holder);
  }

  handleLeftSelect = (selectedItem, checked) => this.handleSelect('left', selectedItem, checked);
  handleRightSelect = (selectedItem, checked) => this.handleSelect('right', selectedItem, checked);

  getTitles(): string[] {
    if (this.props.titles) {
      return this.props.titles;
    }
    if (this.context &&
      this.context.antLocale &&
      this.context.antLocale.Transfer
    ) {
      return this.context.antLocale.Transfer.titles || [];
    }
    return defaultTitles;
  }

  render() {
    const {
      prefixCls = 'ant-transfer', operations = [], showSearch, notFoundContent,
      searchPlaceholder, body, footer, listStyle, className = '',
      filterOption, render,
    } = this.props;
    const { leftFilter, rightFilter, leftCheckedKeys, rightCheckedKeys } = this.state;

    const { leftDataSource, rightDataSource } = this.splitDataSource(this.props);
    const leftActive = rightCheckedKeys.length > 0;
    const rightActive = leftCheckedKeys.length > 0;

    const cls = classNames({
      [className]: !!className,
      [prefixCls]: true,
    });

    const titles = this.getTitles();
    return (
      <div className={cls}>
        <List titleText={titles[0]}
          dataSource={leftDataSource}
          filter={leftFilter}
          filterOption={filterOption}
          style={listStyle}
          checkedKeys={leftCheckedKeys}
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
        />
        <Operation rightActive={rightActive}
          rightArrowText={operations[0]}
          moveToRight={this.moveToRight}
          leftActive={leftActive}
          leftArrowText={operations[1]}
          moveToLeft={this.moveToLeft}
          className={`${prefixCls}-operation`}
        />
        <List titleText={titles[1]}
          dataSource={rightDataSource}
          filter={rightFilter}
          filterOption={filterOption}
          style={listStyle}
          checkedKeys={rightCheckedKeys}
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
        />
      </div>
    );
  }
}
