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

Use build-in Table Transfer

````jsx
import { Transfer, Checkbox } from 'antd';

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
  };

  onChange = (targetKeys) => {
    this.setState({ targetKeys });
  };

  onShowSearchChange = ({ target: { checked } }) => {
    this.setState({ showSearch: checked });
  };

  render() {
    const { targetKeys, showSearch } = this.state;
    return (
      <div>
        <Checkbox checked={showSearch} onChange={this.onShowSearchChange}>
          showSearch
        </Checkbox>
        <br />
        <Transfer.Table
          showSearch={showSearch}
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

