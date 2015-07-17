# 组合

- order: 1

Radio 组合。

---

````jsx
var Radio = antd.Radio;
var RadioGroup = React.createClass({
  getInitialState() {
    return {
      value: ''
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
            onChange={this.handleChange} />
            选项A
        </label>
        <br/>
        <label>
          <Radio value="b"
            checked={this.state.value === 'b'}
            onChange={this.handleChange} />
            选项B
        </label>
        <br/>
        <label>
          <Radio value="c"
            checked={this.state.value === 'c'}
            onChange={this.handleChange} />
            选项C
        </label>
        <br/>
        <label>
          <Radio value="d"
            checked={this.state.value === 'd'}
            onChange={this.handleChange} />
            选项D
        </label>
      </p>
      <p style={{marginTop: 20}}>
        你选中了：{this.state.value} 。
      </p>
    </div>;
  }
});
React.render(<RadioGroup />, document.getElementById('components-radio-demo-group'));
````
