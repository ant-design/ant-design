import React, { Component, PropTypes } from 'react';
import List from './list.jsx';
import Button from '../button';

function noop() {
}

let mockData = [];
for (let i = 0; i < 10; i++) {
  mockData.push({
    title: '内容' + (i + 1),
    value: (i + 1),
    description: '内容' + (i + 1) + '的描述',
    chosen: Math.random() * 2 > 1
  });
}

class Transfer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: props.dataSource,
    };
  }

  moveTo(direction) {
    // TODO: 讨论是否要将新移动的元素置顶
    const { filterKey } = this.props;
    let { dataSource } = this.state;
    if ( direction === 'right' ) {
      dataSource.forEach((data) => {
       // 左边向右移动
        if ( !data[filterKey] && data.checked ) {
          data[filterKey] = true;
          data.checked = false;
        }
      });
    } else {
      dataSource.forEach((data) => {
        if ( data[filterKey] && data.checked ) {
          data[filterKey] = false;
          data.checked = false;
        }
      });
    }

    this.setState({
      dataSource: dataSource,
    });
  }

  handleSelectAll(direction, globalCheckStatus) {
    const { filterKey } = this.props;
    const { dataSource } = this.state;
    switch ( globalCheckStatus ) {
      // 选中部分,则全选
    case 'part':
    case 'none':
      dataSource.forEach((data)=> {
          // data[filterKey] true 时,在右侧
        if ( direction === 'right' && data[filterKey]
            || direction === 'left' && !data[filterKey] ) {
          data.checked = true;
        }
      });
      break;
    case 'all':
      dataSource.forEach((data)=> {
        if ( direction === 'right' && data[filterKey]
            || direction === 'left' && !data[filterKey] ) {
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
    const { prefixCls, leftConfig, rightConfig, filterKey } = this.props;
    const { dataSource } = this.state;

    let leftDataSource = [];
    let rightDataSource = [];

    dataSource.map((item)=> {
      if ( item[filterKey] ) {
        rightDataSource.push(item);
      } else {
        leftDataSource.push(item);
      }
    });

    return <div className={prefixCls}>
      <List style={{ width: '45%', display: 'inline-block'}} config={leftConfig} dataSource={leftDataSource}
            handleSelect={this.handleSelect.bind(this)} handleSelectAll={this.handleSelectAll.bind(this, 'left')}/>
      <div style={{ width: '10%', display: 'inline-block'}}>
        <Button shape="circle" onClick={this.moveTo.bind(this, 'right')}>{">"}</Button>
        <Button shape="circle" onClick={this.moveTo.bind(this, 'left')}>{"<"}</Button>
      </div>
      <List style={{ width: '45%', display: 'inline-block'}} config={rightConfig} dataSource={rightDataSource}
            handleSelect={this.handleSelect.bind(this)} handleSelectAll={this.handleSelectAll.bind(this, 'right')}/>
    </div>;
  }
}

// onChange-> do operation
// onSelect-> select action row

Transfer.defaultProps = {
  prefixCls: 'ant-transfer',
  dataSource: mockData,
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
  extraRender: noop,
  footer: noop,
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
