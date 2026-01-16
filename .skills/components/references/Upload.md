# Upload — 上传

## 功能概述

文件选择上传和拖拽上传控件。

## 应用场景

- 上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。
- 当需要上传一个或一些文件时。
- 当需要展现上传的进度时。
- 当需要使用拖拽交互时。

## 输入字段

### Upload 属性

#### 必填

- 无必填属性。

#### 可选

- `accept`: string | [AcceptObject](#acceptobject)，接受上传的文件类型，详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)。
- `action`: string | (file) => Promise<string>，上传的地址。
- `beforeUpload`: (file: [RcFile](#rcfile), fileList: [RcFile[]](#rcfile)) => boolean | Promise<File> | `Upload.LIST_IGNORE`，上传文件之前的钩子，参数为上传的文件，若返回 `false` 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 `File` 或 `Blob` 对象则上传 resolve 传入对象）；也可以返回 `Upload.LIST_IGNORE`，此时列表中将不展示此文件。 **注意：IE9 不支持该方法**。
- `customRequest`: ( options: [RequestOptions](#request-options), info: { defaultRequest: (option: [RequestOptions](#request-options)) => void; } ) => void，通过覆盖默认的上传行为，可以自定义自己的上传实现，版本 defaultRequest: 5.28.0。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `data`: object|(file) => object | Promise<object>，上传所需额外参数或返回上传额外参数的方法。
- `defaultFileList`: object\[]，默认已经上传的文件列表。
- `directory`: boolean，支持上传文件夹（[caniuse](https://caniuse.com/#feat=input-file-directory)），默认 false。
- `disabled`: boolean，是否禁用，默认 false，版本 对于自定义 Upload children 时请将 disabled 属性同时传给 child node 确保 disabled 渲染效果保持一致。
- `fileList`: [UploadFile](#uploadfile)\[]，已经上传的文件列表（受控），使用此参数时，如果遇到 `onChange` 只调用一次的问题，请参考 [#2423](https://github.com/ant-design/ant-design/issues/2423)。
- `headers`: object，设置上传的请求头部，IE10 以上有效。
- `iconRender`: (file: UploadFile, listType?: UploadListType) => ReactNode，自定义显示 icon。
- `isImageUrl`: (file: UploadFile) => boolean，自定义缩略图是否使用 <img /> 标签进行显示，默认 [(内部实现)](https://github.com/ant-design/ant-design/blob/4ad5830eecfb87471cd8ac588c5d992862b70770/components/upload/utils.tsx#L47-L68)。
- `itemRender`: (originNode: ReactElement, file: UploadFile, fileList: object\[], actions: { download: function, preview: function, remove: function }) => React.ReactNode，自定义上传列表项，版本 4.16.0。
- `listType`: string，上传列表的内建样式，支持四种基本样式 `text`, `picture`, `picture-card` 和 `picture-circle`，默认 `text`，版本 `picture-circle`(5.2.0+)。
- `maxCount`: number，限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件，版本 4.10.0。
- `method`: string，上传请求的 http method，默认 `post`。
- `multiple`: boolean，是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件，默认 false。
- `name`: string，发到后台的文件参数名，默认 `file`。
- `openFileDialogOnClick`: boolean，点击打开文件对话框，默认 true。
- `pastable`: boolean，是否支持粘贴文件，默认 false，版本 5.25.0。
- `previewFile`: (file: File | Blob) => Promise<dataURL: string>，自定义文件预览逻辑。
- `progress`: [ProgressProps](/components/progress-cn#api)（仅支持 `type="line"`），自定义进度条样式，默认 { strokeWidth: 2, showInfo: false }，版本 4.3.0。
- `showUploadList`: boolean | { extra?: ReactNode | (file: UploadFile) => ReactNode, showPreviewIcon?: boolean | (file: UploadFile) => boolean, showDownloadIcon?: boolean | (file: UploadFile) => boolean, showRemoveIcon?: boolean | (file: UploadFile) => boolean, previewIcon?: ReactNode | (file: UploadFile) => ReactNode, removeIcon?: ReactNode | (file: UploadFile) => ReactNode, downloadIcon?: ReactNode | (file: UploadFile) => ReactNode }，是否展示文件列表, 可设为一个对象，用于单独设定 `extra`(5.20.0+), `showPreviewIcon`, `showRemoveIcon`, `showDownloadIcon`, `removeIcon` 和 `downloadIcon`，默认 true，版本 `extra`: 5.20.0, `showPreviewIcon` function: 5.21.0, `showRemoveIcon` function: 5.21.0, `showDownloadIcon` function: 5.21.0。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `withCredentials`: boolean，上传请求时是否携带 cookie，默认 false。
- `onChange`: function，上传文件改变时的回调，上传每个阶段都会触发该事件。详见 [onChange](#onchange)。
- `onDrop`: (event: React.DragEvent) => void，当文件被拖入上传区域时执行的回调功能，版本 4.16.0。
- `onDownload`: function(file): void，点击下载文件时的回调，如果没有指定，则默认跳转到文件 url 对应的标签页，默认 (跳转新标签页)。
- `onPreview`: function(file)，点击文件链接或预览图标时的回调。
- `onRemove`: function(file): boolean | Promise，点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除。

### RcFile 属性

#### 必填

- 无必填属性。

#### 可选

- `uid`: string，唯一标识符，不设置时会自动生成。
- `lastModifiedDate`: date，上次修改文件的日期和时间。

### UploadFile 属性

#### 必填

- 无必填属性。

#### 可选

- `crossOrigin`: `'anonymous'` | `'use-credentials'` | `''`，CORS 属性设置，版本 4.20.0。
- `name`: string，文件名。
- `percent`: number，上传进度。
- `status`: `error` | `done` | `uploading` | `removed`，上传状态，不同状态展示颜色也会有所不同。
- `thumbUrl`: string，缩略图地址。
- `uid`: string，唯一标识符，不设置时会自动生成。
- `url`: string，下载地址。

### RequestOptions 属性

#### 必填

- 无必填属性。

#### 可选

- `action`: string，上传的地址。
- `data`: Record<string, unknown>，上传所需额外参数或返回上传额外参数的方法。
- `filename`: string，文件名。
- `file`: [UploadFile](#uploadfile)，文件信息。
- `withCredentials`: boolean，上传请求时是否携带 cookie。
- `headers`: Record<string, string>，上传的请求头部。
- `method`: string，上传请求的 http method。
- `onProgress`: (event: object, file: UploadFile) => void，上传进度回调。
- `onError`: (event: object, body?: object) => void，上传失败回调。
- `onSuccess`: (body: object, fileOrXhr?: UploadFile | XMLHttpRequest) => void，上传成功回调。

### AcceptObject 属性

#### 必填

- 无必填属性。

#### 可选

- `format`: string，接受的文件类型，与原生 input accept 属性相同，支持 MIME 类型、文件扩展名等格式。详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)。
- `filter`: `'native'` | `(file: RcFile) => boolean`，文件过滤规则。设置为 `'native'` 时使用浏览器原生过滤行为；设置为函数时可以自定义过滤逻辑，函数返回 `true` 表示接受该文件，返回 `false` 表示拒绝。

## 方法

无公开方法。

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
