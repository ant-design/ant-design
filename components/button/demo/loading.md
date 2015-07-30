# 加载中

- order: 7

加载按钮。最后一个按钮演示点击后进入加载状态。

---

````jsx
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
    var loadingClass = this.state.loading ? 'ant-btn-loading' : '';
    return <div>
      <button className="ant-btn ant-btn-primary ant-btn-circle">
        <i className="anticon anticon-loading"></i>
      </button>
      <button className="ant-btn ant-btn-primary ant-btn-lg ant-btn-loading">
        加载中
      </button>
      <button className="ant-btn ant-btn-primary ant-btn-loading">
        加载中
      </button>
      <button className="ant-btn ant-btn-primary ant-btn-sm ant-btn-loading">
        加载中
      </button>
      <br />
      <button className={'ant-btn ant-btn-primary ' + loadingClass} onClick={this.enterLoading}>
        点击变加载
      </button>
    </div>;
  }
});

React.render(<App />, document.getElementById('components-button-demo-loading'));
````

<style>
#components-button-demo-loading .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
</style>
