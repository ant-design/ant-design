import React, { Component, PropTypes } from 'react';
import List from './list.jsx';
import Operation from './operation.jsx';

function noop() {
}

class Transfer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: props.dataSource,
      leftFilter: '',
      rightFilter: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: nextProps.dataSource,
    });
  }

  checkDirection(direction) {
    //const { filterKey } = this.props;
    let { dataSource } = this.state;

    dataSource.forEach((data) => {
      //if ( !data[filterKey] && data.checked ) {
      //}
    });
    return true;
  }

  moveTo(direction) {
    const { filterKey } = this.props;
    let { dataSource } = this.state;
    // TODO: 验证是否可点
    if ( direction === 'right' ) {
      dataSource.forEach((data) => {
       // 左边向右移动
        if ( !data[filterKey] && data.checked ) {
          data[filterKey] = true;
          data.checked = false;
        }
      });
      this.setState({
        leftFilter: '',
        dataSource: dataSource,
      });
    } else {
      dataSource.forEach((data) => {
        if ( data[filterKey] && data.checked ) {
          data[filterKey] = false;
          data.checked = false;
        }
      });
      this.setState({
        rightFilter: '',
        dataSource: dataSource,
      });
    }
  }

  handleSelectAll(direction, globalCheckStatus) {
    const { filterKey } = this.props;
    const { dataSource, leftFilter, rightFilter } = this.state;
    switch ( globalCheckStatus ) {
      // 选中部分,则全选
    case 'part':
    case 'none':
      dataSource.forEach((data)=> {
          // data[filterKey] true 时,在右侧
        if ( direction === 'right' && data[filterKey] && this.matchFilter(data.title, rightFilter)
            || direction === 'left' && !data[filterKey] && this.matchFilter(data.title, leftFilter)) {
          data.checked = true;
        }
      });
      break;
    case 'all':
      dataSource.forEach((data)=> {
        if ( direction === 'right' && data[filterKey] && this.matchFilter(data.title, rightFilter)
          || direction === 'left' && !data[filterKey] && this.matchFilter(data.title, leftFilter)) {
          data.checked = false;
        }
      });
      break;
    default:
      break;
    }

    this.setState({
      dataSource: dataSource,
    });
  }

  handleFilter(direction, e) {
    const filterText = e.target.value;
    if ( direction === 'left') {
      this.setState({
        'leftFilter': filterText,
      });
    } else {
      this.setState({
        'rightFilter': filterText,
      });
    }
  }

  matchFilter(text, filterText) {
    const regex = new RegExp(filterText);
    return text.match(regex);
  }

  handleSelect(selectedItem, checked) {
    const { dataSource } = this.state;
    dataSource.forEach((data)=> {
      if ( data.value === selectedItem.value ) {
        data.checked = checked;
      }
    });

    this.setState({
      dataSource: dataSource,
    });
  }

  render() {
    const { prefixCls, leftConfig, rightConfig, filterKey, showSearch, header, body, footer } = this.props;
    const { dataSource, leftFilter, rightFilter } = this.state;

    let leftDataSource = [];
    let rightDataSource = [];

    let leftActive = false;
    let rightActive = false;

    dataSource.map((item)=> {
      // filter item
      if ( item[filterKey] ) {
        if ( this.matchFilter(item.title, rightFilter) ) {
          rightDataSource.push(item);
        }
      } else {
        if ( this.matchFilter(item.title, leftFilter) ) {
          leftDataSource.push(item);
        }
      }
    });

    return <div className={prefixCls}>
      <List config={leftConfig}
            dataSource={leftDataSource}
            filter={leftFilter}
            handleFilter={this.handleFilter.bind(this, 'left')}
            handleSelect={this.handleSelect.bind(this)}
            handleSelectAll={this.handleSelectAll.bind(this, 'left')}
            position="left"
            showSearch={showSearch}
            header={header}
            body={body}
            footer={footer}
      />
      <Operation rightActive={rightActive} rightArrowText={leftConfig.operationText} moveToRight={this.moveTo.bind(this, 'right')}
                 leftActive={leftActive} leftArrowText={rightConfig.operationText} moveToLeft={this.moveTo.bind(this, 'left')} />
      <List config={rightConfig}
            dataSource={rightDataSource}
            filter={rightFilter}
            handleFilter={this.handleFilter.bind(this, 'right')}
            handleSelect={this.handleSelect.bind(this)}
            handleSelectAll={this.handleSelectAll.bind(this, 'right')}
            position="right"
            showSearch={showSearch}
            header={header}
            body={body}
            footer={footer}
      />
    </div>;
  }
}

// onChange-> do operation
// onSelect-> select action row

Transfer.defaultProps = {
  prefixCls: 'ant-transfer',
  dataSource: [],
  dataIndex: 'title',
  filterKey: 'chosen',
  onChange: noop,
  onSelect: noop,
  leftConfig: {
    title: '源列表',
    operationText: '审核入库',
  },
  rightConfig: {
    title: '目的列表',
    operationText: '审核出库',
  },
  showSearch: false,
  searchPlaceholder: '请输入搜索内容',
  header: noop,
  footer: noop,
  body: noop,
};

Transfer.propTypes = {
  prefixCls: PropTypes.string,
  dataSource: PropTypes.array,
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  operationText: PropTypes.string,
  leftTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  onChange: PropTypes.func,
  extraRender: PropTypes.func,
};

export default Transfer;
