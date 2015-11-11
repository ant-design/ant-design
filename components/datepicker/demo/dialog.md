# 结合弹出层

- order: 10

弹出层内的时间选择

---

````jsx
import { Modal, Button, Datepicker } from 'antd';

const App = React.createClass({
  getInitialState() {
    return { visible: false };
  },
  showModal() {
    this.setState({
      visible: true
    });
  },
  handleOk() {
    console.log('点击了确定');
    this.setState({
      visible: false
    });
  },
  handleCancel() {
    this.setState({
      visible: false
    });
  },
  render() {
    return <div>
      <Button type="primary" onClick={this.showModal}>显示对话框</Button>
      <Modal title="第一个 Modal" visible={this.state.visible}
      onOk={this.handleOk} onCancel={this.handleCancel}>
        <Datepicker defaultValue="2015-12-12" popupStyle={{zIndex:2000}}/>
      </Modal>
    </div>;
  }
});

ReactDOM.render(<App /> , document.getElementById('components-datepicker-demo-dialog'));
````

