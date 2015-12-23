# 带搜索框

- order: 1

带搜索框的 穿梭框

---

````jsx
import { Transfer } from 'antd';
const container = document.getElementById('components-transfer-demo-search');

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
    this.setState({
      mockData: mockData,
      targetKeys: targetKeys,
    });
  },

  handleChange(targetKeys) {
    this.setState({
      targetKeys: targetKeys,
    });
  },

  render() {
    return <div>
      <Transfer
        dataSource={this.state.mockData}
        showSearch
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={(item) => { return item.title;}} />
    </div>;
  }
});

ReactDOM.render(<App />, container);
````
