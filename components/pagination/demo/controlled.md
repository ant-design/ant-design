# 受控

- order: 8

受控制的页码。

---

````jsx
import { Pagination } from 'antd';

let Container = React.createClass({
  getInitialState() {
    return {
      current: 3
    };
  },
  onChange(page) {
    console.log(page);
    this.setState({
      current: page
    });
  },
  render() {
    return <Pagination current={this.state.current} onChange={this.onChange} total={50} />;
  }
});

ReactDOM.render(
<Container />,
document.getElementById('components-pagination-demo-controlled'));
````

