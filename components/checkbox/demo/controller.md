---
order: 2
title:
    zh-CN: 受控的 Checkbox
    en-US: Controlled Checkbox
---

## zh-CN

联动 checkbox。

## en-US

Communicated with other components.

````__react
import { Checkbox, Button } from 'antd';

const App = React.createClass({
  getInitialState() {
    return {
      checked: true,
      disabled: false,
    };
  },
  render() {
    const label = `${this.state.checked ? 'Checked' : 'Unchecked'}-${this.state.disabled ? 'Disabled' : 'Enabled'}`;
    return (
      <div>
        <p style={{ marginBottom: '20px' }}>
          <Checkbox checked={this.state.checked}
            disabled={this.state.disabled}
            onChange={this.onChange}
          >
            {label}
          </Checkbox>
        </p>
        <p>
          <Button type="primary" size="small"
            onClick={this.toggleChecked}
          >
            {!this.state.checked ? 'Check' : 'Uncheck'}
          </Button>
          <Button style={{ marginLeft: '10px' }}
            type="primary" size="small"
            onClick={this.toggleDisable}
          >
            {!this.state.disabled ? 'Disable' : 'Enable'}
          </Button>
        </p>
      </div>
    );
  },
  toggleChecked() {
    this.setState({ checked: !this.state.checked });
  },
  toggleDisable() {
    this.setState({ disabled: !this.state.disabled });
  },
  onChange(e) {
    console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked,
    });
  },
});

ReactDOM.render(<App />, mountNode);
````
