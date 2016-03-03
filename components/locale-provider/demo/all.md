# 所有组件

- order: 2

此处列出 Ant Design 中需要国际化支持的组件。

---

````jsx
import { LocaleProvider, Pagination, DatePicker, TimePicker, Popconfirm, Table, Modal, Button } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render() {
    return 'Luck';
  },
  filters: [{
    text: 'filter1',
    value: 'filter1',
  }, {
    text: 'filter2',
    value: 'filter2',
  }],
}, {
  title: 'Age',
  dataIndex: 'age',
  render() {
    return 18;
  },
}];

const App = React.createClass({
  getInitialState() {
    return {
      visible: false,
    };
  },
  showModal() {
    this.setState({ visible: true });
  },
  hideModal() {
    this.setState({ visible: false });
  },
  render() {
    return (
      <div>
        <Pagination defaultCurrent={1} total={50} showSizeChanger />
        <DatePicker />
        <TimePicker />
        <Popconfirm title="Question?">
          <a href="#">Click to confirm</a>
        </Popconfirm>
        <Table dataSource={[]} columns={columns} />
        <Button type="primary" onClick={this.showModal}>Show Modal</Button>
        <Modal title="Locale Modal" visible={this.state.visible} onCancel={this.hideModal}>
          <p>Locale Modal</p>
        </Modal>
      </div>
    );
  }
});

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <App />
  </LocaleProvider>
, mountNode);
````
