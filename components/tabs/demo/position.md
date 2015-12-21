# 位置

- order: 6

有四个位置，`tabPosition="left|right|top|bottom"`。

---

````jsx
import { Tabs, Select } from 'antd';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

const Demo = React.createClass({
  getInitialState() {
    return {
      tabPosition: 'top',
    };
  },
  changeTabPosition(tabPosition) {
    this.setState({ tabPosition });
  },
  render() {
    return <div>
      <div style={{marginBottom: 16}}>
        页签位置：
        <Select value={this.state.tabPosition} onChange={this.changeTabPosition}
          dropdownMatchSelectWidth={false}>
          <Option value="top">top</Option>
          <Option value="bottom">bottom</Option>
          <Option value="left">left</Option>
          <Option value="right">right</Option>
        </Select>
      </div>
      <Tabs tabPosition={this.state.tabPosition}>
        <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
        <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
        <TabPane tab="选项卡三" key="3">选项卡三内容</TabPane>
      </Tabs>
    </div>;
  }
});

ReactDOM.render(<Demo />, document.getElementById('components-tabs-demo-position'));
````
