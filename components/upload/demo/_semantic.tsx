import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素容器，包含布局样式、禁用状态文字颜色、用户选择控制、鼠标样式等基础样式',
    list: '文件列表容器，包含布局排列、过渡动画、间距控制等样式',
    item: '文件项元素，包含内边距、背景色、边框样式、悬停效果、状态颜色、过渡动画等样式',
    uploadButton: '上传按钮容器，包含按钮样式、禁用状态、隐藏控制等样式',
  },
  en: {
    root: 'Root container element with layout styles, disabled text color, user-select control, cursor styles and other basic styles',
    list: 'File list container with layout arrangement, transition animations, spacing control and other styles',
    item: 'File item element with padding, background color, border styles, hover effects, status colors, transition animations and other styles',
    uploadButton:
      'Upload button container with button styles, disabled state, visibility control and other styles',
  },
};

const uploadProps: UploadProps = {
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

const Block: React.FC<Readonly<UploadProps<any>>> = (props) => (
  <Upload {...uploadProps} {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
);

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Upload"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'list', desc: locale.list, version: '6.0.0' },
        { name: 'item', desc: locale.item, version: '6.0.0' },
        { name: 'uploadButton', desc: locale.uploadButton, version: '6.2.0' },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
