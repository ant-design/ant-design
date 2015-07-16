# 组合

- order: 1

Radio 组合。

---

````jsx
var Radio = antd.Radio;
var RadioGroup = React.createClass({
  getInitialState() {
    return {
    };
  },
  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  },
  render() {
    return <div>
      <p>
        <label>
          <Radio value="a"
            checked={this.state.value === 'a'}
            onChange={this.handleChange} /> A
        </label>
        <br/>
        <label>
          <Radio value="b"
            checked={this.state.value === 'b'}
            onChange={this.handleChange} /> B
        </label>
        <br/>
        <label>
          <Radio value="c"
            checked={this.state.value === 'c'}
            onChange={this.handleChange} /> C
        </label>
        <br/>
        <label>
          <Radio value="d"
            checked={this.state.value === 'd'}
            onChange={this.handleChange} /> D
        </label>
      </p>
      <p style={{"margin-top": 20}}>
        你选中了：{this.state.value} 。
      </p>
    </div>;
  }
});
React.render(<RadioGroup />, document.getElementById('components-radio-demo-group'));
````
