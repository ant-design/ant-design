import React from 'react';
import Upload from '..';

describe('Upload.typescript', () => {
  it('Upload', () => {
    const upload = (
      <Upload>
        <span>click to upload</span>
      </Upload>
    );
    expect(upload).toBeTruthy();
  });

  it('showUploadList', () => {
    const upload = (
      <Upload
        showUploadList={{
          showPreviewIcon: true,
          showRemoveIcon: true,
          showDownloadIcon: true,
          removeIcon: 'Remove',
          downloadIcon: 'Download',
        }}
      >
        <span>click to upload</span>
      </Upload>
    );
    expect(upload).toBeTruthy();
  });

  it('beforeUpload', () => {
    const upload = (
      <Upload
        beforeUpload={file => {
          if (file.type === 'image/png') {
            return true;
          }
          if (file.type === 'image/webp') {
            return Promise.resolve(file);
          }
          return Upload.LIST_IGNORE;
        }}
      >
        <span>click to upload</span>
      </Upload>
    );
    expect(upload).toBeTruthy();
  });

  it('defaultFileList/fileList', () => {
    const fileList = [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done' as const,
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'yyy.png',
        status: 'error' as const,
      },
    ];
    const upload = (
      <Upload fileList={fileList} defaultFileList={fileList}>
        <span>click to upload</span>
      </Upload>
    );
    expect(upload).toBeTruthy();
  });
});
