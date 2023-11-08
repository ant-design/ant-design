import React, { useState } from 'react';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

const { Dragger } = Upload;

const fileList: UploadFile[] = [
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-xxx',
    percent: 50,
    name: 'image.png',
    status: 'uploading',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-5',
    name: 'image.png',
    status: 'error',
  },
];

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>();

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload disabled>Click to Upload</Upload>
      <Upload name="avatar" listType="picture-card" fileList={fileList} disabled>
        {uploadButton}
      </Upload>
      <Upload name="avatar" listType="picture-circle" fileList={fileList} disabled>
        {uploadButton}
      </Upload>
      <Dragger disabled>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or
          other banned files.
        </p>
      </Dragger>
    </>
  );
};

export default App;
