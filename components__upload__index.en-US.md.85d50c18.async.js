"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[9466],{60124:function(p,o,t){t.r(o);var c=t(2143),m=t(50250),f=t(59378),v=t(78190),a=t(74775),i=t(5937),g=t(2068),Z=t(74399),h=t(46004),_=t(35708),w=t(30138),x=t(56140),s=t(5388),U=t(49545),y=t(92169),b=t(13140),P=t(95127),L=t(74418),O=t(97119),l=t(28257),d=t(67294),n=t(13946);function u(){var r=(0,l.eL)(),e=r.texts;return(0,n.tZ)(l.dY,null,(0,n.tZ)(d.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"when-to-use"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,n.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,n.tZ)("p",null,e[1].value),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,e[2].value),(0,n.tZ)("li",null,e[3].value),(0,n.tZ)("li",null,e[4].value)),(0,n.tZ)("h2",{id:"examples"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,n.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,n.tZ)(s.Z,{items:[{demo:{id:"components-upload-demo-basic"},previewerProps:{title:"Upload by clicking",filename:"components/upload/demo/basic.tsx",jsx:`import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(\`\${info.file.name} file uploaded successfully\`);
    } else if (info.file.status === 'error') {
      message.error(\`\${info.file.name} file upload failed.\`);
    }
  },
};
const App = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);
export default App;
`,description:"<p>Classic mode. File selection dialog pops up when upload button is clicked.</p>"}},{demo:{id:"components-upload-demo-avatar"},previewerProps:{title:"Avatar",filename:"components/upload/demo/avatar.tsx",jsx:`import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
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
const App = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
export default App;
`,description:`<p>Click to upload user's avatar, and validate size and format of picture with <code>beforeUpload</code>.</p>
<blockquote>
<p>The return value of function <code>beforeUpload</code> can be a Promise to check asynchronously. <a href="https://upload-react-component.vercel.app/demo/before-upload#beforeupload">demo</a></p>
</blockquote>`}},{demo:{id:"components-upload-demo-defaultfilelist"},previewerProps:{title:"Default Files",filename:"components/upload/demo/defaultFileList.tsx",jsx:`import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
      response: 'Server Error 500',
      // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ],
};
const App = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
);
export default App;
`,description:"<p>Use <code>defaultFileList</code> for uploaded files when page init.</p>"}},{demo:{id:"components-upload-demo-picture-card"},previewerProps:{title:"Pictures Wall",filename:"components/upload/demo/picture-card.tsx",jsx:`import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const App = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
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
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default App;
`,description:"<p>After users upload picture, the thumbnail will be shown in list. The upload button will disappear when count meets limitation.</p>"}},{demo:{id:"components-upload-demo-filelist"},previewerProps:{title:"Complete control over file list",filename:"components/upload/demo/fileList.tsx",jsx:`import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
const App = () => {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    },
  ]);
  const handleChange = (info) => {
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
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
`,description:`<p>You can gain full control over filelist by configuring <code>fileList</code>. You can accomplish all kinds of customed functions. The following shows two circumstances:</p>
<ol>
<li>
<p>limit the number of uploaded files.</p>
</li>
<li>
<p>read from response and show file link.</p>
</li>
</ol>`}},{demo:{id:"components-upload-demo-drag"},previewerProps:{title:"Drag and Drop",filename:"components/upload/demo/drag.tsx",jsx:`import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(\`\${info.file.name} file uploaded successfully.\`);
    } else if (status === 'error') {
      message.error(\`\${info.file.name} file upload failed.\`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
const App = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </Dragger>
);
export default App;
`,description:`<p>You can drag files to a specific area, to upload. Alternatively, you can also upload by selecting.</p>
<p>We can upload serveral files at once in modern browsers by giving the input the <code>multiple</code> attribute.</p>`}},{demo:{id:"components-upload-demo-directory"},previewerProps:{title:"Upload directory",filename:"components/upload/demo/directory.tsx",jsx:`import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
const App = () => (
  <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
    <Button icon={<UploadOutlined />}>Upload Directory</Button>
  </Upload>
);
export default App;
`,description:"<p>You can select and upload a whole directory.</p>"}},{demo:{id:"components-upload-demo-upload-manually"},previewerProps:{title:"Upload manually",filename:"components/upload/demo/upload-manually.tsx",jsx:`import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
const App = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
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
  const props = {
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
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
};
export default App;
`,description:"<p>Upload files manually after <code>beforeUpload</code> returns <code>false</code>.</p>"}},{demo:{id:"components-upload-demo-upload-png-only"},previewerProps:{title:"Upload png file only",filename:"components/upload/demo/upload-png-only.tsx",jsx:`import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
const props = {
  beforeUpload: (file) => {
    const isPNG = file.type === 'image/png';
    if (!isPNG) {
      message.error(\`\${file.name} is not a png file\`);
    }
    return isPNG || Upload.LIST_IGNORE;
  },
  onChange: (info) => {
    console.log(info.fileList);
  },
};
const App = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload png only</Button>
  </Upload>
);
export default App;
`,description:"<p><code>beforeUpload</code> only prevent upload behavior when return false or reject promise, the prevented file would still show in file list. Here is the example you can keep prevented files out of list by return <code>UPLOAD.LIST_IGNORE</code>.</p>"}},{demo:{id:"components-upload-demo-picture-style"},previewerProps:{title:"Pictures with list style",filename:"components/upload/demo/picture-style.tsx",jsx:`import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
const fileList = [
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
const App = () => (
  <>
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      defaultFileList={[...fileList]}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
    <br />
    <br />
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      defaultFileList={[...fileList]}
      className="upload-list-inline"
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  </>
);
export default App;
`,description:"<p>If uploaded file is a picture, the thumbnail can be shown. <code>IE8/9</code> do not support local thumbnail show. Please use <code>thumbUrl</code> instead.</p>",style:`/* tile uploaded pictures */
.upload-list-inline .ant-upload-list-item {
  float: left;
  width: 200px;
  margin-inline-end: 8px;
}

.ant-upload-rtl.upload-list-inline .ant-upload-list-item {
  float: right;
}`}},{demo:{id:"components-upload-demo-preview-file"},previewerProps:{title:"Customize preview file",filename:"components/upload/demo/preview-file.tsx",jsx:`import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
const props = {
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
const App = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
);
export default App;
`,description:"<p>Customize local preview. Can handle with non-image format files such as video.</p>"}},{demo:{id:"components-upload-demo-max-count"},previewerProps:{title:"Max Count",filename:"components/upload/demo/max-count.tsx",jsx:`import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';
const App = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
    size="large"
  >
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
    </Upload>
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      maxCount={3}
      multiple
    >
      <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
    </Upload>
  </Space>
);
export default App;
`,description:"<p>Limit files with <code>maxCount</code>. Will replace current one when <code>maxCount</code> is <code>1</code>.</p>"}},{demo:{id:"components-upload-demo-transform-file"},previewerProps:{title:"Transform file before request",filename:"components/upload/demo/transform-file.tsx",jsx:`import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  listType: 'picture',
  beforeUpload(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = document.createElement('img');
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = 'red';
          ctx.textBaseline = 'middle';
          ctx.font = '33px Arial';
          ctx.fillText('Ant Design', 20, 20);
          canvas.toBlob((result) => resolve(result));
        };
      };
    });
  },
};
const App = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
);
export default App;
`,description:"<p>Use <code>beforeUpload</code> for transform file before request such as add a watermark.</p>"}},{demo:{id:"components-upload-demo-upload-with-aliyun-oss"},previewerProps:{title:"Aliyun OSS",filename:"components/upload/demo/upload-with-aliyun-oss.tsx",jsx:`import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, message, Upload } from 'antd';
const AliyunOSSUpload = ({ value, onChange }) => {
  const [OSSData, setOSSData] = useState();

  // Mock get OSS api
  // https://help.aliyun.com/document_detail/31988.html
  const mockGetOSSData = () => ({
    dir: 'user-dir/',
    expire: '1577811661',
    host: '//www.mocky.io/v2/5cc8019d300000980a055e76',
    accessId: 'c2hhb2RhaG9uZw==',
    policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
    signature: 'ZGFob25nc2hhbw==',
  });
  const init = async () => {
    try {
      const result = await mockGetOSSData();
      setOSSData(result);
    } catch (error) {
      message.error(error);
    }
  };
  useEffect(() => {
    init();
  }, []);
  const handleChange = ({ fileList }) => {
    console.log('Aliyun OSS:', fileList);
    onChange?.([...fileList]);
  };
  const onRemove = (file) => {
    const files = (value || []).filter((v) => v.url !== file.url);
    if (onChange) {
      onChange(files);
    }
  };
  const getExtraData = (file) => ({
    key: file.url,
    OSSAccessKeyId: OSSData?.accessId,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  });
  const beforeUpload = async (file) => {
    if (!OSSData) return false;
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
  const uploadProps = {
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
const App = () => (
  <Form
    labelCol={{
      span: 4,
    }}
  >
    <Form.Item label="Photos" name="photos">
      <AliyunOSSUpload />
    </Form.Item>
  </Form>
);
export default App;
`,description:"<p>Use Aliyun OSS upload example.</p>"}},{demo:{id:"components-upload-demo-file-type"},previewerProps:{debug:!0,title:"custom show icon",filename:"components/upload/demo/file-type.tsx",jsx:`import React, { useState } from 'react';
import {
  FileExcelTwoTone,
  FilePdfTwoTone,
  FileWordTwoTone,
  LoadingOutlined,
  PaperClipOutlined,
  PictureTwoTone,
  PlusOutlined,
} from '@ant-design/icons';
import { Modal, Upload } from 'antd';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const App = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-2',
      name: 'pdf.pdf',
      status: 'done',
      url: 'http://cdn07.foxitsoftware.cn/pub/foxit/cpdf/FoxitCompanyProfile.pdf',
    },
    {
      uid: '-3',
      name: 'doc.doc',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.doc',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'error',
    },
    {
      uid: '-5',
      name: 'pdf.pdf',
      status: 'error',
    },
    {
      uid: '-6',
      name: 'doc.doc',
      status: 'error',
    },
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewOpen(true);
    setPreviewImage(file.url || file.preview);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const handleIconRender = (file, listType) => {
    const fileSufIconList = [
      {
        type: <FilePdfTwoTone />,
        suf: ['.pdf'],
      },
      {
        type: <FileExcelTwoTone />,
        suf: ['.xlsx', '.xls', '.csv'],
      },
      {
        type: <FileWordTwoTone />,
        suf: ['.doc', '.docx'],
      },
      {
        type: <PictureTwoTone />,
        suf: ['.webp', '.svg', '.png', '.gif', '.jpg', '.jpeg', '.jfif', '.bmp', '.dpg'],
      },
    ];
    // console.log(1, file, listType);
    let icon = file.status === 'uploading' ? <LoadingOutlined /> : <PaperClipOutlined />;
    if (listType === 'picture' || listType === 'picture-card') {
      if (listType === 'picture-card' && file.status === 'uploading') {
        icon = <LoadingOutlined />; // or icon = 'uploading...';
      } else {
        fileSufIconList.forEach((item) => {
          if (item.suf.includes(file.name.slice(file.name.lastIndexOf('.')))) {
            icon = item.type;
          }
        });
      }
    }
    return icon;
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        iconRender={handleIconRender}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default App;
`,description:"<p>Displays the corresponding by default by type icon</p>"}},{demo:{id:"components-upload-demo-upload-custom-action-icon"},previewerProps:{title:"custom action icon",filename:"components/upload/demo/upload-custom-action-icon.tsx",jsx:`import React from 'react';
import { StarOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500',
      // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
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
      response: 'Server Error 500',
      // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ],
  showUploadList: {
    showDownloadIcon: true,
    downloadIcon: 'Download',
    showRemoveIcon: true,
    removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
  },
};
const App = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
);
export default App;
`,description:"<p>Use <code>showUploadList</code> for custom action icons of files.</p>"}},{demo:{id:"components-upload-demo-drag-sorting"},previewerProps:{title:"Drag sorting of uploadList",filename:"components/upload/demo/drag-sorting.tsx",jsx:`import React, { useCallback, useRef, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Tooltip, Upload } from 'antd';
import update from 'immutability-helper';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const type = 'DragableUploadList';
const DragableUploadListItem = ({ originNode, moveRow, file, fileList }) => {
  const ref = useRef(null);
  const index = fileList.indexOf(file);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: {
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  const errorNode = <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>;
  return (
    <div
      ref={ref}
      className={\`ant-upload-draggable-list-item \${isOver ? dropClassName : ''}\`}
      style={{
        cursor: 'move',
      }}
    >
      {file.status === 'error' ? errorNode : originNode}
    </div>
  );
};
const App = () => {
  const [fileList, setFileList] = useState([
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
  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = fileList[dragIndex];
      setFileList(
        update(fileList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [fileList],
  );
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        fileList={fileList}
        onChange={onChange}
        itemRender={(originNode, file, currFileList) => (
          <DragableUploadListItem
            originNode={originNode}
            file={file}
            fileList={currFileList}
            moveRow={moveRow}
          />
        )}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </DndProvider>
  );
};
export default App;
`,description:"<p>By using <code>itemRender</code>, we can integrate upload with react-dnd to implement drag sorting of uploadList.</p>",style:`#components-upload-demo-drag-sorting .ant-upload-draggable-list-item {
  border-top: 2px dashed rgba(0, 0, 0, 0);
  border-bottom: 2px dashed rgba(0, 0, 0, 0);
}
#components-upload-demo-drag-sorting .ant-upload-draggable-list-item.drop-over-downward {
  border-bottom-color: #1890ff;
}
#components-upload-demo-drag-sorting .ant-upload-draggable-list-item.drop-over-upward {
  border-top-color: #1890ff;
}`}},{demo:{id:"components-upload-demo-crop-image"},previewerProps:{title:"Crop image before uploading",filename:"components/upload/demo/crop-image.tsx",jsx:`import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
const App = () => {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
`,description:'<p>Use <a href="https://github.com/nanxiaobei/antd-img-crop">antd-img-crop</a> to crop image before uploading.</p>'}},{demo:{id:"components-upload-demo-customize-progress-bar"},previewerProps:{title:"Customize Progress Bar",filename:"components/upload/demo/customize-progress-bar.tsx",jsx:`import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(\`\${info.file.name} file uploaded successfully\`);
    } else if (info.file.status === 'error') {
      message.error(\`\${info.file.name} file upload failed.\`);
    }
  },
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent) => percent && \`\${parseFloat(percent.toFixed(2))}%\`,
  },
};
const App = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);
export default App;
`,description:"<p>Use <code>progress</code> for customize progress bar.</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)(i.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[5].value),(0,n.tZ)("th",null,e[6].value),(0,n.tZ)("th",null,e[7].value),(0,n.tZ)("th",null,e[8].value),(0,n.tZ)("th",null,e[9].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[10].value),(0,n.tZ)("td",null,e[11].value,(0,n.tZ)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept"},e[12].value)),(0,n.tZ)("td",null,e[13].value),(0,n.tZ)("td",null,e[14].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[15].value),(0,n.tZ)("td",null,e[16].value),(0,n.tZ)("td",null,e[17].value),(0,n.tZ)("td",null,e[18].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[19].value),(0,n.tZ)("td",null,e[20].value,(0,n.tZ)("code",null,e[21].value),e[22].value,(0,n.tZ)("code",null,e[23].value),e[24].value,(0,n.tZ)("strong",null,e[25].value)),(0,n.tZ)("td",null,e[26].value,(0,n.tZ)("code",null,e[27].value)),(0,n.tZ)("td",null,e[28].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[29].value),(0,n.tZ)("td",null,e[30].value),(0,n.tZ)("td",null,e[31].value),(0,n.tZ)("td",null,e[32].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[33].value),(0,n.tZ)("td",null,e[34].value),(0,n.tZ)("td",null,e[35].value),(0,n.tZ)("td",null,e[36].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null,e[38].value),(0,n.tZ)("td",null,e[39].value),(0,n.tZ)("td",null,e[40].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[41].value),(0,n.tZ)("td",null,e[42].value,(0,n.tZ)("a",{href:"https://caniuse.com/#feat=input-file-directory"},e[43].value),e[44].value),(0,n.tZ)("td",null,e[45].value),(0,n.tZ)("td",null,e[46].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[47].value),(0,n.tZ)("td",null,e[48].value),(0,n.tZ)("td",null,e[49].value),(0,n.tZ)("td",null,e[50].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[51].value),(0,n.tZ)("td",null,e[52].value,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/2423"},e[53].value),e[54].value),(0,n.tZ)("td",null,(0,n.tZ)(l.rU,{to:"#UploadFile"},e[55].value),e[56].value),(0,n.tZ)("td",null,e[57].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[58].value),(0,n.tZ)("td",null,e[59].value),(0,n.tZ)("td",null,e[60].value),(0,n.tZ)("td",null,e[61].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[62].value),(0,n.tZ)("td",null,e[63].value),(0,n.tZ)("td",null,e[64].value),(0,n.tZ)("td",null,e[65].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[66].value),(0,n.tZ)("td",null,e[67].value),(0,n.tZ)("td",null,e[68].value),(0,n.tZ)("td",null,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/blob/4ad5830eecfb87471cd8ac588c5d992862b70770/components/upload/utils.tsx#L47-L68"},e[69].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[70].value),(0,n.tZ)("td",null,e[71].value),(0,n.tZ)("td",null,e[72].value),(0,n.tZ)("td",null,e[73].value),(0,n.tZ)("td",null,e[74].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[75].value),(0,n.tZ)("td",null,e[76].value,(0,n.tZ)("code",null,e[77].value),e[78].value,(0,n.tZ)("code",null,e[79].value),e[80].value,(0,n.tZ)("code",null,e[81].value)),(0,n.tZ)("td",null,e[82].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[83].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[84].value),(0,n.tZ)("td",null,e[85].value,(0,n.tZ)("code",null,e[86].value),e[87].value,(0,n.tZ)("code",null,e[88].value)),(0,n.tZ)("td",null,e[89].value),(0,n.tZ)("td",null,e[90].value),(0,n.tZ)("td",null,e[91].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[92].value),(0,n.tZ)("td",null,e[93].value),(0,n.tZ)("td",null,e[94].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[95].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[96].value),(0,n.tZ)("td",null,e[97].value,(0,n.tZ)("code",null,e[98].value),e[99].value),(0,n.tZ)("td",null,e[100].value),(0,n.tZ)("td",null,e[101].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[102].value),(0,n.tZ)("td",null,e[103].value),(0,n.tZ)("td",null,e[104].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[105].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[106].value),(0,n.tZ)("td",null,e[107].value),(0,n.tZ)("td",null,e[108].value),(0,n.tZ)("td",null,e[109].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[110].value),(0,n.tZ)("td",null,e[111].value),(0,n.tZ)("td",null,e[112].value),(0,n.tZ)("td",null,e[113].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[114].value),(0,n.tZ)("td",null,e[115].value),(0,n.tZ)("td",null,(0,n.tZ)(l.rU,{to:"/components/progress/#API"},e[116].value),e[117].value,(0,n.tZ)("code",null,e[118].value),e[119].value),(0,n.tZ)("td",null,e[120].value),(0,n.tZ)("td",null,e[121].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[122].value),(0,n.tZ)("td",null,e[123].value,(0,n.tZ)("code",null,e[124].value),e[125].value,(0,n.tZ)("code",null,e[126].value),e[127].value,(0,n.tZ)("code",null,e[128].value),e[129].value,(0,n.tZ)("code",null,e[130].value),e[131].value,(0,n.tZ)("code",null,e[132].value),e[133].value),(0,n.tZ)("td",null,e[134].value),(0,n.tZ)("td",null,e[135].value),(0,n.tZ)("td",null,e[136].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[137].value),(0,n.tZ)("td",null,e[138].value),(0,n.tZ)("td",null,e[139].value),(0,n.tZ)("td",null,e[140].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[141].value),(0,n.tZ)("td",null,e[142].value,(0,n.tZ)(l.rU,{to:"#onChange"},e[143].value)),(0,n.tZ)("td",null,e[144].value),(0,n.tZ)("td",null,e[145].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[146].value),(0,n.tZ)("td",null,e[147].value),(0,n.tZ)("td",null,e[148].value),(0,n.tZ)("td",null,e[149].value),(0,n.tZ)("td",null,e[150].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[151].value),(0,n.tZ)("td",null,e[152].value),(0,n.tZ)("td",null,e[153].value),(0,n.tZ)("td",null,e[154].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[155].value),(0,n.tZ)("td",null,e[156].value),(0,n.tZ)("td",null,e[157].value),(0,n.tZ)("td",null,e[158].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[159].value),(0,n.tZ)("td",null,e[160].value),(0,n.tZ)("td",null,e[161].value),(0,n.tZ)("td",null,e[162].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"uploadfile"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#uploadfile"},(0,n.tZ)("span",{className:"icon icon-link"})),"UploadFile"),(0,n.tZ)("p",null,e[163].value),(0,n.tZ)(i.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[164].value),(0,n.tZ)("th",null,e[165].value),(0,n.tZ)("th",null,e[166].value),(0,n.tZ)("th",null,e[167].value),(0,n.tZ)("th",null,e[168].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[169].value),(0,n.tZ)("td",null,e[170].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[171].value),e[172].value,(0,n.tZ)("code",null,e[173].value),e[174].value,(0,n.tZ)("code",null,e[175].value)),(0,n.tZ)("td",null,e[176].value),(0,n.tZ)("td",null,e[177].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[178].value),(0,n.tZ)("td",null,e[179].value),(0,n.tZ)("td",null,e[180].value),(0,n.tZ)("td",null,e[181].value),(0,n.tZ)("td",null,e[182].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[183].value),(0,n.tZ)("td",null,e[184].value),(0,n.tZ)("td",null,e[185].value),(0,n.tZ)("td",null,e[186].value),(0,n.tZ)("td",null,e[187].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[188].value),(0,n.tZ)("td",null,e[189].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[190].value),e[191].value,(0,n.tZ)("code",null,e[192].value),e[193].value,(0,n.tZ)("code",null,e[194].value),e[195].value,(0,n.tZ)("code",null,e[196].value),e[197].value,(0,n.tZ)("code",null,e[198].value)),(0,n.tZ)("td",null,e[199].value),(0,n.tZ)("td",null,e[200].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[201].value),(0,n.tZ)("td",null,e[202].value),(0,n.tZ)("td",null,e[203].value),(0,n.tZ)("td",null,e[204].value),(0,n.tZ)("td",null,e[205].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[206].value),(0,n.tZ)("td",null,e[207].value),(0,n.tZ)("td",null,e[208].value),(0,n.tZ)("td",null,e[209].value),(0,n.tZ)("td",null,e[210].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[211].value),(0,n.tZ)("td",null,e[212].value),(0,n.tZ)("td",null,e[213].value),(0,n.tZ)("td",null,e[214].value),(0,n.tZ)("td",null,e[215].value)))),(0,n.tZ)("h3",{id:"onchange"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#onchange"},(0,n.tZ)("span",{className:"icon icon-link"})),"onChange"),(0,n.tZ)("blockquote",null,(0,n.tZ)("p",null,e[216].value)),(0,n.tZ)("p",null,e[217].value),(0,n.tZ)(a.Z,{lang:"js"},e[218].value),(0,n.tZ)("ol",null,(0,n.tZ)("li",null,(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[219].value),e[220].value),(0,n.tZ)(a.Z,{lang:"js"},e[221].value)),(0,n.tZ)("li",null,(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[222].value),e[223].value)),(0,n.tZ)("li",null,(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[224].value),e[225].value))),(0,n.tZ)("h2",{id:"faq"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,n.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,n.tZ)("h3",{id:"how-do-i-implement-upload-server-side"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#how-do-i-implement-upload-server-side"},(0,n.tZ)("span",{className:"icon icon-link"})),"How do I implement upload server side?"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,e[226].value,(0,n.tZ)("a",{href:"https://github.com/blueimp/jQuery-File-Upload/wiki#server-side"},e[227].value),e[228].value),(0,n.tZ)("li",null,e[229].value,(0,n.tZ)("a",{href:"https://github.com/react-component/upload/blob/master/server.js"},e[230].value),e[231].value)),(0,n.tZ)("h3",{id:"i-want-to-display-download-links"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#i-want-to-display-download-links"},(0,n.tZ)("span",{className:"icon icon-link"})),"I want to display download links."),(0,n.tZ)("p",null,e[232].value,(0,n.tZ)("code",null,e[233].value),e[234].value,(0,n.tZ)("code",null,e[235].value),e[236].value),(0,n.tZ)("h3",{id:"how-to-use-customrequest"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#how-to-use-customrequest"},(0,n.tZ)("span",{className:"icon icon-link"})),"How to use ",(0,n.tZ)("code",null,e[237].value),"?"),(0,n.tZ)("p",null,e[238].value,(0,n.tZ)("a",{href:"https://github.com/react-component/upload#customrequest"},e[239].value),e[240].value),(0,n.tZ)("h3",{id:"why-will-the-filelist-thats-in-control-not-trigger-onchange-status-update-when-the-file-is-not-in-the-list"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#why-will-the-filelist-thats-in-control-not-trigger-onchange-status-update-when-the-file-is-not-in-the-list"},(0,n.tZ)("span",{className:"icon icon-link"})),"Why will the ",(0,n.tZ)("code",null,e[241].value)," that's in control not trigger ",(0,n.tZ)("code",null,e[242].value)," ",(0,n.tZ)("code",null,e[243].value)," update when the file is not in the list?"),(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[244].value),e[245].value,(0,n.tZ)("code",null,e[246].value),e[247].value),(0,n.tZ)("h3",{id:"why-does-onchange-sometimes-return-file-object-and-other-times-return--originfileobj-file-"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#why-does-onchange-sometimes-return-file-object-and-other-times-return--originfileobj-file-"},(0,n.tZ)("span",{className:"icon icon-link"})),"Why does ",(0,n.tZ)("code",null,e[248].value)," sometimes return File object and other times return { originFileObj: File }?"),(0,n.tZ)("p",null,e[249].value,(0,n.tZ)("code",null,e[250].value),e[251].value,(0,n.tZ)("code",null,e[252].value),e[253].value,(0,n.tZ)("code",null,e[254].value),e[255].value,(0,n.tZ)("code",null,e[256].value),e[257].value),(0,n.tZ)("h3",{id:"why-sometime-chrome-can-not-upload"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#why-sometime-chrome-can-not-upload"},(0,n.tZ)("span",{className:"icon icon-link"})),"Why sometime Chrome can not upload?"),(0,n.tZ)("p",null,e[258].value),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/32672"},e[259].value)),(0,n.tZ)("li",null,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/32913"},e[260].value)),(0,n.tZ)("li",null,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/33988"},e[261].value))))))}o.default=u}}]);
