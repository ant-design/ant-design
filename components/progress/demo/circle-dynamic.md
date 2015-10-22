# 进度圈动态展示

- order: 4

会动的进度条才是好进度条。

---

````jsx
var ProgressCircle = antd.Progress.Circle;
var Button = antd.Button;
var ButtonGroup = antd.ButtonGroup;
var Icon = antd.Icon;

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
      <ButtonGroup>
        <Button type="ghost" onClick={this.decline}>
          <Icon type="minus" />
        </Button>
        <Button type="ghost" onClick={this.increase}>
          <Icon type="plus" />
        </Button>
      </ButtonGroup>
    </div>;
  }
});

ReactDOM.render(<MyProgress />, document.getElementById('components-progress-demo-circle-dynamic'));
````

