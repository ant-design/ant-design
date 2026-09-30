import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const props: UploadProps = {
    customRequest: ({ file, onSuccess, onError }) => {
      setTimeout(() => {
        if (Math.random() < 0.5) {
          onSuccess?.({}, file);
        } else {
          onError?.(new Error('Upload failed'));
        }
      }, 1000);
    },
    onChange({ file }) {
      console.log(file);
      if (file.status === 'done') {
        messageApi.success(`${file.name} uploaded successfully`);
      } else if (file.status === 'error') {
        messageApi.error(`${file.name} upload failed. Click the retry icon to retry.`);
      }
    },
    onRetry: (file) => {
      messageApi.info(`Retrying ${file.name}`);
      console.log('retry', file);
    },
    showUploadList: {
      showRetryIcon: true,
    },
  };

  return (
    <>
      {contextHolder}
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </>
  );
};

export default App;
