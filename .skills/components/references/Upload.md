# Upload — 上传

## 功能概述

文件选择上传和拖拽上传控件。支持多文件上传、拖拽上传、图片预览、上传进度、文件验证等功能。

## 核心概念

### 文件上传流程

```
用户选择/拖拽文件
     ↓
 beforeUpload 校验
     ↓
 发送上传请求
     ↓
 onChange 回调（file.status: uploading）
     ↓
 服务器返回响应
     ↓
 onChange 回调（file.status: done/error）
```

### 关键数据结构

```tsx
// 上传文件信息
interface UploadFile {
  uid: string; // 唯一标识
  name: string; // 文件名
  status?: 'uploading' | 'done' | 'error' | 'removed'; // 状态
  percent?: number; // 上传进度（0-100）
  url?: string; // 下载/预览地址
  thumbUrl?: string; // 缩略图地址
  response?: any; // 服务端响应
  error?: any; // 错误信息
  originFileObj?: File; // 原始文件对象
}

// 上传变化信息
interface UploadChangeInfo {
  file: UploadFile; // 当前文件
  fileList: UploadFile[]; // 所有文件列表
  event?: ProgressEvent; // 进度事件
}

// 自定义上传配置
interface CustomRequestOptions {
  onProgress: (event: ProgressEvent) => void; // 进度回调
  onError: (err: Error) => void; // 错误回调
  onSuccess: (body: any) => void; // 成功回调
  file: File; // 文件对象
  filename: string; // 文件名
  action: string; // 上传地址
  data?: object; // 额外参数
  headers?: object; // 请求头
  withCredentials: boolean; // 跨域请求
}
```

## 输入字段

### 必填

- `action`: string | (file) => Promise<string>，上传地址或返回上传地址的函数。

### 常用可选

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `name` | string | `'file'` | 发送到后端的文件参数名 |
| `method` | string | `'post'` | 上传请求方法 |
| `headers` | object | - | 上传请求头 |
| `data` | object \| (file) => object | - | 上传附加参数 |
| `accept` | string | - | 接受的文件类型，如 `.jpg,.png,image/*` |
| `multiple` | boolean | false | 允许多文件上传 |
| `maxCount` | number | - | 最大上传数量 |
| `fileList` | UploadFile[] | - | 已上传文件列表（受控） |
| `defaultFileList` | UploadFile[] | - | 默认已上传文件 |
| `disabled` | boolean | false | 禁用状态 |
| `listType` | `'text'` \| `'picture'` \| `'picture-card'` \| `'picture-circle'` | `'text'` | 上传列表样式 |
| `showUploadList` | boolean \| { showPreviewIcon, showRemoveIcon, showDownloadIcon } | true | 显示上传列表 |
| `withCredentials` | boolean | false | 上传携带 cookie |
| `directory` | boolean | false | 上传文件夹 |
| `openFileDialogOnClick` | boolean | true | 点击打开文件对话框 |

### 验证和处理

- `beforeUpload`: (file, fileList) => boolean | Promise<File> | Upload.LIST_IGNORE，上传前校验。
  - 返回 `false` 阻止上传。
  - 返回 `Upload.LIST_IGNORE` 不展示在列表。
  - 返回 File 可修改文件。
  - 返回 Promise 支持异步校验。
- `customRequest`: (options) => void，自定义上传实现。

### 回调和渲染

- `onChange`: ({ file, fileList, event }) => void，上传状态变化回调。
- `onPreview`: (file) => void，预览文件回调。
- `onRemove`: (file) => boolean | Promise<boolean>，删除文件回调。
- `onDownload`: (file) => void，下载文件回调。
- `onDrop`: (event) => void，拖拽上传回调。
- `itemRender`: (originNode, file, fileList, actions) => ReactNode，自定义列表项渲染。
- `iconRender`: (file, listType) => ReactNode，自定义图标。
- `isImageUrl`: (file) => boolean，判断是否图片 URL。
- `previewFile`: (file) => Promise<dataURL>，自定义预览文件方法。

### 进度和其他

- `progress`: ProgressProps，进度条配置。
- `progressAttr`: object，原生进度条属性。

### Upload.Dragger 属性

继承 Upload 所有属性，用于拖拽上传区域。

## 常见场景示例

### 场景 1: 基础文件上传

```tsx
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { UploadProps } from 'antd';

const App: React.FC = () => {
  const props: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/upload',
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>点击上传</Button>
    </Upload>
  );
};
```

### 场景 2: 多文件上传

```tsx
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, List, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';

const App: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <>
      <Upload
        multiple
        action="https://run.mocky.io/v3/upload"
        fileList={fileList}
        onChange={handleChange}
        maxCount={5}
      >
        <Button icon={<UploadOutlined />}>最多 5 个文件</Button>
      </Upload>

      <h3>上传列表</h3>
      <List
        dataSource={fileList}
        renderItem={(file) => (
          <List.Item>
            {file.name} ({file.status})
          </List.Item>
        )}
      />
    </>
  );
};
```

### 场景 3: 拖拽上传

```tsx
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadProps } from 'antd';

const App: React.FC = () => {
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/upload',
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  return (
    <Upload.Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
      <p className="ant-upload-hint">支持批量上传</p>
    </Upload.Dragger>
  );
};
```

### 场景 4: 图片上传和预览

```tsx
import { useState } from 'react';
import { Image, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';

const App: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        action="https://run.mocky.io/v3/upload"
        onChange={handleChange}
        onPreview={handlePreview}
        maxCount={3}
      >
        {fileList.length < 3 && '上传图片'}
      </Upload>

      {/* 图片预览 */}
      <div style={{ marginTop: 16 }}>
        {fileList
          .filter((file) => file.url || file.preview)
          .map((file) => (
            <Image key={file.uid} src={file.url || file.preview} alt={file.name} width={100} />
          ))}
      </div>
    </>
  );
};
```

### 场景 5: 文件验证

```tsx
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const App: React.FC = () => {
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件');
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('文件大小不能超过 5MB');
    }

    return isImage && isLt5M;
  };

  return (
    <Upload
      beforeUpload={beforeUpload}
      action="https://run.mocky.io/v3/upload"
      accept="image/*"
    >
      <Button icon={<UploadOutlined />}>上传图片（<5MB）</Button>
    </Upload>
  );
};
```

### 场景 6: 自定义上传

```tsx
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Progress, Upload } from 'antd';
import type { UploadProps } from 'antd';

const App: React.FC = () => {
  const [progress, setProgress] = useState(0);

  const customRequest: UploadProps['customRequest'] = ({
    file,
    onSuccess,
    onError,
    onProgress,
  }) => {
    const formData = new FormData();
    formData.append('file', file as any);

    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', (e) => {
      const percent = Math.round((e.loaded / e.total) * 100);
      setProgress(percent);
      onProgress?.({ percent });
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        onSuccess?.(xhr.response);
        message.success('上传成功');
      } else {
        onError?.(new Error('上传失败'));
      }
    });

    xhr.open('POST', 'https://your-upload-url');
    xhr.send(formData);
  };

  return (
    <>
      <Upload customRequest={customRequest} maxCount={1}>
        <Button icon={<UploadOutlined />}>上传文件</Button>
      </Upload>
      {progress > 0 && <Progress percent={progress} />}
    </>
  );
};
```

## AI 生成指引

### 场景判断表

| 用户需求     | 选择方案            | 关键属性                |
| ------------ | ------------------- | ----------------------- |
| 简单文件上传 | Upload 基础         | action, onChange        |
| 多文件上传   | multiple            | multiple={true}         |
| 限制上传数量 | maxCount            | maxCount={5}            |
| 文件验证     | beforeUpload        | beforeUpload 函数       |
| 拖拽上传     | Upload.Dragger      | Upload.Dragger 组件     |
| 图片上传     | listType            | listType='picture-card' |
| 自定义上传   | customRequest       | customRequest 函数      |
| 跨域上传     | withCredentials     | withCredentials={true}  |
| 附加参数     | data                | data 对象或函数         |
| 受控模式     | fileList + onChange | fileList, onChange      |
| 进度显示     | progress            | progress 配置           |
| 自定义渲染   | itemRender          | itemRender 函数         |

### 类型导入

```tsx
import type {
  RcFile, // 原始文件类型
  UploadChangeInfo, // onChange 事件类型
  UploadFile, // 文件信息类型
  UploadProps, // Upload 组件 props 类型
} from 'antd';
```

## 使用建议

使用 `beforeUpload` 进行文件校验（大小、类型）；返回 `false` 可阻止上传；返回 `Upload.LIST_IGNORE` 不展示在列表；图片上传使用 `listType="picture-card"`；拖拽上传使用 `Upload.Dragger`；自定义上传逻辑使用 `customRequest`；显示上传进度使用 `progress` 配置；受控上传使用 `fileList` + `onChange`。

## 示例代码

```tsx
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { UploadProps } from 'antd';

const props: UploadProps = {
  name: 'file',
  action: 'https://run.mocky.io/v3/upload',
  headers: { authorization: 'authorization-text' },
  onChange(info) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const App: React.FC = () => (
  <>
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>

    <Upload.Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
    </Upload.Dragger>
  </>
);
```

## 返回结果

渲染一个文件上传控件，支持点击和拖拽上传。
