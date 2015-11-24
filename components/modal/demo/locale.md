# 国际化

- order: 6

设置 `okText` 与 `cancelText` 以自定义按钮文字。

---

````jsx
import { Modal, Button } from 'antd';

const LocalizedModal = React.createClass({
  getInitialState() {
    return { visible: false };
  },
  showModal() {
    this.setState({
      visible: true
    });
  },
  handleOk() {
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
      <Button type="primary" onClick={this.showModal}>Show Modal</Button>
      <Modal title="Modal" visible={this.state.visible}
             onOk={this.handleOk} onCancel={this.handleCancel}
             okText="OK" cancelText="Cancel">
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Modal>
    </div>;
  }
});

function confirm() {
  Modal.confirm({
    title: 'Confirm',
    content: 'Bla bla ...',
    okText: 'OK',
    cancelText: 'Cancel'
  });
}

function info() {
  Modal.info({
    title: 'Info',
    content: 'Bla bla ...',
    okText: 'OK'
  });
}

function success() {
  Modal.success({
    title: 'Success',
    content: 'Bla bla ...',
    okText: 'OK'
  });
}

function error() {
  Modal.error({
    title: 'Error',
    content: 'Bla bla ...',
    okText: 'OK'
  });
}

ReactDOM.render(<div>
  <LocalizedModal />
  <br />
  <Button onClick={confirm}>confirm</Button>
  <Button onClick={info}>Info</Button>
  <Button onClick={success}>Success</Button>
  <Button onClick={error}>Error</Button>
</div>, document.getElementById('components-modal-demo-locale'));
````

