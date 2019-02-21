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
import { Transfer } from 'antd';

class App extends React.Component {
  state = {
    mockData: [],
    targetKeys: [],
  }

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  }

  handleChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys, direction, moveKeys);
    this.setState({ targetKeys });
  }

  renderItem = (item) => {
    const customLabel = (
      <span className="custom-item">
        {item.title} - {item.description}
      </span>
    );

    return {
      label: customLabel, // for displayed item
      value: item.title, // for title and filter matching
    };
  }

  render() {
    return (
      <Transfer.Table
        dataSource={this.state.mockData}
        listStyle={{
          width: 300,
          height: 300,
        }}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={this.renderItem}
      />
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
