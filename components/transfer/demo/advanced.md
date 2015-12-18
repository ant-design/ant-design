# 高级用法

- order: 2

高级用法

---

````jsx
import { Transfer, Button } from 'antd';
const container = document.getElementById('components-transfer-demo-advanced');

const App = React.createClass({
  getInitialState() {
    return {
      mockData: []
    };
  },

  componentDidMount() {
    this.getMock();
  },

  getMock() {
    let mockData = [];
    for (let i = 0; i < 20; i++) {
      mockData.push({
        title: '内容' + (i + 1),
        value: (i + 1),
        description: '内容' + (i + 1) + '的描述',
        chosen: Math.random() * 2 > 1
      });
    }
    this.setState({
      mockData: mockData
    });
  },
  render() {
    return <div>
      <Transfer defaultDataSource={this.state.mockData} />
      <Button onClick={this.getMock}>刷新数据</Button>
    </div>;
  }
});

ReactDOM.render(<App />, container);
````
