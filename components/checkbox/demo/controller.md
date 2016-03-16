# 和外部组件通信

- order: 2

联动 checkbox。

---

````jsx
import { Checkbox, Button } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      disabled: false
    };
  }
  render() {
    const label = `${this.state.checked ? '选中' : '取消'}-${this.state.disabled ? '不可用' : '可用'}`;
    return (
      <div>
        <p style={{ marginBottom: '20px' }}>
          <label>
            <Checkbox checked={this.state.checked}
              disabled={this.state.disabled}
              onChange={this.onChange.bind(this)} />
              {label}
            </label>
          </p>
          <p>
            <Button type="primary" size="small"
              onClick={this.toggleChecked.bind(this)}>
              {!this.state.checked ? '选中' : '取消'}
            </Button>
            <Button style={{ marginLeft: '10px' }}
              type="primary" size="small"
              onClick={this.toggleDisable.bind(this)}>
              {!this.state.disabled ? '不可用' : '可用'}
            </Button>
          </p>
        </div>
    );
  }
  toggleChecked() {
    this.setState({ checked: !this.state.checked });
  }
  toggleDisable() {
    this.setState({ disabled: !this.state.disabled });
  }
  onChange(e) {
    console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked,
    });
  }
}

ReactDOM.render(<App />, mountNode);
````
