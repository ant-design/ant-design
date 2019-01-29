---
order: 8
title:
  en-US: Customized filter panel
  zh-CN: 自定义筛选菜单
---

## zh-CN

通过 `filterDropdown` 自定义的列筛选功能，并实现一个搜索列的示例。

## en-US

Implement a customized column search example via `filterDropdown`.

````jsx
import {
  Table, Input, Button, Icon,
} from 'antd';
import Highlighter from 'react-highlight-words';

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Joe Black',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Jim Green',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}];

class App extends React.Component {
  state = {
    searchText: '',
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...this.getColumnSearchProps('name'),
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '20%',
      ...this.getColumnSearchProps('age'),
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...this.getColumnSearchProps('address'),
    }];
    return <Table columns={columns} dataSource={data} />;
  }
}

ReactDOM.render(<App />, mountNode);
````
