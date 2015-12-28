# 带搜索框

- order: 1

带搜索框的穿梭框。

---

````jsx
import { Transfer } from 'antd';

const App = React.createClass({
  getInitialState() {
    return {
      mockData: [],
      targetKeys: [],
    };
  },
  componentDidMount() {
    this.getMock();
  },
  getMock() {
    let targetKeys = [];
    let mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i,
        title: '内容' + (i + 1),
        description: '内容' + (i + 1) + '的描述',
        chosen: Math.random() * 2 > 1
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  },
  handleChange(targetKeys) {
    this.setState({ targetKeys });
  },
  render() {
    return (
      <Transfer
        dataSource={this.state.mockData}
        showSearch
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={item => item.title} />
    );
  }
});

ReactDOM.render(<App />, document.getElementById('components-transfer-demo-search'));
````
