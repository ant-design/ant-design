# 基本用法

- order: 2

区块加载。

---

````jsx

var Spin = antd.Spin;
var Button = antd.Button;
var container = document.getElementById('components-spin-demo-full-page-load');

var App = React.createClass({
  getInitialState() {
    return {
      loading: false
    };
  },
  enterLoading() {
    this.setState({
      loading: !this.state.loading
    });
  },
  render() {
    return <div>
      <Spin loading={this.state.loading} size="large">
        <div className="inner-content">
          <img src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" width="200px" height="200px" />
          <div>我是一张图片</div>
        </div>
      </Spin>
     
      <Button type="primary" onClick={this.enterLoading} />switch spin loading
    </div>;
  }
});

ReactDOM.render(<App />, container);

````
<style>
  .inner-content {
    height: 300px;
    padding-bottom: 60px;
    padding-top: 60px;
    text-align: center;
  }
</style>