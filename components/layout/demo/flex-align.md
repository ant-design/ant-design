# Flex对齐

- order: 5

Flex 子元素垂直对齐。


---

````jsx
import { Row, Col } from 'antd';

const DemoBox = React.createClass({
  render() {
    const { value } = this.props;
    const className = `hight-${value}`;
    return (
      <p className={className}>{this.props.children}</p>
    );
  }
});

ReactDOM.render(
  <div>
    <p>顶部对齐</p>
    <Row type="flex" justify="center" align="top">
      <Col span="4"><DemoBox value="100">.col-4</DemoBox></Col>
      <Col span="4"><DemoBox value="50">.col-4</DemoBox></Col>
      <Col span="4"><DemoBox value="120">.col-4</DemoBox></Col>
      <Col span="4"><DemoBox value="80">.col-4</DemoBox></Col>
    </Row>

    <p>居中对齐</p>
    <Row type="flex" justify="space-around" align="middle">
      <Col span="4"><DemoBox value="100">.col-4</DemoBox></Col>
      <Col span="4"><DemoBox value="50">.col-4</DemoBox></Col>
      <Col span="4"><DemoBox value="120">.col-4</DemoBox></Col>
      <Col span="4"><DemoBox value="80">.col-4</DemoBox></Col>
    </Row>

    <p>底部对齐</p>
    <Row type="flex" justify="space-between" align="bottom">
      <Col span="4"><DemoBox value="100">.col-4</DemoBox></Col>
      <Col span="4"><DemoBox value="50">.col-4</DemoBox></Col>
      <Col span="4"><DemoBox value="120">.col-4</DemoBox></Col>
      <Col span="4"><DemoBox value="80">.col-4</DemoBox></Col>
    </Row>
  </div>,
  document.getElementById('components-layout-demo-flex-align')
);
````
