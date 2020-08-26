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
});
