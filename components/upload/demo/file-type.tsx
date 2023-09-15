import React, { useState } from 'react';
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
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const getBase64 = (file: RcFile): Promise<string> =>
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

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewOpen(true);
    setPreviewImage(file.url || (file.preview as string));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleIconRender: UploadProps['iconRender'] = (file, listType) => {
    const fileSufIconList = [
      { type: <FilePdfTwoTone />, suf: ['.pdf'] },
      { type: <FileExcelTwoTone />, suf: ['.xlsx', '.xls', '.csv'] },
      { type: <FileWordTwoTone />, suf: ['.doc', '.docx'] },
      {
        type: <PictureTwoTone />,
        suf: ['.webp', '.svg', '.png', '.gif', '.jpg', '.jpeg', '.jfif', '.bmp', '.dpg'],
      },
    ];
    // console.log(1, file, listType);
    let icon = file.status === 'uploading' ? <LoadingOutlined /> : <PaperClipOutlined />;
    if (listType === 'picture' || listType === 'picture-card' || listType === 'picture-circle') {
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
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        iconRender={handleIconRender}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default App;
