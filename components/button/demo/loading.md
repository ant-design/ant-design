# 加载中

- order: 4

添加 `loading` 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。

---

````jsx
import { Button, Icon } from 'antd';

const App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      iconLoading: false,
    };
  },
  enterLoading() {
    this.setState({ loading: true });
  },
  enterIconLoading() {
    this.setState({ iconLoading: true });
  },
  render() {
    return <div>
      <Button type="primary" size="large" loading>
        加载中
      </Button>
      <Button type="primary" loading>
        加载中
      </Button>
      <Button type="primary" size="small" loading>
        加载中
      </Button>
      <br />
      <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
        点击变加载
      </Button>
      <Button type="primary" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
        <Icon type="poweroff" />点击变加载
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
