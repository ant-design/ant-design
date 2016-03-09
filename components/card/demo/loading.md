# 预加载的卡片

- order: 4

数据读入前会有文本块样式。

---

````jsx
import { Card } from 'antd';

const App = React.createClass({
  getInitialState() {
    return {
      loading: true,
      content: '',
    };
  },
  componentDidMount() {
    // mock loading
    setTimeout(() => {
      this.setState({
        loading: false,
        content: '卡片的内容',
      });
    }, 2000);
  },
  render() {
    return (
      <Card loading={this.state.loading} title="卡片标题" style={{ width: 300 }}>
        {this.state.content}
      </Card>
    );
  },
});

ReactDOM.render(<App />, mountNode);
````
