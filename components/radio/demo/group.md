# 组合

- order: 1

Radio 组合。

---

````jsx
var Radio = antd.Radio;
var container = document.getElementById('components-radio-demo-group');
var RadioGroup=React.createClass({
  getInitialState() {
    return {
      disabled: false,
      r: 'a'
    }
  },
  handleChange(e) {
    this.setState({
      r: e.target.value
    })
  },
  toggle() {
    this.setState({
      disabled: !this.state.disabled
    });
  },
  render() {
    return <div>
      <div>
        <p>
          <label>
            <Radio value="a"
              checked = {this.state.r === 'a'}
              onChange={this.handleChange}
              disabled={this.state.disabled}/>
          &nbsp; 0-10
          </label>
          <br/>
          <label>
            <Radio value="b"
              checked = {this.state.r === 'b'}
              onChange={this.handleChange}
              disabled={this.state.disabled}/>
          &nbsp; 11-20
          </label>
          <br/>
          <label>
            <Radio value="c"
              checked = {this.state.r === 'c'}
              onChange={this.handleChange}
              disabled={this.state.disabled}/>
          &nbsp; 21-30
          </label>
          <br/>
          <label>
            <Radio value="d"
              checked = {this.state.r === 'd'}
              onChange={this.handleChange}
              disabled={this.state.disabled}/>
          &nbsp; 31-40
          </label>
        </p>
      </div>
      <div>你选中的：{this.state.r}</div>
      <p style={{"margin-top": 20}}>
        <button className="ant-btn ant-btn-primary" style={{"margin-left": 20}} onClick={this.toggle}>toggle disabled</button>
      </p>

    </div>;
  }
});
React.render(<RadioGroup/>, container);
````
