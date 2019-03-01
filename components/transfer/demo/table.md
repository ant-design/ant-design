---
order: 5
title:
  zh-CN: 表格穿梭框
  en-US: Table Transfer
only: true
---

## zh-CN

使用内置的表格穿梭框。

## en-US

Use build-in Table Transfer.

````jsx
import { Transfer, Switch } from 'antd';

const leftTable = {
  columns: [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  }],
};
const rightTable = {
  columns: [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }],
};

const mockData = [];
for (let i = 0; i < 15; i++) {
  mockData.push({
    key: i.toString(),
    name: `name ${i + 1}`,
    description: `Description of ${i + 1}`,
  });
}

class App extends React.Component {
  state = {
    targetKeys: [],
    showSearch: false,
    disabled: false,
  };

  onChange = (targetKeys) => {
    this.setState({ targetKeys });
  };

  onShowSearchChange = (showSearch) => {
    this.setState({ showSearch });
  };

  onDisabledChange = (disabled) => {
    this.setState({ disabled });
  };

  render() {
    const { targetKeys, showSearch, disabled } = this.state;
    return (
      <div>
        <Switch
          checked={showSearch}
          onChange={this.onShowSearchChange}
          checkedChildren="showSearch"
          unCheckedChildren="showSearch"
        />
        <Switch
          checked={disabled}
          onChange={this.onDisabledChange}
          checkedChildren="disabled"
          unCheckedChildren="disabled"
        />
        <br />
        <br />
        <Transfer.TableTransfer
          showSearch={showSearch}
          disabled={disabled}
          dataSource={mockData}
          targetKeys={targetKeys}
          leftTable={leftTable}
          rightTable={rightTable}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````

