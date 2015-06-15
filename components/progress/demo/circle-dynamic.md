# 动态展示

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
  componentDidMount: function() {
    var self = this;
    setInterval(function() {
      if (self.state.percent < 100) {
        self.state.percent += 2;
      }
      self.setState({
        percent: self.state.percent
      });
    }, 100);
  },
  render() {
    return <ProgressCircle percent={this.state.percent} />;
  }
});

React.render(
  <MyProgress />
  , document.getElementById('components-progress-demo-circle-dynamic'));
````

