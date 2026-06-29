import React from 'react';

import type { DraggerProps, UploadListProps, UploadProps } from '..';
import Upload from '..';
import Dragger from '../Dragger';
import type { UploadRef } from '../Upload';
import UploadList from '../UploadList';

describe('Upload.typescript', () => {
  it('Upload', () => {
    const upload = (
      <Upload>
        <span>click to upload</span>
      </Upload>
    );
    expect(upload).toBeTruthy();
  });

  it('onChange', () => {
    const upload = (
      <Upload<File> onChange={({ file }) => file}>
        <span>click to upload</span>
      </Upload>
    );

    expect(upload).toBeTruthy();
  });

  it('onChange params', () => {
    type IFile = {
      customFile: File;
    };

    const upload = (
      <Upload<IFile> onChange={({ file }) => file.response?.customFile}>
        <span>click to upload</span>
      </Upload>
    );

    expect(upload).toBeTruthy();
  });

  it('onChange fileList', () => {
    type IFile = {
      customFile: File;
    };

    const upload = (
      <Upload<IFile> onChange={({ fileList }) => fileList.map((file) => file.response?.customFile)}>
        <span>click to upload</span>
      </Upload>
    );

    expect(upload).toBeTruthy();
  });

  it('onChange in UploadProps', () => {
    const uploadProps: UploadProps<File> = {
      onChange: ({ file }) => file,
    };
    const upload = (
      <Upload {...uploadProps}>
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
        beforeUpload={(file) => {
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
        beforeUpload={async (file) => {
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
    const upload = <Upload fileList={fileList} defaultFileList={fileList} />;
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

  it('data', () => {
    const upload1 = (
      <Upload
        data={() => ({
          url: '',
        })}
      >
        <span>click to upload</span>
      </Upload>
    );
    const upload2 = (
      <Upload
        data={() =>
          Promise.resolve({
            url: '',
          })
        }
      >
        <span>click to upload</span>
      </Upload>
    );
    const upload3 = (
      <Upload
        data={{
          url: '',
        }}
      >
        <span>click to upload</span>
      </Upload>
    );
    expect(upload1).toBeTruthy();
    expect(upload2).toBeTruthy();
    expect(upload3).toBeTruthy();
  });

  it('UploadProps type', () => {
    const uploadProps: UploadProps<number | string> = {
      customRequest({ onSuccess }) {
        onSuccess?.(1234);
        onSuccess?.('test');
      },
    };
    expect(<Upload {...uploadProps} />).toBeTruthy();
  });

  it('UploadListProps type', () => {
    const uploadListProps: UploadListProps<number | string> = {
      locale: {},
      removeIcon: (file) => <div>{JSON.stringify(file.response)}</div>,
      downloadIcon: (file) => <div>{JSON.stringify(file.response)}</div>,
      previewIcon: (file) => <div>{JSON.stringify(file.response)}</div>,
    };
    expect(<UploadList {...uploadListProps} />).toBeTruthy();
  });

  it('DraggerProps type', () => {
    const draggerProps: DraggerProps<number | string> = {
      customRequest({ onSuccess }) {
        onSuccess?.(1234);
        onSuccess?.('test');
      },
    };
    expect(<Dragger {...draggerProps} />).toBeTruthy();
  });

  it('Dragger generic onChange', () => {
    const dragger = (
      <Upload.Dragger<File> onChange={({ file }) => file}>
        <span>drag to upload</span>
      </Upload.Dragger>
    );
    expect(dragger).toBeTruthy();
  });

  it('Dragger generic onChange params', () => {
    type IFile = {
      customFile: File;
    };

    const dragger = (
      <Upload.Dragger<IFile> onChange={({ file }) => file.response?.customFile}>
        <span>drag to upload</span>
      </Upload.Dragger>
    );
    expect(dragger).toBeTruthy();
  });

  it('Dragger generic onChange fileList', () => {
    type IFile = {
      customFile: File;
    };

    const dragger = (
      <Upload.Dragger<IFile>
        onChange={({ fileList }) => fileList.map((file) => file.response?.customFile)}
      >
        <span>drag to upload</span>
      </Upload.Dragger>
    );
    expect(dragger).toBeTruthy();
  });

  it('Dragger generic ref', () => {
    type IFile = {
      customFile: File;
    };

    const ref = React.createRef<UploadRef<IFile>>();
    const dragger = (
      <Upload.Dragger<IFile> ref={ref}>
        <span>drag to upload</span>
      </Upload.Dragger>
    );
    expect(dragger).toBeTruthy();
  });
});
