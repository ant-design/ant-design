import React, { PropTypes } from 'react';
import List from './list';
import Operation from './operation';
import Search from './search';
import classNames from 'classnames';

function noop() {
}

export default class Transfer extends React.Component {
  static List = List;
  static Operation = Operation;
  static Search = Search;

  static defaultProps = {
    prefixCls: 'ant-transfer',
    dataSource: [],
    render: noop,
    targetKeys: [],
    onChange: noop,
    titles: ['源列表', '目的列表'],
    operations: [],
    showSearch: false,
    body: noop,
    footer: noop,
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

      const { dataSource, targetKeys } = nextProps;
      // clear key nolonger existed
      // clear checkedKeys according to targetKeys
      this.setState({
        leftCheckedKeys: leftCheckedKeys
          .filter(data => dataSource.filter(item => item.key === data).length)
          .filter(data => targetKeys.filter(key => key === data).length === 0),
        rightCheckedKeys: rightCheckedKeys
          .filter(data => dataSource.filter(item => item.key === data).length)
          .filter(data => targetKeys.filter(key => key === data).length > 0),
      });
    }
  }
  splitDataSource(props) {
    if (this.splitedDataSource) {
      return this.splitedDataSource;
    }
    const { targetKeys } = props;
    let { dataSource } = props;

    if (props.rowKey) {
      dataSource = dataSource.map(record => {
        record.key = props.rowKey(record);
        return record;
      });
    }
    let leftDataSource = [...dataSource];
    let rightDataSource = [];

    if (targetKeys.length > 0) {
      targetKeys.forEach((targetKey) => {
        rightDataSource.push(leftDataSource.filter((data, index) => {
          if (data.key === targetKey) {
            leftDataSource.splice(index, 1);
            return true;
          }
          return false;
        })[0]);
      });
    }

    this.splitedDataSource = {
      leftDataSource,
      rightDataSource,
    };

    return this.splitedDataSource;
  }

  moveTo = (direction) => {
    const { targetKeys } = this.props;
    const { leftCheckedKeys, rightCheckedKeys } = this.state;
    const moveKeys = direction === 'right' ? leftCheckedKeys : rightCheckedKeys;
    // move items to target box
    const newTargetKeys = direction === 'right'
      ? moveKeys.concat(targetKeys)
      : targetKeys.filter(targetKey => !moveKeys.some(checkedKey => targetKey === checkedKey));

    // empty checked keys
    this.setState({
      [direction === 'right' ? 'leftCheckedKeys' : 'rightCheckedKeys']: [],
    });

    this.props.onChange(newTargetKeys, direction, moveKeys);
  }

  moveToLeft = () => this.moveTo('left')
  moveToRight = () => this.moveTo('right')

  handleSelectAll = (direction, filteredDataSource, checkAll) => {
    const holder = checkAll ? [] : filteredDataSource.map(item => item.key);

    this.setState({
      [`${direction}CheckedKeys`]: holder,
    });
  }

  handleLeftSelectAll = (...args) => this.handleSelectAll('left', ...args)
  handleRightSelectAll = (...args) => this.handleSelectAll('right', ...args)

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
  }

  handleLeftSelect = (selectedItem, checked) => this.handleSelect('left', selectedItem, checked);
  handleRightSelect = (selectedItem, checked) => this.handleSelect('right', selectedItem, checked);

  render() {
    const {
      prefixCls, titles, operations, showSearch, notFoundContent,
      searchPlaceholder, body, footer, listStyle, className,
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
