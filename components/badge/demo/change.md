# 动态

- order: 4

展示动态变化的效果。

---

````jsx
import { Badge, Button, Icon } from 'antd';
const ButtonGroup = Button.Group;

const Test = React.createClass({
  getInitialState() {
    return {
      count: 5,
      show: true,
    };
  },
  increase() {
    const count = this.state.count + 1;
    this.setState({ count });
  },
  decline() {
    let count = this.state.count - 1;
    if (count < 0) {
      count = 0;
    }
    this.setState({ count });
  },
  onClick() {
    this.setState({
      show: !this.state.show
    });
  },
  onNumberClick() {
    const count = this.state.count;
    this.setState({
      count: count ? 0 : 5
    });
  },
  render() {
    return <div>
      <Badge count={this.state.count}>
        <a href="#" className="head-example"></a>
      </Badge>
      <Badge dot={this.state.show}>
        <a href="#" className="head-example"></a>
      </Badge>
      <div style={{ marginTop: 10 }}>
        <Button type="ghost" onClick={this.onNumberClick} style={{marginRight: 6}}>
          切换数字显隐
        </Button>
        <Button type="ghost" onClick={this.onClick} style={{marginRight: 6}}>
          切换红点显隐
        </Button>
        <ButtonGroup>
          <Button type="ghost" onClick={this.decline}>
            <Icon type="minus" />
          </Button>
          <Button type="ghost" onClick={this.increase}>
            <Icon type="plus" />
          </Button>
        </ButtonGroup>
      </div>
    </div>;
  }
});

ReactDOM.render(
  <Test />
, document.getElementById('components-badge-demo-change'));
````
