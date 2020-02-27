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
import { Form, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

class AliyunOSSUpload extends React.Component {
  state = {
    OSSData: {},
  };

  async componentDidMount() {
    await this.init();
  }

  init = async () => {
    try {
      const OSSData = await this.mockGetOSSData();

      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };

  // Mock get OSS api
  // https://help.aliyun.com/document_detail/31988.html
  mockGetOSSData = () => {
    return {
      dir: 'user-dir/',
      expire: '1577811661',
      host: '//www.mocky.io/v2/5cc8019d300000980a055e76',
      accessId: 'c2hhb2RhaG9uZw==',
      policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
      signature: 'ZGFob25nc2hhbw==',
    };
  };

  onChange = ({ fileList }) => {
    const { onChange } = this.props;
    console.log('Aliyun OSS:', fileList);
    if (onChange) {
      onChange([...fileList]);
    }
  };

  onRemove = file => {
    const { value, onChange } = this.props;

    const files = value.filter(v => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  transformFile = file => {
    const { OSSData } = this.state;

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.url = OSSData.dir + filename;

    return file;
  };

  getExtraData = file => {
    const { OSSData } = this.state;

    return {
      key: file.url,
      OSSAccessKeyId: OSSData.accessId,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  beforeUpload = async () => {
    const { OSSData } = this.state;
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      await this.init();
    }
    return true;
  };

  render() {
    const { value } = this.props;
    const props = {
      name: 'file',
      fileList: value,
      action: this.state.OSSData.host,
      onChange: this.onChange,
      onRemove: this.onRemove,
      transformFile: this.transformFile,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
    };
    return (
      <Upload {...props}>
        <Button>
          <UploadOutlined /> Click to Upload
        </Button>
      </Upload>
    );
  }
}

const FormPage = () => (
  <Form labelCol={{ span: 4 }}>
    <Form.Item label="Photos" name="photos">
      <AliyunOSSUpload />
    </Form.Item>
  </Form>
);

ReactDOM.render(<FormPage />, mountNode);
```
