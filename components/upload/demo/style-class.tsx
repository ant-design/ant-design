import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Flex, Upload } from 'antd';
import type { UploadProps, UploadSemanticType } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    borderRadius: token.borderRadius,
    padding: token.padding,
  },
}));

const stylesObject: UploadProps<any>['styles'] = {
  item: {
    borderRadius: 2,
    backgroundColor: 'rgba(5, 5, 5, 0.06)',
    height: 30,
  },
  trigger: {
    backgroundColor: 'rgba(84, 89, 172, 0.1)',
    padding: 8,
    borderRadius: 4,
  },
};

const stylesFn: UploadProps<any>['styles'] = (info): UploadSemanticType['styles'] => {
  if (info.props.multiple) {
    return {
      root: { border: '1px solid #5459AC' },
      item: {
        borderRadius: 2,
        backgroundColor: 'rgba(5, 5, 5, 0.06)',
        height: 30,
      },
      trigger: {
        backgroundColor: 'rgba(84, 89, 172, 0.2)',
        padding: 8,
        borderRadius: 4,
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();

  const uploadProps: UploadProps<any> = {
    classNames,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    defaultFileList: [
      {
        uid: '1',
        name: 'xxx.png',
        status: 'uploading',
        url: 'http://www.baidu.com/xxx.png',
        percent: 33,
      },
      {
        uid: '2',
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
      },
      {
        uid: '3',
        name: 'zzz.png',
        status: 'error',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/zzz.png',
      },
    ],
  };

  return (
    <Flex gap="large" vertical>
      <Upload {...uploadProps} styles={stylesObject}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <Upload {...uploadProps} styles={stylesFn} multiple>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </Flex>
  );
};

export default App;
