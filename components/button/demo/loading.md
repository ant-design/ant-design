# 加载中

- order: 4

添加 `loading` 属性即可让按钮处于加载状态，最后一个按钮演示点击后进入加载状态。

---

````jsx
var Button = antd.Button;

var App = React.createClass({
  getInitialState() {
    return {
      loading: false
    };
  },
  enterLoading() {
    this.setState({
      loading: true
    });
  },
  render() {
    return <div>
      <Button type="primary" size="lg" loading>
        加载中
      </Button>
      <Button type="primary" loading="true">
        加载中
      </Button>
      <Button type="primary" size="sm" loading>
        加载中
      </Button>
      <br />
      <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
        点击变加载
      </Button>
    </div>;
  }
});

ReactDOM.render(<App />, document.getElementById('components-button-demo-loading'));
````

<style>
#components-button-demo-loading .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
</style>
