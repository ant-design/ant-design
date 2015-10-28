# 基本用法

- order: 2

当有内容内嵌在Spin中时，通过添加loading属性，可以进入加载状态。

---

````jsx
import { Spin, Button } from 'antd';

let App = React.createClass({
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
     
      <Button type="primary" onClick={this.enterLoading}>点击切换</Button>
    </div>;
  }
});

ReactDOM.render(<App />, document.getElementById('components-spin-demo-full-page-load'));

````
<style>
  .inner-content {
    height: 300px;
    padding-bottom: 60px;
    padding-top: 60px;
    text-align: center;
  }
</style>