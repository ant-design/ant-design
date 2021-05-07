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
          const { name: returnType } = file;
          if (returnType === 'boolean') {
            return true;
          }
          if (returnType === 'Promise<boolean>') {
            return Promise.resolve(false);
          }
          if (returnType === 'file') {
            return file;
          }
          if (returnType === 'Promise<file>') {
            return Promise.resolve(file);
          }
          if (returnType === 'string') {
            return Upload.LIST_IGNORE;
          }
          if (returnType === 'Promise<string>') {
            return Promise.resolve(Upload.LIST_IGNORE);
          }
          if (returnType === 'Promise<void>') {
            return Promise.resolve();
          }
        }}
      >
        <span>click to upload</span>
      </Upload>
    );
    expect(upload).toBeTruthy();
  });

  it('beforeUpload async', () => {
    const upload = (
      <Upload
        beforeUpload={async file => {
          const { name: returnType } = file;
          if (returnType === 'boolean') {
            return true;
          }
          if (returnType === 'file') {
            return file;
          }
          if (returnType === 'string') {
            return Upload.LIST_IGNORE;
          }
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
      <Upload fileList={fileList} defaultFileList={fileList} />
    )
    expect(upload).toBeTruthy();
  });
  it('itemRender', () => {
    const upload = (
      <Upload
        itemRender={(node, file, list, actions) => (
          <div>
            {node}
            {file.name}
            {list.length}
            <span onClick={actions.remove}>remove</span>
            <span onClick={actions.download}>download</span>
            <span onClick={actions.preview}>preview</span>
          </div>
        )}
      >
        <span>click to upload</span>
      </Upload>
    );
    expect(upload).toBeTruthy();
  });
});
