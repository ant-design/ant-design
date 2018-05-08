---
order: 5
title:
  zh-CN: 大小
  en-US: Size
---

## zh-CN

大号页签用在页头区域，小号用在弹出框等较狭窄的容器内。

## en-US

Large size tabs are usally used in page header, and small size could be used in Modal.

````jsx
import { Tabs, Radio } from 'antd';
const { TabPane } = Tabs;

class Demo extends React.Component {
  state = { size: 'small' };
  onChange = (e) => {
    this.setState({ size: e.target.value });
  }
  render() {
    const { size } = this.state;
    return (
      <div>
        <Radio.Group value={size} onChange={this.onChange} style={{ marginBottom: 16 }}>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
        <Tabs defaultActiveKey="1" size={size}>
          <TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
          <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
        </Tabs>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
````
