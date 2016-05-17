import React, { PropTypes } from 'react';
import List, { isRenderResultPlainObject } from './list';
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
    searchPlaceholder: PropTypes.string,
    notFoundContent: PropTypes.node,
    body: PropTypes.func,
    footer: PropTypes.func,
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
    const { leftDataSource, rightDataSource } = this.splitDataSource(nextProps);
    this.setState({
      leftCheckedKeys: leftCheckedKeys.filter(data => leftDataSource.filter(leftData => leftData.key === data).length),
      rightCheckedKeys: rightCheckedKeys.filter(data => rightDataSource.filter(rightData => rightData.key === data).length),
    });
  }
  splitDataSource(props) {
    const { targetKeys, dataSource } = props;

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

    return {
      leftDataSource,
      rightDataSource,
    };
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

  getGlobalCheckStatus(direction) {
    const { leftDataSource, rightDataSource } = this.splitDataSource(this.props);
    const { leftFilter, rightFilter, leftCheckedKeys, rightCheckedKeys } = this.state;

    const dataSource = direction === 'left' ? leftDataSource : rightDataSource;
    const filter = direction === 'left' ? leftFilter : rightFilter;
    const checkedKeys = direction === 'left' ? leftCheckedKeys : rightCheckedKeys;
    const filteredDataSource = this.filterDataSource(dataSource, filter);

    let globalCheckStatus;

    if (checkedKeys.length > 0) {
      if (checkedKeys.length < filteredDataSource.length) {
        globalCheckStatus = 'part';
      } else {
        globalCheckStatus = 'all';
      }
    } else {
      globalCheckStatus = 'none';
    }
    return globalCheckStatus;
  }

  filterDataSource(dataSource, filter) {
    return dataSource.filter(item => {
      const renderResult = this.props.render(item);
      let itemText;
      if (isRenderResultPlainObject(renderResult)) {
        itemText = renderResult.value;
      } else {
        itemText = renderResult;
      }

      return this.matchFilter(itemText, filter);
    });
  }

  matchFilter(text, filterText) {
    const regex = new RegExp(filterText);
    return text.match(regex);
  }

  handleSelectAll = (direction) => {
    const { leftDataSource, rightDataSource } = this.splitDataSource(this.props);
    const { leftFilter, rightFilter } = this.state;
    const dataSource = direction === 'left' ? leftDataSource : rightDataSource;
    const filter = direction === 'left' ? leftFilter : rightFilter;
    const checkStatus = this.getGlobalCheckStatus(direction);
    const holder = (checkStatus === 'all') ? [] :
      this.filterDataSource(dataSource, filter).map(item => item.key);

    this.setState({
      [`${direction}CheckedKeys`]: holder,
    });
  }

  handleLeftSelectAll = () => this.handleSelectAll('left')
  handleRightSelectAll = () => this.handleSelectAll('right')

  handleFilter = (direction, e) => {
    this.setState({
      // deselect all
      [`${direction}CheckedKeys`]: [],
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
    const holder = direction === 'left' ? leftCheckedKeys : rightCheckedKeys;
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
      render,
    } = this.props;
    const { leftFilter, rightFilter, leftCheckedKeys, rightCheckedKeys } = this.state;

    const { leftDataSource, rightDataSource } = this.splitDataSource(this.props);
    const leftActive = rightCheckedKeys.length > 0;
    const rightActive = leftCheckedKeys.length > 0;

    const leftCheckStatus = this.getGlobalCheckStatus('left');
    const rightCheckStatus = this.getGlobalCheckStatus('right');

    const cls = classNames({
      [className]: !!className,
      [prefixCls]: true,
    });

    return (
      <div className={cls}>
        <List titleText={titles[0]}
          dataSource={leftDataSource}
          filter={leftFilter}
          style={listStyle}
          checkedKeys={leftCheckedKeys}
          checkStatus={leftCheckStatus}
          handleFilter={this.handleLeftFilter}
          handleClear={this.handleLeftClear}
          handleSelect={this.handleLeftSelect}
          handleSelectAll={this.handleLeftSelectAll}
          position="left"
          render={render}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
          notFoundContent={notFoundContent}
          body={body}
          footer={footer}
          prefixCls={`${prefixCls}-list`} />
        <Operation rightActive={rightActive}
          rightArrowText={operations[0]}
          moveToRight={this.moveToRight}
          leftActive={leftActive}
          leftArrowText={operations[1]}
          moveToLeft={this.moveToLeft}
          className={`${prefixCls}-operation`} />
        <List titleText={titles[1]}
          dataSource={rightDataSource}
          filter={rightFilter}
          style={listStyle}
          checkedKeys={rightCheckedKeys}
          checkStatus={rightCheckStatus}
          handleFilter={this.handleRightFilter}
          handleClear={this.handleRightClear}
          handleSelect={this.handleRightSelect}
          handleSelectAll={this.handleRightSelectAll}
          position="right"
          render={render}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
          notFoundContent={notFoundContent}
          body={body}
          footer={footer}
          prefixCls={`${prefixCls}-list`} />
      </div>
    );
  }
}
