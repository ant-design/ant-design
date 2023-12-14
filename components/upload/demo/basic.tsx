import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

const list = [
  {
    name: 'image',
    status: 'done',
    uid: '-4',
    url: 'https://cdn.xxx.com/aaa',
  },
];
const props: UploadProps = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const App: React.FC = () => (
  <Upload
    listType="picture"
    defaultFileList={list as UploadProps['defaultFileList']}
    showUploadList={{
      showPreviewIcon: true,
      showDownloadIcon: true,
      showRemoveIcon: true,
    }}
    disabled
  >
    <button type="button">upload</button>
  </Upload>
);

export default App;
