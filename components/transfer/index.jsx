import React, { Component, PropTypes } from 'react';
import List from './list.jsx';
import Operation from './operation.jsx';

function noop() {
}

class Transfer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      leftFilter: '',
      rightFilter: '',
      leftCheckedKeys: [],
      rightCheckedKeys: []
    };
  }

  splitDataSource() {
    const { targetKeys, dataSource } = this.props;

    let leftDataSource = Object.assign([], dataSource);
    let rightDataSource = [];

    if ( targetKeys.length > 0 ) {
      targetKeys.forEach((targetKey) => {
        rightDataSource.push(leftDataSource.find((data, index) => {
          if( data.key === targetKey ) {
            leftDataSource.splice(index, 1);
            return true;
          }
        }));
      });
    }

    return {
      leftDataSource: leftDataSource,
      rightDataSource: rightDataSource,
    };
  }

  moveTo(direction) {
    const { targetKeys } = this.props;
    const { leftCheckedKeys, rightCheckedKeys } = this.state;
    // move items to target box
    const newTargetKeys = direction === 'right' ?
      leftCheckedKeys.concat(targetKeys) :
      targetKeys.filter((targetKey) => !rightCheckedKeys.some((checkedKey) => targetKey === checkedKey));

    // empty checked keys
    this.setState({
      [direction === 'right' ? 'leftCheckedKeys' : 'rightCheckedKeys']:  [],
    });

    this.props.onChange(newTargetKeys);
  }

  handleSelectAll(direction, globalCheckStatus) {
    const { leftDataSource, rightDataSource } = this.splitDataSource();
    const dataSource = direction === 'left' ? leftDataSource : rightDataSource;
    let holder = [];

    if ( globalCheckStatus === 'all' ) {
      holder = [];
    } else {
      holder = dataSource.map((data) => data.key);
    }

    this.setState({
      [direction === 'left' ? 'leftCheckedKeys' : 'rightCheckedKeys']: holder,
    });
  }

  handleFilter(direction, e) {
    this.setState({
      [direction === 'left' ? 'leftFilter' : 'rightFilter']: e.target.value,
    });
  }

  handleClear(direction) {
    this.setState({
      [direction === 'left' ? 'leftFilter' : 'rightFilter']: '',
    });
  }

  handleSelect(direction, selectedItem, checked) {
    const { leftCheckedKeys, rightCheckedKeys } = this.state;
    const holder = direction === 'left' ? leftCheckedKeys : rightCheckedKeys;
    const index = holder.findIndex((key) => key === selectedItem.key);
    if ( index > -1 ) {
      holder.splice(index, 1);
    }
    if ( checked ) {
      holder.push(selectedItem.key);
    }
    this.setState({
      [direction === 'left' ? 'leftCheckedKeys' : 'rightCheckedKeys']: holder,
    });
  }

  render() {
    const { prefixCls, titles, operations, showSearch, searchPlaceholder, body, footer } = this.props;
    const { leftFilter, rightFilter, leftCheckedKeys, rightCheckedKeys } = this.state;

    const { leftDataSource, rightDataSource } = this.splitDataSource();
    let leftActive = rightCheckedKeys.length > 0;
    let rightActive = leftCheckedKeys.length > 0;

    return <div className={prefixCls}>
      <List title={titles[0]}
            dataSource={leftDataSource}
            filter={leftFilter}
            checkedKeys={leftCheckedKeys}
            handleFilter={this.handleFilter.bind(this, 'left')}
            handleClear={this.handleClear.bind(this, 'left')}
            handleSelect={this.handleSelect.bind(this, 'left')}
            handleSelectAll={this.handleSelectAll.bind(this, 'left')}
            position="left"
            render={this.props.render}
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            body={body}
            footer={footer}
      />
      <Operation rightActive={rightActive} rightArrowText={operations[0]} moveToRight={this.moveTo.bind(this, 'right')}
                 leftActive={leftActive} leftArrowText={operations[1]} moveToLeft={this.moveTo.bind(this, 'left')} />
      <List title={titles[1]}
            dataSource={rightDataSource}
            filter={rightFilter}
            checkedKeys={rightCheckedKeys}
            handleFilter={this.handleFilter.bind(this, 'right')}
            handleClear={this.handleClear.bind(this, 'right')}
            handleSelect={this.handleSelect.bind(this, 'right')}
            handleSelectAll={this.handleSelectAll.bind(this, 'right')}
            position="right"
            render={this.props.render}
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            body={body}
            footer={footer}
      />
    </div>;
  }
}

Transfer.defaultProps = {
  prefixCls: 'ant-transfer',
  dataSource: [],
  render: noop,
  targetKeys: [],
  onChange: noop,
  titles: ['源列表', '目的列表'],
  operations: [],
  showSearch: false,
  searchPlaceholder: '请输入搜索内容',
  body: noop,
  footer: noop,
};

Transfer.propTypes = {
  prefixCls: PropTypes.string,
  dataSource: PropTypes.array,
  render: PropTypes.func,
  targetKeys: PropTypes.array,
  onChange: PropTypes.func,
  titles: PropTypes.array,
  operations: PropTypes.array,
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  body: PropTypes.func,
  footer: PropTypes.func,
};

export default Transfer;
