# 所有组件

- order: 2

此处列出 Ant Design 中需要国际化支持的组件。

---

````jsx
import { LocaleProvider, Pagination, DatePicker, TimePicker,
         Popconfirm, Table, Modal, Button, Select } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
const Option = Select.Option;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  filters: [{
    text: 'filter1',
    value: 'filter1',
  }],
}, {
  title: 'Age',
  dataIndex: 'age',
}];

const Page = React.createClass({
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
    const info = () => {
      Modal.info({
        title: 'some info',
        content: 'some info',
      });
    };
    const confirm = () => {
      Modal.confirm({
        title: 'some info',
        content: 'some info',
      });
    };
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
        <Button onClick={info}>Show info</Button>
        <Button onClick={confirm}>Show confirm</Button>
      </div>
    );
  }
});

const App = React.createClass({
  getInitialState() {
    return {
      locale: enUS,
    };
  },
  changeLocale(locale) {
    this.setState({ locale });
  },
  render() {
    return (
      <div>
        <LocaleProvider locale={this.state.locale}><Page /></LocaleProvider>
        <div>
          <Select defaultValue={enUS} onChange={this.changeLocale} dropdownMatchSelectWidth={false}>
            <Option value={enUS}>English</Option>
            <Option value={null}>中文</Option>
          </Select>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<App />, mountNode);
````
