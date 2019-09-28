---
order: 11
title:
  zh-CN: 阿里云 OSS
  en-US: Aliyun OSS
---

## zh-CN

使用阿里云 OSS 上传示例.

## en-US

Use Aliyun OSS upload example.

```jsx
import { Form, Upload, message } from 'antd';

function getOSSData() {
  return {};
}

class UploadCom extends React.Component {
  state = {
    OSSData: {},
  };

  componentDidMount() {
    try {
      const OSSData = getOSSData();

      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  }

  render() {
    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    };
    return (
      <Upload {...props}>
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
    );
  }
}

class FormPage extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>{getFieldDecorator('name')(<Input placeholder="Username" />)}</Form.Item>
        <Form.Item>{getFieldDecorator('name')(<UploadCom />)}</Form.Item>
      </Form>
    );
  }
}

const WrappedFormPage = Form.create({ name: 'normal_login' })(NormalLoginForm);

ReactDOM.render(<WrappedFormPage />, mountNode);
```
