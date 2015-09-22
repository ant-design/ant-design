# 进度圈动态展示

- order: 4

会动的进度条才是好进度条。

---

````jsx
var ProgressCircle = antd.Progress.Circle;

var MyProgress = React.createClass({
  getInitialState() {
    return {
      percent: 0
    };
  },
  increase() {
    let percent = this.state.percent + 10;
    if (percent > 100) {
      percent = 100;
    }
    this.setState({ percent });
  },
  decline() {
    let percent = this.state.percent - 10;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({ percent });
  },
  render() {
    return <div>
      <ProgressCircle percent={this.state.percent} />
      <div className="ant-btn-group">
        <button className="ant-btn ant-btn-ghost" onClick={this.decline}>
          <i className="anticon anticon-minus"></i>
        </button>
        <button className="ant-btn ant-btn-ghost" onClick={this.increase}>
          <i className="anticon anticon-plus"></i>
        </button>
      </div>
    </div>;
  }
});

React.render(<MyProgress />, document.getElementById('components-progress-demo-circle-dynamic'));
````

