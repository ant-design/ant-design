---
order: 3
title:
  en-US: Selection and operation
  zh-CN: 选择和操作
---

## zh-CN

选择后进行操作，完成后清空选择，通过 `rowSelection.selectedRowKeys` 来控制选中项，通过 `rowSelection.selections` 自定义选择项

## en-US

To perform operations and clear selections after selecting some rows, use `rowSelection.selectedRowKeys` to control selected rows, use `rowSelection.selections` custom selections.


````jsx
import { Table, Button } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

class App extends React.Component {
  state = {
    selectedRowKeys: [],  // Check here to configure the default column
    loading: false,
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  onSelection = (selectionKey, changableRowKeys) => {
    let selectedRowKeys = [];
    switch (selectionKey) {
      case 'odd':
        selectedRowKeys = changableRowKeys.filter((key, index) => {
          if (index % 2 !== 0) {
            return false;
          }
          return true;
        });
        break;
      case 'even':
        selectedRowKeys = changableRowKeys.filter((key, index) => {
          if (index % 2 !== 0) {
            return true;
          }
          return false;
        });
        break;
      default:
        break;
    }
    this.setState({ selectedRowKeys });
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [{
        key: 'odd',
        text: '奇数项',
      }, {
        key: 'even',
        text: '偶数项',
      }],
      onSelection: this.onSelection,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.start}
            disabled={!hasSelected} loading={loading}
          >Reload</Button>
          <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
