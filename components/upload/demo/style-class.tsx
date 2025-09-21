import React from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;

const classNamesObject: UploadProps['classNames'] = {
  root: 'demo-upload-root',
  list: 'demo-upload-list',
  item: 'demo-upload-item',
};

const classNamesFn: UploadProps['classNames'] = (info) => {
  if (info.props.disabled) {
    return { root: 'demo-upload-root--disabled' };
  }
  return { root: 'demo-upload-root--enabled' };
};

const stylesObject: UploadProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed', borderColor: '#1890ff' },
  list: { backgroundColor: '#fafafa' },
  item: { borderColor: '#40a9ff' },
};

const stylesFn: UploadProps['styles'] = (info) => {
  if (info.props.multiple) {
    return { root: { backgroundColor: '#f6ffed', borderColor: '#52c41a' } };
  }
  return { root: { backgroundColor: '#fff7e6', borderColor: '#fa8c16' } };
};

const uploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info: Parameters<Required<UploadProps>['onChange']>[0]) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      console.log(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: React.DragEvent<HTMLDivElement>) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const App: React.FC = () => (
  <Space size="large" style={{ display: 'flex' }}>
    <Space>
      <h4>Button Upload with classNames Object</h4>
      <Upload {...uploadProps} classNames={classNamesObject}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Space>

    <Space>
      <h4>Button Upload with classNames Function (Disabled)</h4>
      <Upload {...uploadProps} disabled classNames={classNamesFn}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Space>

    <Space>
      <h4>Dragger Upload with styles Object</h4>
      <Dragger {...uploadProps} styles={stylesObject}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or
          other banned files.
        </p>
      </Dragger>
    </Space>

    <Space>
      <h4>Dragger Upload with styles Function (Multiple)</h4>
      <Dragger {...uploadProps} multiple styles={stylesFn}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload with custom styles based on multiple prop.
        </p>
      </Dragger>
    </Space>
  </Space>
);

export default App;
