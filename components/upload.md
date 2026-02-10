---
category: Components
group: Data Entry
title: Upload
description: Used to select and upload files or drag and drop files.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*93ymR4RD4S0AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*l1nlSryXib8AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

Uploading is the process of publishing information (web pages, text, pictures, video, etc.) to a remote server via a web page or upload tool.

- When you need to upload one or more files.
- When you need to show the process of uploading.
- When you need to upload files by dragging and dropping.

## Examples

### Upload by clicking

Classic mode. File selection dialog pops up when upload button is clicked.

```tsx
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

const props: UploadProps = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
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
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);

export default App;
```

### Avatar

Click to upload user's avatar, and validate size and format of picture with `beforeUpload`.

> The return value of function `beforeUpload` can be a Promise to check asynchronously. [demo](https://upload-react-component.vercel.app/demo/before-upload#beforeupload)

```tsx
import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Flex gap="middle" wrap>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img draggable={false} src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img draggable={false} src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </Flex>
  );
};

export default App;
```

### Default Files

Use `defaultFileList` for uploaded files when page init.

```tsx
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';

const props: UploadProps = {
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

const App: React.FC = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
);

export default App;
```

### Pictures Wall

After users upload picture, the thumbnail will be shown in list. The upload button will disappear when count meets limitation.

```tsx
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const App: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
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
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
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
  ]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          styles={{ root: { display: 'none' } }}
          preview={{
            open: previewOpen,
            onOpenChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default App;
```

### Pictures with picture-circle type

Alternative display for picture-card.

```tsx
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const App: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
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
  ]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          styles={{ root: { display: 'none' } }}
          preview={{
            open: previewOpen,
            onOpenChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default App;
```

### Complete control over file list

You can gain full control over filelist by configuring `fileList`. You can accomplish all kinds of customized functions. The following shows two circumstances:

1. limit the number of uploaded files.

2. read from response and show file link.

```tsx
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { Button, Upload } from 'antd';

const App: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    },
  ]);

  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };

  const props = {
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange: handleChange,
    multiple: true,
  };
  return (
    <Upload {...props} fileList={fileList}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export default App;
```

### Drag and Drop

You can drag files to a specific area, to upload. Alternatively, you can also upload by selecting.

We can upload several files at once in modern browsers by giving the input the `multiple` attribute.

```tsx
import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const App: React.FC = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
);

export default App;
```

### Paste

Copy the file and paste it anywhere on the page to upload.

```tsx
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

const props: UploadProps = {
  name: 'file',
  pastable: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
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
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Paste or click to upload</Button>
  </Upload>
);

export default App;
```

### Upload directory

You can select and upload a whole directory. [Can still select files when uploading a folder in Safari?](#can-still-select-files-when-uploading-a-folder-in-safari)

```tsx
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

const App: React.FC = () => (
  <Upload action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload" directory>
    <Button icon={<UploadOutlined />}>Upload Directory</Button>
  </Upload>
);

export default App;
```

### Upload manually

Upload files manually after `beforeUpload` returns `false`.

```tsx
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const App: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file as FileType);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
};

export default App;
```

### Upload png file only

`beforeUpload` only prevent upload behavior when return false or reject promise, the prevented file would still show in file list. Here is the example you can keep prevented files out of list by return `UPLOAD.LIST_IGNORE`.

```tsx
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

const props: UploadProps = {
  beforeUpload: (file) => {
    const isPNG = file.type === 'image/png';
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  },
  onChange: (info) => {
    console.log(info.fileList);
  },
};

const App: React.FC = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload png only</Button>
  </Upload>
);

export default App;
```

### Pictures with list style

If uploaded file is a picture, the thumbnail can be shown. `IE8/9` do not support local thumbnail show. Please use `thumbUrl` instead.

```tsx
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import type { UploadFile } from 'antd';

const fileList: UploadFile[] = [
  {
    uid: '0',
    name: 'xxx.png',
    status: 'uploading',
    percent: 33,
  },
  {
    uid: '-1',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'zzz.png',
    status: 'error',
  },
];

const App: React.FC = () => (
  <Upload
    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
    listType="picture"
    defaultFileList={fileList}
  >
    <Button type="primary" icon={<UploadOutlined />}>
      Upload
    </Button>
  </Upload>
);

export default App;
```

### Customize preview file

Customize local preview. Can handle with non-image format files such as video.

```tsx
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';

const props: UploadProps = {
  action: '//jsonplaceholder.typicode.com/posts/',
  listType: 'picture',
  previewFile(file) {
    console.log('Your upload file:', file);
    // Your process logic. Here we just mock to the same file
    return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
      method: 'POST',
      body: file,
    })
      .then((res) => res.json())
      .then(({ thumbnail }) => thumbnail);
  },
};

const App: React.FC = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
);

export default App;
```

### Max Count

Limit files with `maxCount`. Will replace current one when `maxCount` is `1`.

```tsx
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';

const App: React.FC = () => (
  <Space vertical style={{ width: '100%' }} size="large">
    <Upload
      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
      listType="picture"
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
    </Upload>
    <Upload
      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
      listType="picture"
      maxCount={3}
      multiple
    >
      <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
    </Upload>
  </Space>
);

export default App;
```

### Transform file before request

Use `beforeUpload` for transform file before request such as add a watermark.

```tsx
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';

const props: UploadProps = {
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  listType: 'picture',
  beforeUpload(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = document.createElement('img');
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = 'red';
          ctx.textBaseline = 'middle';
          ctx.font = '33px Arial';
          ctx.fillText('Ant Design', 20, 20);
          canvas.toBlob((result) => resolve(result as Blob));
        };
      };
    });
  },
};

const App: React.FC = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
);

export default App;
```

### Aliyun OSS

Use Aliyun OSS upload example.

```tsx
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { App, Button, Form, Upload } from 'antd';

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}

interface AliyunOSSUploadProps {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
}

// Mock get OSS api
// https://help.aliyun.com/document_detail/31988.html
const mockOSSData = () => {
  const mockData = {
    dir: 'user-dir/',
    expire: '1577811661',
    host: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    accessId: 'c2hhb2RhaG9uZw==',
    policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
    signature: 'ZGFob25nc2hhbw==',
  };
  return Promise.resolve(mockData);
};

const AliyunOSSUpload: React.FC<Readonly<AliyunOSSUploadProps>> = ({ value, onChange }) => {
  const { message } = App.useApp();

  const [OSSData, setOSSData] = useState<OSSDataType>();

  const init = async () => {
    try {
      const result = await mockOSSData();
      setOSSData(result);
    } catch (err) {
      if (err instanceof Error) {
        message.error(err.message);
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    console.log('Aliyun OSS:', fileList);
    onChange?.([...fileList]);
  };

  const onRemove = (file: UploadFile) => {
    const files = (value || []).filter((v) => v.url !== file.url);
    onChange?.(files);
  };

  const getExtraData: UploadProps['data'] = (file) => ({
    key: file.url,
    OSSAccessKeyId: OSSData?.accessId,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  });

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (!OSSData) {
      return false;
    }

    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await init();
    }

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    // @ts-ignore
    file.url = OSSData.dir + filename;

    return file;
  };

  const uploadProps: UploadProps = {
    name: 'file',
    fileList: value,
    action: OSSData?.host,
    onChange: handleChange,
    onRemove,
    data: getExtraData,
    beforeUpload,
  };

  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

const Demo: React.FC = () => (
  <Form labelCol={{ span: 4 }}>
    <Form.Item label="Photos" name="photos">
      <AliyunOSSUpload />
    </Form.Item>
  </Form>
);

export default Demo;
```


### Custom action icon and extra info

Use `showUploadList` for custom action icons and extra information of files.

```tsx
import React from 'react';
import { StarOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';

const props: UploadProps = {
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
      size: 1234567,
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
    },
    {
      uid: '2',
      name: 'yyy.png',
      size: 1234567,
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '3',
      name: 'zzz.png',
      size: 1234567,
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ],
  showUploadList: {
    extra: ({ size = 0 }) => (
      <span style={{ color: '#cccccc' }}>({(size / 1024 / 1024).toFixed(2)}MB)</span>
    ),
    showDownloadIcon: true,
    downloadIcon: 'Download',
    showRemoveIcon: true,
    removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
  },
};

const App: React.FC = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
);

export default App;
```

### Drag sorting of uploadList

By using `itemRender`, we can integrate upload with [dnd-kit](https://github.com/clauderic/dnd-kit) to implement drag sorting of uploadList.

```css
.is-dragging a {
  pointer-events: none;
}
```

```tsx
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';

interface DraggableUploadListItemProps {
  originNode: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  file: UploadFile<any>;
}

const DraggableUploadListItem = ({ originNode, file }: DraggableUploadListItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: file.uid,
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      // prevent preview event when drag end
      className={isDragging ? 'is-dragging' : ''}
      {...attributes}
      {...listeners}
    >
      {/* hide error tooltip when dragging */}
      {file.status === 'error' && isDragging ? originNode.props.children : originNode}
    </div>
  );
};

const App: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image1.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image2.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image3.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image4.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
      <SortableContext items={fileList.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          fileList={fileList}
          onChange={onChange}
          itemRender={(originNode, file) => (
            <DraggableUploadListItem originNode={originNode} file={file} />
          )}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </SortableContext>
    </DndContext>
  );
};

export default App;
```

### Crop image before uploading

Use [antd-img-crop](https://github.com/nanxiaobei/antd-img-crop) to crop image before uploading.

```tsx
import React, { useState } from 'react';
import { Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const App: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default App;
```

### Customize Progress Bar

Use `progress` for customize progress bar.

```tsx
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

const props: UploadProps = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
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
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent) => percent && `${Number.parseFloat(percent.toFixed(2))}%`,
  },
};

const App: React.FC = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-upload) style of Upload components by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Flex, Upload } from 'antd';
import type { UploadProps } from 'antd';
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

const stylesFn: UploadProps<any>['styles'] = (info) => {
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
    } satisfies UploadProps<any>['styles'];
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
```




## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| accept | File types that can be accepted. See [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string \| [AcceptObject](#acceptobject) | - |  |
| action | Uploading URL | string \| (file) => Promise&lt;string> | - |  |
| beforeUpload | Hook function which will be executed before uploading. Uploading will be stopped with `false` or a rejected Promise returned. When returned value is `Upload.LIST_IGNORE`, the list of files that have been uploaded will ignore it. **Warning：this function is not supported in IE9** | (file: [RcFile](#rcfile), fileList: [RcFile[]](#rcfile)) => boolean \| Promise&lt;File> \| `Upload.LIST_IGNORE` | - |  |
| customRequest | Override for the default xhr behavior allowing for additional customization and the ability to implement your own XMLHttpRequest | ( options: [RequestOptions](#request-options), info: { defaultRequest: (option: [RequestOptions](#request-options)) => void; } ) => void | - | defaultRequest: 5.28.0 |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| data | Uploading extra params or function which can return uploading extra params | object \| (file) => object \| Promise&lt;object> | - |  |
| defaultFileList | Default list of files that have been uploaded | object\[] | - |  |
| directory | Support upload whole directory ([caniuse](https://caniuse.com/#feat=input-file-directory)) | boolean | false |  |
| disabled | Disable upload button | boolean | false | When customizing Upload children, please pass the disabled attribute to the child node at the same time to ensure the disabled rendering effect is consistent. |
| fileList | List of files that have been uploaded (controlled). Here is a common issue [#2423](https://github.com/ant-design/ant-design/issues/2423) when using it | [UploadFile](#uploadfile)\[] | - |  |
| headers | Set request headers, valid above IE10 | object | - |  |
| iconRender | Custom show icon | (file: UploadFile, listType?: UploadListType) => ReactNode | - |  |
| isImageUrl | Customize if render &lt;img /> in thumbnail | (file: UploadFile) => boolean | [(inside implementation)](https://github.com/ant-design/ant-design/blob/4ad5830eecfb87471cd8ac588c5d992862b70770/components/upload/utils.tsx#L47-L68) |  |
| itemRender | Custom item of uploadList | (originNode: ReactElement, file: UploadFile, fileList: object\[], actions: { download: function, preview: function, remove: function }) => React.ReactNode | - | 4.16.0 |
| listType | Built-in stylesheets, support for four types: `text`, `picture`, `picture-card` or `picture-circle` | string | `text` | `picture-circle`(5.2.0+) |
| maxCount | Limit the number of uploaded files. Will replace current one when `maxCount` is `1` | number | - | 4.10.0 |
| method | The http method of upload request | string | `post` |  |
| multiple | Whether to support selected multiple files. `IE10+` supported. You can select multiple files with CTRL holding down while multiple is set to be true | boolean | false |  |
| name | The name of uploading file | string | `file` |  |
| openFileDialogOnClick | Click open file dialog | boolean | true |  |
| pastable | Support paste file | boolean | false | 5.25.0 |
| previewFile | Customize preview file logic | (file: File \| Blob) => Promise&lt;dataURL: string> | - |  |
| progress | Custom progress bar | [ProgressProps](/components/progress/#api) (support `type="line"` only) | { strokeWidth: 2, showInfo: false } | 4.3.0 |
| showUploadList | Whether to show default upload list, could be an object to specify `extra`, `showPreviewIcon`, `showRemoveIcon`, `showDownloadIcon`, `removeIcon` and `downloadIcon` individually | boolean \| { extra?: ReactNode \| (file: UploadFile) => ReactNode, showPreviewIcon?: boolean \| (file: UploadFile) => boolean, showDownloadIcon?: boolean \| (file: UploadFile) => boolean, showRemoveIcon?: boolean \| (file: UploadFile) => boolean, previewIcon?: ReactNode \| (file: UploadFile) => ReactNode, removeIcon?: ReactNode \| (file: UploadFile) => ReactNode, downloadIcon?: ReactNode \| (file: UploadFile) => ReactNode } | true | `extra`: 5.20.0, `showPreviewIcon` function: 5.21.0, `showRemoveIcon` function: 5.21.0, `showDownloadIcon` function: 5.21.0 |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| withCredentials | The ajax upload with cookie sent | boolean | false |  |
| onChange | A callback function, can be executed when uploading state is changing. It will trigger by every uploading phase. see [onChange](#onchange) | function | - |  |
| onDrop | A callback function executed when files are dragged and dropped into the upload area | (event: React.DragEvent) => void | - | 4.16.0 |
| onDownload | Click the method to download the file, pass the method to perform the method logic, and do not pass the default jump to the new TAB | function(file): void | (Jump to new TAB) |  |
| onPreview | A callback function, will be executed when the file link or preview icon is clicked | function(file) | - |  |
| onRemove | A callback function, will be executed when removing file button is clicked, remove event will be prevented when the return value is false or a Promise which resolve(false) or reject | function(file): boolean \| Promise | - |  |

## Interface

### RcFile

Extends [File](https://developer.mozilla.org/en-US/docs/Web/API/File).

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| uid | unique id. Will auto-generate when not provided | string | - | - |
| lastModifiedDate | A Date object indicating the date and time at which the file was last modified | date | - | - |

### UploadFile

Extends [File](https://developer.mozilla.org/en-US/docs/Web/API/File) with additional props.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| crossOrigin | CORS settings attributes | `'anonymous'` \| `'use-credentials'` \| `''` | - | 4.20.0 |
| name | File name | string | - | - |
| percent | Upload progress percent | number | - | - |
| status | Upload status. Show different style when configured | `error` \| `done` \| `uploading` \| `removed` | - | - |
| thumbUrl | Thumb image url | string | - | - |
| uid | unique id. Will auto-generate when not provided | string | - | - |
| url | Download url | string | - | - |

### RequestOptions {#request-options}

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| action | Uploading URL | string | - | - |
| data | Uploading extra params or function which can return uploading extra params | Record<string, unknown> | - | 4.20.0 |
| filename | file name | string | - | - |
| file | File object containing upload information | [UploadFile](#uploadfile) | - | - |
| withCredentials | The ajax upload with cookie sent | boolean | - | - |
| headers | Set request headers, valid above IE10 | Record<string, string> | - | - |
| method | The http method of upload request | string | - | - |
| onProgress | Progress event callback | (event: object, file: UploadFile) => void | - | - |
| onError | Error callback when upload fails | (event: object, body?: object) => void | - | - |
| onSuccess | Success callback when upload completes | (body: object, fileOrXhr?: UploadFile \| XMLHttpRequest) => void | - | - |

### onChange

> 💡 The function will be called when uploading is in progress, completed, or failed.

When uploading state change, it returns:

```jsx
{
  file: { /* ... */ },
  fileList: [ /* ... */ ],
  event: { /* ... */ },
}
```

1. `file` File object for the current operation.

   ```jsx
   {
      uid: 'uid',      // unique identifier, negative is recommended, to prevent interference with internally generated id
      name: 'xx.png',   // file name
      status: 'done' | 'uploading' | 'error' | 'removed', // Intercepted file by beforeUpload doesn't have a status field.
      response: '{"status": "success"}', // response from server
      linkProps: '{"download": "image"}', // additional HTML props of file link
      xhr: 'XMLHttpRequest{ ... }', // XMLHttpRequest Header
   }
   ```

2. `fileList` current list of files

3. `event` response from the server, including uploading progress, supported by advanced browsers.

### AcceptObject

```typescript
{
  format: string;
  filter?: 'native' | ((file: RcFile) => boolean);
}
```

Configuration object for file type acceptance rules.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| format | Accepted file types, same as native input accept attribute. Supports MIME types, file extensions, etc. See [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string | - |  |
| filter | File filtering rule. When set to `'native'`, uses browser native filtering behavior; when set to a function, allows custom filtering logic. Function returns `true` to accept the file, `false` to reject | `'native'` \| `(file: RcFile) => boolean` | - |  |

## Semantic DOM

https://ant.design/components/upload/semantic.md

## Design Token



## Component Token (Upload)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| actionsColor | Action button color | string | rgba(0,0,0,0.45) |
| pictureCardSize | Size of list items in card type (affects both picture-card and picture-circle) | number | 102 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| colorBgMask | The background color of the mask, used to cover the content below the mask, Modal, Drawer, Image and other components use this token | string |  |
| colorBorder | Default border color, used to separate different elements, such as: form separator, card separator, etc. | string |  |
| colorError | Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc. | string |  |
| colorErrorBg | The background color of the error state. | string |  |
| colorFillAlter | Control the alternative background color of element. | string |  |
| colorIcon | Weak action. Such as `allowClear` or Alert close button | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorPrimaryBorder | The stroke color under the main color gradient, used on the stroke of components such as Slider. | string |  |
| colorPrimaryHover | Hover state under the main color gradient. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDescription | Control the font color of text description. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| colorTextHeading | Control the font color of heading. | string |  |
| colorTextLightSolid | Control the highlight color of text with background color, such as the text in Primary Button components. | string |  |
| controlItemBgHover | Control the background color of control component item when hovering. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeHeading2 | Font size of h2 tag. | number |  |
| fontSizeHeading3 | Font size of h3 tag. | number |  |
| fontSizeLG | Large font size | number |  |
| lineHeight | Line height of text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| lineWidthFocus | Control the width of the line when the component is in focus state. | number |  |
| margin | Control the margin of an element, with a medium size. | number |  |
| marginXL | Control the margin of an element, with an extra-large size. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| motionEaseInOut | Preset motion curve. | string |  |
| motionEaseInOutCirc | Preset motion curve. | string |  |
| padding | Control the padding of the element. | number |  |
| paddingSM | Control the small padding of the element. | number |  |
| paddingXS | Control the extra small padding of the element. | number |  |



## FAQ

### How do I implement upload server side? {#faq-server-implement}

- You can consult [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload/wiki#server-side) about how to implement server side upload interface.
- There is a mock example of [express](https://github.com/react-component/upload/blob/211979fdaa2c7896b6496df7061a0cfc0fc5434e/server.js) in rc-upload.

### I want to display download links. {#faq-show-download-link}

Please set property `url` of each item in `fileList` to control the content of the link.

### How to use `customRequest`? {#faq-custom-request}

See <https://github.com/react-component/upload#customrequest>.

### Why will the `fileList` that's in control not trigger `onChange` `status` update when the file is not in the list? {#faq-filelist-controlled-status}

`onChange` will only trigger when the file is in the list, it will ignore any events removed from the list. Please note that there does exist a bug which makes an event still trigger even when the file is not in the list before `4.13.0`.

### Why does `onChange` sometimes return File object and other times return { originFileObj: File }? {#faq-on-change-return-type}

For compatible case, we return File object when `beforeUpload` return `false`. It will merge to `{ originFileObj: File }` in the next major version. Current version is compatible to get origin file by `info.file.originFileObj`. You can change this before a major release.

### Why sometimes Chrome can not upload? {#faq-chrome-file-picker}

Chrome update will also break native upload. Please restart Chrome to finish the upload job.

<img alt="click restart button on Chrome" src="https://github.com/ant-design/ant-design/assets/507615/1509b25f-4cd3-41b2-9415-90394ad08273" width="800" />

Ref:

- [#48007](https://github.com/ant-design/ant-design/issues/48007)
- [#32672](https://github.com/ant-design/ant-design/issues/32672)
- [#32913](https://github.com/ant-design/ant-design/issues/32913)
- [#33988](https://github.com/ant-design/ant-design/issues/33988)

### Can still select files when uploading a folder in Safari? {#faq-safari-folder-upload}

Inside the upload component, we use the `directory` and `webkitdirectory` properties to control the input to implement folder selection, but it seems that in Safari's implementation, [it doesn't prevent users from selecting files](https://stackoverflow.com/q/55649945/3040605). You can solve this issue through `accept` configuration, for example:

```tsx
accept = {
  // Do not allow selecting any files
  format: `.${'n'.repeat(100)}`,
  // Accept all files within the folder after folder selection
  filter: () => true,
};
```
