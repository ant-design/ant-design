# 受控组件

- order: 1

value 和 onChange 需要配合使用。

---

````jsx
import { TimePicker } from 'antd';

const Test = React.createClass({
  getInitialState() {
    return {
      value: null,
    };
  },
  onChange(time) {
    const parsedTime = time && time.toLocaleTimeString('zh-CN', {
      hour12: false
    });
    console.log(parsedTime);
    this.setState({ time: parsedTime });
  },
  render() {
    return <TimePicker value={this.state.value} onChange={this.onChange} />;
  }
});

ReactDOM.render(<Test />, mountNode);
````
